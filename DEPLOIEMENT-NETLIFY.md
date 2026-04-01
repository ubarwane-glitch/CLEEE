# 🚀 Déploiement sur Netlify - Guide Complet

## ✅ Configuration Validée

Le projet est prêt pour le déploiement avec:

- ✅ Build réussi
- ✅ Email Resend configuré
- ✅ Fonction serverless testée
- ✅ Destination: `clelimserrurerie@gmail.com`

## 📋 Prérequis

1. Compte GitHub (gratuit): https://github.com/signup
2. Compte Netlify (gratuit): https://app.netlify.com/signup
3. Code du projet sur votre ordinateur

## 🔧 Étape 1: Mettre le Code sur GitHub

### 1.1 Créer un Repository

1. Allez sur https://github.com/new
2. Nom du repository: `clelim-serrurerie`
3. Visibilité: **Private** (recommandé)
4. Cliquez **Create repository**

### 1.2 Push le Code

Dans le dossier de votre projet:

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Site Clelim Serrurerie"

# Lier au repository GitHub
git remote add origin https://github.com/VOTRE_USERNAME/clelim-serrurerie.git

# Envoyer le code
git push -u origin main
```

**Remplacez** `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

## 🌐 Étape 2: Déployer sur Netlify

### 2.1 Créer le Site

1. Allez sur https://app.netlify.com
2. Cliquez **Add new site** > **Import an existing project**
3. Sélectionnez **Deploy with GitHub**
4. Autorisez Netlify à accéder à GitHub
5. Sélectionnez le repository: `clelim-serrurerie`

### 2.2 Configuration du Build

Netlify détecte automatiquement la configuration. Vérifiez:

```
Build command: npm run build
Publish directory: .
```

Cliquez **Deploy site**

### 2.3 Attendre le Déploiement

Le premier déploiement prend **2-3 minutes**.

Vous verrez:
```
✅ Site is live
```

Notez l'URL temporaire: `https://random-name-123456.netlify.app`

## 🔑 Étape 3: Configurer les Variables d'Environnement

**IMPORTANT:** Sans ces variables, les emails ne fonctionneront pas!

### 3.1 Accéder aux Variables

1. Dans Netlify, cliquez sur votre site
2. **Site settings**
3. **Environment variables** (dans le menu de gauche)
4. Cliquez **Add a variable**

### 3.2 Ajouter Chaque Variable

Ajoutez ces 4 variables **une par une**:

#### Variable 1: RESEND_API_KEY

```
Key: RESEND_API_KEY
Value: re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4
```

Cliquez **Create variable**

#### Variable 2: FROM_EMAIL

```
Key: FROM_EMAIL
Value: onboarding@resend.dev
```

Cliquez **Create variable**

#### Variable 3: TO_EMAIL

```
Key: TO_EMAIL
Value: clelimserrurerie@gmail.com
```

Cliquez **Create variable**

#### Variable 4: SEND_COPY_TO_CLIENT

```
Key: SEND_COPY_TO_CLIENT
Value: true
```

Cliquez **Create variable**

### 3.3 Redéployer

Après avoir ajouté toutes les variables:

1. Allez dans **Deploys**
2. Cliquez **Trigger deploy** > **Clear cache and deploy site**
3. Attendez 1-2 minutes

## ✅ Étape 4: Tester en Production

### 4.1 Ouvrir le Site

Cliquez sur l'URL de votre site (ex: `https://random-name-123456.netlify.app`)

### 4.2 Tester le Formulaire

1. Appuyez sur **F12** pour ouvrir la console
2. Remplissez le formulaire de devis:
   - Nom: Jean Test
   - Email: votre-email@test.com
   - Téléphone: 06 12 34 56 78
   - Adresse: 123 rue Test
   - Code postal: 75001
   - Ville: Paris
   - Catégorie: Urgence - Porte claquée
   - Service: Ouverture de porte claquée
   - Description: Test du formulaire

3. Cliquez **OBTENIR MON DEVIS GRATUIT**

### 4.3 Vérifier les Résultats

#### Console Navigateur (F12)

Vous devriez voir:
```
✅ PDF generated successfully
📤 Sending request to: /.netlify/functions/send-quote
✅ Email sent successfully!
```

#### Email à clelimserrurerie@gmail.com

Allez sur https://mail.google.com et connectez-vous avec `clelimserrurerie@gmail.com`

Vous devriez avoir reçu:
- **Sujet:** Nouveau devis - Jean Test - DEVIS-XXXXXXXX
- **Pièce jointe:** PDF du devis

**Vérifiez aussi le dossier SPAM!**

#### Email au Client (si configuré)

Si vous avez mis votre email dans le formulaire, vous devriez aussi recevoir une copie.

## 🎨 Étape 5: Personnaliser le Domaine (Optionnel)

### 5.1 Domaine Netlify Gratuit

