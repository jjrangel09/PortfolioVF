import type { AboutData } from '../types'
import meAboutUrl from '@/assets/me-about.jpg'

// TODO: confirma yearsOfExperience y projectsCount con tus fechas reales de la sección Experience.
export const aboutData: AboutData = {
  photoUrl:            meAboutUrl,
  location:            'Colombia',
  yearsOfExperience:   7,   // TODO: confirma — calculado desde 2019 (primer empleo en Gaira) hasta 2026
  companiesCount:      5,   // Gaira, Unisys, Globant, Emida/Axexo, SETI — confirmado con datos actuales
  projectsCount:       20,  // TODO: cuenta exacta de proyectos entregados
  certifications: [
    {
      id:             'aws-saa',
      name:           'Solutions Architect – Associate',
      issuer:         'Amazon Web Services',
      badge:          'AWS',
      descriptionKey: null,
      credentialUrl:  null, // TODO: agrega tu URL de Credly
      year:           null, // TODO: agrega el año de certificación
    },
    {
      id:             'scrum-sfc',
      name:           'Scrum Fundamentals Certified',
      issuer:         'SCRUMstudy',
      badge:          'SCRUM',
      descriptionKey: null,
      credentialUrl:  null,
      year:           null,
    },
  ],
}
