import type { Skill, SkillCategoryMeta } from '../types'

// ── Orden canónico de categorías + clave i18n de su label ────────────────────
export const skillCategories: SkillCategoryMeta[] = [
  { id: 'backend',  labelKey: 'categories.backend.label'  },
  { id: 'frontend', labelKey: 'categories.frontend.label' },
  { id: 'mobile',   labelKey: 'categories.mobile.label'   },
  { id: 'cloud',    labelKey: 'categories.cloud.label'    },
  { id: 'testing',  labelKey: 'categories.testing.label'  },
  { id: 'tools',    labelKey: 'categories.tools.label'    },
  { id: 'web3',     labelKey: 'categories.web3.label'     },
]

// ── Skills individuales ───────────────────────────────────────────────────────
export const skillsData: Skill[] = [
  // Backend ─────────────────────────────────────────────────────────────────
  { name: 'Java / Spring',    category: 'backend',  level: 'expert'     },
  { name: 'Node.js',          category: 'backend',  level: 'proficient' },
  { name: 'PHP',              category: 'backend',  level: 'proficient' },
  { name: 'Python',           category: 'backend',  level: 'learning'   },

  // Frontend ────────────────────────────────────────────────────────────────
  { name: 'React',            category: 'frontend', level: 'expert'     },
  { name: 'TypeScript',       category: 'frontend', level: 'expert'     },
  { name: 'JavaScript',       category: 'frontend', level: 'expert'     },
  { name: 'HTML / CSS',       category: 'frontend', level: 'expert'     },
  { name: 'Next.js',          category: 'frontend', level: 'proficient' },
  { name: 'Angular',          category: 'frontend', level: 'proficient' },
  { name: 'Vue',              category: 'frontend', level: 'proficient' },

  // Mobile ──────────────────────────────────────────────────────────────────
  { name: 'React Native',     category: 'mobile',   level: 'expert'     },

  // Cloud & Architecture ────────────────────────────────────────────────────
  { name: 'AWS Lambda',       category: 'cloud',    level: 'expert'     },
  { name: 'AWS SAM / CDK',    category: 'cloud',    level: 'proficient' },
  { name: 'AWS ECS / EKS',    category: 'cloud',    level: 'proficient' },
  { name: 'AWS RDS / Aurora', category: 'cloud',    level: 'proficient' },
  { name: 'AWS EC2 / VPC',    category: 'cloud',    level: 'proficient' },
  { name: 'AWS IAM',          category: 'cloud',    level: 'proficient' },

  // Testing & QA ────────────────────────────────────────────────────────────
  { name: 'QASE',             category: 'testing',  level: 'expert'     },
  { name: 'Postman',          category: 'testing',  level: 'expert'     },
  { name: 'Selenium',         category: 'testing',  level: 'proficient' },
  { name: 'Appium',           category: 'testing',  level: 'proficient' },
  { name: 'REST Assured',     category: 'testing',  level: 'proficient' },
  { name: 'JMeter',           category: 'testing',  level: 'proficient' },

  // Tools & DevOps ──────────────────────────────────────────────────────────
  { name: 'Git',              category: 'tools',    level: 'expert'     },
  { name: 'Docker',           category: 'tools',    level: 'proficient' },
  { name: 'UiPath',           category: 'tools',    level: 'proficient' }, // TODO: confirmar nivel

  // Crypto & Web3 (incipiente) ──────────────────────────────────────────────
  { name: 'Solidity',         category: 'web3',     level: 'learning'   },
  { name: 'ethers.js',        category: 'web3',     level: 'learning'   },
]
