const ReviewSubmit = ({ formData, prevStep }) => {
  return (
    <div>
      <h2>Review Information</h2>

      <p>Name: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>City: {formData.city}</p>
      <p>Country: {formData.country}</p>

      <button onClick={prevStep}>Previous</button>
      <button>Submit</button>
    </div>
  );
};

export default ReviewSubmit;