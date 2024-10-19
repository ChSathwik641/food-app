import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "./Component2.css";

const Component2 = () => {
  const API_KEY = "KBpKW8Z6tRTW4kIt8kQv8EYI6QeADIcwaQsfqyO0";
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const { handleSubmit, getValues, setValue, control } = useForm({
    mode: "onSubmit",
  });

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const searchNutrition = async (searchInput) => {
    setError(null);
    setNutrition(null);
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
      searchInput
    )}&api_key=${API_KEY}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      console.log("Response from API: ", response);
      if (response.data.foods && response.data.foods.length > 0) {
        setNutrition(response.data.foods[0]);
      } else {
        setError("No data was found for this food item.");
      }
    } catch (error) {
      console.error("Error in fetching nutrition", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nutrition-container">
      <h1 className="nutrition-title">Nutrition Information</h1>
      <form
        className="nutrition-form"
        onSubmit={handleSubmit((data) => {
          console.log("Form submitted: ", data);
          searchNutrition(data.searchInput);
        })}
      >
        <Controller
          control={control}
          name="searchInput"
          render={() => (
            <input
              className="nutrition-input"
              value={getValues("searchInput")}
              onChange={(e) => {
                setValue("searchInput", e.target.value);
                setNutrition(null);
              }}
              ref={inputRef}
              disabled={loading}
              placeholder="Enter a food item"
            />
          )}
        />
        <button type="submit" disabled={loading} className="nutrition-button">
          <i className="bi bi-search"></i>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {nutrition && (
        <div className="nutrition-info">
          <h3 className="nutrition-description">{nutrition.description}</h3>
          <div className="nutrition-nutrients">
            {nutrition.foodNutrients &&
              nutrition.foodNutrients.map((nutrient, index) => (
                <div key={`${nutrient.nutrientName} ${index}`}>
                  <ul className="nutrient-list">
                    <li className="nutrient-item">
                      {nutrient.nutrientName}: {nutrient.value}{" "}
                      {nutrient.unitName}
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      <Link to="/">
        <button className="back-button">Home</button>
      </Link>
    </div>
  );
};

export default Component2;
