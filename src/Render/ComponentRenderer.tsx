import { Token } from "../token/types";

export default function Exp({ components }: { components: Token[] }) {
  if (components == undefined) return null;

  return (
    <>
      {components.map((component, index) => {
        switch (component.type) {
          case "text":
            return (
              <span key={index} className="p">
                {component.value}
              </span>
            );
          case "bold":
            return (
              <b key={index} className="strong">
                <Exp components={component.children!} />
              </b>
            );
          case "italic":
            return (
              <i key={index}>
                <Exp components={component.children!} />
              </i>
            );
          case "link":
            return (
              <a key={index} href={component.link} className="a">
                {component.value}
                <Exp components={component.children!} />
              </a>
            );
          case "strike":
            return (
              <del key={index} className="">
                <Exp components={component.children!} />
              </del>
            );
          case "blockquote":
            return (
              <div
                key={index}
                className=" m-2 border-l-4 px-3 rounded-sm border-slate-500"
              >
                {component.children ? (
                  <Exp components={component.children} />
                ) : null}
              </div>
            );
          case "code":
            return (
              <span key={index} className="code">
                {component.value}
              </span>
            );
          case "codeblock":
            return (
              <p key={index} className="codeblock whitespace-pre">
                {component.value}
              </p>
            );
          case "hr":
            return (
              <hr
                key={index}
                className="border-gray-300 border-solid border-1 my-4"
              />
            );
          case "img":
            return (
              <img
                key={index}
                src={component.link}
                alt={component.value}
                className="img inline-block my-3"
              />
            );
          case "ul":
            return (
              <ul key={index} className=" ">
                <Exp components={component.children!} />
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="">
                <Exp components={component.children!} />
              </ol>
            );
          case "li":
            return (
              <li key={index} className="font-bold">
                <Exp components={component.children!} />
              </li>
            );
          case "paragraph":
            return (
              <p key={index} className="">
                <Exp components={component.children!} />
              </p>
            );
          case "h1":
            return (
              <h1 key={index} className="h1">
                <Exp components={component.children!} />
              </h1>
            );
          case "h2":
            return (
              <h2 key={index} className="h2">
                <Exp components={component.children!} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="h3">
                <Exp components={component.children!} />
              </h3>
            );
          case "h4":
            return (
              <h4 key={index} className="h4">
                <Exp components={component.children!} />
              </h4>
            );
          case "h5":
            return (
              <h5 key={index} className="h5">
                <Exp components={component.children!} />
              </h5>
            );
          case "h6":
            return (
              <h6 key={index} className="h6">
                <Exp components={component.children!} />
              </h6>
            );
          case "span":
            return (
              <span key={index} className="span">
                <Exp components={component.children!} />
              </span>
            );
          default:
            return null; // or handle other cases as needed
        }
      })}
    </>
  );
}
