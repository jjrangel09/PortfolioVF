import type { HeroData } from '../types'

// TODO: reemplaza la ruta del CV si cambias el nombre del archivo
const CV_URL = '/src/assets/CV-Juan_Jose_Rangel.pdf'

export const heroData: HeroData = {
  name: 'Juan José Rangel',
  avatarUrl: null, // TODO: '/src/assets/me2.png' cuando el diseño del avatar esté listo
  availableForWork: false,
  cvUrl: CV_URL,
  socials: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/juanjoserangel',
      handle: 'juanjoserangel',
    },
    {
      platform: 'github',
      url: 'https://github.com/jjrangel09',
      handle: 'jjrangel09',
    },
    // TODO: agrega Twitter/X, email público u otras redes si aplica
  ],
  featuredStack: [
    'React',
    'React Native',
    'TypeScript',
    'Java / Spring',
    'Node.js',
    'AWS',
    'Solidity*',
  ],
}
