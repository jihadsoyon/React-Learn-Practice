const PersonalInfo = ({
  formData,
  handleChange,
  nextStep,
}) => {

  const continueStep = () => {
    if (!formData.name || !formData.email) {
      alert("Please fill all fields");
      return;
    }

    nextStep();
  };

  return (
    <div>
      <h2>Personal Info</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
      />

      <button onClick={continueStep}>
        Next
      </button>
    </div>
  );
};

export default PersonalInfo;