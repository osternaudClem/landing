import { useState } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import SocialLink from './components/SocialLink';
import Lightswitch from './components/ThemeSwitch';

import './App.css';
import './assets/fonts/flat-icons.css';

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

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`}>
        <div className="page">
          <Lightswitch />
          <h1 className="logo">Cl3tus</h1>
          <p className="content">
            Bonjour, je suis Clément Osternaud (Cl3tus), j'ai 33 ans et je suis
            développeur Front-End.
          </p>
          <p className="content">
            J'habite actuellement proche de Paris en France.
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
