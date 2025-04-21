import CourseNavigation from "./Navigation";
import Modules from "./Modules"
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as courseClient from "./client";
import * as enrollmentsClient from "../client";
import { useSelector } from "react-redux";
import QuizList from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import QuizPreview from "./Quizzes/Editor/Preview";
import QuizPreviewAttempt from "./Quizzes/Editor/Preview/previewAttempt";
import QuizDetails from "./Quizzes/QuizDetails";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [users, setUsers] = useState<any[]>([]);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(true);

  const isUserEnrolled = async (courseId: any) => {
    if (currentUser?.role === "ADMIN") {
      return true;
    }
    try {
      const enrollment = await enrollmentsClient.findEnrollmentForUser(
        courseId
      );
      setIsEnrolled(enrollment.data ? true : false);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchUsers = async () => {
    try {
      const users = await courseClient.findUsersForCourse(cid as string);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchUsers();
    isUserEnrolled(cid);
  }, [cid]);
  
  return (
    <>
    {isEnrolled ? (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
            <CourseNavigation />
        </div>
      <div className="flex-fill">
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          <Route path="People" element={<PeopleTable users={users}/>} />

          <Route path="Quizzes" element={<QuizList />} />
          <Route path="Quizzes/:qid/editor" element={<QuizEditor />} />
          <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
          <Route path="Quizzes/:qid/previewAttempt" element={<QuizPreviewAttempt />} />
          <Route path="Quizzes/:qid" element={<QuizDetails />} />
        </Routes>
      </div></div>
    </div>
    ) : (
      <Navigate to="/Kambaz/Dashboard" />
    )}
  </>
  );
}
  