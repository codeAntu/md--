import tokenize from "../findChild";
import { Token } from "../types";

export default function Blockquote(text: string, level: number) {
  let tokens = {} as Token;
  let current = level;
  let isValid = true;

  for (let i = 0; i < level; i++) {
    if (text[i] !== ">") {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    let value = "";
    let rest = "";

    while (
      current < text.length &&
      !(text[current] === ">" && text[current - 1] === "\n")
    ) {
      value += text[current];
      current++;
    }
    rest = text.slice(current);

    if (value) tokens.type = "blockquote";
    tokens.children = tokenize(value);
    tokens.children.push(Blockquote(rest, level + 1));
  } else {
    tokens.type = "span";
    tokens.children = tokenize(text);
  }

  return tokens;
}
