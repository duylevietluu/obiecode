'use static';

const LoadingScreen = async() => {
  return (
    <>
      <h3 className="head_text">Coding Challenges!</h3>
      <div className=" animate-pulse">
      {
        Array(10).fill().map((_, index) => (
          <div key={index} className="skeleton-loader bg-gray-200 h-9 w-[98%] mx-auto my-3"></div>
        ))
      }
      </div>
    </>
  )
}

export default LoadingScreen