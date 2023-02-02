import './App.css';
import './assets/fonts/flat-icons.css';

import SocialLink from './components/SocialLink';

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
  return (
    <div class="page">
      <h1 class="logo">Cl3tus</h1>
      <p class="content">
        Bonjour, je suis Clément Osternaud (Cl3tus), j'ai 33 ans et je suis
        développeur Front-End.
      </p>
      <p class="content">J'habite actuellement proche de Paris en France.</p>

      <div class="socials">
        {SOCIALS.map((social) => (
          <SocialLink
            key={social.id}
            {...social}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
