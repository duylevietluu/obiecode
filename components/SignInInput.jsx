const SignInInput = ({ title, name, type }) => {
  return (
    <div className="mb-4">
      <label className="text-gray-700">
        {title}
      </label>
      <input name={name} type={type} placeholder={title} className="signin_input" required />
    </div>
  )
}

export default SignInInput;