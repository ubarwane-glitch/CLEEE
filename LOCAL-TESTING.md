# 🧪 Test Local du Système de Devis

## ⚠️ Important à Comprendre

En développement local, **l'envoi d'email ne fonctionnera PAS** car les fonctions serverless (Netlify/Vercel) ne sont pas disponibles.

**MAIS:** La génération du PDF fonctionne parfaitement en local!

## 🎯 Ce qui fonctionne en local

✅ Formulaire de devis
✅ Validation des champs
✅ Calcul des prix
✅ **Génération du PDF**
✅ Logs de débogage dans la console

❌ Envoi d'email (nécessite déploiement)

## 🚀 Démarrer le Test Local

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer le serveur

```bash
npm run dev
```

Le site sera disponible sur: **http://localhost:3000**

### 3. Ouvrir la Console Développeur

**Très important:** Vous devez ouvrir la console pour voir si le PDF est généré.

- **Windows/Linux:** `F12` ou `Ctrl + Shift + I`
- **Mac:** `Cmd + Option + I`

Ou clic droit sur la page > "Inspecter" > Onglet "Console"

## 📋 Tester le Formulaire

### 1. Remplir le formulaire

```
Nom: Jean Test
Email: test@example.com
Téléphone: 06 12 34 56 78
Adresse: 123 Rue de Test
Code postal: 75001
Ville: Paris
Service: Choisissez n'importe quel service
Urgence: Normal
```

### 2. Cliquer sur "Obtenir mon devis gratuit"

### 3. Vérifier la Console

Vous devriez voir ces messages dans la console:

```
🔍 Form submitted - Checking dependencies...
   businessConfig: ✅ LOADED
   quoteConfig: ✅ LOADED
   generateQuoteNumber: ✅ LOADED
   generateQuotePDF: ✅ LOADED
   jsPDF: ✅ LOADED

✅ All dependencies loaded, generating quote...

📄 Generating PDF...
   Quote number: DEVIS-20260401-XXXX
   Client: Jean Test
   Total: 100 €

✅ PDF generated successfully
✅ PDF converted to base64 (XXXXX characters)

📧 Preparing to send email...
   API Endpoint: /.netlify/functions/send-quote
   Environment: localhost

📤 Sending request to: /.netlify/functions/send-quote

❌ Form submission error: TypeError: Failed to fetch
   Error name: TypeError
   Error message: Failed to fetch
   Stack trace: ...

💡 Tip: This is normal in local development.
   The serverless function only works when deployed.
   PDF generation worked, but email sending requires deployment.
```

## ✅ Interprétation des Résultats

### Si vous voyez "✅ PDF generated successfully"

**🎉 SUCCÈS!** Le système fonctionne correctement!

L'erreur "Failed to fetch" est **NORMALE** en local. Elle signifie que:
- ✅ Le PDF a été généré avec succès
- ✅ Toutes les dépendances sont chargées
- ❌ L'envoi email ne fonctionne pas (car fonction serverless non disponible)

**Solution:** Déployer sur Netlify ou Vercel pour tester l'envoi complet.

### Si vous voyez "❌ MISSING" pour une dépendance

Exemple:
```
businessConfig: ❌ MISSING
```

**Problème:** Un fichier de configuration n'est pas chargé.

**Solution:**
1. Vérifiez que le fichier existe dans `config/`
2. Vérifiez qu'il est chargé dans `index.html`
3. Videz le cache du navigateur (`Ctrl + F5`)
4. Consultez `TROUBLESHOOTING.md`

### Si vous voyez "jsPDF library not loaded"

**Problème:** La librairie jsPDF n'est pas chargée.

**Solution:**
1. Vérifiez votre connexion internet
2. Vérifiez que cette ligne existe dans `index.html`:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
   ```
3. Videz le cache du navigateur

## 🔍 Autres Vérifications

### Vérifier le PDF dans la Console

Dans la console, vous pouvez voir:
- Le numéro de devis généré
- Les informations du client
- Le total calculé
- La taille du PDF en base64

### Télécharger le PDF Manuellement (Test Avancé)

Si vous voulez voir le PDF généré, ajoutez ce code dans la console:

```javascript
// Simuler la génération du PDF
const testData = {
  business: businessConfig.company,
  client: {
    name: 'Jean Test',
    email: 'test@example.com',
    phone: '06 12 34 56 78',
    address: '123 Rue de Test',
    postalCode: '75001',
    city: 'Paris'
  },
  quote: {
    number: 'DEVIS-TEST-001',
    description: 'Test',
    createdDate: new Date().toLocaleDateString('fr-FR'),
    validityDate: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('fr-FR'),
    totalHT: 100,
    totalTVA: 0,
    totalTTC: 100,
    notes: businessConfig.quote.notes
  },
  lineItems: [
    { description: 'Service test', quantity: 1, unitPrice: 100, total: 100 }
  ],
  includeCGV: true
};

