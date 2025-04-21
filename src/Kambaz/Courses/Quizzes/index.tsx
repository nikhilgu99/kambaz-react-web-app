import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import ContextMenu from "./QuizContextMenu.tsx";
import { v4 as uuidv4 } from 'uuid';
import "./styles.css"
import { deleteQuiz, togglePublish, setQuizzes } from "./reducer";
import { CiSearch } from "react-icons/ci";
import * as quizzesClient from "./client.ts";
import * as coursesClient from "../client.ts";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";
import { MdOutlineRocketLaunch } from "react-icons/md";

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchQuizzesForCourse = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid!);
    dispatch(setQuizzes(quizzes));
  }; 
  
  useEffect(() => {
    fetchQuizzesForCourse();
  }, []);


  const deleteQuizandler = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    const newQuizId = uuidv4();
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuizId}/editor`);
  };

  const handlePublishQuiz = async (quizId: string) => {
    const quiz = quizzes.find((q: any) => q._id === quizId);
    if (!quiz) return;
    const newPublished = quiz.published === "true" ? "false" : "true";
    await quizzesClient.togglePublishQuiz(quizId, newPublished);
    dispatch(togglePublish(quizId));
  };


  const handleCopyQuiz = (quizId: string) => {
    console.log(`Copying quiz: ${quizId}`);
  };

  const toggleMenu = (quizId: string) => {
    setActiveMenu((prevState) => (prevState === quizId ? null : quizId));
  };

  const getAvailability = (quiz: any) => {
    const currentDate = new Date();

    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);
    if (String(quiz.published) === "false") {
      return "Closed";
    }
    if (currentDate > availableUntilDate) {
      return "Closed";
    } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
      return "Available";
    } else {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    }
  };

  return (
    <div id="wd-quizzes" className="quizzes-container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="search-container d-flex align-items-center">
          <CiSearch className="search-icon me-2" />
          <input
            type="text"
            id="wd-search-quiz"
            placeholder="Search for Quiz"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {currentUser.role === "FACULTY" && (
          <button
            id="wd-add-quiz-btn"
            className="btn btn-lg btn-danger"
            onClick={handleClick}
          >
            + Quiz
          </button>
        )}
      </div>
      <hr></hr>
      <div className="quiz-header">
        <FaCaretDown className="me-2 fs-6" />
        <span>Quizzes</span>
      </div>

      {quizzes
        .filter((quiz: any) => quiz.course === cid).length === 0 && currentUser.role === "FACULTY" && (
        <div className="alert alert-info mt-2">
          No quizzes, click the add quiz (+ Quiz) button.
        </div>
      )}

      <ul id="wd-quiz-list" className="list-group rounded-0 wd">
        {quizzes
          .filter((quiz: any) => quiz.course === cid)
          .filter((quiz: any) =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((quiz: any) => (
            <li key={quiz._id} className="list-group-item py-3 px-3">
              <div className="d-flex align-items-center justify-content-between">
              <MdOutlineRocketLaunch className="me-3 fs-3 text-success" />
                <div className="flex-grow-1">
                  <a
                    href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="wd-quiz-link fw-bold text-dark text-decoration-none"
                  >
                    <div className="wd-quiz-name">{quiz.title}</div>
                  </a>

                  <div className="wd-quiz-info">
                    <p className="mb-1 text-muted">
                      <b>Availability</b>: {getAvailability(quiz)} &nbsp; | &nbsp;
                      <b>Due</b>: {quiz.dueDate} &nbsp; | &nbsp; {quiz.points} points &nbsp; | &nbsp;
                      <b>Number of questions</b>: {quiz.numberOfQuestions}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  {String(quiz.published) === "false" ? (
                    <span className="me-2" style={{ fontSize: "20px" }}>🚫</span>
                  ) : (
                    <FaCheckCircle
                      className="me-2"
                      style={{ fontSize: "20px", color: "#28a745" }}
                    />
                  )}
                  {currentUser.role === "FACULTY" && (
                    <div>
                      <button
                        className="btn"
                        onClick={() => toggleMenu(quiz._id)}
                      >
                        <IoEllipsisVertical className="fs-4" />
                      </button>

                      <ContextMenu
                        quizId={quiz._id}
                        cid={cid}
                        isActive={activeMenu === quiz._id}
                        isPublished={String(quiz.published) === "false"}
                        onDelete={deleteQuizandler}
                        togglePublish={handlePublishQuiz}
                        onCopy={handleCopyQuiz}
                        onClose={() => setActiveMenu(null)}
                      />
                    </div>
                  )}
                </div>

                {currentUser.role === "STUDENT" && (
                  <div className="d-flex flex-column align-items-end">
                    {quiz.score && quiz.score[currentUser._id] !== undefined ? (
                      <p className="mb-1 text-muted">
                        <b>Score</b>: {
                          Array.isArray(quiz.score[currentUser._id]) && quiz.score[currentUser._id].length > 0
                            ? quiz.score[currentUser._id][quiz.score[currentUser._id].length - 1] + "/" + quiz.points
                            : "Not attempted yet"
                        }
                      </p>
                    ) : (
                      <p className="mb-1 text-muted">
                        <b>Score</b>: {"Not attempted yet"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}