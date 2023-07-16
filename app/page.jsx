'use static';
import Link from "next/link";

const HomePage = () => {
  const style = {
    paddingTop: "2rem",
    paddingBottom: "2rem",
  };

  return (
    <div className="mx-auto">
      <h1 className="head_text">About Obie Code</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 px-2" style={style}>
          <h3 className="small_header">Learn by practicing</h3>
          <div className="text-lg">
            Start your Python journey with ObieCode! We believe in the power of hands-on practice to enhance your learning experience. Embrace the opportunity to sharpen your Python skills through practical problem-solving!
          </div>
        </div>
        <div className="md:w-1/2 px-2" style={style}>
          <h3 className="small_header">Problem format</h3>
          <div className="text-lg">
            At ObieCode, our dedicated Admin team crafts every problem with precision. Dive into our vast collection and challenge yourself. Solve problems with custom test cases and earn grades based on your success rate. Embark on coding adventures with just a click!
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 px-2" style={style}>
          <h3 className="small_header">Developed by Duy</h3>
          <div className="text-lg">
            ObieCode is the brainchild of a talented and passionate developer, Duy Le. With expertise in JavaScript and utilizing the powerful NextJS framework, Duy has single-handedly developed this full-stack website. To ensure seamless grading, Duy has also built a robust Python API that serves as the backbone of our grading system. Duy's dedication and skill have brought ObieCode to life, delivering an impressive user experience.
          </div>
        </div>
        <div className="md:w-1/2 px-2" style={style}>
          <h3 className="small_header">Techstack</h3>
          <div className="text-lg">
            ObieCode's main website leverages NextJS and MongoDB (with Mongoose) for efficient server-side rendering. The website is deployed on Vercel for seamless performance. The Python API, powered by NodeJS, is deployed on Fly.io to ensure reliability and scalability.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;