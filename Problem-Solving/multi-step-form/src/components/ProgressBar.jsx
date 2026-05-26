const ProgressBar = ({ step }) => {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          width:
            step === 1
              ? "33%"
              : step === 2
              ? "66%"
              : "100%",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;