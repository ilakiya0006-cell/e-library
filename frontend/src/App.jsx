import {Routes,Route,Navigate,} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";

function App() {

  return (

    <Routes>

      {/* DEFAULT */}

      <Route
        path="/"
        element={<Navigate to="/register" />}
      />

      {/* AUTH */}

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* PAGES */}

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/categories"
        element={<Categories />}
      />

    </Routes>
  );
}

export default App;