import React from "react";

function ScreenWithForm({
  title,
  children,
  handleSubmit,
  buttonText,
  lineLink,
}) {
  return (
    <form className="form-auth" onSubmit={handleSubmit}>
      <h2 className="form-auth__title">{title}</h2>
      {children}
      <button type="submit" className="form-auth__submit">
        {buttonText}
      </button>
      {lineLink && lineLink}
    </form>
  );
}

export default ScreenWithForm;
