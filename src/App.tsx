import { useEffect, useState } from "react";
import "./App.css";
import { BigramInfo, getBigramInfo } from "./bigrams/bigrams";
import { GradedAnswer, gradeTestData } from "./grade/grade";
import { GradeDisplay } from "./GradeDisplay";
import { UserInput } from "./UserInput";

function App() {
  const [testTrainData, setTestTrainData] = useState<BigramInfo>();
  const [gradedData, setGradedData] = useState<GradedAnswer[]>();
  const [showToast, setShowToast] = useState<string>();

  const onClickCreateBigrams = () => {
    const parsedData = getBigramInfo();
    setTestTrainData(parsedData);
    console.log(parsedData);

    setShowToast("Bigrams have been logged to the console.");
  };

  const onClickGrade = () => {
    if (!testTrainData) return;
    const graded = gradeTestData(testTrainData);
    setGradedData(graded);
    console.log(graded);
    setShowToast("Graded data has been logged to the console.");
  };

  useEffect(() => {
    if (!showToast) return;
    const timeout = setTimeout(() => {
      setShowToast("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <>
      <div>Grader</div>
      <div className="button-group">
        <button onClick={onClickCreateBigrams}>Create Bigrams (train)</button>
        <button onClick={onClickGrade} disabled={!testTrainData}>
          Grade test data
        </button>
      </div>
      <div id="grade-display">
        {gradedData && <GradeDisplay gradedData={gradedData} />}
      </div>
      <UserInput testTrainData={testTrainData} />
      <div className={showToast ? "toast open" : "toast"}>{showToast}</div>
    </>
  );
}

export default App;
