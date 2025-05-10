export default function useFormatText() {
  const formatText = (value: string): string[] => {
    const check = '/n';
    const result: string[] = [];
    let accumulatedStr = '';
    let insideParentheses = false;

    for (let i = 0; i < value.length; i++) {
      const currentChar = value[i];
      const nextChar = value[i + 1];

      // Track if we are inside parentheses
      if (currentChar === '(') {
        insideParentheses = true;
      } else if (currentChar === ')') {
        insideParentheses = false;
      }

      // Check for "/n" and ensure it's not inside parentheses
      if (!insideParentheses && currentChar + nextChar === check) {
        // Push the accumulated string as a paragraph
        result.push(accumulatedStr);
        accumulatedStr = ''; // Reset the accumulator
        i++; // Skip the next character ('n') as it's part of "/n"
        continue;
      }

      // Accumulate characters
      accumulatedStr += currentChar;
    }

    // Push any remaining accumulated string
    if (accumulatedStr.length) {
      result.push(accumulatedStr);
    }

    return result;
  };

  return { formatText };
}
