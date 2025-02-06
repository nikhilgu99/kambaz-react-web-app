import { Button, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h2>Profile</h2>
      <Form.Control defaultValue="alice" 
        placeholder="username" 
        id="wd-username" 
        className="mb-2"/>
      <Form.Control defaultValue="123" 
        placeholder="password" 
        id="wd-password" 
        className="mb-2"/>
      <Form.Control defaultValue="Alice" 
        placeholder="First Name" 
        id="wd-firstname" 
        className="mb-2"/>
      <Form.Control defaultValue="Wonderland" 
        placeholder="Last Name" 
        id="wd-lastname" 
        className="mb-2"/>
      <Form.Control defaultValue="alice" 
        placeholder="username" 
        id="wd-username" 
        className="mb-2"/>
      <Form.Control
        type="datetime-local" 
        id="wd-dob" 
        className="mb-2"/>
      <Form.Control defaultValue="alice@wonderland.com" 
        placeholder="Email" 
        id="wd-email" 
        className="mb-2"/>
      <Form.Control as="select" defaultValue="USER" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </Form.Control>
      <br />
      <Link to="/Kambaz/Account/Signin">
        <Button variant="danger" className="w-100">Sign out</Button>
      </Link>
    </div>
);}
