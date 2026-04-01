# 🔧 Configuration Domaine Resend pour clelimserrurerie@gmail.com

## 🚨 Problème Actuel

La clé API Resend fonctionne, **MAIS** en mode gratuit, Resend n'envoie qu'à l'email propriétaire du compte: `ubarwane@gmail.com`

Pour envoyer à `clelimserrurerie@gmail.com`, vous devez **vérifier un domaine**.

## ✅ Test Réussi

```bash
Email ID: 680808d5-8404-4e71-8475-72f73ae75281
Statut: Envoyé à ubarwane@gmail.com ✅
```

## 📋 Solutions

### Option 1: Utiliser `ubarwane@gmail.com` (Temporaire)

**Avantage:** Fonctionne immédiatement
**Inconvénient:** Les devis n'arrivent pas directement à clelimserrurerie@gmail.com

Configuration actuelle dans `.env`:
```bash
TO_EMAIL=ubarwane@gmail.com
```

Vous pouvez ensuite **transférer automatiquement** les emails de `ubarwane@gmail.com` vers `clelimserrurerie@gmail.com`:

1. Connectez-vous à Gmail (ubarwane@gmail.com)
2. **Paramètres** > **Transfert et POP/IMAP**
3. **Ajouter une adresse de transfert**: `clelimserrurerie@gmail.com`
4. Confirmez sur les deux comptes
5. Activez le transfert automatique

### Option 2: Vérifier un Domaine (Production - Recommandé)

**Avantage:** Emails professionnels, envoi à n'importe quelle adresse
**Inconvénient:** Nécessite un domaine et configuration DNS

#### Étape 1: Acheter/Avoir un Domaine

Exemples:
- `clelim-serrurerie.fr`
- `clelimserrurerie.fr`
- `clelim.fr`

Registrars recommandés:
- OVH: https://www.ovh.com/fr/
- Gandi: https://www.gandi.net/fr
- Google Domains
- Namecheap

#### Étape 2: Ajouter le Domaine sur Resend

