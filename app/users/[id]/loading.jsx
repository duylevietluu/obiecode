'use static'

const LoadingScreen = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row animate-pulse">
        <div className="xl:w-5/12">
          <div className="skeleton-loader bg-gray-200 h-10 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
          <div className="skeleton-loader bg-gray-200 h-8 w-2/3 mb-4 mx-auto"></div>
        </div>
        <div className="hidden xl:block xl:w-7/12">
          <div className="skeleton-loader bg-gray-200 h-full w-full"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen