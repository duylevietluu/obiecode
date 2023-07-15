'use client';

const PostError = ({ error, reset, params }) => {
  return (
    <div>
      <h2 className="error_text">Something went wrong! </h2>
      <div className="pb-4 max-w-3xl">It is possible that the ids are malformatted, or that the posts you are looking for are unavailable!</div>
      <button className="test_link" onClick={reset}>Click here to try again</button>
    </div>
  )
}

export default PostError
