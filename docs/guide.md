# Guide — Le Calao Doré

## Table des matières

1. [Préparation du poste](#préparation-du-poste)
2. [Compréhension des modules](#compréhension-des-modules)
3. [Fonctionnement du SSR](#fonctionnement-du-ssr)
4. [Responsive design](#responsive-design)
5. [Gestion des images](#gestion-des-images)
6. [Tests et validation](#tests-et-validation)

---

## Préparation du poste

```bash
# Installation de Node.js 18+ (https://nodejs.org/)
node --version  # doit afficher v18+

# Installation de Yarn
yarn --version  # 1.22.x recommandé

# Initialisation
yarn install
yarn start
```

## Compréhension des modules

| Module | Responsabilité | Conteneur |
|---|---|---|
| `header` | Navigation + menu burger | `.header` |
| `hero` | Accueil + animations | `.hero` |
| `about` | Histoire + valeurs | `.about-section` |
| `menu` | Carte avec filtres | `.menu-section` |
| `temoignages` | Avis clients (rating) | `.temoignages-section` |
| `horaires` | Statut + countdown | `.horaires-section` |
| `footer` | Coordonnées + réseaux | `.footer-section` |

## Fonctionnement du SSR

### Principe
- Le HTML est pré-rendu sur le serveur
- Le navigateur hydrate le HTML existant
- **Attention** : `ngOnInit` ne s'exécute pas à l'hydratation

### Solutions adoptées
```typescript
ngOnInit() {
  // SSR: calcul initial pour prerender
  this.refresh();
}

ngAfterViewInit() {
  // Navigateur: démarre les mises à jour live
  setTimeout(() => this.startLiveUpdates(), 100);
}
```

### Pourquoi `Renderer2` ?
- `Renderer2` est compatible SSR (pas d'accès direct au DOM)
- Utilisé dans `horaires` pour les updates du compte à rebours
- Garantit le bon fonctionnement en SSR et navigateur

## Responsive design

### Breakpoints utilisés

| Breakpoint | Cible | Modification principale |
|---|---|---|
| `≥1200px` | Desktop large | Gap nav augmenté |
| `992-1199px` | Desktop | Tailles réduites |
| `768-991px` | Tablette | Logo plus petit |
| `600-767px` | Tablette portrait | Menu burger visible |
| `≤600px` | Mobile | Stack vertical |
| `≤400px` | Mobile small | Tailles minimales |

### Mobile-first
- Styles de base pour mobile
- `@media (min-width)` pour tablettes/desktop
- Grille Bootstrap + flexbox CSS

## Gestion des images

### Emplacement
- Hero : `public/restaurant.jpg`
- Menu : `public/assets/menu/*.jpg`
- About : `public/assets/images/about-hero.jpg`
- Horaires : `public/assets/images/*.webp`

### Optimisation
- `loading="lazy"` sur les images
- `object-fit: cover` pour recadrage
- Tailles adaptatives via CSS (`height` variable)

## Tests et validation

### Checklist avant commit

- [ ] `yarn build` passe sans erreur
- [ ] Aucune erreur console (F12)
- [ ] Responsive testé sur 3 tailles
- [ ] SSR prerender vérifié
- [ ] Liens naviguent vers les bonnes sections
- [ ] Images chargent correctement
- [ ] Animations fluides (60fps)

### Commandes de diagnostic

```bash
# Build avec logs détaillés
yarn build 2>&1 | tee build.log

# Vérifier les tailles de bundle
ls -lh dist/le-calao-dore/browser/

# Tester SSR
yarn serve:ssr:le-calao-dore
```

## Bonnes pratiques

### Code
- Components standalone (pas de NgModule)
- Interfaces TypeScript pour les données
- JSDoc commentaires sur méthodes complexes
- Noms de classes CSS en kebab-case

### Git
- Commits atomiques
- Messages conventionnels (feat:, fix:, docs:)
- Branches par feature

### Accessibilité
- `aria-label` sur les boutons icônes
- Contraste WCAG AA minimum
- `alt` sur toutes les images