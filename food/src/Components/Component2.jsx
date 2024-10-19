import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

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
  const searchNutrion = async (searchInput) => {
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
      console.error("Error in fetching nutrion", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h1>Nutrition Info</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("came here", data);
          searchNutrion(data.searchInput);
        })}
      >
        <Controller
          control={control}
          name="searchInput"
          render={() => (
            <input
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
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary"
        >
          <i className="bi bi-search"></i>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {nutrition && (
        <div>
          <h3>{nutrition.description}</h3>
          <div>
            {nutrition.foodNutrients &&
              nutrition.foodNutrients.map((nutrient, index) => (
                <div key={`${nutrient.nutrientName} ${index}`}>
                  <ul className="pagination">
                    <li className="disabled">
                      {nutrient.nutrientName} : {nutrient.value}{" "}
                      {nutrient.unitName}
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      <Link to="/">
        {" "}
        {/* Link to go back to default app */}
        <button>Go to Default App</button>
      </Link>
    </div>
  );
};

export default Component2;
