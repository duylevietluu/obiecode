const Grade = ({grade, loggedUser}) => {
  if (grade || grade === 0) {
    // return red score if failed <40, yellow if not full <100, green if full
    const color = grade < 40 ? "text-red-600" : grade < 100 ? "text-yellow-600" : "text-green-600";
    return (
      <span className={`mb-4 ${color}`}>{grade}</span>
    )
  }
  // notify user to login or submit
  if (loggedUser) {
    return (
      <span className="mb-4 text-red-500">Not submitted yet!</span>
    )
  }
  return (
    <span className="mb-4 text-red-500">Login to submit!</span>
  )
}

export default Grade;