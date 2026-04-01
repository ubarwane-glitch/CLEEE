# 🧪 Guide de Développement Local

## 🚀 Démarrer le Serveur Local

Le projet inclut maintenant un serveur de développement qui émule les fonctions Netlify.

### Commande

```bash
npm run dev
```

Le serveur démarre sur: `http://localhost:3000`

## ✅ Ce Qui Fonctionne en Local

Avec le nouveau serveur de développement:

- ✅ **Formulaire de devis** fonctionne complètement
- ✅ **Génération PDF** dans le navigateur
- ✅ **Envoi d'email** via Resend
- ✅ **Email à** `clelimserrurerie@gmail.com`
- ✅ **Copie au client** (si activé)

## 📧 Configuration Email

Le serveur utilise les variables d'environnement du fichier `.env`:

```env
RESEND_API_KEY=re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=clelimserrurerie@gmail.com
SEND_COPY_TO_CLIENT=true
```

## 🧪 Tester le Formulaire

1. **Démarrez le serveur:**
   ```bash
   npm run dev
   ```

2. **Ouvrez le navigateur:**
   ```
   http://localhost:3000
   ```

3. **Remplissez le formulaire:**
   - Nom complet
   - Email
   - Téléphone
   - Adresse
   - Code postal
   - Ville
   - Catégorie de service
   - Service spécifique
   - Description

4. **Cliquez "OBTENIR MON DEVIS GRATUIT"**

5. **Vérifiez la console du serveur:**

   Vous devriez voir:
   ```
   📨 Nouvelle demande de devis reçue
   📧 Client: [Nom du client]
   📄 Devis: DEVIS-XXXXXXXX
   📤 Envoi email à: clelimserrurerie@gmail.com
   ✅ Email envoyé avec succès!
      Email ID: xxxxxxxxx
   ```

6. **Vérifiez votre email:**
   - Allez sur `clelimserrurerie@gmail.com`
   - Cherchez l'email avec le PDF en pièce jointe
   - Vérifiez aussi le spam

## 🐛 Debug

### Console Navigateur (F12)

Vous devriez voir:
```
📄 Generating PDF...
✅ PDF generated successfully
📧 Preparing to send email...
📤 Sending request to: /.netlify/functions/send-quote
📨 Response received: 200 OK
✅ Email sent successfully!
```

### Console Serveur

Dans le terminal où vous avez lancé `npm run dev`:
```
📨 Nouvelle demande de devis reçue
📧 Client: Jean Dupont
📧 Email client: client@example.com
📄 Devis: DEVIS-20260401-001
💰 Total: 299 €
📤 Envoi email à: clelimserrurerie@gmail.com
✅ Email envoyé avec succès!
   Email ID: d27fc21f-217c-446c-883c-3d26a5d4a72a
```

## ❌ Erreurs Courantes

### "Failed to fetch"

**Ancien serveur `npm run dev:simple`:**
```bash
npm run dev:simple
```

Avec ce serveur simple, les fonctions Netlify ne fonctionnent pas. Utilisez plutôt:
```bash
npm run dev
```

### Email non reçu

1. **Vérifiez le spam** de clelimserrurerie@gmail.com
2. **Console serveur:** Y a-t-il une erreur?
3. **Dashboard Resend:** https://resend.com/emails
4. **Variables .env:** Sont-elles correctes?

### Erreur 500

**Console serveur** affiche l'erreur exacte. Les causes communes:

- Clé API Resend invalide
- Données manquantes dans le formulaire
- PDF base64 invalide

## 📊 Structure du Projet

```
project/
├── dev-server.js          ← Serveur de développement (nouveau!)
├── index.html             ← Page principale
├── script.js              ← Code du formulaire
├── netlify/functions/
│   └── send-quote.js      ← Fonction serverless (production)
├── .env                   ← Variables d'environnement
└── package.json
```

## 🔄 Différences Dev vs Production

### En Développement (Local)

- Serveur: `dev-server.js` (Express)
- Endpoint: `http://localhost:3000/.netlify/functions/send-quote`
- Variables: Lues depuis `.env`

### En Production (Netlify)

- Serveur: Netlify Functions
- Endpoint: `https://votre-site.netlify.app/.netlify/functions/send-quote`
- Variables: Configurées dans Netlify Dashboard

## ✅ Checklist Avant de Tester

- [ ] `.env` existe avec les bonnes valeurs
- [ ] `npm install` a été exécuté
- [ ] Express est installé (`npm list express`)
- [ ] Le serveur démarre sans erreur: `npm run dev`
- [ ] Le navigateur peut ouvrir `http://localhost:3000`

## 🚀 Tester Rapidement

### Test Complet en 1 Minute

```bash
# 1. Démarrer le serveur
npm run dev

# Dans un autre terminal:
# 2. Ouvrir dans le navigateur
open http://localhost:3000  # Mac
start http://localhost:3000 # Windows
xdg-open http://localhost:3000 # Linux

# 3. Remplir et soumettre le formulaire
# 4. Vérifier clelimserrurerie@gmail.com
```

## 📧 Test Email Direct

Pour tester uniquement l'envoi d'email (sans le formulaire):

```bash
npm run test:resend:auto
```

Résultat attendu:
```
✅ Email envoyé avec succès!
   ID: xxxxxxxxx
   To: clelimserrurerie@gmail.com
```

## 🎯 En Résumé

### Pour Développer

```bash
npm run dev
```

Tout fonctionne: formulaire, PDF, email!

### Pour Tester Uniquement l'Email

```bash
npm run test:resend:auto
```

### Pour Production

Déployez sur Netlify avec les variables d'environnement configurées.

---

**Le système est maintenant 100% testable en local!** 🎉