// Ajouter les données manquantes
testData.business.certificationMention = businessConfig.legal?.certificationMention || '';
testData.business.cgv = businessConfig.cgv || [];

// Générer et télécharger le PDF
const pdf = generateQuotePDF(testData);
pdf.save('test-devis.pdf');
```

Cela téléchargera un PDF de test que vous pourrez ouvrir.

## 🎨 Personnalisation du PDF

Pour modifier l'apparence du PDF, éditez:

```
utils/generateQuotePdf.js
```

Vous pouvez changer:
- Les couleurs (`primaryColor`, `goldColor`)
- Les polices
- La mise en page
- Le contenu

## 🚀 Prochaine Étape: Déploiement

Pour tester l'envoi d'email complet:

### Option 1: Netlify (Recommandé)

```bash
# 1. Pusher le code sur Git
git add .
git commit -m "Add quote system with PDF generation"
git push

# 2. Sur Netlify:
#    - Connecter le repository
#    - Build command: npm run build
#    - Publish directory: .
#    - Variables d'environnement:
#      RESEND_API_KEY=re_Gv3yW9ed_DcQp6XZbZ5DNqi4vdu4XSg2b
#      FROM_EMAIL=onboarding@resend.dev
#      TO_EMAIL=ubarwane@gmail.com

# 3. Tester sur le site déployé
```

### Option 2: Vercel

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Déployer
vercel

# 3. Configurer les variables
vercel env add RESEND_API_KEY
vercel env add FROM_EMAIL
vercel env add TO_EMAIL

# 4. Redéployer
vercel --prod
```

## 📊 Checklist de Test Local

- [ ] Serveur démarré (`npm run dev`)
- [ ] Console développeur ouverte (F12)
- [ ] Formulaire rempli
- [ ] Clic sur "Obtenir mon devis gratuit"
- [ ] Vérifier la console:
  - [ ] Toutes les dépendances "LOADED"
  - [ ] "PDF generated successfully"
  - [ ] "Failed to fetch" (normal en local)
- [ ] (Optionnel) PDF téléchargé manuellement

## 🆘 En cas de Problème

### Le formulaire ne fait rien

1. Vérifiez la console pour les erreurs
2. Vérifiez que tous les champs sont remplis
3. Videz le cache (`Ctrl + F5`)

### Erreur "businessConfig not loaded"

1. Vérifiez que `config/business.config.js` existe
2. Vérifiez qu'il est chargé dans `index.html`
3. Videz le cache du navigateur

### Erreur "jsPDF library not loaded"

1. Vérifiez votre connexion internet
2. Vérifiez la console pour erreurs de chargement
3. Testez le CDN: https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js

### Le PDF ne se génère pas

1. Consultez `TROUBLESHOOTING.md`
2. Vérifiez tous les fichiers dans `config/` et `utils/`
3. Vérifiez la console pour l'erreur exacte

## 📚 Documentation Utile

- `TROUBLESHOOTING.md` - Dépannage détaillé
- `QUICK-START.md` - Guide de démarrage
- `TEST-RESEND-GUIDE.md` - Tests Resend
- `IMPLEMENTATION-COMPLETE.md` - Vue d'ensemble

## ✨ Résumé

**En local:**
- ✅ Le formulaire fonctionne
- ✅ Le PDF est généré
- ❌ L'email n'est pas envoyé (c'est normal)

**En production (après déploiement):**
- ✅ Le formulaire fonctionne
- ✅ Le PDF est généré
- ✅ L'email est envoyé avec le PDF

**Message clé:** Si vous voyez "PDF generated successfully" dans la console, tout fonctionne correctement! L'erreur "Failed to fetch" est attendue en local.
