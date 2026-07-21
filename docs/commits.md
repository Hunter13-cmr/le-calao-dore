# Commits — Le Calao Doré

## Stratégie de commits

Ce projet suit la convention **Conventional Commits** :

```
type(scope): description
```

### Types
- `feat` : nouvelle fonctionnalité
- `fix` : correction de bug
- `docs` : documentation uniquement
- `style` : formatage, pas de changement de code
- `refactor` : refactoring sans feature/bug fix
- `perf` : amélioration de performance
- `test` : ajout/modification de tests
- `chore` : tâches de maintenance

## Historique des commits

### 01. Initialisation du projet
```
feat(project): initial Angular 22 SSR project setup
```

- Création du projet Angular avec SSR
- Configuration Tailwind CSS v4
- Structure de dossiers components/
- Variables CSS (forest, terracotta, gold, cream)

### 02. Header et Hero
```
feat(header): add sticky header with blur backdrop
feat(hero): add hero section with typewriter animation
```

- Header sticky avec backdrop-filter
- Navigation desktop + mobile burger
- Hero avec background image, overlay, typewriter effect
- Animation glow-text sur le titre

### 03. Menu
```
feat(menu): add menu section with category filters
```

- 8 plats répartis en 3 catégories
- Filtres All/Entrée/Plat/Dessert
- Cartes Bootstrap avec images
- Badges colorés par catégorie

### 04. Témoignages
```
feat(temoignages): add testimonials with rating system
```

- 3 témoignages clients
- Système d'étoiles (1-5)
- Classes CSS dynamiques selon rating
- Hover effect avec élévation

### 05. Horaires
```
feat(horaires): add dynamic status with live countdown
fix(horaires): SSR-safe countdown with Renderer2
```

- Carte de statut ouvert/fermé
- Countdown live avec setInterval
- Tableau horaires de la semaine
- Carte "Aujourd'hui"
- SSR safe avec ngAfterViewInit + setTimeout
- Direct DOM updates via Renderer2

### 06. About
```
feat(about): add about section with story points
```

- Histoire du restaurant
- Image de fond responsive
- Liste de points clés avec icônes

### 07. Footer
```
feat(footer): add footer with contacts and social links
```

- Grid 3 colonnes responsive
- Coordonnées, réseaux sociaux, liens rapides
- Hover effects sur les liens sociaux

### 08. Documentation
```
docs: add implementation guide and quick start
docs: add complete project guide
```

- README.md complet
- docs/implementation.md
- docs/quick_start.md
- docs/guide.md

### 09. SEO et perfezionnement
```
docs: update README with checklist and next steps
feat(seo): add OpenGraph meta tags
style(header): increase navigation size
refactor(horaires): replace icon with image
```

- Meta tags SEO
- OpenGraph tags
- Amélioration responsive header
- Perfectionnement horaires

## Commandes Git recommandées

```bash
# Initialisation
git init
git add .
git commit -m "feat(project): initial Angular 22 SSR project setup"

# Feature branches
git checkout -b feat/header-hero
# ... développement ...
git add .
git commit -m "feat(header): add sticky header with blur backdrop"
git commit -m "feat(hero): add hero section with typewriter animation"
git checkout main
git merge feat/header-hero
git push origin main

# Autre feature
git checkout -b feat/menu
# ... développement ...
git add .
git commit -m "feat(menu): add menu section with category filters"
git checkout main
git merge feat/menu
git push origin main

# Bug fix
git checkout -b fix/horaires-ssr
# ... correction ...
git add .
git commit -m "fix(horaires): SSR-safe countdown with Renderer2"
git checkout main
git merge fix/horaires-ssr
git push origin main
```

## Messages de commit idéaux

✅ **Bons exemples** :
- `feat(menu): add 8 dishes with category filters`
- `fix(horaires): prevent SSR hydration crash on interval`
- `docs(readme): add installation instructions`
- `style(header): increase navigation font size to 1.15rem`

❌ **Mauvais exemples** :
- `update`
- `fix bug`
- `changes`
- `WIP`

## Workflow recommandé

1. **Créer une branche feature** :
   ```bash
   git checkout -b feat/nom-de-la-feature
   ```

2. **Développer et committer** :
   ```bash
   git add .
   git commit -m "feat(module): description"
   ```

3. **Tester le build** :
   ```bash
   yarn build
   ```

4. **Merger vers main** :
   ```bash
   git checkout main
   git merge feat/nom-de-la-feature
   git push origin main
   ```

5. **Supprimer la branche** (optionnel) :
   ```bash
   git branch -d feat/nom-de-la-feature
   ```

## Tags et releases

```bash
# Créer un tag
git tag -a v1.0.0 -m "Version 1.0.0 — MVP complet"
git push origin v1.0.0

# Lister les tags
git tag -l

# Supprimer un tag
git tag -d v1.0.0
git push origin --delete v1.0.0