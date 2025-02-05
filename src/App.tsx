import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-full h-20 bg-blue-500 flex items-center justify-center">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-8xl text-slate-800">Tailwind Works</h1>
        <div className="p-4 bg-slate-100 rounded-lg shadow-lg mt-4">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="mt-4 text-slate-800">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
