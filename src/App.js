import { useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import SocialLink from './components/SocialLink';

import './App.css';
import './assets/fonts/flat-icons.css';
import Header from './components/Header';
import { useTranslation } from 'react-i18next';

const SOCIALS = [
  {
    id: 'twitter',
    href: 'https://twitter.com/Cl3tus_',
    icon: 'twitter',
  },
  {
    id: 'github',
    href: 'https://github.com/osternaudClem',
    icon: 'github',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/cl3tus_',
    icon: 'instagram',
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/osternaudclement/',
    icon: 'linkedin',
  },
];

const SCROLL_LIMIT = 200;

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [scrollPosition, setScrollPosition] = useState(0);
  const { t: __ } = useTranslation();

  const scrollLimit = useMemo(
    () => scrollPosition >= SCROLL_LIMIT,
    [scrollPosition]
  );

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const updateTheme = (theme) => {
    setTheme(theme);
    window.localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      <div className={`theme--${theme}`}>
        <Header scrollLimit={scrollLimit} />
        <div className="page">
          <h1 className="logo">Cl3tus</h1>
          <p className="content">
            {__(
              `Hello ! I'm Clement Osternaud (know as Cl3tus), I'm 33 and I'm a front-end developer.`
            )}
          </p>
          <p className="content">
            {__(`I'm currently working at Winamax (Paris - France).`)}
          </p>

          <div className="socials">
            {SOCIALS.map((social) => (
              <SocialLink
                key={social.id}
                {...social}
              />
            ))}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
