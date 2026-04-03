# Configuration des Variables d'Environnement Netlify

## URGENT: À faire MAINTENANT pour que le formulaire fonctionne

Le site fonctionne en preview mais pas en production car **les variables d'environnement ne sont pas configurées sur Netlify**.

### Étapes Obligatoires

1. **Allez sur votre dashboard Netlify:**
   - Connectez-vous à https://app.netlify.com
   - Sélectionnez le site `clelimserrurerie.com`

2. **Accédez aux variables d'environnement:**
   - Cliquez sur `Site configuration` dans le menu de gauche
   - Puis `Environment variables`
   - Ou directement: `Site settings` → `Build & deploy` → `Environment variables`

3. **Ajoutez ces 4 variables EXACTEMENT:**

```
RESEND_API_KEY = re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4
FROM_EMAIL = onboarding@resend.dev
TO_EMAIL = clelimserrurerie@gmail.com
SEND_COPY_TO_CLIENT = true
```

### Capture d'écran du processus:

1. Cliquez sur "Add a variable"
2. Key: `RESEND_API_KEY`
3. Value: `re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4`
4. Scopes: Cochez "All scopes" ou au minimum "Production" et "Deploy previews"
5. Cliquez sur "Create variable"

**Répétez pour les 3 autres variables.**

### 4. Redéployer le site

Après avoir ajouté les variables:

**Option A - Via l'interface Netlify:**
- Allez dans `Deploys`
- Cliquez sur `Trigger deploy` → `Clear cache and deploy site`

**Option B - Via Git:**
```bash
git commit --allow-empty -m "Trigger redeploy with env vars"
git push
```

### Vérification

Une fois le déploiement terminé:

1. Allez sur https://clelimserrurerie.com
2. Remplissez le formulaire de devis
3. Ouvrez la console (F12) → Console
4. Cliquez sur "OBTENIR MON DEVIS GRATUIT"

**Logs attendus:**
```
🔍 Form submitted - Checking dependencies...
✅ All dependencies loaded, generating quote...
📄 Generating PDF...
✅ PDF generated successfully
📧 Preparing to send email...
📤 Sending request to: /.netlify/functions/send-quote
📨 Response received: 200 OK
📊 Result: {success: true, ...}
✅ Email sent successfully!
```

### Dépannage

**Erreur: "RESEND_API_KEY not configured"**
→ Les variables d'environnement ne sont pas encore appliquées
→ Solution: Redéployer le site (Option A ou B ci-dessus)

**Erreur: "Failed to fetch" ou 404**
→ La fonction Netlify n'est pas déployée
→ Solution: Vérifier que `netlify.toml` contient bien la section `[functions]`

**Erreur: "Internal server error" (500)**
→ Problème avec l'API Resend
→ Solution: Vérifier que la clé API est correcte et active

### Important

- ⚠️ **Les variables du fichier `.env` local ne sont PAS utilisées en production**
- ⚠️ **Vous devez configurer les variables sur Netlify directement**
- ⚠️ **Un redéploiement est OBLIGATOIRE après l'ajout des variables**

### Contact

Si vous avez des problèmes:
1. Vérifiez les logs Netlify: `Deploys` → Cliquez sur le dernier deploy → `Function logs`
2. Vérifiez la console du navigateur (F12) pour les erreurs frontend
