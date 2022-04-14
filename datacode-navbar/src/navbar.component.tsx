import { MuiButton } from "@datacode/styleguide";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { navigations } from "./helper";
import './navbar.css';

export default function Navbar(props) {
  return (
    <Router>
      <div className="flex items-center justify-between h-16 px-6 text-white bg-primary">
        <div className="flex items-center justify-between">
          {navigations.map((navigation) => {
            return (
              <NavLink key={navigation.href} className={({ isActive }) => isActive ? "is-active p-6" : "p-6"} to={navigation.href}>
                {navigation.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </Router>
  );
}
