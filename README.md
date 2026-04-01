# Clelim Serrurerie - Site Vitrine Professionnel

Site vitrine production-ready pour Clelim Serrurerie, spécialisé en dépannage de serrurerie 24h/24 en Île-de-France.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Déploiement](#déploiement)
- [Structure du projet](#structure-du-projet)
- [Modification du contenu](#modification-du-contenu)
- [SEO et Performance](#seo-et-performance)

## Fonctionnalités

- **Design Premium** : Interface moderne et professionnelle avec animations fluides
- **Multilingue** : Support complet FR / EN / ZH
- **Formulaire Sécurisé** : Anti-spam, validation robuste, compatible Formspree et Netlify Forms
- **SEO Optimisé** : Meta tags, Open Graph, structured data (LocalBusiness + FAQPage)
- **Performance** : Lazy loading, optimisations CSS/JS, cache headers
- **Accessibilité** : ARIA labels, navigation clavier, contraste WCAG AA
- **Responsive** : Mobile-first, optimisé pour tous les écrans
- **Deploy-ready** : Configuration Netlify et Vercel incluse

## Technologies

- **HTML5** : Sémantique, structured data
- **CSS3** : Variables CSS, animations, mobile-first
- **JavaScript Vanilla** : Aucune dépendance runtime
- **Prettier** : Formatage automatique du code
- **Serve** : Serveur de développement local

## Installation

### Prérequis

- Node.js >= 18.0.0
- npm ou yarn

### Installation

```bash
npm install
```

## Configuration

### 1. Configuration du site

Éditez `config/site.config.js` pour personnaliser :

```javascript
const siteConfig = {
  contact: {
    phone: '+33677235839',
    email: 'clelimserrurerie@gmail.com',
    // ...
  },
  forms: {
    formspreeEndpoint: 'https://formspree.io/f/VOTRE_ID_ICI',
    netlifyForms: true,
  },
  seo: {
    siteUrl: 'https://votre-domaine.fr',
    // ...
  },
};
```

### 2. Formspree (optionnel)

Si vous utilisez Formspree :

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire
3. Copiez l'URL du formulaire (ex: `https://formspree.io/f/xyzabc123`)
4. Collez-la dans `config/site.config.js` → `forms.formspreeEndpoint`

### 3. Netlify Forms (recommandé)

Pour utiliser Netlify Forms (gratuit) :

1. Le formulaire est déjà configuré avec l'attribut `netlify`
2. Déployez sur Netlify
3. Les soumissions apparaîtront automatiquement dans votre dashboard Netlify

## Développement

### Lancer le serveur local

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

### Formater le code

```bash
npm run format
```

### Vérifier le formatage

```bash
npm run format:check
```

### Valider la configuration

```bash
npm run validate
```

## Déploiement

### Netlify (recommandé)

#### Option 1 : Drag & Drop

1. Exécutez `npm run build` pour valider le projet
2. Glissez-déposez le dossier entier sur [app.netlify.com/drop](https://app.netlify.com/drop)
3. Configurez votre domaine personnalisé dans les settings

#### Option 2 : Git

1. Poussez votre code sur GitHub/GitLab
2. Connectez votre repo sur Netlify
3. Configuration de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.`
4. Deploy!

Les formulaires Netlify fonctionneront automatiquement.

### Vercel

1. Poussez votre code sur GitHub
2. Importez le projet sur [vercel.com](https://vercel.com)
3. Déployez (la configuration est dans `vercel.json`)

### Hébergement classique

Le site est statique et peut être hébergé sur :

- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- OVH, Ionos, etc.

Uploadez simplement tous les fichiers via FTP.

## Structure du projet

```
clelim-serrurerie/
├── assets/
│   └── css/
│       └── back-to-top.css
├── config/
│   └── site.config.js          # Configuration centralisée
├── public/                      # Images et assets
├── scripts/
│   ├── build.js                 # Script de validation
│   └── validate.js              # Vérification de la config
├── index.html                   # Page principale
├── style.css                    # Styles desktop
├── mobile.css                   # Styles mobile
├── script.js                    # JavaScript principal
├── 404.html                     # Page d'erreur
├── robots.txt                   # SEO
├── sitemap.xml                  # SEO
├── netlify.toml                 # Config Netlify
├── vercel.json                  # Config Vercel
├── _redirects                   # Redirections Netlify
├── package.json                 # Dépendances et scripts
└── README.md                    # Cette documentation
```

## Modification du contenu

### Changer les textes

Tous les textes sont dans `script.js` dans l'objet `translations` :

```javascript
const translations = {
  fr: {
    hero_title: 'Dépannage<br/>Serrurerie',
    // ...
  },
  en: {
    hero_title: 'Express<br/>Locksmith',
    // ...
  },
};
```

### Changer les coordonnées

Éditez `config/site.config.js` :

```javascript
contact: {
  phone: '+33677235839',
  phoneDisplay: '06 77 23 58 39',
  email: 'clelimserrurerie@gmail.com',
}
```

### Changer les prix

Éditez `config/site.config.js` :

```javascript
services: [
  {
    id: 'porte-claquee',
    price: 100,
    // ...
  },
];
```

### Modifier le logo

Remplacez `public/logo.png` par votre logo (format PNG recommandé, fond transparent).

## SEO et Performance

### Meta tags

Les meta tags sont dans `index.html` :

- Title
- Description
- Open Graph
- Twitter Card
- Canonical

### Structured Data

Deux blocs JSON-LD sont inclus :

1. **LocalBusiness** : informations sur l'entreprise
2. **FAQPage** : questions fréquentes

### Performance

- **Images** : Lazy loading natif
- **CSS** : Variables CSS, pas de framework lourd
- **JS** : Vanilla, aucune dépendance externe
- **Fonts** : Preconnect, display=swap
- **Cache** : Headers configurés dans netlify.toml et vercel.json

### Lighthouse Score attendu

- Performance : 95+
- Accessibility : 95+
- Best Practices : 95+
- SEO : 100

## Checklist avant mise en ligne

- [ ] Configurer `config/site.config.js` avec vos coordonnées
- [ ] Configurer l'endpoint Formspree OU activer Netlify Forms
- [ ] Remplacer le logo dans `public/logo.png`
- [ ] Mettre à jour `siteUrl` dans la config
- [ ] Tester le formulaire de contact
- [ ] Vérifier les numéros de téléphone
- [ ] Valider l'accessibilité (navigation clavier)
- [ ] Tester sur mobile
- [ ] Configurer Google Analytics (optionnel)
- [ ] Configurer votre domaine personnalisé
- [ ] Générer et tester le sitemap.xml
- [ ] Soumettre le site à Google Search Console

## Support

Pour toute question technique :

- Consultez la documentation de [Netlify](https://docs.netlify.com/)
- Consultez la documentation de [Formspree](https://help.formspree.io/)
- Ouvrez une issue sur le dépôt Git

---

## Système de Génération de Devis

Ce site intègre un système complet de génération automatique de devis PDF.

### Fonctionnalités

Lorsqu'un client soumet le formulaire de contact :

1. ✅ Génération automatique d'un PDF professionnel
2. ✅ Envoi par email à clelimserrurerie@gmail.com
3. ✅ Numérotation automatique des devis (D2026-XXXXX)
4. ✅ Calcul automatique des prix selon l'urgence
5. ✅ Option d'envoi de copie au client

### Configuration du système de devis

Pour activer le système de génération de devis :

1. **Créer un compte Resend** (service d'envoi d'emails)
   - Inscrivez-vous sur [https://resend.com](https://resend.com)
   - Créez une API key
   - (Recommandé) Vérifiez votre domaine

2. **Configurer les variables d'environnement**

Sur Netlify :
- Site Settings > Environment variables
- Ajoutez `RESEND_API_KEY` avec votre clé API

Sur Vercel :
- Settings > Environment Variables
- Ajoutez `RESEND_API_KEY` avec votre clé API

3. **Redéployer le site**

Variables disponibles :
```bash
RESEND_API_KEY=re_xxxxx              # OBLIGATOIRE
FROM_EMAIL=noreply@votredomaine.com  # Optionnel
SEND_COPY_TO_CLIENT=true             # Optionnel
BUSINESS_PHONE=06 77 23 58 39        # Optionnel
```

4. **Tester le système**
   - Remplissez le formulaire sur le site
   - Vérifiez la réception de l'email avec le PDF

### Documentation complète

Pour plus de détails sur le système de devis :
- **Configuration** : voir [QUOTE-SYSTEM-README.md](QUOTE-SYSTEM-README.md)
- **Personnalisation des prix** : voir `config/quote.config.js`
- **Personnalisation du PDF** : voir `utils/generateQuotePdf.js`
- **Modifier les infos entreprise** : voir `config/business.config.js`

### Dépannage rapide

**Le PDF ne se génère pas**
- Vérifiez la console navigateur (F12)
- Assurez-vous que jsPDF est chargé

**L'email n'est pas envoyé**
- Vérifiez que `RESEND_API_KEY` est configuré
- Consultez les logs Netlify/Vercel (Functions > send-quote)
- Vérifiez le dashboard Resend

**Emails en spam**
- Vérifiez votre domaine dans Resend
- Configurez les enregistrements DNS (SPF, DKIM)

---

## Licence

Propriété de Clelim Serrurerie. Tous droits réservés.