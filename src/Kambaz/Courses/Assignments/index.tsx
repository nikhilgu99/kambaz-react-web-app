import { Button, Col, ListGroup, Modal, Row } from "react-bootstrap";
import { BiPlus, BiSearch } from "react-icons/bi";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaCaretDown } from "react-icons/fa6";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { deleteAssignment } from "./reducer";
import * as courseClient from "../client";
import * as assignmentClient from "./client";

export default function Assignments() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const [assignments, setAssignments] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAssignemntId, setDeleteAssignmentId] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchAssignments = async () => {
    try {
      const assignments = await courseClient.findAssignmentsForCourse(
        cid as string,
        searchText
      );
      setAssignments(assignments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [searchText]);

  const openDeleteModal = (assignment: any) => {
    setShowDeleteModal(true);
    setDeleteAssignmentId(assignment._id);
  };

  const handleClose = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    await assignmentClient.deleteAssignment(deleteAssignemntId);
    dispatch(deleteAssignment({ assignmentId: deleteAssignemntId }));
    fetchAssignments();
    handleClose();
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
            type="text"
            placeholder="Search..."
            id="wd-search-assignment"
            className="form-control"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div>
        {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
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
              .map((assignment: any) => (
                <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex align-items-center">
                  <BsGripVertical className="fs-3" />
                  <MdOutlineAssignment className="me-3 fs-3 text-success" />

                  <Row>
                    <Col sm={12} className="fw-bold">
                    {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") ? (
                      <Link to={`/Kambaz/Courses/${cid || ""}/Assignments/${assignment._id}`} className="text-decoration-none text-dark">{assignment.title}</Link>
                    ) : (
                      <>{assignment.title}</>
                    )}
                      </Col>
                    <Col sm={12}>
                      <Link to="#" className="text-decoration-none text-danger">
                        Multiple Modules
                      </Link>{" "}
                      | <span className="fw-bold">Not avaliable until</span>
                      {" "}
                      {new Date(assignment.availableDate ?? "").toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}{" "} |
                    </Col>
                    <Col sm={12}>
                      <span className="fw-bold">Due</span>
                      {" "}
                      {new Date(assignment.dueDate ?? "").toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}{" "} | {assignment.points} pts
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
          <Button variant="secondary" onClick={ handleClose }>
            No
          </Button>
          <Button
            variant="danger"
            onClick={ handleDelete }
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}