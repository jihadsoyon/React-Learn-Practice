const AddressInfo = ({
  formData,
  handleChange,
  nextStep,
  prevStep,
}) => {

  const continueStep = () => {
    if (!formData.city || !formData.country) {
      alert("Please fill all fields");
      return;
    }

    nextStep();
  };

  return (
    <div>
      <h2>Address Info</h2>

      <input
        type="text"
        name="city"
        placeholder="Enter City"
        value={formData.city}
        onChange={handleChange}
      />

      <input
        type="text"
        name="country"
        placeholder="Enter Country"
        value={formData.country}
        onChange={handleChange}
      />

      <button onClick={prevStep}>
        Previous
      </button>

      <button onClick={continueStep}>
        Next
      </button>
    </div>
  );
};

export default AddressInfo;