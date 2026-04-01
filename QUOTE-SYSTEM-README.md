# Quote Generation System - Guide Complet

Ce document explique comment configurer et utiliser le système de génération automatique de devis PDF.

## Vue d'ensemble

Lorsqu'un client soumet le formulaire de contact sur le site, le système :

1. ✅ Capture toutes les données du formulaire (nom, email, téléphone, adresse, service, etc.)
2. ✅ Génère un numéro de devis unique (format : D2026-00123)
3. ✅ Crée un PDF professionnel avec tous les détails
4. ✅ Envoie le devis par email à `clelimserrurerie@gmail.com`
5. ✅ (Optionnel) Envoie une copie au client
6. ✅ Affiche un message de confirmation à l'utilisateur

## Configuration requise

### 1. Créer un compte Resend

[Resend](https://resend.com) est le service d'envoi d'emails utilisé par le système.

1. Créez un compte sur [https://resend.com/signup](https://resend.com/signup)
2. Vérifiez votre email
3. Créez une API key :
   - Allez dans "API Keys"
   - Cliquez "Create API Key"
   - Copiez la clé (format : `re_xxxxx...`)

### 2. Vérifier votre domaine (recommandé)

Pour envoyer des emails depuis votre propre domaine :

1. Dans Resend, allez dans "Domains"
2. Cliquez "Add Domain"
3. Entrez votre domaine (ex: `clelim-serrurerie.fr`)
4. Ajoutez les enregistrements DNS fournis par Resend
5. Attendez la vérification (quelques minutes à quelques heures)

**Note :** Sans domaine vérifié, vous pouvez quand même tester avec `onboarding@resend.dev` comme expéditeur, mais les emails peuvent finir en spam.

### 3. Configuration des variables d'environnement

#### Pour Netlify :

1. Allez sur votre site Netlify
2. Cliquez sur "Site settings" > "Environment variables"
3. Ajoutez les variables suivantes :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `RESEND_API_KEY` | `re_xxxxx...` | Votre clé API Resend (OBLIGATOIRE) |
| `FROM_EMAIL` | `noreply@clelim-serrurerie.fr` | Email expéditeur (optionnel) |
| `SEND_COPY_TO_CLIENT` | `true` ou `false` | Envoyer une copie au client (optionnel) |
| `BUSINESS_PHONE` | `06 77 23 58 39` | Téléphone affiché dans l'email (optionnel) |

#### Pour Vercel :

1. Allez sur votre projet Vercel
2. Cliquez sur "Settings" > "Environment Variables"
3. Ajoutez les mêmes variables que ci-dessus

#### Pour le développement local :

1. Copiez `.env.example` vers `.env`
2. Remplissez les valeurs :

```bash
cp .env.example .env
nano .env  # ou ouvrez avec votre éditeur
```

### 4. Installation des dépendances

```bash
npm install
```

Cela installera :
- `jspdf` : génération de PDF
- `resend` : envoi d'emails
- `nodemailer` : alternative pour l'envoi d'emails

## Structure du système

```
clelim-serrurerie/
├── config/
│   ├── business.config.js    # Infos entreprise, CGV, mentions légales
│   ├── quote.config.js        # Services, prix, catégories
│   └── site.config.js         # Config générale du site
├── utils/
│   ├── generateQuoteNumber.js # Génération numéro de devis
│   └── generateQuotePdf.js    # Génération du PDF
├── netlify/functions/
│   └── send-quote.js          # Fonction serverless Netlify
├── api/
│   └── send-quote.js          # Fonction serverless Vercel
└── script.js                  # Logique formulaire + intégration
```

## Personnalisation

### 1. Modifier les informations de l'entreprise

Éditez `config/business.config.js` :

```javascript
const businessConfig = {
  company: {
    name: 'VOTRE NOM',
    address: 'VOTRE ADRESSE',
    email: 'votre@email.com',
    phone: '+33600000000',
    siret: 'VOTRE SIRET',
    // ...
  }
};
```

### 2. Modifier les services et prix

Éditez `config/quote.config.js` :

```javascript
const quoteConfig = {
  servicesByCategory: {
    'depannage-ouverture': [
      {
        id: 'ouverture-claquee',
        label: 'Ouverture porte claquée',
        price: 100.0,  // Changez le prix ici
        tva: 0,
      },
      // ...
    ]
  }
};
```

### 3. Ajouter un nouveau service

Dans `config/quote.config.js`, ajoutez dans la catégorie appropriée :

```javascript
{
  id: 'mon-nouveau-service',
  label: 'Mon Nouveau Service',
  description: 'Description détaillée',
  price: 150.0,
  tva: 0,
}
```

### 4. Modifier le template du PDF

Éditez `utils/generateQuotePdf.js` pour changer :
- Les couleurs
- La mise en page
- Les polices
- Le contenu des sections

### 5. Personnaliser l'email

Éditez `netlify/functions/send-quote.js` (ou `api/send-quote.js` pour Vercel) :

Modifiez la variable `emailHTML` pour changer le contenu de l'email.

## Fonctionnement du formulaire

### Champs du formulaire

Le formulaire capture :

| Champ | ID HTML | Requis | Description |
|-------|---------|--------|-------------|
| Nom complet | `quote-name` | Oui | Nom du client |
| Téléphone | `quote-phone` | Oui | Format français validé |
| Email | `quote-email` | Oui | Email du client |
| Adresse | `quote-address` | Oui | Adresse complète |
| Code postal | `quote-postal` | Oui | 5 chiffres |
| Ville | `quote-city` | Oui | Ville |
| Catégorie | `service-category` | Oui | Type de service |
| Service | `service-detail` | Oui | Service spécifique |
| Urgence | `quote-urgency` | Oui | Niveau d'urgence |
| Message | `quote-message` | Oui | Description du besoin |

### Majoration d'urgence

Les prix sont automatiquement ajustés selon l'urgence :

- **Urgence immédiate** : +50% (multiplicateur 1.5)
- **Rapide (sous 24h)** : +20% (multiplicateur 1.2)
- **Standard** : Prix normal (multiplicateur 1.0)

Configuration dans `config/quote.config.js` :

```javascript
urgencyMultipliers: {
  urgent: { multiplier: 1.5 },
  rapide: { multiplier: 1.2 },
  normal: { multiplier: 1.0 },
}
```

### Numéro de devis

Format : `D2026-XXXXX`

- `D` : Prefix fixe pour "Devis"
- `2026` : Année en cours
- `XXXXX` : Numéro séquentiel à 5 chiffres basé sur timestamp

## Dépannage

### Le PDF ne se génère pas

**Symptôme :** Erreur dans la console "jsPDF library not loaded"

**Solution :**
1. Vérifiez que le CDN jsPDF est chargé dans `index.html`
2. Vérifiez la console pour d'autres erreurs JavaScript
3. Assurez-vous que `utils/generateQuotePdf.js` est bien chargé

### L'email n'est pas envoyé

**Symptôme :** Erreur "RESEND_API_KEY not configured"

**Solution :**
1. Vérifiez que la variable d'environnement est configurée
2. Redéployez le site après avoir ajouté la variable
3. Pour Netlify : allez dans "Deploys" > "Trigger deploy" > "Clear cache and deploy site"

**Symptôme :** Email envoyé mais non reçu

**Solutions :**
1. Vérifiez le dossier spam
2. Vérifiez que votre domaine est vérifié dans Resend
3. Consultez les logs de Resend : [https://resend.com/emails](https://resend.com/emails)
4. Vérifiez les logs Netlify : "Functions" > "send-quote" > "Function log"

### Le formulaire affiche une erreur

**Symptôme :** Message "Une erreur est survenue"

**Solution :**
1. Ouvrez la console développeur (F12)
2. Regardez l'erreur exacte
3. Vérifiez que tous les champs requis sont remplis
4. Vérifiez que la fonction serverless est déployée

## Testing

### Test en local

Pour tester la génération de PDF sans envoyer d'email :

1. Ouvrez la console développeur (F12)
2. Remplissez le formulaire
3. Avant de soumettre, ajoutez dans la console :

```javascript
// Remplacer temporairement la fonction fetch
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('PDF généré avec succès !', args);
  return Promise.resolve({ ok: true, json: () => ({ success: true }) });
};
```

4. Soumettez le formulaire
5. Le PDF sera généré mais pas envoyé

### Test de l'envoi d'email

1. Configurez vos variables d'environnement
2. Déployez sur Netlify ou Vercel
3. Remplissez le formulaire avec votre propre email
4. Soumettez
5. Vérifiez la réception dans votre boîte mail
6. Vérifiez les logs de la fonction serverless

## Performance

- Génération du PDF : ~500ms
- Envoi de l'email : ~1-2 secondes
- Total temps de réponse : ~2-3 secondes

Le bouton de soumission est désactivé pendant le traitement pour éviter les doubles soumissions.

## Sécurité

✅ **Implémenté :**

- Honeypot anti-spam
- Validation des champs côté client et serveur
- Rate limiting (3 secondes entre soumissions)
- Timeout de 30 secondes
- Variables d'environnement pour les secrets
- Aucune clé API côté client

❌ **Non implémenté (améliorations possibles) :**

- Captcha (reCAPTCHA)
- Authentification DKIM/SPF
- Stockage des devis en base de données
- Dashboard admin

## Coûts

### Resend

- Gratuit : 100 emails/jour, 3,000 emails/mois
- Pro : $20/mois pour 50,000 emails/mois

### Netlify / Vercel

- Gratuit : 125,000 requêtes/mois de fonctions
- Largement suffisant pour un site de serrurerie

## Support

En cas de problème :

1. Consultez les logs Netlify/Vercel
2. Consultez les logs Resend
3. Vérifiez la console navigateur (F12)
4. Vérifiez que toutes les dépendances sont installées : `npm install`
5. Consultez la documentation Resend : [https://resend.com/docs](https://resend.com/docs)

## Changelog

### Version 1.0.0 (01/04/2026)

- Génération automatique de devis PDF
- Envoi par email via Resend
- Formulaire étendu avec adresse et urgence
- Configuration des prix par service
- Majoration automatique selon l'urgence
- Support Netlify et Vercel
