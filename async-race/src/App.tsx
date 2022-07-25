import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './App.css';

function App() {
  console.log('render');

  useEffect(() => {
    // debugger;
    console.log('useEffect render');
  });
  return (
    <div className="App">
      <nav>
        <Link to="/garage">Garage</Link>
        <Link to="/winners">Winners</Link>
      </nav>
    </div>
  );
}

export default App;
