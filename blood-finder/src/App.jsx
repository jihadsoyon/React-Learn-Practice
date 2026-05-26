import { useEffect, useState } from "react";

import DonorList from "./components/DonorList";
import DonorRegistry from "./components/DonorRegistry";
import Header from "./components/Header";
import Banner from "./components/Banner";
import DonorMatching from "./components/DonorMatching";
import DonorRequest from "./components/DonorRequest";
import Footer from "./components/Footer";

const divisions = [
  "Dhaka",
  "Chattogram",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];

const bloodCompatibility = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "AB-": ["A-", "B-", "AB-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"]
};

const bloodGroups = Object.keys(bloodCompatibility);

function App() {

  // 🔥 GLOBAL DONOR STATE
  const [donors, setDonors] = useState([]);

  // LOAD JSON DATA
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setDonors(data));
  }, []);

  // 🔥 REGISTER NEW DONOR
  const handleAddDonor = (newDonor) => {
    setDonors((prev) => [newDonor, ...prev]);
  };

  return (
    <div className="bg-[#020617] min-h-screen text-white">

      <div className="container mx-auto px-4 py-8 space-y-8">

        <Header />
        <Banner />

        <div
          id="register"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >

          <DonorRegistry
            divisions={divisions}
            bloodGroups={bloodGroups}
            onAddDonor={handleAddDonor}
          />

          <div id="matching">

            <DonorMatching
              donors={donors}
              bloodGroups={bloodGroups}
              bloodCompatibility={bloodCompatibility}
            />

          </div>

        </div>

        <div id="request">
          <DonorRequest
            divisions={divisions}
            bloodGroups={bloodGroups}
            donors={donors}
          />
        </div>

        <div id="donors">
          <DonorList donors={donors} />
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default App;