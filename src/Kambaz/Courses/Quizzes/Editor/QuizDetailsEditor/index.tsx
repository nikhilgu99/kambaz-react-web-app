import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addQuiz, togglePublish, updateQuiz } from "../../reducer";
import { v4 as uuidv4 } from "uuid";
import * as coursesClient from "../../../client";
import * as quizzesClient from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleChange = (e: any) => {
    setQuiz({ ...quiz, [e.target.id]: e.target.value });
  };

  const handleCheckboxChange = (e: any) => {
    setQuiz({ ...quiz, [e.target.id]: e.target.checked });
  };

  const handleSave = async () => {
    if (existingQuiz) {
      await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    } else {
      const newQuiz = { ...quiz, _id: uuidv4(), course: cid };
      const createdQuiz = await coursesClient.createQuizzesForCourse(cid!, newQuiz);
      dispatch(addQuiz(createdQuiz));
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${createdQuiz._id}`);
    }
    
  };

  const handlePublishQuiz = async (quizId: string) => {
    const quiz = quizzes.find((q: any) => q._id === quizId);
    if (!quiz) return;
    const newPublished = quiz.published === "true" ? "false" : "true";
    await quizzesClient.togglePublishQuiz(quizId, newPublished);
    dispatch(togglePublish(quizId));
  };
  
  const handleSaveAndPublish = async () => {
    if (existingQuiz) {
      await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
      if (qid) {
        await handlePublishQuiz(qid);
      }
    } else {
      const newQuiz = { ...quiz, _id: uuidv4(), course: cid };
      const createdQuiz = await coursesClient.createQuizzesForCourse(cid!, newQuiz);
      dispatch(addQuiz(createdQuiz));
      await handlePublishQuiz(newQuiz._id);
    }
    
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  }

  return (
    <div id="wd-quiz-editor" className="p-4 bg-light border rounded">
      <h2 className="mb-4">Quiz Editor</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">Quiz Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={quiz.title}
            onChange={handleChange}
            placeholder="Enter quiz title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <ReactQuill
            value={quiz.description}
            onChange={(value) => setQuiz({ ...quiz, description: value })}
            className="mb-3"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="quizType">Quiz Type</Form.Label>
          <Form.Select
            id="quizType"
            value={quiz.quizType}
            onChange={handleChange}
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="assignmentGroup">Assignment Group</Form.Label>
          <Form.Select
            id="assignmentGroup"
            value={quiz.assignmentGroup}
            onChange={handleChange}
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="points">Points</Form.Label>
          <Form.Control
            type="number"
            id="points"
            value={quiz.points}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="timeLimit">Time Limit (minutes)</Form.Label>
          <Form.Control
            type="number"
            id="timeLimit"
            value={quiz.timeLimit ? Number(quiz.timeLimit.split(" ")[0]) : 20}
            onChange={(e) =>
              setQuiz({ ...quiz, timeLimit: `${e.target.value} Minutes` })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="shuffleAnswers"
            label="Shuffle Answers"
            checked={String(quiz.shuffleAnswers) === "true"}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="multipleAttempts"
            label="Allow Multiple Attempts"
            checked={String(quiz.multipleAttempts) === "true"}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        {quiz.multipleAttempts && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="howManyAttempts">How Many Attempts</Form.Label>
          <Form.Control
            type="number"
            id="howManyAttempts"
            min={1}
            value={quiz.howManyAttempts}
            onChange={handleChange}
          />
        </Form.Group>
      )}

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="showCorrectAnswers"
            label="Show Correct Answers"
            checked={String(quiz.showCorrectAnswers) === "true"}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="accessCode">Access Code</Form.Label>
          <Form.Control
            type="text"
            id="accessCode"
            value={quiz.accessCode}
            onChange={handleChange}
            placeholder="Enter access code"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="oneQuestionAtATime"
            label="One Question at a Time"
            checked={String(quiz.oneQuestionAtATime) === "true"}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="webcamRequired"
            label="Webcam Required"
            checked={String(quiz.webcamRequired) === "true"}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="lockQuestionsAfterAnswering"
            label="Lock Questions After Answering"
            checked={String(quiz.lockQuestionsAfterAnswering) === "true"}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="dueDate">Due Date</Form.Label>
          <Form.Control
            type="datetime-local"
            id="dueDate"
            value={quiz.dueDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="availableDate">Available From</Form.Label>
          <Form.Control
            type="datetime-local"
            id="availableDate"
            value={quiz.availableDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="availableUntilDate">Available Until</Form.Label>
          <Form.Control
            type="datetime-local"
            id="availableUntilDate"
            value={quiz.availableUntilDate}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mt-4 d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            Cancel
          </Button>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="primary" onClick={handleSaveAndPublish}>
              Save and Publish
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}