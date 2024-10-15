import React from "react";
import { Link } from "react-router-dom";

const Component2 = () => {
  return (
    <div>
      <p>This is Component 2</p>
      <Link to="/">
        {" "}
        {/* Link to go back to default app */}
        <button>Go to Default App</button>
      </Link>
    </div>
  );
};

export default Component2;
