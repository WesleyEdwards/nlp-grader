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

export function gradeAnswer(answer: string, bigrams: BigramInfo): boolean {
  const sentenceBigrams = parseSentence(answer);
  const rightCount = sentenceBigrams.reduce((acc, bigram) => {
    const exists = bigrams.correct.get(bigram);
    if (exists) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const wrongCount = sentenceBigrams.reduce((acc, bigram) => {
    const exists = bigrams.incorrect.get(bigram);
    if (exists) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return rightCount >= wrongCount;
}
