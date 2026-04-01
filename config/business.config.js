const businessConfig = {
  company: {
    name: 'MEBARKI KELIM',
    tradeName: 'ClelimSerrurerie',
    address: '60 RUE FRANCOIS IER',
    postalCode: '75008',
    city: 'PARIS',
    country: 'France',
    email: 'clelimserrurerie@gmail.com',
    phone: '+33677235839',
    phoneDisplay: '06 77 23 58 39',
    siret: '90951567800029',
    tva: 'FR96909515678',
    naf: '4332B',
    status: 'EI',
    tvaApplicable: false,
    tvaArticle: '293B du CGI',
  },

  legal: {
    certificationMention:
      'Document émis avec le logiciel Khosmos v2.4.1 certifié NF(525) B 0585',
  },

  quote: {
    validityDays: 30,
    paymentTerms: 'Paiement immédiat après intervention',
    notes: [
      'En signant le présent devis, j\'accepte expressément les conditions générales de vente situées à la suite de ce document.',
      'Les prestations sont payables immédiatement après intervention.',
      'Tout devis signé vaut acceptation des travaux et des tarifs.',
      'Aucun remboursement ne sera effectué après réalisation de la prestation.',
      'En cas de non-paiement, des frais supplémentaires pourront être appliqués.',
      'Les prix peuvent varier en fonction de la complexité de l\'intervention.',
    ],
  },

  cgv: [
    {
      title: '1. Objet',
      content:
        'Les présentes conditions générales de vente (CGV) régissent les prestations de serrurerie proposées par ClelimSerrurerie.',
    },
    {
      title: '2. Prestations',
      content:
        'Ouverture de porte, remplacement de serrure, sécurisation après effraction et installation de systèmes de fermeture.',
    },
    {
      title: '3. Devis',
      content: 'Tout devis signé ou accepté par message vaut engagement ferme.',
    },
    {
      title: '4. Tarifs',
      content: 'Les prix sont exprimés en euros TTC. TVA non applicable (article 293B du CGI).',
    },
    {
      title: '5. Paiement',
      content: 'Le paiement est exigible immédiatement après l\'intervention.',
    },
    {
      title: '6. Déplacement',
      content: 'Des frais de déplacement peuvent être appliqués selon la distance.',
    },
    {
      title: '7. Intervention',
      content: 'Le client s\'engage à fournir des informations exactes sur la situation.',
    },
    {
      title: '8. Responsabilité',
      content:
        'ClelimSerrurerie ne peut être tenu responsable des dommages liés à une installation défectueuse préexistante.',
    },
    {
      title: '9. Litiges',
      content:
        'En cas de litige, une solution amiable sera privilégiée avant toute action judiciaire.',
    },
    {
      title: '10. Acceptation',
      content:
        'Toute commande implique l\'acceptation sans réserve des présentes CGV.',
    },
  ],
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = businessConfig;
}
