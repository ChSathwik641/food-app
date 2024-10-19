import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import "./Component1.css";

const Component1 = () => {
  const API_ID = "bec85b91";
  const API_KEY = "7ebe948671fd8497ffca4276549e299f";
  const [recipes, setRecipes] = useState([]);
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const searchRecipes = async (searchInput) => {
    const url = `https://api.edamam.com/search?q=${searchInput}&app_id=${API_ID}&app_key=${API_KEY}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      console.log(response.data);
      if (response.data.more) {
        setRecipes(response.data.hits);
        setValid(true);
      } else {
        console.error("invalid ingredient");
        setValid(false);
      }
    } catch (error) {
      console.error("Error fetching recipes", error);
      setRecipes([]);
      setValid(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-recipe-finder">
      <h1 className="recipe-finder-title">Recipe Finder</h1>
      <div className="d-inline-flex p-2">
        <form
          onSubmit={handleSubmit((data) => {
            console.log("came here", data);
            searchRecipes(data.searchInput);
          })}
        >
          <Controller
            control={control}
            name="searchInput"
            render={() => (
              <input
                ref={inputRef}
                value={getValues("searchInput")}
                onChange={(e) => {
                  setValue("searchInput", e.target.value);
                  setValid(true);
                  setRecipes([]);
                }}
                placeholder="Enter an ingredient"
                disabled={loading}
                className="input-recipe"
              />
            )}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-recipe-search"
          >
            <i className="bi bi-search"></i>{" "}
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div>
        {!valid && getValues("searchInput") && (
          <p className="text-danger">
            Invalid ingredient {`'${getValues("searchInput")}'`}
          </p>
        )}
      </div>
      <div id="recipe-results-finder">
        {recipes.map((hit, index) => (
          <div key={index} className="recipe-card">
            <h3 className="recipe-label">{hit.recipe.label}</h3>
            <img
              src={hit.recipe.image}
              alt={hit.recipe.label}
              className="recipe-image"
            />
            <p>Calories: {Math.round(hit.recipe.calories)}</p>
            <a
              href={hit.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-recipe-link"
            >
              View Recipe
            </a>
          </div>
        ))}
      </div>

      <Link to="/">
        <button className="btn-go-home">Home</button>
      </Link>
    </div>
  );
};

export default Component1;
