# Le Calao Doré — Site Vitrine (Angular 22)

Projet réalisé pour Angular Talent Lab 2026 — site vitrine responsive pour un restaurant camerounais.

Slogan : « Les saveurs authentiques du Cameroun »

---

## Prérequis

- Node.js 18+ et npm (ou Yarn)
- Angular CLI (optionnel)

## Installation

```bash
npm install
# ou
# yarn install
```

## Lancer le serveur de développement

```bash
npm run start
```

Le serveur démarre sur `http://localhost:8080` (script `start` configuré pour le port 8080).

## Structure importante

- `src/app/components/` : composants standalone (header, hero, about, menu, temoignages, horaires, footer)
- `public/assets/menu/` : images des plats
- `public/assets/images/` : images additionnelles (about, décor)

## Images (à vérifier / ajouter)

Place les images suivantes dans `public/assets/menu/` et `public/assets/images/` :

- `public/restaurant.jpg` — image pour le hero
- `public/assets/menu/poulet.jpg`
- `public/assets/menu/poulets.jpg`
- `public/assets/menu/brochettes.jpg`
- `public/assets/menu/ndole.jpg`
- `public/assets/menu/beignet.jpg`
- `public/assets/menu/salade.jpg`
- `public/assets/menu/dish-1.svg`
- `public/assets/menu/dish-2.svg`
- `public/assets/images/about-hero.jpg` — image pour la section "Notre histoire"

> Astuce : plusieurs images sont déjà présentes dans `public/assets/menu/`.

## Commandes Git utiles

```bash
# initialiser le dépôt
git init
git add .
git commit -m "Initial commit — Le Calao Doré"

# bonnes pratiques : branches feature
git checkout -b feat/menu
git add .
git commit -m "feat(menu): add 8 dishes and responsive grid"

# pousser vers GitHub (préparer remote avant)
git remote add origin git@github.com:USERNAME/le-calao-dore.git
git push -u origin main
```

## Checklist fournie

- Angular 22 (standalone components) — OUI
- Bootstrap 5 et Bootstrap Icons — inclus
- Sections obligatoires présentes — OUI
- Responsive (mobile <600px, tablette 600–900px, desktop >=900px) — OUI
- `@for`, `@if`, `@switch`, `[ngClass]`, `[class]`, `[style]` : utilisés dans templates
- Statut dynamique "OUVERT MAINTENANT" implémenté dans `src/app/components/horaires/horaires.ts`

## Tests rapides

1. `npm run start`
2. Ouvrir `http://localhost:8080`
3. Vérifier :
	- pas d'erreurs dans la console (F12)
	- menu burger sur mobile s'ouvre/ferme
	- 8 plats affichés (menu)
	- 3 témoignages avec étoiles et couleurs
	- jour courant mis en évidence dans Horaires

## Prochaines étapes que je peux faire pour toi

- Générer 10 commits bien décrits et push sur GitHub (si tu fournis accès)
- Produire captures d'écran Desktop/Mobile et les placer dans `docs/screenshots/`
- Améliorer SEO / meta tags et OpenGraph

Si tu veux que je prépare le repo final public et le pousse sur GitHub, donne-moi le nom du repo et j'expliquerai la procédure ou je la ferai pour toi si tu donnes l'accès.

---
Fichier mis à jour automatiquement par l'agent — dis‑moi si tu veux un README bilingue ou avec captures intégrées.
