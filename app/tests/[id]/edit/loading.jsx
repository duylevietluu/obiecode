'use static'

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      <p className="text-gray-900 text-xl font-bold mt-4">Loading...</p>
    </div>
  );
};

export default LoadingScreen