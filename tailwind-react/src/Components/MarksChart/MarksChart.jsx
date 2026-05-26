import React, { use } from 'react';

const MarksChart = ({marksPromise}) => {

const marksDataRes = use(marksPromise);
const marksData = marksDataRes.data;

//data processing for the chart
const marksChartData = marksData.map(studentData => {
  const student = {
    id: studentData.id, 
    name: studentData.name, 
    physics: studentData.physics,
    chemistry: studentData.chemistry,
    math: studentData.math

  }

  const avg = (student.physics + student.chemistry + student.math) / 3;
  student.avg = avg;

  return student;
})

console.log(marksChartData)

  return (
    <div>
      
    </div>
  );
};

export default MarksChart;