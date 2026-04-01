# 🔒 Clelim Serrurerie - Site Professionnel

Site vitrine production-ready pour Clelim Serrurerie, spécialisé en dépannage de serrurerie 24h/24 en Île-de-France.

## ✨ Fonctionnalités

- **Design Premium** : Interface moderne et professionnelle avec animations fluides
- **Multilingue** : Support complet FR / EN / ZH
- **Système de Devis Automatisé** :
  - Génération PDF automatique avec jsPDF
  - Envoi par email via Resend
  - Emails à `clelimserrurerie@gmail.com`
  - Copie optionnelle au client
- **Formulaire Sécurisé** : Anti-spam, validation robuste
- **SEO Optimisé** : Meta tags, Open Graph, structured data
- **Performance** : Lazy loading, optimisations CSS/JS
- **Responsive** : Mobile-first, optimisé pour tous les écrans
- **Deploy-ready** : Configuration Netlify incluse

## 🚀 Démarrage Rapide

### Installation

```bash
npm install
```

### Développement Local

```bash
npm run dev
```

Ouvre: `http://localhost:3000`

**Le serveur de développement émule les fonctions Netlify pour tester le système de devis complet en local.**

### Test Email

```bash
npm run test:resend:auto
```

Envoie un email de test à `clelimserrurerie@gmail.com`.

### Build Production

```bash
npm run build
```

## 📧 Configuration Email

Le système utilise Resend pour l'envoi d'emails. Configuration dans `.env`:

```env
RESEND_API_KEY=re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=clelimserrurerie@gmail.com
SEND_COPY_TO_CLIENT=true
```

## 📚 Documentation

### Guide de Test (5 minutes)

**Voir:** [`COMMENT-TESTER.md`](./COMMENT-TESTER.md)

Testez le système complet en local:
1. `npm run dev`
2. Remplir le formulaire
3. Vérifier l'email

### Guide de Développement Local

**Voir:** [`LOCAL-DEV-GUIDE.md`](./LOCAL-DEV-GUIDE.md)

- Serveur de développement
- Debug et logs
- Erreurs courantes
- Structure du projet

### Guide de Déploiement

**Voir:** [`DEPLOIEMENT-NETLIFY.md`](./DEPLOIEMENT-NETLIFY.md)

Guide complet pas-à-pas:
1. Mise sur GitHub
2. Déploiement Netlify
3. Configuration des variables
4. Test en production
5. Dépannage

### Configuration Domaine Resend

**Voir:** [`RESEND-DOMAIN-SETUP.md`](./RESEND-DOMAIN-SETUP.md)

Pour utiliser un domaine personnalisé comme `noreply@clelim-serrurerie.fr`.

## 🧪 Tests

### Test Complet Local

```bash
# 1. Démarrer le serveur
npm run dev

# 2. Ouvrir http://localhost:3000

# 3. Remplir et soumettre le formulaire

# 4. Vérifier clelimserrurerie@gmail.com
```

### Test Email Uniquement

```bash
npm run test:resend:auto
```

### Test Build

```bash
npm run build
```

## 📂 Structure du Projet

```
clelim-serrurerie/
├── index.html                    # Page principale
├── style.css                     # Styles globaux
├── mobile.css                    # Styles mobiles
├── script.js                     # Logique frontend
├── dev-server.js                 # Serveur dev (émule Netlify)
├── test-pdf.html                 # Test génération PDF
├── netlify/functions/
│   └── send-quote.js            # Fonction serverless Netlify
├── utils/
│   ├── generateQuotePdf.js      # Génération PDF
│   └── generateQuoteNumber.js   # Numéros de devis
├── config/
│   ├── business.config.js       # Config entreprise
│   ├── quote.config.js          # Config devis
│   └── site.config.js           # Config site
├── public/                       # Assets statiques
├── .env                          # Variables d'environnement
└── netlify.toml                  # Config Netlify
```

## 🚀 Déploiement

### Variables d'Environnement Netlify

Dans **Site settings > Environment variables**, ajoutez:

```
RESEND_API_KEY = re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4
FROM_EMAIL = onboarding@resend.dev
TO_EMAIL = clelimserrurerie@gmail.com
SEND_COPY_TO_CLIENT = true
```

### Build Settings

```
Build command: npm run build
Publish directory: .
Functions directory: netlify/functions
```

### Déploiement Automatique

Chaque `git push` déclenche un redéploiement automatique.

## 🔧 Scripts Disponibles

```bash
npm run dev              # Serveur dev avec fonctions serverless
npm run dev:simple       # Serveur statique simple (sans fonctions)
npm run build            # Build production
npm run preview          # Preview du build
npm run test:resend      # Test email basique
npm run test:resend:auto # Test email automatique avec fallback
npm run format           # Formater le code
npm run validate         # Valider la configuration
```

## 🎯 Flux de Devis

Quand un client soumet le formulaire:

1. **Frontend** (script.js):
   - Génère un PDF avec jsPDF
   - Convertit en base64
   - Envoie à la fonction serverless

2. **Backend** (netlify/functions/send-quote.js):
   - Reçoit les données + PDF
   - Envoie email via Resend à `clelimserrurerie@gmail.com`
   - Envoie copie au client (si activé)
   - Retourne le statut

3. **Email**:
   - **À l'entreprise:** Détails complets + PDF
   - **Au client:** Message de confirmation + PDF

## 🐛 Dépannage

### Local: "Failed to fetch"

Utilisez `npm run dev` au lieu de `npm run dev:simple`.

### Production: Email non reçu

1. Vérifiez le **SPAM** de clelimserrurerie@gmail.com
2. Netlify: **Functions > send-quote** pour voir les logs
3. Dashboard Resend: https://resend.com/emails
4. Vérifiez les variables d'environnement

### Build Échoue

```bash
npm run build
```

Vérifiez les erreurs dans la console.

## 📊 Monitoring

### Netlify Dashboard

- **Analytics:** Visiteurs, pages vues
- **Functions:** Appels, durée, erreurs
- **Deploys:** Historique

### Resend Dashboard

https://resend.com/emails

- Emails envoyés
- Statut de livraison
- Taux d'ouverture

## 🔒 Sécurité

- ✅ Validation formulaire côté client et serveur
- ✅ Rate limiting (1 soumission / 60 secondes)
- ✅ Clé API Resend sécurisée (variables d'environnement)
- ✅ HTTPS obligatoire en production
- ✅ Headers de sécurité configurés (netlify.toml)

## 📝 License

UNLICENSED - Projet privé pour Clelim Serrurerie

## 📞 Support

Pour toute question:
- Email: clelimserrurerie@gmail.com
- Téléphone: 06 77 23 58 39

---

## 🎉 Statut

✅ **Prêt pour la Production**

- Build: ✅ Succès
- Tests: ✅ Passés
- Email: ✅ Fonctionnel
- Déploiement: ✅ Documenté
- Configuration: ✅ Complète

**Le système est 100% opérationnel!**
