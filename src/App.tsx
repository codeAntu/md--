import { useEffect, useRef, useState } from "react";
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
    <div
      className="bg-[#0b1121] min-h-[100dvh] bg-cover bg-center"
      style={{
        backgroundImage: "url('../public/images/image.png')",
      }}
    >
      <Header />
      <div className=" "></div>
    </div>
  );

  function Header() {
    return (
      <header className="p-4 bg-[#0b112175] border-b border-gray-800 flex justify-center items-center">
        <div className="flex  justify-between items-center gap-56 max-w-7xl">
          <div className="text-white text-2xl font-semibold">
            Markdown compiler
          </div>
          <div className="flex justify-around items-center flex-grow ">
            <nav className="text-lg text-white/30 font-semibold flex flex-grow justify-between gap-10">
              <a href="#">Home</a>
              <a href="#">Github </a>
              <a href="#">Contributors</a>
              <a href="#">Development</a>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  // return (
  //   <div className="h-dvh p-5 bg-[#0d1117] text-[#e6edf3]">
  //     <div className="flex flex-row gap-6 items-center justify-center py-5">
  //       <div className="text-sm font-semibold text-center px-8 py-2 bg-[#252f3e] rounded-full ">
  //         Compiled in {(end - start).toFixed(2)}ms{" "}
  //       </div>
  //       <div className="text-sm font-semibold text-center px-8 py-2   bg-[#252f3e]  rounded-full ">
  //         Markdown Compiler{" "}
  //       </div>
  //       <div className="text-sm font-semibold text-center px-8 py-2 bg-[#252f3e] rounded-full ">
  //         <a href="https://github.com/codeAntu/md--"> Source Code</a>
  //       </div>
  //     </div>
  //     <div className="grid gap-2 sm:grid-cols-2 ">
  //       <div className="w-full rounded-lg">
  //         <div className="w-full p-3 bg-[#252f3e] rounded-t-xl">Editor</div>
  //         <div className="">
  //           <textarea
  //             ref={inputRef}
  //             className="w-full h-[80dvh]  bg-[#0d1117] text-[#e6edf3] border border-slate-800 outline-none p-5 rounded-b-xl"
  //             value={text}
  //             onChange={(e) => setText(e.target.value)}
  //           />
  //         </div>
  //       </div>
  //       <div className="  ">
  //         <div className="p-3 bg-[#252f3e]  rounded-t-xl    ">Output</div>
  //         <div className="w-full h-[80dvh] overflow-auto border border-slate-800 p-4  rounded-b-xl">
  //           <Exp components={component} />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default App;
