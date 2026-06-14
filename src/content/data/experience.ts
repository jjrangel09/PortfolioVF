import type { WorkExperience } from '../types'

// TODO: verifica y ajusta las fechas (startDate / endDate) con tus fechas reales.
// Formato YYYY-MM. endDate: null = posición actual.

export const experienceData: WorkExperience[] = [
  // ── POSICIÓN ACTUAL ───────────────────────────────────────────────────────
  {
    id:             'axexo',
    company:        'Axexo',
    companyUrl:     null, // TODO: agrega URL — ej. https://axexo.com
    startDate:      '2024-08',
    endDate:        null,      // posición actual
    titleKey:       'axexo.title',
    descriptionKey: 'axexo.desc',
    stack: [
      'Spring', 'React', 'React Native',
      'Microservices', 'AWS',
      'Fintech', 'Crypto / Web3',
      'Solution Architecture', 'Tech Leadership',
    ],
    type: 'fulltime',
  },

  // ── SETI S.A.S. ──────────────────────────────────────────────────────────
  {
    id:             'seti',
    company:        'SETI S.A.S.',
    companyUrl:     null, // TODO: agrega URL si existe
    startDate:      '2023-10',
    endDate:        '2024-08',
    titleKey:       'seti.title',
    descriptionKey: 'seti.desc',
    stack: [
      'Solution Architecture', 'Banking / Fintech',
      'Java', 'Spring',
      // TODO: confirma el stack técnico específico del proyecto Bancolombia
    ],
    type: 'fulltime',
  },

  // ── EMIDA (rol anterior en la misma empresa, antes del rebrand a Axexo) ──
  {
    id:             'emida',
    company:        'Emida',
    companyUrl:     null,
    startDate:      '2022-01', // TODO: confirmar mes exacto
    endDate:        '2023-10', // TODO: confirmar — asumido como el mes en que inició SETI
    titleKey:       'emida.title',
    descriptionKey: 'emida.desc',
    stack: [
      'Java', 'Spring', 'JavaScript', 'TypeScript',
      'Vue', 'React',
      'AWS Lambda', 'AWS ECS', 'AWS EKS', 'AuroraDB',
      'REST', 'SOAP',
    ],
    type: 'fulltime',
  },

  // ── GLOBANT ───────────────────────────────────────────────────────────────
  {
    id:             'globant',
    company:        'Globant',
    companyUrl:     'https://globant.com',
    startDate:      '2021-01', // TODO: confirmar
    endDate:        '2021-12', // TODO: confirmar
    titleKey:       'globant.title',
    descriptionKey: 'globant.desc',
    stack: ['Java', 'Appium', 'Selenium', 'REST Assured', 'JMeter', 'TestNG'],
    type: 'fulltime',
  },

  // ── UNISYS ────────────────────────────────────────────────────────────────
  {
    id:             'unisys',
    company:        'Unisys',
    companyUrl:     'https://unisys.com',
    startDate:      '2020-01', // TODO: confirmar
    endDate:        '2020-12', // TODO: confirmar
    titleKey:       'unisys.title',
    descriptionKey: 'unisys.desc',
    stack: ['UiPath', 'Java', 'Spring Boot', 'PostgreSQL'],
    type: 'fulltime',
  },

  // ── GAIRA — TESTER ────────────────────────────────────────────────────────
  {
    id:             'gaira-tester',
    company:        'Gaira Consulting Group',
    companyUrl:     null,
    startDate:      '2019-06', // TODO: confirmar
    endDate:        '2019-12', // TODO: confirmar
    titleKey:       'gaira-tester.title',
    descriptionKey: 'gaira-tester.desc',
    stack: ['QASE', 'Postman', 'Android', 'Jira'],
    type: 'fulltime',
  },

  // ── GAIRA — DOCS ─────────────────────────────────────────────────────────
  {
    id:             'gaira-docs',
    company:        'Gaira Consulting Group',
    companyUrl:     null,
    startDate:      '2019-01', // TODO: confirmar
    endDate:        '2019-06', // TODO: confirmar
    titleKey:       'gaira-docs.title',
    descriptionKey: 'gaira-docs.desc',
    stack: ['AngularJS', 'Adobe XD', 'AWS EC2', 'AWS RDS'],
    type: 'fulltime',
  },
]
