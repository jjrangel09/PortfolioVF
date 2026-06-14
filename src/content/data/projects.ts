import type { Project } from '../types'

// Vite asset imports — URLs hashed en build, servidos desde dist/assets/
import img1 from '@/assets/portfolio1.jpeg'
import img2 from '@/assets/portfolio2.jpg'
import img3 from '@/assets/portfolio3.jpg'
import img4 from '@/assets/portfolio4.jpg'
import img5 from '@/assets/portfolio5.png'
import img6 from '@/assets/portfolio6.jpg'
import img7 from '@/assets/portfolio7.jpg'
import img8 from '@/assets/portfolio8.jpg'

// Logo assets for professional projects
import logoAxexo   from '@/assets/projects/logo-axexo.svg'
import logoGlobant from '@/assets/projects/logo-globant-light.svg'

export const projectsData: Project[] = [
  // ── Destacados (featured: true) — aparecen con imagen prominente ────────────

  {
    id:             'axexo-app',
    titleKey:       'axexo-app.title',
    descriptionKey: 'axexo-app.desc',
    stack:          ['React Native', 'React', 'Spring', 'TypeScript', 'Crypto / Web3', 'Fintech', 'Wallet'],
    links: { live: null, repo: null, demo: null },
    featured:  true,
    year:      2025,
    imageUrl:  logoAxexo,
    imageMode: 'logo',
  },
  {
    id:             'mbx-app',
    titleKey:       'mbx-app.title',
    descriptionKey: 'mbx-app.desc',
    stack:          ['React Native', 'TypeScript', 'Android', 'iOS'],
    links: { live: null, repo: null, demo: null },
    featured:  true,
    year:      2024,
    imageUrl:  logoAxexo,
    imageMode: 'logo',
  },
  {
    id:             '1000-historias',
    titleKey:       '1000-historias.title',
    descriptionKey: '1000-historias.desc',
    stack:          ['Unity', 'C#', 'Manual QA', 'WebGL'],
    links: {
      live: 'https://1000yunahistorias.enfermeras.co',
      repo: null,
      demo: null,
    },
    featured: true,
    year:     2022,
    imageUrl: img1,
  },
  {
    id:             '1000-historias-ar',
    titleKey:       '1000-historias-ar.title',
    descriptionKey: '1000-historias-ar.desc',
    stack:          ['Unity', 'C#', 'AR Foundation', 'Mobile'],
    links: {
      live: null,
      repo: null,
      demo: 'https://youtu.be/-JQkPA5DpIo',
    },
    featured: true,
    year:     2022,
    imageUrl: img2,
  },
  {
    id:             'titania-rv-admin',
    titleKey:       'titania-rv-admin.title',
    descriptionKey: 'titania-rv-admin.desc',
    stack:          ['React', 'Node.js', 'Unity', '360° VR'],
    links: {
      live: 'https://titaniavr.com', // TODO: verificar que la URL sigue activa
      repo: null,
      demo: null,
    },
    featured: true,
    year:     2021,
    imageUrl: img5,
  },
  {
    id:             'disney-globant',
    titleKey:       'disney-globant.title',
    descriptionKey: 'disney-globant.desc',
    stack:          ['Java', 'Appium', 'Selenium', 'REST Assured', 'TestNG', 'CI/CD'],
    links: { live: null, repo: null, demo: null },
    featured:  true,
    year:      2021,
    imageUrl:  logoGlobant,
    imageMode: 'logo',
  },

  // ── Secundarios (featured: false) — lista compacta ──────────────────────────

  {
    id:             'instapay-portal',
    titleKey:       'instapay-portal.title',
    descriptionKey: 'instapay-portal.desc',
    stack:          ['JavaScript', 'REST API', 'Web Portal'], // TODO: confirmar stack real
    links: { live: null, repo: null, demo: null }, // TODO: verificar instapayportal.com
    featured: false,
    year:     2022,
    imageUrl: null,
  },
  {
    id:             '1000-historias-backoffice',
    titleKey:       '1000-historias-backoffice.title',
    descriptionKey: '1000-historias-backoffice.desc',
    stack:          ['Adobe XD', 'Unity', 'AR Foundation', 'Wireframing'],
    links: {
      live: 'https://1000yunahistorias.enfermeras.co',
      repo: null,
      demo: null,
    },
    featured: false,
    year:     2022,
    imageUrl: img3,
  },
  {
    id:             'ssl-colombia',
    titleKey:       'ssl-colombia.title',
    descriptionKey: 'ssl-colombia.desc',
    stack:          ['Adobe XD', 'Moodle', 'UX Design'],
    links: { live: null, repo: null, demo: null },
    featured: false,
    year:     2021,
    imageUrl: img4,
  },
  {
    id:             'edingenieriaeng',
    titleKey:       'edingenieriaeng.title',
    descriptionKey: 'edingenieriaeng.desc',
    stack:          ['React', 'Node.js', 'PostgreSQL'],
    links: { live: null, repo: null, demo: null },
    featured: false,
    year:     2020,
    imageUrl: img6,
  },
  {
    id:             'titania-rv',
    titleKey:       'titania-rv.title',
    descriptionKey: 'titania-rv.desc',
    stack:          ['Unity', 'C#', '360° VR'],
    links: { live: null, repo: null, demo: null },
    featured: false,
    year:     2020,
    imageUrl: img7,
  },
  {
    id:             'gou',
    titleKey:       'gou.title',
    descriptionKey: 'gou.desc',
    stack:          ['React', 'Android', 'Node.js', 'Maps API'],
    links: { live: null, repo: null, demo: null },
    featured: false,
    year:     2019,
    imageUrl: img8,
  },
]
