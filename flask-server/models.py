from app import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text)
    measure = db.Column(db.Text)
    image_url = db.Column(db.String(200))
    youtube_link = db.Column(db.String(200))
    
    def __repr__(self):
        return f"<Recipe {self.title}>"

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    
    def __repr__(self):
        return f"Registered: {self.username}"


class FavoriteRecipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text)
    measure = db.Column(db.Text)
    image_url = db.Column(db.String(200))
    youtube_link = db.Column(db.String(200))
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_favorite_recipe_user_id'), nullable=False)

    user = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f"<FavoriteRecipe {self.title}>"
    
class CustomRecipe(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.String, nullable=False)
    measure = db.Column(db.Text)
    image_url = db.Column(db.String(200))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', name='fk_custom_recipe_user_id'), nullable=False)
    user = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f"<CustomRecipe {self.title}>"

