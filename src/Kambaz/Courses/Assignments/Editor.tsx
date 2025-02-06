import { Button, Card, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div className="p-4 pt-0">
      <Form>
        <Form.Group controlId="assignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1" />
        </Form.Group>

        <Card className="p-3 mt-3" contentEditable>
          <p>
            The assignment is{" "}
            <span className="text-danger">available online</span>
          </p>
          <p>
            Submit a link to the landing page of your Web application running on{" "}
            <a href="#">Netlify</a>.
          </p>
          <p>The landing page should include the following:</p>
          <ul>
            <li>Your full name and section</li>
            <li>Links to each of the lab assignments</li>
            <li>
              Link to the Kanbas application
            </li>
            <li>Links to all relevant source code repositories</li>
          </ul>
          <p>
            The Kanbas application should include a link to
            navigate back to the landing page.
          </p>
        </Card>

        <Row className="mt-3">
          <Col className="d-flex align-items-center">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="points" className="m-0">
                Points
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Form.Group>
              <Form.Control id="points" type="number" defaultValue="100" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex align-items-center">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="assignmentGroup" className="m-0">
                Assignment Group
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Form.Group>
              <Form.Select id="assignmentGroup" defaultValue="ASSIGNMENTS">
                <option>ASSIGNMENTS</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex align-items-center">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="displayGrade" className="m-0">
                Display Grade as
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Form.Group>
              <Form.Select id="displayGrade" defaultValue="Percentage">
                <option>Percentage</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label htmlFor="submissionType" className="m-0">
                Submission Type
              </Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Card className="p-3">
              <Form.Select id="submissionType" defaultValue="Online">
                <option>Online</option>
              </Form.Select>

              <Form.Group className="mt-3 d-flex flex-column gap-2">
                <Form.Label className="fw-bold">
                  Online Entry Options
                </Form.Label>
                <Form.Check type="checkbox" label="Text Entry" />
                <Form.Check
                  type="checkbox"
                  label="Website URL"
                  defaultChecked
                />
                <Form.Check type="checkbox" label="Media Recordings" />
                <Form.Check type="checkbox" label="Student Annotation" />
                <Form.Check type="checkbox" label="File Uploads" />
              </Form.Group>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="d-flex">
            <div className="d-flex justify-content-end flex-grow-1">
              <Form.Label className="m-0">Assign</Form.Label>
            </div>
          </Col>
          <Col sm={8}>
            <Card className="p-3">
              <Form.Group controlId="assignTo">
                <Form.Label className="fw-bold">Assign to</Form.Label>
                <Form.Select defaultValue="Everyone">
                  <option>Everyone</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="dueDate" className="mt-3">
                <Form.Label className="fw-bold">Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  defaultValue="2024-05-13T23:59"
                />
              </Form.Group>

              <Row className="mt-3">
                <Col>
                  <Form.Group controlId="availableFrom">
                    <Form.Label className="fw-bold">Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      defaultValue="2024-05-06T12:00"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="until">
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control type="datetime-local" />
                  </Form.Group>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}