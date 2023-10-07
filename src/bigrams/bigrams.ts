import { rightAnswersData } from "./rightAnswersData";
import { wrongAnswersData } from "./wrongAnswersData";

export type BigramInfo = {
  correct: Bigrams;
  incorrect: Bigrams;
};

// String is the bigram, number is the frequency
type Bigrams = Map<string, number>;

export function getBigramInfo() {
  return {
    correct: getBigrams(rightAnswersData),
    incorrect: getBigrams(wrongAnswersData),
  };
}

export function getBigrams(data: string[]): Bigrams {
  const bigrams: Bigrams = new Map();
  data.forEach((answer) => {
    const answerBigrams = parseSentence(answer);

    answerBigrams.forEach((bigram) => {
      const exists = bigrams.get(bigram);
      bigrams.set(bigram, exists ? exists + 1 : 1);
    });
  });
  return bigrams;
}

export function parseSentence(sentence: string): string[] {
  const bigrams: string[] = [];
  const words = sentence.split(" ");
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i + 1]}`);
  }
  return bigrams;
}
