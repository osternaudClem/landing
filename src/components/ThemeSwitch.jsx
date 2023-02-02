import { useContext } from 'react';
import { TiWeatherNight, TiWeatherSunny } from 'react-icons/ti';
import { ThemeContext } from '../contexts/ThemeContext';

function Lightswitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
  };

  return (
    <div className="Lightswitch">
      <button onClick={handleThemeChange}>
        {theme === 'dark' ? <TiWeatherSunny /> : <TiWeatherNight />}
      </button>
    </div>
  );
}

export default Lightswitch;
