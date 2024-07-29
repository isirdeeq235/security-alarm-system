export default function generateRandomString(length: number): string {
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "@$!%*?&";

  const allChars = capitalLetters + smallLetters + numbers + specialChars;

  // Ensure each type of character is included
  const resultArray: string[] = [];
  resultArray.push(
    capitalLetters.charAt(Math.floor(Math.random() * capitalLetters.length))
  );
  resultArray.push(
    smallLetters.charAt(Math.floor(Math.random() * smallLetters.length))
  );
  resultArray.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
  resultArray.push(
    specialChars.charAt(Math.floor(Math.random() * specialChars.length))
  );

  // Fill the rest of the length with random characters from allChars
  for (let i = 4; i < length; i++) {
    resultArray.push(
      allChars.charAt(Math.floor(Math.random() * allChars.length))
    );
  }

  // Shuffle the resultArray
  for (let i = resultArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
  }

  return resultArray.join("");
}
