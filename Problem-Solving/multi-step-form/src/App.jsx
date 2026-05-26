import { useEffect, useState } from "react";
import PersonalInfo from "./components/PersonalInfo";
import AddressInfo from "./components/AddressInfo";
import ReviewSubmit from "./components/ReviewSubmit";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("multiStepForm");

    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          city: "",
          country: "",
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "multiStepForm",
      JSON.stringify(formData)
    );
  }, [formData]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        );

      case 2:
        return (
          <AddressInfo
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );

      case 3:
        return (
          <ReviewSubmit
            formData={formData}
            prevStep={prevStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>🚀 Multi Step Form Wizard</h1>

      <ProgressBar step={step} />

      {renderStep()}
    </div>
  );
}

export default App;