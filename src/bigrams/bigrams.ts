import { rightAnswersData } from "./rightAnswersData";
import { wrongAnswersData } from "./wrongAnswersData";

export type BigramInfo = {
  correct: Bigram[];
  incorrect: Bigram[];
};

type Bigram = {
  bigram: string;
  frequency: number;
};

export function getBigramInfo() {
  return {
    correct: getBigrams(rightAnswersData),
    incorrect: getBigrams(wrongAnswersData),
  };
}

export function getBigrams(data: string[]): Bigram[] {
  const bigrams: Bigram[] = [];
  data.forEach((answer) => {
    const answerBigrams = parseSentence(answer);

    answerBigrams.forEach((bigram) => {
      const exists = bigrams.find((b) => b === bigram);
      if (exists) {
        exists.frequency++;
      } else {
        bigrams.push(bigram);
      }
    });
  });
  return bigrams;
}

export function parseSentence(sentence: string): Bigram[] {
  const bigrams: Bigram[] = [];
  const words = sentence.split(" ");
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push({ bigram: `${words[i]} ${words[i + 1]}`, frequency: 1 });
  }
  return bigrams;
}
