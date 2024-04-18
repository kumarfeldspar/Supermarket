import React from "react";
import bannerImage from "../img/cat-1.png"; // Import the image
import products1 from "../img/products-1.png"; // Import the image
import products2 from "../img/products-2.png"; // Import the image
import products3 from "../img/products-3.png"; // Import the image
import products4 from "../img/products-4.png"; // Import the image
import products5 from "../img/products-5.png"; // Import the image
import products6 from "../img/products-6.png"; // Import the image
import products7 from "../img/products-7.png"; // Import the image
import products8 from "../img/products-8.png"; // Import the image
import watermelon from "../img/watermelon.png"; // Import the image
import cat1 from "../img/cat-1.png"; // Import the image
import cat2 from "../img/cat-2.png"; // Import the image
import cat3 from "../img/cat-3.png"; // Import the image
import cat4 from "../img/cat-4.png"; // Import the image
import front from "../img/front.png"; // Import the image

import "./HomePage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const Banner = ({ image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the desired location
    navigate("/login");
  };
  return (
    <div className="banner">
      <img src={front} alt="Banner" className="banner-img" />
      <div className="banner-content">
        <h2>Welcome to World's Best Supermarket</h2>
        <p>Explore our fresh groceries and products</p>
        <button className="btn btn-primary" onClick={handleClick}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the desired location
    navigate("/login");
  };

  return (
    <div>
      <Banner image={bannerImage} />
      <div className="card-container">
        <div className="card">
          <img src={bannerImage} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Fresh Groceries</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>

        <div className="card">
          <img src={products1} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Fresh Orange</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>

        <div className="card">
          <img src={products2} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Onions</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>

        <div className="card">
          <img src={watermelon} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">watermelon</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>

        <div className="card">
          <img src={cat2} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Fresh Fruits</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>

        <div className="card">
          <img src={products5} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Potatoes</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>

        <div className="card">
          <img src={products6} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Fresh Vegetables</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>

        <div className="card">
          <img src={products7} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Carrot</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>
        <div className="card">
          <img src={cat3} className="card-img-top" alt="Banner" />
          <div className="card-body">
            <h5 className="card-title">Dairy Products</h5>
            <p className="card-text"></p>
            <button className="btn btn-primary" onClick={handleClick}>
              Click to buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
