import Heading from './components/Heading';
import tokenize from './findChild';
import Blockquote from './components/Blockquotes';
import unList from './components/UnList';
import olList from './components/List';

export default function findComponents(text: string) {
  const components = [];
  let current = 0;
  const size = text.length;

  while (current < size) {
    if (text[current] === '\n' || text[current] === ' ') {
      current++;
      continue;
    }

    // header
    if (text[current] === '#') {
      let value = '';
      while (current < size && text[current] !== '\n') {
        value += text[current];
        current++;
      }
      components.push(Heading(value.trim())); // Trim heading value
      continue;
    }

    // Code block ```js  ```
    if (text[current] === '`') {
      let start = current;
      if (current < size && text.slice(current, current + 3) === '```') {
        let value = '';
        let language = '';
        current += 3;

        while (current < size && text[current] !== '\n') {
          if (text[current] === ' ' && language.length === 0) {
            current++;
            continue;
          } else if (text[current] === ' ' && language.length !== 0) {
            break;
          }
          language += text[current];
          current++;
        }

        while (current < size && text[current] !== '\n') {
          current++;
        }
        current++;

        while (current < size && text.slice(current, current + 3) !== '```') {
          value += text[current];
          current++;
        }

        current += 2;

        // optional
        if (text[current] !== '\n') {
          while (current < size && text[current] !== '\n') {
            current++;
          }
        }

        components.push({
          type: 'codeblock',
          language: language,
          value: value,
        });
        current++;
        continue;
      } else {
        current = start;
      }
    }

    //  > Blockquotes
    if (text[current] === '>') {
      let value = '';
      while (current < size && !(text[current] === '\n' && text[current + 1] === '\n')) {
        value += text[current];
        current++;
      }
      components.push(Blockquote(value.trim(), 1));
    }

    if (
      text.slice(current, current + 3) === '***' ||
      text.slice(current, current + 3) === '---' ||
      text.slice(current, current + 3) === '___'
    ) {
      components.push({
        type: 'hr',
      });
      current += 3;
      continue;
    }

    // unordered list

    if ((text[current] === '*' || text[current] === '-' || text[current] === '+') && text[current + 1] === ' ') {
      let space = 0;
      let start = current;
      let value = '';

      current--;
      while (current >= 0 && text[current] === ' ') {
        space++;
        current--;
      }

      while (current < size && !(text[current] === '\n' && text[current + 1] === '\n')) {
        value += text[current];
        current++;
      }

      components.push({
        type: 'ul',
        children: unList(value, 0, space),
      });

      continue;
    }

    // ordered list

    if (text[current] >= '0' && text[current] <= '9' && text[current + 1] === '.' && text[current + 2] === ' ') {
      console.log('ordered list');
      let space = 0;
      let start = current;
      let value = '';

      current--;
      while (current >= 0 && text[current] === ' ') {
        space++;
        current--;
      }

      while (current < size && !(text[current] === '\n' && text[current + 1] === '\n')) {
        value += text[current];
        current++;
      }

      components.push({
        type: 'ol',
        children: olList(value, 0, space),
      });

      continue;
    }

    {
      let value = '';
      while (current < size && !(text[current] === '\n' && text[current + 1] === '\n')) {
        value += text[current];
        current++;
      }
      const paragraph = {
        type: 'paragraph',
        children: tokenize(value.trim()), // Trim paragraph value
      };
      components.push(paragraph);
      continue;
    }
  }

  console.log(components);
  return components;
}
