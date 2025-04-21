import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Users from "./Users";
import { Link } from "react-router";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/"        element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />} />
              <Route path="/Signin"  element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup"  element={<Signup />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Users/:uid" element={<Users />} />
            </Routes>
          </td>
        </tr>
      </table>
      <div className="position-fixed bottom-0 end-0 p-1 text-end">
        <p className="d-inline me-3">Nikhil Gupta - CS5610 Section 01</p>
        <Link to={`https://github.com/nikhilgu99/kambaz-react-web-app/tree/project`} className="text-decoration-none text-dark me-3">[React UI Repo]</Link>
        <Link to={`https://github.com/nikhilgu99/kambaz-node-server-app/tree/project`} className="text-decoration-none text-dark">[Node API Repo]</Link>
      </div>
    </div>
  );
}
