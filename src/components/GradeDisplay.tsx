import "./GradeDisplay.css";
import { GradedAnswer } from "../grade/grade";

export const GradeDisplay = (props: { gradedData: GradedAnswer[] }) => {
  const { gradedData } = props;

  const gradedCorrectly = gradedData.filter((answer) => {
    return !!answer.answer.correct === answer.grade;
  });

  return (
    <div className="grade-display">
      <div className="line-item">
        <div>Graded correctly:</div>
        <div>{gradedCorrectly.length}</div>
      </div>
      <div className="line-item">
        <div>Percent Correct:</div>
        <div>{(gradedCorrectly.length / gradedData.length) * 100}%</div>
      </div>
    </div>
  );
};
