import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";
import { findQuizById } from "./client";
import { useEffect, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { IoMdBook } from "react-icons/io";
import { RiNumbersLine } from "react-icons/ri";

const exampleQuizDetails = {
  title: "Graded Quiz",
  points: 100,
  assignmentGroup: "Quizzes",
  shuffleAnswers: false,
  timeLimit: "20 Minutes",
  multipleAttempts: false,
  howManyAttempts: 1,
  showCorrectAnswers: false,
  accessCode: "",
  oneQuestionAtATime: true,
  webcamRequired: false,
  lockQuestionsAfterAnswering: false,
  published: false,
  dueDate: "2025-03-30",
  availableDate: "2025-03-15",
  availableUntilDate: "2025-03-28",
  score: {} as any,
  userAttempts: {} as any
};

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [quizDetails, setQuizDetails] = useState(exampleQuizDetails) as any;

  const boolToStr = (value: any) => (value === "true" ? "Yes" : "No");

  const handleStartQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleViewQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/previewAttempt`);
  };

  const handleEditQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`);
  };

  const handlePreviewQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizDetails = await findQuizById(qid!);
      setQuizDetails(quizDetails);
    };
    fetchQuiz();
  }, [qid]);

  const getAvailability = (quiz: any) => {
    const currentDate = new Date();

    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);
    if (String(quiz.published) === "false") {
      return false;
    }
    
    if (currentDate > availableUntilDate) {
      return false;
    } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
      return true;
    } else {
      return false;
    }

  };

  return (
    <div className="quiz-details-container">
      { currentUser.role === "FACULTY" && (
        <div className="buttons-container">
          <button className="btn btn-outline-dark" onClick={handlePreviewQuiz}>
            Preview
          </button>
          <button className="btn btn-outline-dark" onClick={handleEditQuiz}>
            <TiPencil className="me-2" />
            Edit
          </button>
        </div>
      )}


      <hr className="my-2" />

      <div className="quiz-details-content">
        <div className="quiz-name mb-2">
          <h3 className="quiz-details-header text-center">{quizDetails.title}</h3>
        </div>

        <div className="mb-2">
          <p className="quiz-description text-center" dangerouslySetInnerHTML={{ __html: quizDetails.description }}></p>
        </div>

        { currentUser.role != "STUDENT" && (
        <div className="container">
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Points:</b></div>
            <div className="col-6 text-start">{quizDetails.points}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Assignment Group:</b></div>
            <div className="col-6 text-start">{quizDetails.assignmentGroup}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Shuffle Answers:</b></div>
            <div className="col-6 text-start">{boolToStr(quizDetails.shuffleAnswers)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Time Limit:</b></div>
            <div className="col-6 text-start">{quizDetails.timeLimit}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Multiple Attempts:</b></div>
            <div className="col-6 text-start">{boolToStr(quizDetails.multipleAttempts)}</div>
          </div>
          {quizDetails.multipleAttempts && (
            <div className="row mb-2">
              <div className="col-6 text-end"><b>How Many Attempts:</b></div>
              <div className="col-6 text-start">{quizDetails.howManyAttempts}</div>
            </div>
          )}
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Show Correct Answers:</b></div>
            <div className="col-6 text-start">{boolToStr(quizDetails.showCorrectAnswers)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Access Code:</b></div>
            <div className="col-6 text-start">{quizDetails.accessCode || "None"}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>One Question at a Time:</b></div>
            <div className="col-6 text-start">{boolToStr(quizDetails.oneQuestionAtATime)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Webcam Required:</b></div>
            <div className="col-6 text-start">{boolToStr(quizDetails.webcamRequired)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Lock Questions After Answering:</b></div>
            <div className="col-6 text-start">{boolToStr(quizDetails.lockQuestionsAfterAnswering)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Due Date:</b></div>
            <div className="col-6 text-start">{quizDetails.dueDate}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Available Date:</b></div>
            <div className="col-6 text-start">{quizDetails.availableDate}</div>
          </div>
          <div className="row mb-2">
            <div className="col-6 text-end"><b>Until Date:</b></div>
            <div className="col-6 text-start">{quizDetails.availableUntilDate}</div>
          </div>
        </div>
        )}

        <div className="row mb-2">
          <div className="col-6 text-end"><b>Remaining Attempts:</b></div>
          <div className="col-6 text-start">
            {quizDetails.howManyAttempts - (quizDetails.userAttempts?.[currentUser._id] ?? 0)}
          </div>
        </div>

        {currentUser.role === "STUDENT" && (
          <div className="row mb-2">
            <div className="col-6 text-end">
              {(quizDetails.userAttempts?.[currentUser._id] ?? 0) < quizDetails.howManyAttempts &&
               getAvailability(quizDetails) &&
               String(quizDetails.published) === "true" && (
                <button className="btn btn-outline-success" onClick={handleStartQuiz}>
                  <IoMdBook className="me-2" />
                  Start Quiz
                </button>
              )}
            </div>
            <div className="col-6 text-start">
              <button className="btn btn-outline-danger" onClick={handleViewQuiz}>
                <RiNumbersLine className="me-2" />
                View Previous Results
              </button>
            </div>
          </div>
        )}

        {currentUser.role === "FACULTY" && (
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-danger" onClick={handleViewQuiz}>
              <RiNumbersLine className="me-2" />
              View Previous Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}