'use static';
const LoadingPage = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">
        Submissions <span className="animate-pulse bg-blue-200 h-6 w-32 inline-block"></span>
      </h2>
      <table className="w-full rounded-lg overflow-hidden border border-gray-900 alt_table">
        <thead>
          <tr>
            <th className="w-[50%] text_th">Test Submitted</th>
            <th className="w-[15%] text_th">User</th>
            <th className="w-[20%] text_th">Date</th>
            <th className="w-[15%] text_th">Grade</th>
          </tr>
        </thead>
        <tbody>
          {Array(13).fill().map((_, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <div className="animate-pulse bg-blue-200 h-4 w-3/4"></div>
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="animate-pulse bg-blue-200 h-4 w-2/4"></div>
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="animate-pulse bg-blue-200 h-4 w-3/4"></div>
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="animate-pulse bg-blue-200 h-4 w-2/4"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingPage;
