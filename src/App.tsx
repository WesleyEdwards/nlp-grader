import { useState } from "react";
import "./App.css";
import { BigramInfo, getBigramInfo } from "./bigrams/bigrams";
import { GradedAnswer, gradeTestData } from "./grade/grade";
import { GradeDisplay } from "./GradeDisplay";

function App() {
  const [testTrainData, setTestTrainData] = useState<BigramInfo>();
  const [gradedData, setGradedData] = useState<GradedAnswer[]>();

  const onClickCreateBigrams = () => {
    const parsedData = getBigramInfo();
    setTestTrainData(parsedData);
    console.log(parsedData);
  };

  const onClickGrade = () => {
    if (!testTrainData) return;
    const graded = gradeTestData(testTrainData);
    setGradedData(graded);
    console.log(graded);
  };

  return (
    <>
      <div>Grader</div>
      <div className="button-group">
        <button onClick={onClickCreateBigrams}>Create Bigrams</button>
        <button onClick={onClickGrade}>Grade test data</button>
      </div>
      {gradedData && <GradeDisplay gradedData={gradedData} />}
    </>
  );
}

export default App;
