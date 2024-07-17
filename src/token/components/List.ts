import tokenize from '../findChild';

export default function olList(text: string, level: number, space: number) {
  const tokens = [] as any[];
  let current = 0;

  while (current < text.length) {
    let spaces = 0;
    while (text[current] === ' ') {
      spaces++;
      current++;
    }

    if (
      spaces === level * 3 + space &&
      text[current].match(/[0-9]/g) &&
      text[current + 1] === '.' &&
      text[current + 2] === ' '
    ) {
      current += 2;
      let value = '';
      while (current < text.length && !(text[current] === '\n')) {
        value += text[current];
        current++;
      }

      tokens.push({
        type: 'li',
        children: tokenize(value),
      });

      continue;
    } else {
      let value = '';
      console.log('in loop 3');

      while (current < text.length && text[current] !== '\n') {
        value += text[current];
        current++;
      }
      console.log(current);

      tokens.push({
        type: 'span',
        children: tokenize(value),
      });
    }

    // Ensure current is always incremented
    if (current < text.length) {
      current++;
    }
  }

  return tokens;
}