1. Dans Netlify: **Site settings** > **Domain management**
2. Cliquez **Options** > **Edit site name**
3. Changez en: `clelim-serrurerie`
4. Votre URL devient: `https://clelim-serrurerie.netlify.app`

### 5.2 Domaine Personnalisé (Payant)

Si vous avez acheté `clelim-serrurerie.fr`:

1. **Domain management** > **Add custom domain**
2. Entrez: `clelim-serrurerie.fr`
3. Suivez les instructions DNS
4. Attendez 24-48h pour la propagation

## 🐛 Dépannage

### Email Non Reçu

**Vérifiez dans l'ordre:**

1. **Spam de clelimserrurerie@gmail.com**
   - L'email est peut-être dans le spam

2. **Logs Netlify:**
   - **Functions** > **send-quote**
   - Cliquez sur un déploiement
   - Vérifiez les erreurs

3. **Variables d'environnement:**
   - **Site settings** > **Environment variables**
   - Vérifiez que les 4 variables existent
   - Vérifiez qu'il n'y a pas d'espace avant/après les valeurs

4. **Dashboard Resend:**
   - https://resend.com/emails
   - Vérifiez si l'email a été envoyé
   - Statut: Delivered, Bounced, Failed?

### Erreur 500 dans la Console

**Console navigateur affiche:**
```
❌ HTTP Error: 500
```

**Solutions:**

1. **Logs Netlify Functions:**
   - **Functions** > **send-quote** > **Function log**
   - Lisez l'erreur exacte

2. **Erreur commune:** `RESEND_API_KEY not configured`
   - Vérifiez les variables d'environnement
   - Redéployez après les avoir ajoutées

### Fonction 404

**Console affiche:**
```
POST /.netlify/functions/send-quote 404
```

**Solutions:**

1. **Vérifiez que le fichier existe:**
   - Repository GitHub > `netlify/functions/send-quote.js`

2. **Redéployez:**
   - **Deploys** > **Trigger deploy** > **Clear cache and deploy site**

3. **Build logs:**
   - Vérifiez qu'il n'y a pas d'erreur de build

### PDF Ne Se Génère Pas

**Console affiche:**
```
❌ jsPDF is not loaded
```

**Solutions:**

1. **Videz le cache du navigateur:**
   - Ctrl+Shift+Delete (Windows)
   - Cmd+Shift+Delete (Mac)

2. **Mode Incognito:**
   - Testez en navigation privée

3. **Autre navigateur:**
   - Testez sur Chrome, Firefox, Safari

## 📊 Monitoring

### Dashboard Netlify

Consultez les statistiques:

- **Analytics:** Visiteurs, pages vues
- **Functions:** Nombre d'appels, durée, erreurs
- **Deploys:** Historique des déploiements

### Dashboard Resend

https://resend.com/emails

- Tous les emails envoyés
- Statut de livraison
- Taux d'ouverture
- Bounces et erreurs

## 🔄 Mises à Jour

Pour mettre à jour le site:

```bash
# Modifiez vos fichiers localement

# Commitez les changements
git add .
git commit -m "Description des modifications"

# Envoyez sur GitHub
git push

# Netlify redéploie automatiquement!
```

Le site est mis à jour en 1-2 minutes.

## ✅ Checklist Finale

Après le déploiement, vérifiez:

- [ ] Site accessible via l'URL Netlify
- [ ] Page d'accueil s'affiche correctement
- [ ] Formulaire peut être rempli
- [ ] Soumission du formulaire réussit
- [ ] Message de succès s'affiche
- [ ] Email reçu sur `clelimserrurerie@gmail.com`
- [ ] PDF en pièce jointe s'ouvre
- [ ] Copie envoyée au client (si activé)
- [ ] Test sur mobile
- [ ] Test sur différents navigateurs

## 🎯 Résumé des URLs

### Développement

- Local: `http://localhost:3000`

### Production

- Netlify: `https://clelim-serrurerie.netlify.app`
- Custom: `https://clelim-serrurerie.fr` (si configuré)

### Dashboards

- Netlify: https://app.netlify.com
- Resend: https://resend.com/emails
- GitHub: https://github.com/VOTRE_USERNAME/clelim-serrurerie

## 📞 Support

### Documentation

- Netlify: https://docs.netlify.com
- Resend: https://resend.com/docs
- Projet: Voir `LOCAL-DEV-GUIDE.md`

### Logs

- **Netlify Functions:** Site > Functions > send-quote
- **Netlify Build:** Site > Deploys > [Déploiement] > Deploy log
- **Resend Emails:** https://resend.com/emails

---

**Vous êtes prêt!** Le déploiement prend environ **15 minutes** au total. 🚀

Une fois déployé, le système fonctionne automatiquement:

1. Client remplit le formulaire
2. PDF généré automatiquement
3. Email envoyé à `clelimserrurerie@gmail.com`
4. Copie envoyée au client

**Tout est automatisé!** 🎉
