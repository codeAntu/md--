import { Token } from "./types";

export default function tokenize(text: string) {
  const children = [] as Token[];

  let current = 0;

  //
  while (current < text.length) {
    if (text[current] === "\n") {
      current++;
      continue;
    }

    // simple text to span component
    if (text[current] != "_" && text[current].match(/[\w\s]/g)) {
      let start = current;
      let value = "";

      while (
        current < text.length &&
        text[current] != "_" &&
        text[current].match(/[\w\s]/g)
      ) {
        value += text[current];
        current++;
      }

      children.push({
        type: "text",
        value: value,
      });
      continue;
    }

    if (text[current] === "[") {
      let value = "";
      let link = "";
      let start = current;
      current++; // skip '['
      while (current < text.length && text[current] !== "]") {
        value += text[current];
        current++;
      }
      current++; // skip ']'

      if (current < text.length && text[current] === "(") {
        current++; // skip '('
        while (current < text.length && text[current] !== ")") {
          link += text[current];
          current++;
        }
        current++; // skip ')'

        if (current <= text.length) {
          children.push({
            type: "link",
            link: link,
            children: tokenize(value),
          });
          continue;
        } else {
          current = start;
        }
      } else {
        current = start;
      }
    }

    // img
    if (text[current] === "!") {
      let value = "";
      let link = "";
      let start = current;

      current++; // Move past '!'
      if (text[current] === "[") {
        current++; // Move past '['
        while (current < text.length && text[current] !== "]") {
          value += text[current];
          current++;
        }
        current++; // Move past ']'
        if (text[current] === "(") {
          current++; // Move past '('
          while (current < text.length && text[current] !== ")") {
            link += text[current];
            current++;
          }
          current++; // Move past ')'
          if (current <= text.length) {
            children.push({
              type: "img",
              link: link,
              value: value,
            });
            continue;
          } else {
            current = start;
          }
        } else {
          current = start;
        }
      } else {
        current = start;
      }
    }

    // code component
    if (text[current] === "`") {
      let value = "";
      let start = current;

      current++; // skip '`'
      while (current < text.length && text[current] !== "`") {
        value += text[current];
        current++;
      }

      if (current < text.length && text[current] === "`") {
        current++; // skip '`'
        children.push({
          type: "code",
          value: value,
        });
        continue;
      } else {
        current = start;
      }
    }

    // bold **text**

    if (text[current] === "*") {
      let start = current;
      current++;
      if (text[current] === "*") {
        current++;
        let extra = "";
        while (current < text.length && text[current] === "*") {
          extra += text[current];
          current++;
        }

        children.push({
          type: "text",
          value: extra,
        });
        if (text[current] !== " ") {
          let value = "";
          while (
            current < text.length &&
            !(
              text[current] === "*" &&
              text[current - 1] !== " " &&
              text[current - 1] !== "*"
            )
          ) {
            value += text[current];
            current++;
          }

          if (
            current < text.length &&
            text.slice(current, current + 2) === "**"
          ) {
            current += 2;
            children.push({
              type: "bold",
              children: tokenize(value),
            });
            continue;
          } else {
            current = start;
          }
        } else {
          current = start;
        }
      } else {
        current = start;
      }
    }

    // italic _text_

    if (text[current] === "_") {
      let start = current;
      current++;
      let extra = "";
      while (current < text.length && text[current] === "_") {
        extra += text[current];
        current++;
      }

      children.push({
        type: "text",
        value: extra,
      });
      if (text[current] !== " ") {
        let value = "";
        while (
          current < text.length &&
          !(
            text[current] === "_" &&
            text[current - 1] !== " " &&
            text[current - 1] !== "_"
          )
        ) {
          value += text[current];
          current++;
        }

        if (current < text.length && text[current] === "_") {
          current++;
          children.push({
            type: "italic",
            children: tokenize(value),
          });
          continue;
        } else {
          current = start;
        }
      } else {
        current = start;
      }
    }

    // strike through

    if (text[current] === "~") {
      let start = current;
      current++;
      if (text[current] === "~") {
        current++;
        let extra = "";
        while (current < text.length && text[current] === "~") {
          extra += text[current];
          current++;
        }

        children.push({
          type: "text",
          value: extra,
        });
        if (text[current] !== " ") {
          let value = "";
          while (
            current < text.length &&
            !(
              text[current] === "~" &&
              text[current - 1] !== " " &&
              text[current - 1] !== "~"
            )
          ) {
            value += text[current];
            current++;
          }

          if (
            current < text.length &&
            text.slice(current, current + 2) === "~~"
          ) {
            current += 2;
            children.push({
              type: "strike",
              children: tokenize(value),
            });
            continue;
          } else {
            current = start;
          }
        } else {
          current = start;
        }
      } else {
        current = start;
      }
    }

    if (true) {
      let value = "";
      while (current < text.length && text[current] !== " ") {
        value += text[current];
        current++;
      }
      children.push({
        type: "text",
        value: value,
      });
    }
  }

  return children;
}
