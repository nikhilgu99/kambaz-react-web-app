import { useEffect, useState } from "react";
import QuizDetails from "./QuizDetailsEditor";
import QuizQuestions from "./QuizQuestions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const QuizEditor = () => {
  const [activeTab, setActiveTab] = useState("details");

  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizReducer.quizzes);
  const existingQuiz = qid ? quizzes.find((q: any) => q._id === qid) : null;

  const [quiz, setQuiz] = useState({
    title: "Default",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    points: 0,
    shuffleAnswers: true,
    timeLimit: "20 Minutes",
    multipleAttempts: false,
    howManyAttempts: 1,
    numberOfQuestions: 0,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    availableUntilDate: "",
    course: cid,
    published: false,
    score: {},
    userAttempts: {}
  });

  useEffect(() => {
    if (existingQuiz) {
      setQuiz(existingQuiz);
    }
  }, [existingQuiz]);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <div></div>
        <div className="d-flex align-items-center">
          <span className="me-2">
            Points <strong>{quiz.points}</strong>
          </span>
          <div className="vr mx-3"></div>
          <span>{quiz.published == true ? "Published" : "Not Published"}</span>
        </div>
      </div>

      <div className="d-flex border-bottom mb-3">
        <button
          className={`btn btn-link text-decoration-none ${activeTab === "details" ? "fw-bold border-bottom border-dark" : "text-muted"}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={`btn btn-link text-decoration-none ms-3 ${activeTab === "questions" ? "fw-bold border-bottom border-dark" : "text-muted"}`}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </button>
      </div>

      {activeTab === "details" ? <QuizDetails /> : <QuizQuestions />}
    </div>
  );
};

export default QuizEditor;