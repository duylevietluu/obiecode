'use static';
import Link from "next/link";

const HomePage = () => {
  const style = {
    paddingTop: "2rem",
    paddingBottom: "2rem",
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="head_text">About Obie Code</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4" style={style}>
          <h3 className="small_header">Learn by practicing</h3>
          <div className="text-lg">
            Start your coding journey by solving simple Python problems! Our platform offers 10+ challenges to help you learn and grow. Don't be afraid to try and fail, that's how you learn. Have fun and happy hacking!
          </div>
        </div>
        <div className="md:w-1/2 p-4" style={style}>
          <h3 className="small_header">Problem format</h3>
          <div className="text-lg">
            Each problem is written by the Admin team. You can try solving by clicking on{" "}
            <Link href="/tests" className="link_color">
              Problems
            </Link>
            . Each problem has a number of test cases, and you get grades based on the percentage of the test cases passed.
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4" style={style}>
          <h3 className="small_header">Developed by Duy</h3>
          <div className="text-lg">
            This is the result of{" "}
            <a className="link_color" href="https://github.com/OberlinCollaborativeCodingWinterTerm/winter-term-project-webcodelearning" target="#">
              Duy Le's Winter Term project
            </a>
            . I have developed this website full-stack by JavaScript and NextJS, and deployed this website to the Internet using{" "}
            <a className="link_color" href="https://fly.io/" target="#">
              Vercel
            </a>
            .
          </div>
        </div>
        <div className="md:w-1/2 p-4" style={style}>
          <h3 className="small_header">Special thanks</h3>
          <div className="text-lg">
            Thank you to the course{" "}
            <a className="link_color" href="https://fullstackopen.com/en" target="#">
              Full Stack Open
            </a>{" "}
            for teaching me the basics of full-stack developing, which grants me knowledge to build this whole website. And thank you to{" "}
            <a className="link_color" href="https://github.com/Jaagrav/CodeX-API" target="#">
              Jaagrav's CodeX API
            </a>
            , which I used for executing Python code in the server.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;