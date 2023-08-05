const Button = ({ children, type, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${type ? `button__${type}` : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
