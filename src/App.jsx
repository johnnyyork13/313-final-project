import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = React.useState(0)

  const url = 'https://us-central1-database-class-backend.cloudfunctions.net/api/test'
  // const url = 'http://localhost:3000/test';

  React.useEffect(() => {
    async function testFetch() {
      try {
        await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => res.json())
        .then((data) => console.log("data", data));
      } catch(err) {
        console.log(err);
      }
    }
    testFetch();
  }, []);

  

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WORKING!!!!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
