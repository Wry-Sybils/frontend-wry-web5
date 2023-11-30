import { useTheme } from './context/ThemeContext';
import ToggleButton from './components/ToggleButton';
import { Icon } from '@iconify/react';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App h-screen w-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <ToggleButton type="button" onClick={toggleTheme} ariaLabel="Toggle Theme">
        {theme === 'dark' ? <Icon icon="mingcute:sun-fill" /> : <Icon icon="mingcute:moon-fill" />}
      </ToggleButton>
      <p>This is a text</p>
    </div>
  );
}

export default App;