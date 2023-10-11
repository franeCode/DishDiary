import { Link } from "react-router-dom";
import view from "../assets/img/make-food.jpg";
import write from "../assets/img/view.webp";
import logo from "../assets/img/logo-icon.svg";

const Home = () => {
  return (
    <div>
      <div
        className="container d-flex flex-column align-items-center"
        style={{
          marginTop: "10rem",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center p-5 mb-5 fs-5 shadow">
          <h1 className="d-flex align-items-center justify-content-center fs-1 gap-3 mb-5">
            Welcome to
            <div className="logo">
              <span>DishDiary</span>
              {/* <img
                src={logo}
                alt="logo"
                style={{ width: "1rem", height: "1rem" }}
                loading="lazy"
              ></img> */}
            </div>
          </h1>
          <p className="text-center fs-4">
            Get ready to embark on a culinary adventure where you can unleash
            your creativity and explore a world of flavors. Whether you're a
            seasoned chef or a passionate home cook, this app is designed to
            inspire and simplify your cooking experience.
          </p>
        </div>
        <div className="d-flex flex-column gap-5">
          <div className="card mb-3" style={{ borderColor: "transparent" }}>
            <div className="row align-items-center g-0">
              <div className="col-md-3">
                <img
                  src={write}
                  alt="image"
                  style={{ height: "auto", width: "100%" }}
                  className="rounded-4"
                  //   loading="lazy"
                />
              </div>
              <div className="col-md-9">
                <div className="card-body p-3 ms-3">
                  <h3 className="card-title fs-2">
                    Ready to share your secret recipes with the world?
                  </h3>
                  <p className="card-text mt-5 fs-4">
                    Start writing and let your imagination run wild! Jot down
                    your unique creations, cherished family recipes, or even
                    your innovative twists on classic dishes. Don't worry, we've
                    got you covered with a simple and intuitive recipe editor
                    that ensures your culinary masterpieces are captured
                    flawlessly.
                  </p>
                  <button
                    style={{ backgroundColor: "#FF7D04" }}
                    className="btn fs-3 px-4 mt-3 rounded"
                  >
                    <Link
                      to="/create_recipe"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Write
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3" style={{ borderColor: "transparent" }}>
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title fs-2">
                    Craving some culinary inspiration or looking to broaden your
                    repertoire?{" "}
                  </h3>
                  <p className="card-text mt-5 fs-4">
                    Dive into a treasure trove of delightful recipes contributed
                    by fellow food enthusiasts from all around the globe.
                    Discover an endless array of appetizing dishes, ranging from
                    mouthwatering main courses to decadent desserts. The
                    possibilities are as vast as your appetite!
                  </p>
                  <button
                    style={{ backgroundColor: "#FF7D04" }}
                    className="btn fs-3 px-4 mt-3 rounded float-end mx-5 mb-3"
                  >
                    <Link
                      to="/recipes"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      View
                    </Link>
                  </button>
                </div>
              </div>
              <div className="col-md-4" style={{ height: "15rem" }}>
                <img
                  src={view}
                  alt="image"
                  className="rounded-4 align-items-center"
                  style={{ height: "auto", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center p-5 my-5 fs-4 shadow">
          <p className="text-center">
            No matter which path you choose, we're here to fuel your passion for
            cooking and connect you with a community of fellow food lovers. So,
            grab your apron, sharpen those knives, and let's dive into the
            wonderful world of flavors together!
          </p>
          <p className="text-center fs-4 fw-bold">
            Are you ready? Let's cook up something extraordinary!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
