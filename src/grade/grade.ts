import { BigramInfo, parseSentence } from "../bigrams/bigrams";
import { answersData } from "./gradeData";

export type AnswerInfo = {
  answer: string;
  correct: number;
};

export type GradedAnswer = {
  answer: AnswerInfo;
  grade: boolean;
};

export function gradeTestData(bigrams: BigramInfo): GradedAnswer[] {
  return answersData.reduce<GradedAnswer[]>((acc, answer) => {
    acc.push({
      answer,
      grade: gradeAnswer(answer.answer, bigrams),
    });
    return acc;
  }, []);
}
type GradeValues = { count: number; weight: number };

export function gradeAnswer(answer: string, bigrams: BigramInfo): boolean {
  const sentenceBigrams = parseSentence(answer);
  const rightCount = sentenceBigrams.reduce<GradeValues>(
    (acc, bigram) => {
      const exists = bigrams.correct.get(bigram);
      if (exists) {
        acc.count += 1;
        acc.weight += exists;
      }
      return acc;
    },
    { count: 0, weight: 0 }
  );

  const wrongCount = sentenceBigrams.reduce<GradeValues>(
    (acc, bigram) => {
      const exists = bigrams.incorrect.get(bigram);
      if (exists) {
        acc.count += 1;
        acc.weight += exists;
      }
      return acc;
    },
    { count: 0, weight: 0 }
  );

  if (rightCount.count < 5) return false;

  return rightCount.count >= wrongCount.count;
}
