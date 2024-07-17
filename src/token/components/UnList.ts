import tokenize from '../findChild';

export default function unList(text: string, level: number, space: number) {
  let token = [] as any[];
  let current = 0;

  while (current < text.length) {
    let spaces = 0;
    while (text[current] === ' ') {
      spaces++;
      current++;
    }

    if (spaces === level * 3 + space && (text[current] === '*' || text[current] === '-' || text[current] === '+')) {
      current++;

      if (text[current] === ' ') {
        current++;
        let value = '';
        while (current < text.length && !(text[current] === '\n')) {
          value += text[current];
          current++;
        }
        token.push({
          type: 'li',
          children: tokenize(value),
        });
      } else {
        let value = '';
        while (current < text.length && text[current] !== '\n') {
          value += text[current];
          current++;
        }
        token.push({
          type: 'span',
          children: tokenize(value),
        });
      }

      continue;
    }

    // else if (spaces === (level + 1) * 3 + space && text[current] === "*") {
    //   if (text[current + 1] === " ") {
    //     let value = "";

    //     current--;
    //     while (text[current] === " ") {
    //       current--;
    //     }

    //     while (current < text.length && text[current] !== "\n") {
    //       value += text[current];
    //       current++;
    //     }

    //     token.push({
    //       type: "ul",
    //       children: unList(value, level + 1, space),
    //     });
    //   } else {
    //     let value = "";
    //     while (current < text.length && text[current] !== "\n") {
    //       value += text[current];
    //       current++;
    //     }
    //     token.push({
    //       type: "span",
    //       children: tokenize(value),
    //     });
    //   }
    //   continue;
    // }
    else {
      let value = '';
      console.log('in loop 3');

      while (current < text.length && text[current] !== '\n') {
        value += text[current];
        current++;
      }
      console.log(current);

      token.push({
        type: 'span',
        children: tokenize(value),
      });
    }

    // Ensure current is always incremented
    if (current < text.length) {
      current++;
    }
  }
  return token;
}
