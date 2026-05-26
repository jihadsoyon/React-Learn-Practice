import React from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';

const resultData = [
  {
    "id": 1,
    "name": "Rahim",
    "physics": 85,
    "chemistry": 78,
    "math": 90
  },
  {
    "id": 2,
    "name": "Karim",
    "physics": 72,
    "chemistry": 80,
    "math": 75
  },
  {
    "id": 3,
    "name": "Sakib",
    "physics": 88,
    "chemistry": 82,
    "math": 91
  },
  {
    "id": 4,
    "name": "Tamim",
    "physics": 65,
    "chemistry": 70,
    "math": 68
  },
  {
    "id": 5,
    "name": "Nabil",
    "physics": 79,
    "chemistry": 74,
    "math": 83
  },
  {
    "id": 6,
    "name": "Fahim",
    "physics": 91,
    "chemistry": 88,
    "math": 95
  },
  {
    "id": 7,
    "name": "Arif",
    "physics": 58,
    "chemistry": 62,
    "math": 60
  },
  {
    "id": 8,
    "name": "Rafi",
    "physics": 84,
    "chemistry": 79,
    "math": 87
  },
  {
    "id": 9,
    "name": "Imran",
    "physics": 73,
    "chemistry": 76,
    "math": 72
  },
  {
    "id": 10,
    "name": "Hasan",
    "physics": 89,
    "chemistry": 85,
    "math": 92
  }
]

const ResultsChart = () => {
  return (
    <div>
     <LineChart width={800} height={500} data={resultData}>
      <XAxis dataKey="name"></XAxis>
      <YAxis></YAxis>
      <Line dataKey="math"></Line>
      <Line dataKey={'chemistry'} stroke='red'></Line>
     </LineChart>
    </div>
  );
};

export default ResultsChart;