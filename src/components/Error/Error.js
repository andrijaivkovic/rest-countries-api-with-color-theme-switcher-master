const ErrorMessage = ({ error }) => {
  return (
    <div className="error">
      <h3>🛑 Error: </h3>
      <p>&nbsp;{error}</p>
    </div>
  );
};

export default ErrorMessage;
