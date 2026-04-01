# Guide de Déploiement Netlify

## Problème 404 sur Netlify - Solution

Si vous obtenez une erreur 404 après avoir publié sur Netlify, suivez ces étapes:

### 1. Vérifier les fichiers manquants

Le site référence plusieurs images dans le dossier `public/` qui doivent être présentes:

- `public/logo.png` ✅ (déjà présent)
- `public/google.png` ❌ (manquant)
- `public/whatsapp.png` ❌ (manquant)
- `public/logowhats.png` ❌ (manquant)

#### Actions requises:

1. **Ajoutez les images manquantes** dans le dossier `public/`:
   - Logo Google (pour les badges d'avis)
   - Logo WhatsApp (pour les boutons)
   - Logo WhatsApp alternatif

2. **Ou téléchargez des icônes gratuites**:
   - Google: [https://www.google.com/images/branding/](https://www.google.com/images/branding/)
   - WhatsApp: Utilisez l'icône officielle ou une alternative libre

### 2. Configuration Netlify

Le site est configuré pour fonctionner automatiquement avec Netlify:

#### Méthode 1: Drag & Drop (Recommandé pour test)

1. Assurez-vous que tous les fichiers images sont présents
2. Allez sur [https://app.netlify.com/drop](https://app.netlify.com/drop)
3. Glissez-déposez **tout le dossier du projet**
4. Attendez le déploiement

#### Méthode 2: Git Deploy (Production)

1. Poussez votre code sur GitHub
2. Sur Netlify, cliquez "New site from Git"
3. Sélectionnez votre repository
4. Configuration:
   - **Build command**: `npm run build`
   - **Publish directory**: `.`
   - **Node version**: 18 (dans Build Settings)
5. Cliquez "Deploy site"

### 3. Vérifications Post-Déploiement

Une fois déployé, vérifiez:

- [ ] La page d'accueil s'affiche correctement
- [ ] Toutes les images sont visibles
- [ ] Le formulaire de contact fonctionne (teste avec un vrai envoi)
- [ ] Les boutons WhatsApp et téléphone fonctionnent
- [ ] Le changement de langue fonctionne
- [ ] La page 404 s'affiche correctement (testez avec une URL invalide)
- [ ] Les pages CGU et Politique de confidentialité s'ouvrent

### 4. Configuration du Formulaire

Le formulaire est configuré pour **Netlify Forms** (gratuit).

Pour qu'il fonctionne:

1. Après le premier déploiement, allez dans votre dashboard Netlify
2. Cliquez sur "Forms" dans le menu
3. Vous devriez voir un formulaire "contact"
4. Testez une soumission
5. Les soumissions apparaîtront dans l'onglet "Forms"

**Alternative Formspree** (si vous préférez):

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un nouveau formulaire
3. Copiez l'URL (ex: `https://formspree.io/f/xyzabc123`)
4. Éditez `config/site.config.js`:
   ```javascript
   forms: {
     formspreeEndpoint: 'https://formspree.io/f/VOTRE_ID_ICI',
     netlifyForms: false,
   }
   ```
5. Re-déployez

### 5. Domaine Personnalisé

Pour configurer votre domaine (ex: clelim-serrurerie.fr):

1. Dans Netlify, allez dans "Domain settings"
2. Cliquez "Add custom domain"
3. Entrez votre domaine
4. Suivez les instructions pour configurer les DNS:
   - Chez votre registrar (OVH, Gandi, etc.)
   - Créez un enregistrement A vers l'IP Netlify
   - Ou changez les nameservers vers Netlify

5. Activez le SSL (HTTPS) - Netlify le fait automatiquement

### 6. Dépannage

#### Erreur 404 persistante

Si vous avez toujours une 404:

1. Vérifiez que `index.html` est bien à la racine du projet
2. Dans Netlify, allez dans "Site settings" > "Build & deploy"
3. Vérifiez que "Publish directory" = `.` (point)
4. Redéployez: "Deploys" > "Trigger deploy" > "Clear cache and deploy site"

#### Images ne s'affichent pas

1. Vérifiez que le dossier `public/` contient toutes les images
2. Les chemins doivent être `public/nom-fichier.png` (pas `/public/`)
3. Re-déployez après avoir ajouté les images manquantes

#### Formulaire ne fonctionne pas

1. Vérifiez que l'attribut `netlify` est présent dans la balise `<form>`
2. Le nom du formulaire doit correspondre dans le `name="form-name"` hidden input
3. Attendez quelques minutes après le premier déploiement
4. Vérifiez dans Netlify > Forms que le formulaire est détecté

### 7. Checklist Finale

Avant de partager le site:

- [ ] Tous les fichiers images sont présents
- [ ] Le site se charge sans erreur 404
- [ ] Test du formulaire réussi
- [ ] Numéros de téléphone corrects
- [ ] Email correct
- [ ] Domaine personnalisé configuré (optionnel)
- [ ] SSL/HTTPS activé
- [ ] Test sur mobile
- [ ] Test des 3 langues (FR/EN/ZH)

## Support

En cas de problème:
- Documentation Netlify: [https://docs.netlify.com/](https://docs.netlify.com/)
- Support Netlify: [https://answers.netlify.com/](https://answers.netlify.com/)
- Vérifiez les logs de déploiement dans Netlify

## Contact

Pour toute question technique sur ce projet, consultez le README.md
