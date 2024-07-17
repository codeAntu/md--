export type Token = {
  type:
    | 'text'
    | 'link'
    | 'img'
    | 'code'
    | 'bold'
    | 'italic'
    | 'strike'
    | 'text1'
    | 'blockquote'
    | 'codeblock'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'underline'
    | 'paragraph'
    | 'br'
    | 'hr'
    | 'ul'
    | 'ol'
    | 'list'
    | 'li'
    | 'span';

  value?: string;
  link?: string;
  children?: Token[];
  // lis?: Token[];
};
