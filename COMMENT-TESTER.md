# 🧪 Comment Tester - Guide Rapide

## 🚀 Test Local (5 minutes)

### 1. Démarrer le Serveur

```bash
npm run dev
```

Vous verrez:
```
🚀 Serveur de développement démarré!
📍 URL: http://localhost:3000
📧 Les emails seront envoyés à: clelimserrurerie@gmail.com
```

### 2. Ouvrir le Site

Allez sur: **http://localhost:3000**

### 3. Remplir le Formulaire

Faites défiler jusqu'à "OBTENEZ UNE ESTIMATION RAPIDE" et remplissez:

- **Nom complet:** Jean Test
- **Email:** votre-email@test.com
- **Téléphone:** 06 12 34 56 78
- **Adresse:** 123 rue Test
- **Code postal:** 75001
- **Ville:** Paris
- **Type d'urgence:** Normal (Standard)
- **Catégorie:** Urgence - Porte claquée
- **Service:** Ouverture de porte claquée
- **Description:** Test du système de devis

### 4. Appuyer sur F12

Ouvrez la **Console** du navigateur (F12) pour voir les logs.

### 5. Soumettre

Cliquez: **OBTENIR MON DEVIS GRATUIT**

### 6. Vérifier la Console Navigateur

Vous devriez voir:
```
📄 Generating PDF...
✅ PDF generated successfully
📧 Preparing to send email...
📤 Sending request to: /.netlify/functions/send-quote
📨 Response received: 200 OK
✅ Email sent successfully!
```

### 7. Vérifier la Console Serveur

Dans le terminal où vous avez lancé `npm run dev`:
```
📨 Nouvelle demande de devis reçue
📧 Client: Jean Test
📄 Devis: DEVIS-20260401-001
📤 Envoi email à: clelimserrurerie@gmail.com
✅ Email envoyé avec succès!
   Email ID: xxxxxxxxx
```

### 8. Vérifier l'Email

1. Allez sur https://mail.google.com
2. Connectez-vous avec: **clelimserrurerie@gmail.com**
3. Cherchez l'email (vérifiez aussi le **SPAM**)
4. Ouvrez le PDF en pièce jointe

## ✅ Que Vérifier

### Email à l'Entreprise (clelimserrurerie@gmail.com)

- [x] Sujet: "Nouveau devis - Jean Test - DEVIS-XXXXXXXX"
- [x] Corps de l'email avec toutes les informations
- [x] PDF en pièce jointe
- [x] PDF s'ouvre correctement

### Email au Client (votre-email@test.com)

- [x] Sujet: "Votre devis Clelim Serrurerie - DEVIS-XXXXXXXX"
- [x] Message de confirmation
- [x] PDF en pièce jointe

### Page Web

- [x] Message de succès affiché
- [x] Formulaire réinitialisé
- [x] Aucune erreur dans la console

## 🐛 Si Ça Ne Marche Pas

### Erreur: "Failed to fetch"

**Vous avez utilisé:** `npm run dev:simple`

**Solution:** Utilisez plutôt:
```bash
npm run dev
```

### Email Non Reçu

**Checklist:**

1. Vérifiez le **SPAM** de clelimserrurerie@gmail.com
2. Console serveur: y a-t-il une erreur?
3. Dashboard Resend: https://resend.com/emails
4. Fichier `.env` existe et contient les bonnes valeurs

### Erreur Console Serveur

**Erreur commune:**
```
❌ Resend error: Invalid API key
```

**Solution:** Vérifiez le `.env`:
```env
RESEND_API_KEY=re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4
```

## 📧 Test Email Simple

Pour tester uniquement l'envoi d'email (sans formulaire):

```bash
npm run test:resend:auto
```

Résultat attendu:
```
✅ Email envoyé avec succès!
   ID: xxxxxxxxx
   To: clelimserrurerie@gmail.com
```

## 🌐 Test en Production (après déploiement)

1. Allez sur votre URL Netlify
2. Remplissez le formulaire
3. Vérifiez `clelimserrurerie@gmail.com`

**Voir:** `DEPLOIEMENT-NETLIFY.md` pour le guide complet

## ✨ C'est Tout!

En résumé:
1. `npm run dev`
2. Ouvrir `http://localhost:3000`
3. Remplir et soumettre le formulaire
4. Vérifier `clelimserrurerie@gmail.com`

**Tout fonctionne!** 🎉
