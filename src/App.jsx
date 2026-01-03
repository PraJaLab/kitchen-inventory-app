import React, { useState, useEffect } from 'react';
import SwipeContainer from './components/SwipeContainer';
import ShoppingListView from './components/ShoppingListView';
// import { ChefHat } from 'lucide-react';

function App() {
  const [view, setView] = useState('swipe'); // 'swipe' or 'list'
  const [results, setResults] = useState({});

  useEffect(() => {
    const savedResults = localStorage.getItem('inventory_results');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  const handleFinish = (finalResults) => {
    setResults(finalResults);
    localStorage.setItem('inventory_results', JSON.stringify(finalResults));
    setView('list');
  };

  const handleReset = () => {
    localStorage.removeItem('inventory_results');
    setResults({});
    setView('swipe');
    window.location.reload();
  };

  return (
    <div className="app_container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'white' }}>
      <header className="app_header" style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
        <div className="logo">
          {/* <ChefHat size={28} /> */}
          <span style={{ fontSize: 24, fontWeight: 'bold', color: 'red' }}>KitchenMate (No Icons)</span>
        </div>
      </header>

      <main className="app_monitor" style={{ flex: 1, padding: 20 }}>
        {view === 'swipe' ? (
          <SwipeContainer onFinish={handleFinish} />
        ) : (
          <ShoppingListView results={results} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;
