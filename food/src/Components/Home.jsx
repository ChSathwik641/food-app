import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [islastScrolled, setIsLastScrolled] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 50) {
        if (currentScroll > islastScrolled) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [islastScrolled]);
  return (
    <div className="container">
      <div className="head">
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
          <h1>TasteWise</h1>
        </header>
      </div>
      <section>
        <div className="food">
          <div className="h3">
            {" "}
            <h3>Rotisserie Chicken </h3>
          </div>
          <div className="container-lg recipe bg-light text-white">
            <img
              src="/Chicken.jpg"
              alt="Chicken image"
              className="img1 img-thumbnail"
            ></img>
            <div className="p">
              <p>
                You can easily create a mouthwatering Rotisserie Chicken right
                at home. Start with a whole chicken and marinate it with olive
                oil, garlic, paprika, onion powder, and thyme for a burst of
                flavor. Rub the marinade all over the chicken, then cook it on a
                rotisserie to achieve juicy meat and crispy skin. This versatile
                dish can be enjoyed on its own or used in various recipes.
              </p>
              <p>
                {" "}
                To discover more delicious recipes and learn how to make them,
                click the button below!
              </p>
              <Link to="/RecipeFinder">
                <button className="btn1">
                  <i
                    className="fas fa-utensils"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Recipe{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <div className="h3 heading3">
            <h3>Nutrition Info</h3>
          </div>
          <div className="recipe reciepe1">
            <div className="p p1">
              <p>
                Do yo Konw That Tomatoes are a rich source of essential
                nutrients, including vitamins C and K, potassium, and folate. A
                medium-sized tomato contains about 22 calories and provides
                significant amounts of antioxidants, particularly lycopene,
                which is known for its potential health benefits. Additionally,
                tomatoes contribute dietary fiber, aiding in digestion.
              </p>
              <p>
                {" "}
                To explore the nutritional content of other ingredients, click
                the button below!
              </p>{" "}
              <Link to="/NutritionInformation">
                <button className="btn1 btn2">
                  <i
                    className="fas fa-drumstick-bite"
                    style={{ marginRight: "8px" }}
                  ></i>
                  Nutrients
                </button>
              </Link>
            </div>
            <img
              src="/nutritionfacts.jpg"
              alt="Chicken image"
              className="img1 img2 img-thumbnail-fluid"
            ></img>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
