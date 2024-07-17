import { useEffect, useRef, useState } from 'react';
import Exp from './Render/ComponentRenderer';
import findComponents from './token/findComponents';
import { Token } from './token/types';

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
      const temp = await fetch('/source.txt');
      const text = await temp.text();
      setText(text);
      setText(text);
      setTimeout(() => {
        setText(text + ' ');
      }, 1000);
    })();
  }, []);

  console.log(text);

  console.log(component);
  return (
    <div
      className='min-h-[100dvh] w-full bg-[#0b1121] bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: "url('../public/images/image.png')",
      }}
    >
      <Header />
      <div className='py-2'></div>
      <Box />
      {/* <Box /> */}
    </div>
  );

  function Box() {
    return (
      <div className='grid select-none gap-2 px-5 sm:grid-cols-2'>
        <div className='w-full overflow-hidden rounded-xl border border-gray-800 text-white'>
          <div className='flex w-full items-center justify-normal border-b border-gray-800 bg-[#1e293b20] px-4 py-3'>
            <div className='text-lg font-medium'>Editor</div>
            <div className='flex flex-grow items-center justify-end gap-2'>
              <div className='flex justify-center gap-2 rounded-full bg-[#1e293b] py-1 pl-1.5 pr-2.5 text-sm font-semibold'>
                <div className='rounded-full bg-blue px-2 text-sm text-white'>0</div>
                <div>Words</div>
              </div>
              <button className='rounded-3xl bg-blue px-3 py-0.5 text-sm font-semibold'>Demo</button>
              <button className='rounded-3xl bg-blue px-3 py-0.5 text-sm font-semibold'>Clear</button>
            </div>
          </div>
          <div className=''>
            <textarea
              ref={inputRef}
              className='h-[80dvh] w-full bg-[#0b112170] p-5 text-[#e6edf3] outline-none'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <div className='w-full overflow-hidden rounded-xl border border-gray-800 text-white'>
          <div className='flex w-full items-center justify-normal border-b border-gray-800 bg-[#1e293b20] px-4 py-3'>
            <div className='text-lg font-medium'>Markdown </div>
            <div className='flex flex-grow items-center justify-end gap-2'>
              <div className='flex justify-center gap-2 rounded-full bg-[#1e293b] py-1 pl-2.5 pr-1.5 text-sm font-semibold'>
                <div>Complete in </div>
                <div className='rounded-full bg-blue px-2 text-sm text-white'>0.1 ms </div>
              </div>
              <button className='rounded-3xl bg-blue px-3 py-0.5 text-sm font-semibold'>Refresh</button>
              <button className='rounded-3xl bg-blue px-3 py-0.5 text-sm font-semibold shadow-blue drop-shadow-2xl'>
                Auto
              </button>
            </div>
          </div>
          <div className='h-[80dvh] w-full overflow-auto bg-[#0b112170] p-5 text-[#e6edf3]'>
            <Exp components={component} />
          </div>
        </div>
      </div>
    );
  }

  function Header() {
    return (
      <header className='sticky top-0 flex items-center justify-center border-b border-gray-800 bg-[#0b112175] p-3 backdrop-blur-xl'>
        <div className='flex max-w-7xl flex-grow items-center justify-between'>
          <div className='text-xl font-semibold text-white'>Markdown compiler</div>
          <div className='flex flex-grow items-center justify-end'>
            <nav className='hidden flex-grow items-center justify-end gap-8 text-sm font-medium text-white/40 sm:flex'>
              <a href='#' className='text-white'>
                Home
              </a>
              <a href='#'>Github </a>
              <a href='#'>Contributors</a>
              <a href='#'>Development</a>
            </nav>
            <svg width='24' height='24' fill='none' aria-hidden='true' color='white' className='sm:hidden'>
              <path
                d='M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
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
