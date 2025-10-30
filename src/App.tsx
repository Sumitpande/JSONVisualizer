// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import "@xyflow/react/dist/style.css";
import HomePage from "./pages/HomePage";
import { Toaster } from "./components/ui/sonner";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Toaster />
      <HomePage />
    </>
  );
}

export default App;
