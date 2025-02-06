import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                <Card.Img variant="top" src="/images/reactjs.jpg" width={200} />
                <Card.Body>
                  <Card.Title> CS1234 React JS </Card.Title>
                  <Card.Text className="wd-dashboard-course-title">
                    Full Stack software developer  </Card.Text>
                  <Button variant="primary"> Go </Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to="/Kambaz/Courses/2345/Home"
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img variant="top" src="/images/nodejs.jpg" width={200} />
                  <Card.Body>
                    <Card.Title>CS2345 Node.js Development</Card.Title>
                    <Card.Text className="wd-dashboard-course-title">
                      Server-side JavaScript Programming</Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to="/Kambaz/Courses/3456/Home"
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img variant="top" src="/images/python.jpg" width={200} />
                  <Card.Body>
                    <Card.Title>CS3456 Python Programming</Card.Title>
                    <Card.Text className="wd-dashboard-course-title">
                      Data Science and Machine Learning</Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to="/Kambaz/Courses/4567/Home"
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img variant="top" src="/images/java.jpg" width={200} />
                  <Card.Body>
                    <Card.Title>CS4567 Java Enterprise</Card.Title>
                    <Card.Text className="wd-dashboard-course-title">
                      Enterprise Application Development</Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to="/Kambaz/Courses/5678/Home"
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img variant="top" src="/images/angular.jpg" width={200} />
                  <Card.Body>
                    <Card.Title>CS5678 Angular Framework</Card.Title>
                    <Card.Text className="wd-dashboard-course-title">
                      Modern Web Application Development</Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to="/Kambaz/Courses/6789/Home"
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img variant="top" src="/images/aws.jpg" width={200} />
                  <Card.Body>
                    <Card.Title>CS6789 AWS Cloud Computing</Card.Title>
                    <Card.Text className="wd-dashboard-course-title">
                      Cloud Infrastructure and Services</Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to="/Kambaz/Courses/7890/Home"
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img variant="top" src="/images/cybersecurity.jpg" width={200} />
                  <Card.Body>
                    <Card.Title>CS7890 Cybersecurity Fundamentals</Card.Title>
                    <Card.Text className="wd-dashboard-course-title">
                      Network Security and Ethical Hacking</Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
        </Row>
            
      </div>
    </div>
);}
