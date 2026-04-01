const siteConfig = {
  company: {
    name: 'Clelim Serrurerie',
    legalName: 'CLELIM SERRURERIE',
    slogan: 'Dépannage Serrurerie 24h/24',
    description:
      'Intervention rapide dans toute l\'Île-de-France pour toutes vos urgences de serrurerie.',
  },

  contact: {
    phone: '+33677235839',
    phoneDisplay: '06 77 23 58 39',
    whatsapp: '33677235839',
    email: 'clelimserrurerie@gmail.com',
    availability: '24h/24 - 7j/7',
  },

  location: {
    serviceArea: 'Île-de-France',
    departments: [
      { code: '75', name: 'Paris' },
      { code: '77', name: 'Seine-et-Marne' },
      { code: '78', name: 'Yvelines' },
      { code: '91', name: 'Essonne' },
      { code: '92', name: 'Hauts-de-Seine' },
      { code: '93', name: 'Seine-Saint-Denis' },
      { code: '94', name: 'Val-de-Marne' },
      { code: '95', name: 'Val-d\'Oise' },
    ],
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
  },

  business: {
    responseTime: '30-45 minutes',
    responseTimeValue: 35,
    experienceYears: 3,
    satisfactionRate: 98,
    rating: 4.8,
    reviewsCount: 150,
    founded: '2021',
  },

  services: [
    {
      id: 'porte-claquee',
      title: 'Ouverture de porte claquée',
      price: 100,
      priceNote: 'HT',
      icon: 'door_front',
      featured: true,
    },
    {
      id: 'porte-verrouillee',
      title: 'Ouverture porte vérouillée',
      price: 220,
      priceNote: 'HT',
      icon: 'lock',
      featured: false,
    },
    {
      id: 'cylindre-renforce',
      title: 'Remplacement cylindre renforcé',
      price: 150,
      priceNote: 'DÈS',
      icon: 'tune',
      featured: false,
    },
  ],

  forms: {
    formspreeEndpoint: 'https://formspree.io/f/VOTRE_ID_ICI',
    netlifyForms: true,
  },

  social: {
    googleMapsUrl: '',
    facebookUrl: '',
    instagramUrl: '',
  },

  seo: {
    title: 'CLELIM SERRURERIE | Dépannage 24/7 en Île-de-France',
    titleTemplate: '%s | Clelim Serrurerie',
    description:
      'Serrurier professionnel disponible 24h/24 et 7j/7 en Île-de-France. Intervention rapide sous 30-45 minutes. Devis gratuit. Tarifs transparents.',
    keywords: [
      'serrurier Paris',
      'dépannage serrurerie',
      'ouverture porte',
      'serrurier urgence',
      'serrurerie 24h/24',
      'île-de-france',
      'changement cylindre',
      'porte blindée',
    ],
    siteUrl: 'https://clelim-serrurerie.fr',
    image: '/public/logo.png',
    twitterHandle: '',
  },

  legal: {
    privacyPolicyUrl: '/politique-confidentialite.html',
    termsUrl: '/cgu.html',
    siret: '',
    vatNumber: '',
  },

  features: {
    multiLanguage: true,
    languages: ['fr', 'en', 'zh'],
    defaultLanguage: 'fr',
    analytics: {
      googleAnalyticsId: '',
      facebookPixelId: '',
    },
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}

if (typeof window !== 'undefined') {
  window.siteConfig = siteConfig;
}
