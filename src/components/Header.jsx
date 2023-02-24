import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import theme from '../styled-components/theme';
import LocaleSwitch from './LocaleSwitch';
import ThemeSwitch from './ThemeSwitch';
import Tooltip from './Tooltip';

const HeaderContainer = styled('header')`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100px;

  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 160px;
    background-image: ${({ $theme }) => `linear-gradient(
    to bottom,
    ${theme[$theme].background} 60%,
    transparent
  )`};
  }
`;

const HeaderWrapper = styled('div')`
  width: 80%;
  margin: 0 auto;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  position: absolute;
  top: 0;
  left: 10%;
`;

const Logo = styled('h1')`
  font-family: 'Pacifico', cursive;
  font-size: 2.8em;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  flex-grow: 1;
`;

const LocaleSwitchContainer = styled(LocaleSwitch)`
  margin-left: 20px;
`;

const Header = ({ scrollLimit }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <HeaderContainer $theme={theme}>
      <HeaderWrapper>
        <Logo $isVisible={scrollLimit}>Cl3tus</Logo>
        <Tooltip
          content={`Change theme to ${theme === 'dark' ? 'light' : 'dark'}`}
          direction="bottom"
        >
          <ThemeSwitch />
        </Tooltip>
        <LocaleSwitchContainer />
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;
