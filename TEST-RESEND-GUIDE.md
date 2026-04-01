# Guide de Test Resend

Ce guide vous explique comment tester l'envoi d'emails avec Resend pour votre système de devis.

## 📋 Prérequis

1. **Compte Resend créé** sur [resend.com](https://resend.com/signup)
2. **API Key obtenue** depuis [resend.com/api-keys](https://resend.com/api-keys)
3. **Node.js installé** (version 18+)
4. **Dépendances installées**: `npm install`

## 🔑 Configuration

### 1. Obtenir votre clé API Resend

1. Créez un compte sur [resend.com/signup](https://resend.com/signup)
2. Allez dans "API Keys" : [resend.com/api-keys](https://resend.com/api-keys)
3. Cliquez sur "Create API Key"
4. Donnez-lui un nom (ex: "Test Local")
5. Copiez la clé (format: `re_xxxxxxxxxxxxx`)

### 2. Configurer le fichier .env

Ouvrez le fichier `.env` et ajoutez/modifiez:

```env
# Votre clé API Resend (OBLIGATOIRE)
RESEND_API_KEY=re_votre_cle_ici

# Email expéditeur (pour les tests, utilisez l'email par défaut)
FROM_EMAIL=onboarding@resend.dev

# Email destinataire (l'email de votre entreprise)
TO_EMAIL=clelimserrurerie@gmail.com

# Envoyer copie au client (optionnel)
SEND_COPY_TO_CLIENT=true
```

**Note importante:** Pour les tests, utilisez `FROM_EMAIL=onboarding@resend.dev` qui est déjà vérifié par Resend. Pour la production, vous devrez vérifier votre propre domaine.

## 🧪 Tests Disponibles

### Test 1: Email Simple (Sans PDF)

Ce test envoie un email HTML sans pièce jointe pour vérifier que Resend fonctionne.

```bash
npm run test:resend
```

**Attendu:**
- ✅ Email envoyé avec succès
- ✅ Message de confirmation avec l'ID de l'email
- ✅ Email reçu dans votre boîte (ou spam)

**En cas d'erreur:**

#### Erreur 401 - Authentification

```
🔑 Erreur d'authentification:
   - Votre clé API Resend est invalide ou expirée
```

**Solution:**
1. Vérifiez que `RESEND_API_KEY` est bien défini dans `.env`
2. Vérifiez que la clé commence par `re_`
3. Créez une nouvelle clé sur [resend.com/api-keys](https://resend.com/api-keys)

#### Erreur 422 - Email non vérifié

```
📧 Erreur de validation:
   - L'adresse email "from" n'est pas vérifiée
```

**Solution:**
1. Utilisez `FROM_EMAIL=onboarding@resend.dev` dans `.env`
2. OU vérifiez votre domaine sur Resend (voir section "Vérification du domaine")

### Test 2: Email avec PDF (Complet)

Ce test génère un vrai devis PDF et l'envoie par email.

```bash
npm run test:resend:pdf
```

**Note:** Ce test nécessite que jsPDF soit disponible en environnement Node.js. Si vous obtenez une erreur, utilisez plutôt le test depuis le navigateur (voir section suivante).

**Attendu:**
- ✅ PDF généré avec un numéro de devis
- ✅ Email envoyé avec le PDF en pièce jointe
- ✅ Email reçu avec le fichier `DEVIS-XXXX.pdf` attaché

### Test 3: Test depuis le Navigateur (Recommandé)

C'est le test le plus réaliste car il utilise exactement le même code que votre formulaire.

1. **Démarrez le serveur de développement:**

```bash
npm run dev
```

2. **Ouvrez votre navigateur:**

```
http://localhost:3000
```

3. **Ouvrez la Console Développeur:**

Appuyez sur `F12` ou clic droit > "Inspecter"

4. **Remplissez le formulaire:**

- Nom: Jean Test
- Email: test@example.com
- Téléphone: 06 12 34 56 78
- Adresse: 123 Rue de Test, 75001 Paris
- Service: Choisissez n'importe quel service

5. **Cliquez sur "Obtenir mon devis gratuit"**

6. **Vérifiez la Console:**

Vous devriez voir:

```
Form submitted - Checking dependencies...
businessConfig: LOADED
quoteConfig: LOADED
generateQuoteNumber: LOADED
generateQuotePDF: LOADED
jsPDF: LOADED
```

**Si tout est LOADED:**
- ✅ Le PDF est généré
- ✅ L'email est envoyé (si déployé sur Netlify/Vercel)

**Si en local:**
- ⚠️ La fonction serverless ne fonctionnera pas
- ✅ Mais le PDF sera généré (vérifiez la console)

## 🚀 Test en Production

Pour tester l'envoi d'email complet, vous devez déployer sur Netlify ou Vercel.

### Sur Netlify

1. **Déployez votre site:**

```bash
# Poussez votre code sur Git
git add .
git commit -m "Add Resend email system"
git push
```

2. **Configurez les variables d'environnement:**

- Allez sur [app.netlify.com](https://app.netlify.com)
- Sélectionnez votre site
- Allez dans: Site Settings > Environment variables
- Ajoutez:
  - `RESEND_API_KEY` = votre clé API
  - `FROM_EMAIL` = `onboarding@resend.dev` (ou votre email vérifié)
  - `TO_EMAIL` = `clelimserrurerie@gmail.com`

3. **Redéployez:**

Netlify redéploiera automatiquement ou cliquez sur "Trigger deploy"

4. **Testez le formulaire:**

Allez sur votre site déployé et remplissez le formulaire

5. **Vérifiez les logs:**

- Netlify: Functions > send-quote > View logs
- Resend: [resend.com/emails](https://resend.com/emails)

### Sur Vercel

1. **Déployez:**

```bash
vercel
```

2. **Configurez les variables:**

```bash
vercel env add RESEND_API_KEY
vercel env add FROM_EMAIL
vercel env add TO_EMAIL
```

3. **Redéployez:**

```bash
vercel --prod
```

## 🔍 Vérification des Emails Envoyés

### Dans votre boîte mail

1. Consultez: `clelimserrurerie@gmail.com` (ou votre TO_EMAIL)
2. **Vérifiez aussi le dossier spam!**
3. Ouvrez l'email et la pièce jointe PDF

### Dashboard Resend

1. Allez sur [resend.com/emails](https://resend.com/emails)
2. Vous verrez tous vos emails envoyés
3. Cliquez sur un email pour voir:
   - Statut (Sent, Delivered, Bounced, etc.)
   - Destinataire
   - Contenu HTML
   - Pièces jointes
   - Logs de livraison

### Logs Netlify/Vercel

**Netlify:**
- Allez dans: Functions > send-quote
- Cliquez sur "View logs"
- Recherchez les erreurs

**Vercel:**
- Allez dans: Deployments > Votre déploiement > Functions
- Cliquez sur "send-quote"
- Consultez les logs

## ✅ Vérifier que tout fonctionne

### Checklist de test complet

- [ ] `npm run test:resend` réussit
- [ ] Email reçu dans la boîte mail
- [ ] Email visible sur le dashboard Resend
- [ ] Le formulaire local génère le PDF (console)
- [ ] Le site déployé envoie l'email
- [ ] Le PDF est attaché à l'email
- [ ] Le PDF s'ouvre correctement
- [ ] Les informations dans le PDF sont correctes

## 🔐 Vérification du Domaine (Production)

Pour utiliser votre propre email (`noreply@clelim-serrurerie.fr`), vous devez vérifier votre domaine.

### 1. Ajouter votre domaine dans Resend

1. Allez sur [resend.com/domains](https://resend.com/domains)
2. Cliquez "Add Domain"
3. Entrez votre domaine: `clelim-serrurerie.fr`

### 2. Configurer les DNS

Resend vous donnera des enregistrements DNS à ajouter:

**Enregistrements à ajouter chez votre hébergeur DNS:**

```
Type: TXT
Name: @ (ou vide)
Value: resend-verify=xxxxxxxxxxxxx

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@resend.dev

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com

Type: MX
Name: @
Value: feedback-smtp.resend.com
Priority: 10
```

### 3. Vérifier la configuration

1. Attendez quelques minutes (propagation DNS)
2. Sur Resend, cliquez "Verify DNS"
3. Une fois vérifié, vous pouvez utiliser: `FROM_EMAIL=noreply@clelim-serrurerie.fr`

## 📊 Limites Resend

### Plan Gratuit

- ✅ 100 emails/jour
- ✅ 3,000 emails/mois
- ✅ Domaines personnalisés
- ✅ API complète

### Plan Pro (20$/mois)

- ✅ 50,000 emails/mois
- ✅ Support prioritaire
- ✅ Analytics avancés

Pour un site de serrurerie recevant ~10 devis/jour, le plan gratuit est largement suffisant.

## 🆘 Problèmes Courants

### L'email n'arrive pas

**Solutions:**
1. Vérifiez le dossier spam
2. Attendez 1-2 minutes (délai de livraison)
3. Consultez le dashboard Resend
4. Vérifiez les logs Netlify/Vercel
5. Vérifiez que TO_EMAIL est correct

### Erreur "API key not found"

**Solutions:**
1. Vérifiez que `.env` contient `RESEND_API_KEY`
2. Redémarrez le serveur dev après modification de `.env`
3. Sur Netlify/Vercel, vérifiez les variables d'environnement
4. Redéployez après ajout des variables

### PDF non généré

**Solutions:**
1. Vérifiez la console (F12) pour les erreurs
2. Vérifiez que jsPDF est chargé
3. Consultez `TROUBLESHOOTING.md`
4. Vérifiez que tous les fichiers de config existent

### Fonction serverless ne répond pas

**Solutions:**
1. Les fonctions ne marchent pas en local (c'est normal)
2. Déployez sur Netlify/Vercel pour tester
3. Vérifiez les logs de la fonction
4. Vérifiez que le fichier existe dans `netlify/functions/send-quote.js`

## 📚 Ressources

- **Documentation Resend:** [resend.com/docs](https://resend.com/docs)
- **Dashboard:** [resend.com/emails](https://resend.com/emails)
- **API Keys:** [resend.com/api-keys](https://resend.com/api-keys)
- **Domaines:** [resend.com/domains](https://resend.com/domains)
- **Status:** [status.resend.com](https://status.resend.com)

## 💡 Conseils

1. **Testez d'abord en local** avec `npm run test:resend`
2. **Utilisez FROM_EMAIL=onboarding@resend.dev** pour les tests
3. **Vérifiez toujours le dashboard Resend** après un test
4. **Consultez les logs** en cas de problème
5. **Attendez 1-2 minutes** avant de dire que l'email n'est pas arrivé
6. **Vérifiez le spam** systématiquement

## 🎉 Prochaines Étapes

Une fois que tous les tests passent:

1. ✅ Déployez sur Netlify/Vercel
2. ✅ Configurez les variables d'environnement
3. ✅ (Optionnel) Vérifiez votre domaine
4. ✅ Testez avec un vrai devis
5. ✅ Mettez en production!

---

**Besoin d'aide?** Consultez `TROUBLESHOOTING.md` ou `QUICK-START.md`
