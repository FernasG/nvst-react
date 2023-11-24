import './App.css';
import { useEffect } from 'react';
import { LogIn } from './screens';

function App() {
  useEffect(() => { document.title = 'NVST - Investments App' });

  return (
    <div className="App">
      <LogIn />
    </div>
  );
}

export default App;
