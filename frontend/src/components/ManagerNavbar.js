import React from "react";
import { Link } from "react-router-dom";
/**
 <Route path="/trackItem" element={<TrackItem />} />
      <Route path="/changePrice" element={<ChangePrice />} />
      <Route path="/manager" element={<ManagerLogin />} />
 */
function ManagerNavbar() {
  return (
    <div>
      <ul className="side-menu top">
        <li className="active">
          <Link to="/manager">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard manager</span>
          </Link>
        </li>
        <li className="active">
          <Link to="/changePrice">
            <i className="bx bxs-dashboard"></i>
            <span className="text">changePrice</span>
          </Link>
        </li>
        <li className="active">
          <Link to="/trackItem">
            <i className="bx bxs-dashboard"></i>
            <span className="text">trackItem</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ManagerNavbar;