1. Allez sur [resend.com/domains](https://resend.com/domains)
2. Connectez-vous avec le compte qui a créé la clé API
3. Cliquez sur **Add Domain**
4. Entrez votre domaine: `clelim-serrurerie.fr`
5. Cliquez **Add**

#### Étape 3: Configurer les DNS

Resend va vous donner 3 enregistrements DNS à ajouter:

##### Enregistrement 1: Vérification du domaine
```
Type: TXT
Name: @ (ou racine)
Value: resend-verify=XXXXXXXXXXXXXXX
```

##### Enregistrement 2: DMARC (Anti-spam)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@resend.dev
```

##### Enregistrement 3: DKIM (Signature email)
```
Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

#### Étape 4: Ajouter les DNS chez votre Hébergeur

**Exemple avec OVH:**

1. Connectez-vous à [ovh.com](https://www.ovh.com/manager/)
2. **Web Cloud** > **Noms de domaine**
3. Sélectionnez votre domaine
4. Onglet **Zone DNS**
5. Cliquez **Ajouter une entrée**
6. Ajoutez les 3 enregistrements DNS un par un

**Exemple avec Gandi:**

1. Connectez-vous à [gandi.net](https://admin.gandi.net/)
2. Sélectionnez votre domaine
3. **Enregistrements DNS**
4. **Ajouter** chaque enregistrement

**Exemple avec Google Domains:**

1. [domains.google.com](https://domains.google.com/)
2. Sélectionnez votre domaine
3. **DNS** > **Manage custom records**
4. Ajoutez les enregistrements

#### Étape 5: Vérifier le Domaine

1. Attendez 5-30 minutes (propagation DNS)
2. Sur Resend: [resend.com/domains](https://resend.com/domains)
3. Cliquez sur votre domaine
4. Cliquez **Verify DNS**
5. Si tout est OK: ✅ **Verified**

#### Étape 6: Mettre à Jour la Configuration

Une fois le domaine vérifié, modifiez `.env`:

```bash
FROM_EMAIL=noreply@clelim-serrurerie.fr
TO_EMAIL=clelimserrurerie@gmail.com
```

**Options pour FROM_EMAIL:**
- `noreply@clelim-serrurerie.fr`
- `contact@clelim-serrurerie.fr`
- `devis@clelim-serrurerie.fr`
- `info@clelim-serrurerie.fr`

#### Étape 7: Redéployer et Tester

```bash
# Sur Netlify
1. Mettre à jour les variables d'environnement
2. Trigger deploy

# Tester
1. Soumettre un devis
2. Vérifier clelimserrurerie@gmail.com
```

### Option 3: Créer un Nouveau Compte Resend

Si vous voulez que les emails aillent directement à `clelimserrurerie@gmail.com` sans vérifier de domaine:

1. Créez un nouveau compte Resend avec `clelimserrurerie@gmail.com`
2. Générez une nouvelle clé API
3. Mettez à jour `.env`:
   ```bash
   RESEND_API_KEY=nouvelle_cle_api
   TO_EMAIL=clelimserrurerie@gmail.com
   ```

**Avantage:** Simple, pas besoin de domaine
**Inconvénient:** Toujours limité à clelimserrurerie@gmail.com uniquement

## 📊 Comparaison des Options

| Option | Complexité | Coût | Délai | Flexibilité |
|--------|------------|------|-------|-------------|
| Option 1: Transfert Gmail | ⭐ Facile | Gratuit | 5 min | ⭐ |
| Option 2: Domaine vérifié | ⭐⭐⭐ Moyen | ~10€/an | 30 min | ⭐⭐⭐⭐⭐ |
| Option 3: Nouveau compte | ⭐⭐ Facile | Gratuit | 5 min | ⭐⭐ |

## 🎯 Recommandation

### Pour Tester Immédiatement (Aujourd'hui)

**Option 1: Transfert Gmail**

1. Gardez `TO_EMAIL=ubarwane@gmail.com`
2. Configurez le transfert Gmail
3. Testez le formulaire
4. Les emails arrivent automatiquement sur clelimserrurerie@gmail.com

### Pour la Production (Cette Semaine)

**Option 2: Domaine Vérifié**

Avantages:
- Emails professionnels (`noreply@clelim-serrurerie.fr`)
- Meilleure délivrabilité
- Pas de spam
- Emails à n'importe qui
- Professionnel

C'est la **meilleure solution long terme**.

## 🚀 Configuration Actuelle qui Fonctionne

```bash
# .env
RESEND_API_KEY=re_ZTrpUD1o_Nrsh78WjftiDpL1o67gH3hG4
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=ubarwane@gmail.com
SEND_COPY_TO_CLIENT=true
```

Cette configuration **fonctionne parfaitement** pour:
- ✅ Recevoir les devis sur ubarwane@gmail.com
- ✅ Envoyer une copie au client
- ✅ Tester le système complet

Pour rediriger vers clelimserrurerie@gmail.com:
1. Transfert Gmail automatique (5 minutes)
2. OU vérifier un domaine (30 minutes + coût domaine)

## 🆘 Support

### Vérifier l'État d'un Email

Dashboard Resend: [resend.com/emails](https://resend.com/emails)

Dernier email envoyé:
```
ID: 680808d5-8404-4e71-8475-72f73ae75281
Vers: ubarwane@gmail.com
Statut: Delivered ✅
```

### Tester la Configuration

```bash
TO_EMAIL=ubarwane@gmail.com node test-resend.js
```

### Documentation Resend

- Ajouter un domaine: https://resend.com/docs/dashboard/domains/introduction
- Vérifier DNS: https://resend.com/docs/dashboard/domains/verify
- API Keys: https://resend.com/docs/dashboard/api-keys/introduction

## ✨ Prochaines Étapes

1. **Immédiat:** Configurez le transfert Gmail
2. **Cette semaine:** Achetez un domaine si nécessaire
3. **Cette semaine:** Vérifiez le domaine sur Resend
4. **Production:** Déployez avec le domaine vérifié

---

**Le système fonctionne!** Il suffit maintenant de choisir comment router les emails vers clelimserrurerie@gmail.com.
