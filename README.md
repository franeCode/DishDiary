# 🍽️ DishDiary

DishDiary is your go-to app for organizing, sharing, and discovering delicious recipes. 
Whether you're a professional chef or a cooking enthusiast, DishDiary helps you streamline your culinary journey.

🌟 Features


Recipe Management: Create and organize your recipes with a user-friendly interface.

Image Upload: Easily upload images of your culinary creations to accompany your recipes.

Recipe Sharing: Share your recipes with the world and discover new culinary ideas.

User Authentication: Secure login and registration process with JWT token-based authentication.

Responsive Design: DishDiary is fully responsive for both mobile and desktop users.


💻 Technologies


DishDiary is built using a variety of technologies, including:

Frontend: HTML, CSS, Bootstrap, JavaScript, React

Backend: Python, Flask

Database: SQLAlchemy (Database ORM)

Authentication: JWT (JSON Web Tokens)

<img src="/dish-diary1.png" alt="image-app">
<img src="/dish-diary2.png" alt="image-app">
<img src="/dish-diary3.png" alt="image-app">
<img src="/dish-diary4.png" alt="image-app">

🚅 Live Demo


Check out the live demo of DishDiary at here. Explore its features, try out some recipes, and see how DishDiary can elevate your cooking experience.

Enjoy your cooking adventures with DishDiary, and never let your cooking inspiration run dry! 🍳🍰🍔🥗🥂


## 🚀 Getting Started


To run DishDiary on your local machine, follow these simple steps:

### Backend Setup

1. Create and activate a virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

2. Install Python dependencies:

    ```bash
    pip install -r requirements.txt
    ```

### Frontend Setup

1. Navigate to the client directory:

    ```bash
    cd client
    ```

2. Install JavaScript dependencies:

    ```bash
    npm install
    ```

### Database Setup (optional)

DishDiary uses SQLAlchemy as the ORM for database operations.

### Environment Variables

Create a `.env` file in the root directory and add the necessary environment variables. For example:

```env
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url
