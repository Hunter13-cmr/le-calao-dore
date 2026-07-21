# Implementation Guide — Le Calao Doré

## Architecture

### Stack technique
- **Framework** : Angular 22 (standalone components)
- **Langage** : TypeScript ~6.0.2
- **Styling** : CSS natif avec variables CSS custom
- **Icônes** : Bootstrap Icons 1.13.1
- **Responsive** : Mobile-first avec breakpoints progressifs

### Structure des dossiers

```
src/
├── app/
│   ├── app.ts                    # Composant racine
│   ├── app.html                  # Template racine
│   ├── app.config.ts             # Configuration browser
│   ├── app.config.server.ts      # Configuration SSR
│   ├── app.routes.ts             # Routes
│   └── components/
│       ├── header/               # Navigation sticky
│       ├── hero/                 # Section héro avec animation
│       ├── about/                # Histoire du restaurant
│       ├── menu/                 # Carte des plats
│       ├── temoignages/         # Témoignages clients
│       ├── horaires/            # Horaires avec countdown live
│       └── footer/              # Pied de page
├── assets/
│   └── images/                   # Images statiques
├── styles.css                    # Variables globales
└── index.html                    # Point d'entrée HTML
```

## Composants

### Header (`header/`)
- **Responsabilité** : Navigation principale et menu mobile
- **Fonctionnalités** :
  - Menu desktop avec liens anchors
  - Menu hamburger avec animation CSS
  - Détection du lien actif
  - Sticky header avec backdrop blur
- **État** : `isMenuOpen`, `activeLink`
- **Breakpoints** : 768px (burger), 991px, 1199px, 1200px

### Hero (`hero/`)
- **Responsabilité** : Section d'accueil avec CTA
- **Fonctionnalités** :
  - Background image avec overlay
  - Animation typewriter sur le subtitle
  - Effet glow sur le titre
  - Deux boutons CTA (primaire/secondaire)
- **Animations** : `glow-text`, `typewriter`, `blink-caret`

### About (`about/`)
- **Responsabilité** : Présentation de l'histoire du restaurant
- **Fonctionnalités** :
  - Image de fond responsive
  - Liste de points clés avec icônes
  - Card avec bordure subtile
- **Breakpoints** : 900px, 768px, 600px, 400px

### Menu (`menu/`)
- **Responsabilité** : Affichage des plats avec filtres
- **Fonctionnalités** :
  - Filtres par catégorie (All, Entrée, Plat, Dessert)
  - Grid responsive des cartes
  - Badges colorés par catégorie
- **Catégories** : `all`, `entree`, `plat`, `dessert`

### Témoignages (`temoignages/`)
- **Responsabilité** : Affichage des avis clients
- **Fonctionnalités** :
  - Cartes avec notation par étoiles
  - Couleurs dynamiques selon rating (low/medium/high)
  - Effet hover avec élévation

### Horaires (`horaires/`)
- **Responsabilité** : Statut ouvert/fermé et compte à rebours
- **Fonctionnalités** :
  - Countdown live avec `Renderer2` et `ElementRef`
  - Mise à jour chaque seconde via `setInterval`
  - Carte "Aujourd'hui" avec horaires du jour
  - Tableau complet de la semaine
  - SSR safe : `ngAfterViewInit` + `setTimeout`
- **Images** : 100.webp (fermé), giphy.gif (ouvert), 200.webp (erreur)

### Footer (`footer/`)
- **Responsabilité** : Coordonnées, liens rapides, réseaux sociaux
- **Fonctionnalités** :
  - Grid 3 colonnes (responsive 2 puis 1)
  - Liens vers réseaux sociaux avec hover effects
  - Année auto via `currentYear`

## Design System

### Palette de couleurs
- **Forest** (`#2D4A3E`) : Couleur principale
- **Terracotta** (`#C84B31`) : Accent chaud
- **Gold** (`#E9B824`) : Couleur d'accent premium
- **Cream** (`#FAF3E0`) : Fond neutre

### Typographie
- **Police** : Poppins (Google Fonts)
- **Hiérarchie** :
  - H1 : clamp(2.75rem, 5vw, 5.5rem)
  - H2 : clamp(2rem, 3vw, 2.75rem)
  - Body : 1rem
  - Small : 0.85rem

### Espacement
- **Container max-width** : 720-900px selon sections
- **Gaps** : 1rem à 2rem
- **Paddings section** : py-5 (3rem)

### Animations
- **Breathe** : Scale 1 → 1.08 sur icône horaires
- **Pulse** : Box-shadow glow sur badge
- **Typewriter** : Effet machine à écrire sur hero subtitle
- **Glow-text** : Text-shadow animé sur hero title

## Comportements JavaScript

### Countdown live (Horaires)
```typescript
// Démarrage après hydratation SSR
ngAfterViewInit() {
  setTimeout(() => this.startLiveUpdates(), 100);
}

// Mise à jour chaque seconde
setInterval(() => {
  this.refresh(); // Met à jour les données
  this.updateDOMElements(); // Met à jour le DOM directement
}, 1000);
```

### Menu mobile
```typescript
toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
```

### Navigation active
```typescript
setActive(link: string) {
  this.activeLink = link;
  this.isMenuOpen = false; // Ferme le mobile menu
}
```

## SSR (Server-Side Rendering)

### Configuration
- **Builder** : `@angular/build:application`
- **Output mode** : `server` (SSR)
- **Prerender** : 1 static route (index)

### Sauvegardes SSR
- Pas de `window`/`document` dans les constructeurs
- `isPlatformBrowser` pour le code navigateur seulement
- `ngAfterViewInit` pour les manipulations DOM
- `Renderer2` pour les updates DOM sécurisées

## Performance

### Budgets
- **Initial bundle** : 500KB warning, 1MB error
- **Component styles** : 4KB warning, 8KB error

### Optimisations
- Standalone components (pas de NgModule)
- Lazy loading implicite par routes
- Images avec `loading="lazy"`
- CSS-minifié en production
- Tree-shaking activé

## Tests à faire

1. **Desktop** : Navigation, hover effects, countdown
2. **Tablette** : Menu burger, grilles adaptatives
3. **Mobile** : Stack vertical, lisibilité
4. **SSR** : Vérifier prerender HTML
5. **Performance** : Lighthouse audit
6. **Accessibilité** : ARIA labels, contrast ratios