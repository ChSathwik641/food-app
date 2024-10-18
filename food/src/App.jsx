import React from "react";
import "./App.css";
import Component1 from "./Components/Component1";
import Component2 from "./Components/Component2";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/RecipeFinder",
      element: <Component1 />,
    },
    {
      path: "/NutritionInformation",
      element: <Component2 />,
    },
  ]);

  return (
    <RouterProvider router={router}>
      <div className="App">
        <Home />
      </div>
    </RouterProvider>
  );
}

export default App;
