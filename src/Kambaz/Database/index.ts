interface Assignment {
  _id: string;
  title: string;
  course: string;
  availableDate: string;
  dueDate: string;
  untilDate: string;
  points: number;
  description: string;
  displayType: string;
  assignmentGroup: string;
  submissionType: string;
  onlineEntryOption?: string;
  assignTo: string;
}

import assignments from "./assignments.json";
import courses from "./courses.json";
import enrollments from "./enrollments.json";
import modules from "./modules.json";
import users from "./users.json";
import quizzes from "./quizzes.json";
import questions from "./questions.json";
export {  assignments, courses, enrollments, modules, users, quizzes, questions };
export type { Assignment };