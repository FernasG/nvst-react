import './App.css';
import { useEffect, useState } from 'react';
import { StorageService } from './libraries';
import { LogIn, Home } from './screens';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    document.title = 'NVST - Investments App';
    const cookieLoggedIn = StorageService.get('is_logged_in');

    if (cookieLoggedIn) setIsLoggedIn(cookieLoggedIn === 'true');
  }, [isLoggedIn]);

  return (
    <div className="App">
      {isLoggedIn ? <Home /> : <LogIn setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
}

export default App;
