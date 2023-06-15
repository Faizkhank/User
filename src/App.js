import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import User from "./Component/User";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user/:id" element={<User />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
