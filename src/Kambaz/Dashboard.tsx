import { Link } from "react-router-dom";
import { Button, Card, Col, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addEnrollment, deleteEnrollment } from "./Courses/enrollmentsReducer";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";

export default function Dashboard(
  {
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
  }: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }
) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [myCourses, setMyCourses] = useState<any[]>([]);

  const toggleEnrollment = async (course: any) => {
    const enrollment = enrollments.find(
      (enrollment: any) => enrollment.course === course._id && enrollment.user === currentUser._id
    );
    if (enrollment) {
      await userClient.deleteEnrollment(enrollment._id);
      dispatch(deleteEnrollment({ enrollmentId: enrollment._id }));
    } else {
      const newId = uuidv4();
      await userClient.addEnrollment({
        _id: newId,
        user: currentUser._id,
        course: course._id,
      });
      dispatch(
        addEnrollment({
          _id: newId,
          user: currentUser._id,
          course: course._id,
        })
      );
    }
  };

  const fetchMyCourses = async () => {
    try {
      const myCourses = await userClient.findMyCourses();
      setMyCourses(myCourses);
    } catch (error) {
      console.error(error);
    }
  };

  const isUserEnrolled = (course: any) =>
    myCourses.find((myCourse: any) => myCourse._id === course._id);

  useEffect(() => {
    fetchMyCourses();
  }, [currentUser, courses, enrollments]);
  useEffect(() => {
    setUserCourses(showAllCourses ? courses : myCourses);
  }, [showAllCourses, courses, myCourses]);

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
      <>
        <h5>
          New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse} >
                Add 
            </button>
            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
                Update
            </button>
        </h5>
        <br />
        <FormControl value={course.name} className="mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
        <FormControl as="textarea" value={course.description} rows={3}
          onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
        <hr />
        </>
      )}
      {currentUser.role === "STUDENT" && (
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAllCourses(!showAllCourses)}>
            Enrollments
          </Button>
        </div>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({userCourses.length})</h2> <hr />
      <div className="row" id="wd-dashboard-courses">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {userCourses.map((course) => (
             <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course.name + course._id}>
             <Card>
               <Link to={`/Kambaz/Courses/${course._id}/Home`}
                     className="wd-dashboard-course-link text-decoration-none text-dark" >
                 <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                 <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name} </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </Card.Text>
                  <Button variant="primary"> Go </Button>
                  {currentUser.role === "FACULTY" && (
                    <>
                      <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button>
                    </>
                  )}
                  {currentUser.role === "STUDENT" && (
                      <Button
                        className={`btn-${
                          isUserEnrolled(course) ? "danger" : "success"
                        } btn float-end`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleEnrollment(course);
                        }}
                      >
                        {isUserEnrolled(course) ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
                 </Card.Body>
               </Link>
             </Card>
           </Col>
          ))}
        </div>
      </div>
    </div>
);}
