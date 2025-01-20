import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer  </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/nodejs.jpg" width={200} />
            <div>
              <h5> CS2345 Node.js Development </h5>
              <p className="wd-dashboard-course-title">
                Server-side JavaScript Programming </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/python.jpg" width={200} />
            <div>
              <h5> CS3456 Python Programming </h5>
              <p className="wd-dashboard-course-title">
                Data Science and Machine Learning </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/java.jpg" width={200} />
            <div>
              <h5> CS4567 Java Enterprise </h5>
              <p className="wd-dashboard-course-title">
                Enterprise Application Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/angular.jpg" width={200} />
            <div>
              <h5> CS5678 Angular Framework </h5>
              <p className="wd-dashboard-course-title">
                Modern Web Application Development </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/aws.jpg" width={200} />
            <div>
              <h5> CS6789 AWS Cloud Computing </h5>
              <p className="wd-dashboard-course-title">
                Cloud Infrastructure and Services </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7890/Home"
                className="wd-dashboard-course-link" >
            <img src="/images/cybersecurity.jpg" width={200} />
            <div>
              <h5> CS7890 Cybersecurity Fundamentals </h5>
              <p className="wd-dashboard-course-title">
                Network Security and Ethical Hacking </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
