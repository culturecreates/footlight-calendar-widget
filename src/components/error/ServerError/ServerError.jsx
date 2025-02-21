import React from 'react';
import './serverError.css';

const ServerError = () => {
  return (
    <div className="error-container">
      {/* Illustration */}
      <img src="/error-illustration.png" alt="Error Illustration" className="error-image" />

      {/* Error Message */}
      <h2 className="error-heading">Oops, something went wrong!</h2>

      {/* Buttons */}
      {/* <div className="error-actions"> */}
      {/* <button className="error-button" onClick={() => window.history.back()}>
          Back
        </button> */}
      {/* <p className="error-text">
          Can’t get back to where you were?{' '}
          <span className="error-link" onClick={() => (window.location.href = '/login')}>
            Exit to login
          </span>
        </p> */}
      {/* </div> */}
    </div>
  );
};

export default ServerError;
