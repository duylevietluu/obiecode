'use static';

const LoadingPage = () => {
  return (
    <>
      <h3 className="text-3xl font-bold mb-4">
        Submission by Coder{" "}
        <span className="animate-pulse bg-gray-200 h-6 w-24 inline-block"></span> for Challenge{" "}
        <span className="animate-pulse bg-gray-200 h-6 w-24 inline-block"></span>
      </h3>
      <div className="flex flex-col md:flex-row">
        {/* COL 1: USER INFO */}
        <div className="md:w-5/12">
          <div className="font-bold">
            Grade: <span className="animate-pulse bg-gray-200 h-4 w-12 inline-block"></span>
          </div>
          <div>
            <span className="font-bold">Time submitted: </span>
            <span className="animate-pulse bg-gray-200 h-4 w-32 inline-block"></span>
          </div>
          <div className="mt-5">
            {
              Array(8).fill().map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 h-9 w-[80%] my-3 mr-10"></div>
              ))
            }
          </div>
        </div>

        {/* COL 2: */}
        <div className="md:w-7/12">
          <div className="animate-pulse bg-gray-200 h-[70vh] w-full"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
