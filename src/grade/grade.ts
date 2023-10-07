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
  const graded: GradedAnswer[] = [];

  answersData.forEach((answer) => {
    graded.push({
      answer,
      grade: gradeAnswer(answer.answer, bigrams),
    });
  });

  return graded;
}

export function gradeAnswer(answer: string, bigrams: BigramInfo): boolean {
  const sentenceBigrams = parseSentence(answer);
  const rightCount = sentenceBigrams.reduce((acc, bigram) => {
    const exists = bigrams.correct.find((b) => b.bigram === bigram.bigram);
    if (exists) {
      return acc + exists.frequency;
    }
    return acc;
  }, 0);

  const wrongCount = sentenceBigrams.reduce((acc, bigram) => {
    const exists = bigrams.incorrect.find((b) => b.bigram === bigram.bigram);
    if (exists) {
      return acc + exists.frequency;
    }
    return acc;
  }, 0);

  return rightCount >= wrongCount;
}
