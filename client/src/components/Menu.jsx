import { Link } from "react-router-dom";
import img_write from "../assets/img/make-food.jpg";
import view from "../assets/img/view.jpg";

import logo from '../assets/img/logo-icon.svg';

const Menu = () => {
    return ( 
        <div>
        <div className="container d-flex flex-column align-items-center" style={{ height: "100vh", marginTop: "10rem", fontFamily: "'Poppins', sans-serif" }}>
            <div className="d-flex flex-column justify-content-center align-items-center p-5 mb-5 fs-5 shadow">
                <h1 className="d-flex align-items-center justify-content-center fs-1 gap-3 mb-5">Welcome to 
                <div className="logo">
                    <span>DishDiary</span>
                    <img src={logo} alt="logo"></img>
                </div>
                </h1>
                <p className="text-center">
                Get ready to embark on a culinary adventure where you can unleash your creativity and explore a world of flavors. Whether you're a seasoned chef or a passionate home cook, this app is designed to inspire and simplify your cooking experience.
                </p>
            </div>
            <div className="d-flex flex-column gap-5">

                <div className="card mb-3" style={{ maxWidth: "80vw", borderColor: "transparent" }}>
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={view} style={{ height: "25rem", width: "100%"}} className="img-fluid rounded-4" alt="image"></img>
                        </div>
                        <div className="col-md-9">
                            <div className="card-body p-3 ms-3">
                                <h5 className="card-title fs-2">Ready to share your secret recipes with the world?</h5>
                                <p className="card-text mt-5 fs-5">Start writing and let your imagination run wild! Jot down your unique creations, cherished family recipes, or even your innovative twists on classic dishes. Don't worry, we've got you covered with a simple and intuitive recipe editor that ensures your culinary masterpieces are captured flawlessly.</p>
                                <button style={{backgroundColor: "#FF7D04"}} className="btn fs-3 px-4 mt-3 float-end rounded">
                                    <Link to="/cookbook" style={{ textDecoration: "none", color: "#fff"}}>Write</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-3" style={{ maxWidth: "80vw", borderColor: "transparent" }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title fs-2">Craving some culinary inspiration or looking to broaden your repertoire? </h5>
                                <p class="card-text mt-5 fs-5">Dive into a treasure trove of delightful recipes contributed by fellow food enthusiasts from all around the globe. Discover an endless array of appetizing dishes, ranging from mouthwatering main courses to decadent desserts. The possibilities are as vast as your appetite!</p>
                                <button style={{backgroundColor: "#FF7D04"}} className="btn fs-3 px-4 mt-3 rounded float-end">
                                    <Link to="/recipes" style={{ textDecoration: "none", color: "#fff"}}>View</Link>
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4" style={{ height: "15rem"}}>
                            <img src={img_write} className="img-fluid rounded-4 ms-3" alt="image"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center p-5 mt-5 fs-5 shadow">
                <p className="text-center">
                No matter which path you choose, we're here to fuel your passion for cooking and connect you with a community of fellow food lovers. So, grab your apron, sharpen those knives, and let's dive into the wonderful world of flavors together!
                </p>
                <p className="text-center fs-4 fw-bold">Are you ready? Let's cook up something extraordinary!
                </p>
            </div>
        </div>
        </div>
     );
}
 
export default Menu;