import "./UserInput.css";
import { useState } from "react";
import { gradeAnswer } from "./grade/grade";
import { BigramInfo } from "./bigrams/bigrams";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const UserInput = (props: { testTrainData?: BigramInfo }) => {
  const { testTrainData } = props;
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState<boolean>();

  const handleGrade = () => {
    if (!testTrainData) return;
    if (!answer) return;
    setGrade(gradeAnswer(answer, testTrainData));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGrade();
      }}
    >
      <div className="user-input-div">
        <div className="title-label">Question:</div>
        <div>
          Write a short, high-level English language description of the code
          below. Do not give a step-by-step description.
        </div>
        <div>
          <SyntaxHighlighter
            language="javascript"
            style={dracula}
            customStyle={{
              borderRadius: "5px",
            }}
          >
            {"def f(x):\n    z = x[0]\n        x[0] = x[-1]\n     x[-1] = z"}
          </SyntaxHighlighter>
        </div>
        <div className="title-label">Answer:</div>
        <textarea
          className="answer-input"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={3}
        />
        <button disabled={!testTrainData || answer === ""} type="submit">
          Submit
        </button>
        {grade !== undefined && (
          <div>
            <div>Grade: {grade ? "Correct" : "Incorrect"}</div>
          </div>
        )}
      </div>
    </form>
  );
};
