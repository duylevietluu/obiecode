'use static';

const LoadingScreen = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row animate-pulse">
        <div className="md:w-5/12">
          <div className="skeleton-loader bg-gray-200 h-10 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/4 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-full mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-full mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-full mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-full mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-full mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-full mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-full mb-4 mx-auto"></div>
        </div>
        <div className="md:w-7/12 md:px-10">
          <div className="skeleton-loader bg-gray-200 h-[70vh] w-full"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen