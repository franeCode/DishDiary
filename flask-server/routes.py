from flask import jsonify, request, redirect, session, send_from_directory
import requests
from flask_bcrypt import Bcrypt
from models import Recipe, Users, SharedRecipes, CustomRecipe, db
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, unset_jwt_cookies, current_user, JWTManager
from flask import send_from_directory
from datetime import datetime, timedelta
from app import app
from sqlalchemy.sql import text
from werkzeug.utils import secure_filename
import os
import logging
from flask_caching import Cache

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    return f'Hello, {current_user}! This route is protected by JWT authentication.'

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
   
    username = request.json["username"]
    password = request.json["password"]
    confirmation = request.json["confirmation"]
 
    user_exists = Users.query.filter_by(username=username).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    if password != confirmation:
        return jsonify({"error": "Password is not matched!"}), 409

     
    hashed_password = bcrypt.generate_password_hash(password, rounds=12)
    new_user = Users(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
 
    session["user_id"] = new_user.id
 
    return jsonify({
        "id": new_user.id,
        "username": new_user.username
    })
    

@app.route("/login", methods=["POST"])
@cross_origin(supports_credentials=True)
def login():
    """Login user"""
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = Users.query.filter_by(username=username).first()

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Enter a valid username or password!"}), 401

    access_token = create_access_token(identity=user.username)

    return jsonify(access_token=access_token), 200


@app.route("/logout")
def logout():
    """Log user out"""
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@app.route('/api/recipes', methods=['GET'])
@cache.cached(timeout=3600)
def store_recipes():
    print('hello')
    """Get recipes and store it in the db"""
    print('Deleting existing recipes...')
    Recipe.query.delete()
    print('Deletion complete!')
    try:
        response = requests.get('https://www.themealdb.com/api/json/v1/1/search.php?f=')   
        data = response.json()
        # print(data)

        # Clear existing recipes from the database
        print('Deleting existing recipes...')
        Recipe.query.delete()
        print('Deletion complete!')

        for meal in data['meals']:
            if meal is None:
                continue

            # Retrieve the ingredients data as a list
            ingredients = [
                meal[f'strIngredient{i}'].strip()
                for i in range(1, 21)
                if meal.get(f'strIngredient{i}') is not None and meal.get(f'strIngredient{i}').strip()
            ]
            measure = [
                meal[f'strMeasure{i}'].strip()
                for i in range(1, 21)
                if meal.get(f'strMeasure{i}') is not None and meal.get(f'strMeasure{i}').strip()
            ]


            recipe = Recipe(
                title=meal.get('strMeal'),
                instructions=meal.get('strInstructions'),
                ingredients=', '.join(ingredients),
                measure=', '.join(measure),
                image_url=meal.get('strMealThumb'),
                youtube_link=meal.get('strYoutube')
            )
            print(recipe.ingredients)
            db.session.add(recipe)

        db.session.commit()  # Commit the changes to the database

        return jsonify({'message': 'Data successfully stored in the database!'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500  

@app.route('/api/delete_recipe/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
def delete_recipe(recipe_id):
    try:
        logging.info('Entered try block')
        
        current_user = get_jwt_identity()
        
        if current_user is not None:
            app.logger.error(f"current_user_id: {current_user}")
        else:
            app.logger.error("User not found or unauthorized")
            return jsonify({'error': 'User not found or unauthorized'}), 401  # Unauthorized status code
        
        custom_recipe = CustomRecipe.query.filter_by(id=recipe_id, user_id=current_user).first()
         
        if custom_recipe is not None:
            # Delete the recipe from the database
            db.session.delete(custom_recipe)
            db.session.commit()
            return jsonify({'message': 'Recipe deleted successfully'}), 200
        else:
            return jsonify({'error': 'Recipe not found or unauthorized'}), 404

    except Exception as e:
        logging.error('Entered catch block')
        return jsonify({'error': str(e)}), 500


@app.route('/api/get_recipes', methods=['GET'])
@jwt_required()
def get_recipes():
    """Get the recipes and send it to frontend"""

    current_user = get_jwt_identity()
    try:
        recipes = Recipe.query.all()
        recipe_list = []

        for recipe in recipes:
            # Check if ingredients and measures are not None
            if recipe.ingredients and recipe.measure:
                # Split the ingredients and measures
                ingredients = recipe.ingredients.split(', ')
                measures = recipe.measure.split(', ')

                # Combine ingredients and measures into a single string
                ingredients_with_measures = ', '.join([f"{m} {i}" for m, i in zip(measures, ingredients)])
            else:
                # Use the existing ingredients and measures if available, or an empty string if they are None
                ingredients_with_measures = recipe.ingredients or ""

            # Create a dictionary for each recipe with combined ingredients and measures
            recipe_data = {
                'id': recipe.id,
                'title': recipe.title,
                'instructions': recipe.instructions,
                'ingredients': ingredients_with_measures,  # Use the combined string
                'image_url': recipe.image_url,
                'youtube_link': recipe.youtube_link,
                'current_user': current_user
            }

            recipe_list.append(recipe_data)

        return jsonify(recipe_list)

    except Exception as e:
        return jsonify({'error': str(e)})

    
@app.route('/api/add_recipe', methods=['POST'])
@jwt_required()
def add_recipe():
    """Add custom recipe to the db"""
    current_user = get_jwt_identity()
    print(current_user)
    
    if current_user:
        try:
            # Check if 'image' field exists in the form data
            if 'image' in request.files:
                image_file = request.files['image']
                if image_file:
                    image_filename = secure_filename(image_file.filename)
                    image_path = os.path.join('uploads', image_filename)
                    image_file.save(image_path)
                else:
                    image_path = None
            else:
                image_path = None
                
            # Extract other form fields
            title = request.form.get('title')
            ingredients = request.form.get('ingredients')
            instructions = request.form.get('instructions')
            
            # Create a new CustomRecipe instance
            recipe = CustomRecipe(
                title=title, 
                ingredients=ingredients, 
                instructions=instructions, 
                image_url=image_path,
                user_id=current_user
            )
            
            try:
                db.session.add(recipe)
                db.session.commit()
            except Exception as db_error:
                db.session.rollback()  # Rollback changes in case of an error
                print(f"Database error: {str(db_error)}")
                return jsonify({'error': 'Database error'}), 500

            return jsonify({'message': 'Recipe added successfully'})
        except Exception as e:
            print(f"Error: {str(e)}")
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({"error": "Unauthorized"}), 401


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/api/get_custom_recipes', methods=['GET'])
@jwt_required()
def get_custom_recipes():
    """Get custom recipe form db and send it ot frontend"""
    try:
        current_user = get_jwt_identity()

        recipes = CustomRecipe.query.filter_by(user_id=current_user).all()  # Filter recipes by user_id
        recipe_list = []
                
        for recipe in recipes:
            recipe_data = {
                'id': recipe.id,
                'title': recipe.title,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'image_url': recipe.image_url
                
            }
            recipe_list.append(recipe_data)

        return jsonify(recipe_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/share_recipe/<int:custom_recipe_id>/<int:recipe_id>', methods=['POST'])
@jwt_required()
def share_recipe(custom_recipe_id, recipe_id):
    try:
        app.logger.error(f"Request Headers: {request.headers}")

        # Get the current user's ID from the JWT token
        current_user_id = get_jwt_identity()

        if current_user_id is not None:
            app.logger.error(f"current_user_id: {current_user_id}, custom_recipe_id: {custom_recipe_id}")

            # Check if the custom_recipe_id is not None
            if custom_recipe_id is not None:
                custom_recipe = CustomRecipe.query.filter_by(id=custom_recipe_id, user_id=current_user_id).first()

                if custom_recipe:
                    app.logger.error(f"Found custom_recipe: {custom_recipe}")
                else:
                    app.logger.error("Custom recipe not found or unauthorized")

                if not custom_recipe:
                    return jsonify({'error': 'Custom recipe not found or unauthorized'}), 404

                # Create a new Recipe instance and copy data
                recipe = SharedRecipes()
                # Set the attributes without setting the ID
                recipe.title = custom_recipe.title
                recipe.ingredients = custom_recipe.ingredients
                recipe.instructions = custom_recipe.instructions
                recipe.image_url = custom_recipe.image_url
                
                recipe.user_id = current_user_id

                # Commit changes to the database
                db.session.add(recipe)
                db.session.commit()
                
                shared_recipe = SharedRecipes.query.filter_by(title=recipe.title).first()
                if shared_recipe:
                    print(f"Shared Recipe ID: {shared_recipe.id}")
                else:
                    print("Shared Recipe not found in the database")

                return jsonify({'message': 'Custom recipe shared successfully'}), 200
            else:
                return jsonify({'error': 'Invalid custom recipe ID'}), 400
        else:
            return jsonify({'error': 'Invalid user identity'}), 401
    except Exception as e:
        app.logger.error(f"Database error: {str(e)}")
        return jsonify({'error': 'An error occurred while accessing the database'}), 500

@app.route('/api/get_shared_recipes', methods=['GET'])
@jwt_required()
def get_shared_recipes():
    """Get custom recipe form db and send it ot frontend"""
    try:
        current_user = get_jwt_identity()

        recipes = SharedRecipes.query.filter_by(user_id=current_user).all()  # Filter recipes by user_id
        recipe_list = []
                
        for recipe in recipes:
            recipe_data = {
                'id': recipe.id,
                'title': recipe.title,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions,
                'image_url': recipe.image_url,
                'user': recipe.user_id
                
            }
            recipe_list.append(recipe_data)

        return jsonify(recipe_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/update_recipe/<int:recipe_id>', methods=['POST'])
@jwt_required()
def update_recipe(recipe_id):
    try:
        # Get the current user's ID from the JWT token
        current_user_id = get_jwt_identity()

        # Check if the current user is authorized to update this recipe
        custom_recipe = CustomRecipe.query.filter_by(id=recipe_id, user_id=current_user_id).first()

        if custom_recipe:
            # Parse the updated recipe data from the request
            updated_data = request.get_json()
            title = updated_data.get('title')
            ingredients = updated_data.get('ingredients')
            instructions = updated_data.get('instructions')

            # Update the custom recipe data
            custom_recipe.title = title
            custom_recipe.ingredients = ingredients
            custom_recipe.instructions = instructions

            # Commit the changes to the database
            db.session.commit()

            return jsonify({'message': 'Recipe updated successfully'}), 200
        else:
            return jsonify({'error': 'Recipe not found or unauthorized'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
# @app.route('/test_database_connection', methods=['GET'])
# def test_database_connection():
#     try:
#         sql_expression = text('SELECT 1')
#         result = db.session.execute(sql_expression)
#         if result.scalar() == 1:
#             return jsonify({'message': 'Database connection is working'})
#         else:
#             return jsonify({'error': 'Database connection test failed'}), 500
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500