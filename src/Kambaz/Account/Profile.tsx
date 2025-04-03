import { useEffect, useState } from "react";
import { Button, Form} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div id="wd-profile-screen">
      <h2>Profile</h2>
      {profile && (
      <div>
      <Form.Control defaultValue={profile.username}
        placeholder="username" 
        id="wd-username" 
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
      <Form.Control defaultValue={profile.password} 
        placeholder="password" 
        id="wd-password" 
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/>
      <Form.Control defaultValue={profile.firstName} 
        placeholder="First Name" 
        id="wd-firstname" 
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
      <Form.Control defaultValue={profile.lastName}
        placeholder="Last Name" 
        id="wd-lastname" 
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
      <Form.Control defaultValue={profile.dob}
        type="date" 
        id="wd-dob" 
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}/>
      <Form.Control defaultValue={profile.email}
        placeholder="Email" 
        id="wd-email" 
        className="mb-2"
        onChange={ (e) => setProfile({ ...profile, email: e.target.value })}/>
      <select onChange={(e) => setProfile({ ...profile, role:  e.target.value })}
                 className="form-control mb-2" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />
      <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
      <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
        Sign out
      </Button>
    </div>
    )}
  </div>
);}
