import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { BiPlus, BiSearch } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaCaretDown } from "react-icons/fa6";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { Link, useParams } from "react-router";
import * as db from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const courses = db.courses;
  const course = courses.find((course) => course._id === cid);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAssignemntId, setDeleteAssignmentId] = useState("");

  const openDeleteModal = (assignment: any) => {
    setShowDeleteModal(true);
    setDeleteAssignmentId(assignment._id);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

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
        {currentUser.role === "FACULTY" && (
          <>
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-group-btn">
              <BiPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Group
            </Button>
            <Link to={`/Kambaz/Courses/${cid}/Assignments/${uuidv4()}`}>
              <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
                <BiPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
              </Button>
            </Link>
          </>
        )}
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
                    <LessonControlButtons
                      showDeleteTrash={true}
                      onDelete={() => {
                        openDeleteModal(assignment);
                      }}
                    />
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
      </ListGroup>
      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete this assignment?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteAssignment(deleteAssignemntId));
              handleClose();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}