import React from "react";
import { useSelector } from "react-redux";


function Homepage() {
  const token = useSelector((state) => state.auth.token);
  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      {token && <p>Your token: {token}</p>}
    </div>
  );
}

export default Homepage;
