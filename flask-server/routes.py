from flask import jsonify, request, make_response, session
import requests
from flask_bcrypt import Bcrypt
from models import Recipe, Users, FavoriteRecipe, CustomRecipe, db
from flask_cors import cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, unset_jwt_cookies, current_user
from datetime import datetime, timedelta
from app import app

bcrypt = Bcrypt(app)

@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
   
    username = request.json["username"]
    password = request.json["password"]
 
    user_exists = Users.query.filter_by(username=username).first() is not None
 
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409
    # if not username or not password:
    #     return jsonify({"error": "Username and password are required"}), 400
     
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
def store_recipes():
    print("hello")
    try:
        response = requests.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
   
        data = response.json()
        print(data)
        

        # Clear existing recipes from the database
    
        print('Deleting existing recipes...')
        Recipe.query.delete()
        print('Deletion complete!')

        for index, meal in enumerate(data['meals']):
            if meal is None:
                continue

            if index >= 24:
                break  # Break the loop after 25 iterations

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
            print(measure)


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
        return jsonify({'error': str(e)}), 500  # Return the error message with a 500 status code


@app.route('/api/get_recipes', methods=['GET', 'POST'])
@jwt_required()
def get_recipes():
    current_user = get_jwt_identity()
    try:
        recipes = Recipe.query.all()
        recipe_list = []

        for recipe in recipes:
            recipe_data = {
                'id': recipe.id,
                'title': recipe.title,
                'instructions': recipe.instructions,
                'ingredients': recipe.ingredients,
                'measure': recipe.measure,
                'image_url': recipe.image_url,
                'youtube_link': recipe.youtube_link,
                'current_user': current_user  # Include the current_user information in the response
            }

            recipe_list.append(recipe_data)

        return jsonify(recipe_list)

    except Exception as e:
        return jsonify({'error': str(e)})


# @app.route('/api/favorites', methods=['GET', 'POST'])
# # @login_required
# def add_favorite_recipe():
#     user_id = session.get('user_id')  # Retrieve the user ID from the session cookie
#     print(user_id)


#     if user_id:
#         try:
#             recipe_data = request.json.get('recipe')

#             if recipe_data:
#                 # Extract the necessary data from the recipe_data object
#                 title = recipe_data.get('title')
#                 instructions = recipe_data.get('instructions')
#                 print(title, instructions)

#                 # Retrieve the user instance from the database
#                 user_instance = Users.query.get(user_id)

#                 # Create a new FavoriteRecipe object and associate it with the user
#                 new_recipe = FavoriteRecipe(title=title, instructions=instructions, user=user_instance)

#                 # Add the new recipe to the database
#                 db.session.add(new_recipe)
#                 db.session.commit()

#                 # Return a success response
#                 return jsonify({'message': 'Recipe added to favorites'}), 200
#             else:
#                 # Return an error response if the request is invalid or missing data
#                 return jsonify({'error': 'Invalid request'}), 400
#         except Exception as e:
#             # Print the exception for debugging
#             print(f"Error: {str(e)}")
#             # Return an error response
#             return jsonify({'error': 'Internal Server Error'}), 500
#     else:
#         # User is not logged in, return an error response
#         return jsonify({'error': 'Unauthorized'}), 401
    
    
@app.route('/api/add_recipe', methods=['POST'])
@jwt_required()
def add_recipe():
    current_user = get_jwt_identity()
    print(current_user)
    # user = Users.query.get(current_user_id)
    if current_user:
        try:
            recipe_data = request.get_json()
            print(recipe_data)

            # Extract recipe data from the request
            title = recipe_data['title']
            ingredients = recipe_data['ingredients']
            instructions = recipe_data['instructions']

            # Create a new CustomRecipe instance
            recipe = CustomRecipe(
                title=title, 
                ingredients=ingredients, 
                instructions=instructions, 
                user_id=current_user
                )
            
            db.session.add(recipe)
            db.session.commit()

            return jsonify({'message': 'Recipe added successfully'})
        except Exception as e:
            print(f"Error: {str(e)}")
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({"error": "Unauthorized"}), 401


@app.route('/api/get_custom_recipes', methods=['GET'])
@jwt_required()
def get_custom_recipes():
    try:
        current_user = get_jwt_identity()

        recipes = CustomRecipe.query.filter_by(user_id=current_user).all()  # Filter recipes by user_id
        recipe_list = []

        for recipe in recipes:
            recipe_data = {
                'id': recipe.id,
                'title': recipe.title,
                'ingredients': recipe.ingredients,
                'instructions': recipe.instructions
            }
            recipe_list.append(recipe_data)

        return jsonify(recipe_list)
    except Exception as e:
        return jsonify({'error': str(e)}), 500