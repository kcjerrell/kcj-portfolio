import * as React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({});
  useEffect(() => {
    async function getHello() {
      const res = await fetch('/api/hello');
      setState(JSON.stringify(res));
    }
    getHello();
  }, []);

  return (
    <main>
      <h1>I don't know</h1>
      <p>{JSON.stringify(state)}</p>
    </main>
  );
}

export default App;
