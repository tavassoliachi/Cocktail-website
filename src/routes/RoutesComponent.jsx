import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Homepage from "../pages/homepage";
import Drink from "../pages/drink";
import Search from "../pages/search";
import Login from "../pages/login/login";
import MyDrinks from "../pages/myDrinks/MyDrinks";
import MyDrink from "../pages/myDrinks-drink";
import Register from "../pages/register/register";
export default function RoutesComponent() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route path="/drink" element={<Drink />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route exact path="/myDrinks" element={<MyDrinks />} />
      <Route path="/myDrinks/drink" element={<MyDrink />} />
    </Routes>
  );
}
