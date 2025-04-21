import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as courseClient from "./client";

export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { pathname } = useLocation();
  const { cid } = useParams();
  const [courses, setCourses] = useState<any[]>([]);

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      setCourses(allCourses);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link to={`/Kambaz/Courses/${course?._id}/${link}`} id={`wd-course-${link.toLowerCase}-link`}
        className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
          { link }
        </Link>
      ))}
    </div>
  );
}
