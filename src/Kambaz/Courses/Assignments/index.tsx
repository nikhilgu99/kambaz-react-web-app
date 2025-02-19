import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { BiPlus, BiSearch } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaCaretDown } from "react-icons/fa6";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { Link, useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  const courses = db.courses;
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-assignments">
      <div
        id="wd-assignments-header"
        className="d-flex justify-content-between align-items-center"
      >
        <div className="input-group w-auto">
          <span className="input-group-text">
            <BiSearch />
          </span>
          <input
            placeholder="Search..."
            id="wd-search-assignment"
            className="form-control"
          />
        </div>
        <div>
          <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
            <BiPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
          <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
            <BiPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
        </div>
      </div>
      <br /><br />
      <ListGroup className="rounded-0" id="wd-assignment-list">
          <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <FaCaretDown className="me-2 fs-6" />
              <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentControlButtons />
            </div>

            <ListGroup className="wd-lessons rounded-0">
              {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                  <BsGripVertical className="fs-3" />
                  <MdOutlineAssignment className="me-3 fs-3 text-success" />

                  <Row>
                    <Col sm={12} className="fw-bold">
                      <Link to={`/Kambaz/Courses/${course?._id}/Assignments/${assignment._id}`} className="text-decoration-none text-dark">{assignment.title}</Link>
                    </Col>
                    <Col sm={12}>
                      <Link to="#" className="text-decoration-none text-danger">
                        Multiple Modules
                      </Link>{" "}
                      | <span className="fw-bold">Not avaliable until</span> May 6th at 12:00am |
                    </Col>
                    <Col sm={12}>
                      <span className="fw-bold">Due</span> May 13th at 11:59pm | 100 pts
                    </Col>
                  </Row>
                  <div className="wd-assignment-buttons flex-grow-1">
                    <LessonControlButtons />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
      </ListGroup>
    </div>
  );
}