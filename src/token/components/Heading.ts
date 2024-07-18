import tokenize from '../findChild';



// currently not in use 

export default function Heading(text: string) {
  let tokens = {} as any;

  if (text && text.search(/^#{1,6}\s/) !== -1) {
    let headerRegex = /^#{1,6}\s/;
    let headerMatch = text.match(headerRegex);

    if (headerMatch) {
      let header = headerMatch[0];
      // console.log(header);
      let headerSize = header.length - 1;
      let value = text.replace(headerRegex, '');

      tokens.type = `h${headerSize}`;
      tokens.children = tokenize(value);
    } else {
      tokens.type = 'p';
      tokens.value = text;
    }

    return tokens;
  } else {
    // Handle the case where the text is undefined or doesn't match the expected pattern
    tokens.type = 'span';
    tokens.children = tokenize(text);
    return tokens;
  }
}
