const quoteConfig = {
  standardServices: [
    {
      id: 'diagnostic',
      label: 'Diagnostic',
      price: 60.0,
      tva: 0,
      defaultQty: 1,
    },
    {
      id: 'deplacement',
      label: 'Frais de déplacement',
      price: 30.0,
      tva: 0,
      defaultQty: 1,
    },
    {
      id: 'test',
      label: 'Teste de fonctionnement et ajustement finaux',
      price: 30.0,
      tva: 0,
      defaultQty: 1,
    },
  ],

  servicesByCategory: {
    'depannage-ouverture': [
      {
        id: 'ouverture-claquee',
        label: 'Ouverture porte claquée',
        description: 'Ouverture sans destruction',
        price: 100.0,
        tva: 0,
      },
      {
        id: 'ouverture-verrouillee',
        label: 'Ouverture porte verrouillée',
        description: 'Technique non destructive priorisée',
        price: 220.0,
        tva: 0,
      },
    ],

    'serrures-cylindres': [
      {
        id: 'depose-cylindre',
        label: 'Dépose de l\'ancien cylindre',
        price: 30.0,
        tva: 0,
      },
      {
        id: 'cylindre-renforce',
        label: 'Remplacement de cylindre renforcé (double entrée)',
        description:
          '• Fourniture et pose d\'un cylindre européen débrayable Héraclès Y8C haute sécurité\n' +
          '• Cylindre équipé de protections anti-crochetage, anti-perçage\n' +
          '• Fourniture de 5 clés\n' +
          '• Mise en sécurité de la porte',
        price: 150.0,
        tva: 0,
      },
      {
        id: 'cylindre-standard',
        label: 'Remplacement cylindre standard',
        description: 'Cylindre européen standard avec 3 clés',
        price: 80.0,
        tva: 0,
      },
    ],

    'securisation-effraction': [
      {
        id: 'securisation-provisoire',
        label: 'Mise en sécurité provisoire',
        price: 50.0,
        tva: 0,
      },
      {
        id: 'remplacement-urgence',
        label: 'Remplacement serrure après effraction',
        price: 200.0,
        tva: 0,
      },
    ],

    'portes-blindage': [
      {
        id: 'pose-porte-blindee',
        label: 'Pose porte blindée',
        description: 'Devis sur mesure après visite',
        price: 0,
        tva: 0,
        onQuote: true,
      },
      {
        id: 'blindage-porte',
        label: 'Blindage de porte existante',
        price: 0,
        tva: 0,
        onQuote: true,
      },
    ],

    'equipements-accessoires': [
      {
        id: 'verrou-supplementaire',
        label: 'Pose verrou supplémentaire',
        price: 80.0,
        tva: 0,
      },
      {
        id: 'entrebailleur',
        label: 'Pose entrebâilleur',
        price: 40.0,
        tva: 0,
      },
    ],

    'reglage-maintenance': [
      {
        id: 'reglage-serrure',
        label: 'Réglage de serrure',
        price: 60.0,
        tva: 0,
      },
      {
        id: 'graissage-entretien',
        label: 'Graissage et entretien',
        price: 40.0,
        tva: 0,
      },
    ],
  },

  urgencyMultipliers: {
    urgent: {
      label: 'Urgence immédiate',
      multiplier: 1.5,
      description: 'Majoration de 50% pour intervention urgente',
    },
    rapide: {
      label: 'Rapide (sous 24h)',
      multiplier: 1.2,
      description: 'Majoration de 20% pour intervention rapide',
    },
    normal: {
      label: 'Standard',
      multiplier: 1.0,
      description: 'Tarif normal',
    },
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = quoteConfig;
}
