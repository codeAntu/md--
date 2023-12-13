import { useEffect, useRef, useState } from "react";
import "./App.css";
import Exp from "./Render/ComponentRenderer";
import findComponents from "./token/findComponents";
import { Token } from "./token/types";

export function App() {
  const [text, setText] = useState(``);
  const [component, setComponent] = useState([] as Token[]);
  const [start, setStart] = useState(2);
  const [end, setEnd] = useState(2);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const md = inputRef.current?.value;
    if (!md) return;
    const start = performance.now();
    const temp = findComponents(md);
    const end = performance.now();
    setStart(start);
    setEnd(end);
    setComponent(temp);
  }, [text]);

  useEffect(() => {
    (async () => {
      const temp = await fetch("/source.txt");
      const text = await temp.text();
      setText(text);
      setText(text);
      setTimeout(() => {
        setText(text + " ");
      }, 1000);
    })();
  }, []);

  console.log(text);

  console.log(component);

  return (
    <div className="h-dvh p-5 bg-[#0d1117] text-[#e6edf3]">
      <div className="flex flex-row gap-6 items-center justify-center py-5">
        <div className="text-sm font-semibold text-center px-8 py-2 bg-[#252f3e] rounded-full ">
          Compiled in {(end - start).toFixed(2)}ms{" "}
        </div>
        <div className="text-sm font-semibold text-center px-8 py-2   bg-[#252f3e]  rounded-full ">
          Markdown Compiler{" "}
        </div>
        <div className="text-sm font-semibold text-center px-8 py-2 bg-[#252f3e] rounded-full ">
          <a href="https://github.com/codeAntu/md--"> Source Code</a>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 ">
        <div className="w-full rounded-lg">
          <div className="w-full p-3 bg-[#252f3e] rounded-t-xl">Editor</div>
          <div className="">
            <textarea
              ref={inputRef}
              className="w-full h-[80dvh]  bg-[#0d1117] text-[#e6edf3] border border-slate-800 outline-none p-5 rounded-b-xl"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <div className="  ">
          <div className="p-3 bg-[#252f3e]  rounded-t-xl    ">Output</div>
          <div className="w-full h-[80dvh] overflow-auto border border-slate-800 p-4  rounded-b-xl">
            <Exp components={component} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
