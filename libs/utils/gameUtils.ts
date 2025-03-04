export const randomWordToGuess = (): Promise<string> => {
  return fetchRandomWord();
};

export const fetchRandomWord = async (): Promise<string> => {
  const response = await fetch("https://trouve-mot.fr/api/size/5");
  const data = await response.json();
  return normalizeWord(data[0].name);
};

export const normalizeWord = (word: string) => {
  return word
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const identifiedWord = (word: string, wordToGuess: string) => {
  const wordToGuessArray = wordToGuess.split("");
  const wordToGuessRestArray = [...wordToGuessArray];
  const wordArray = word.split("");
  const identifiedWordArray = wordArray.map((letter, index) => {
    if (letter === wordToGuessArray[index]) {
      wordToGuessRestArray.splice(wordToGuessRestArray.indexOf(letter), 1);
      return "correct";
    } else if (wordToGuessRestArray.includes(letter)) {
      wordToGuessRestArray.splice(wordToGuessRestArray.indexOf(letter), 1);
      return "misplaced";
    } else {
      return "incorrect";
    }
  });
  return identifiedWordArray;
};
