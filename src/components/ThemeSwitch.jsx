import { useContext } from 'react';
import { TiWeatherNight, TiWeatherSunny } from 'react-icons/ti';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import theme from '../styled-components/theme';

const Button = styled('button')`
  background: transparent;
  border: 0;
  font-size: 1.8em;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 30px;

  & > * {
    transition: opacity 0.3s ease-in-out;
    top: 0;
    left: 0;
  }
`;

const LightIcon = styled('div')`
  color: ${theme.dark.color};
  position: absolute;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
`;

const DarkIcon = styled('div')`
  color: ${theme.light.color};
  position: absolute;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
`;

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === 'dark';
    setTheme(isCurrentDark ? 'light' : 'dark');
  };

  return (
    <Button onClick={handleThemeChange}>
      <LightIcon $isVisible={theme === 'dark'}>
        <TiWeatherSunny />
      </LightIcon>
      <DarkIcon $isVisible={theme === 'light'}>
        <TiWeatherNight />
      </DarkIcon>
    </Button>
  );
};

export default ThemeSwitch;
