# Checklist — Le Calao Doré

## Installation et configuration

- [x] Projet Angular 22 initialisé avec SSR
- [x] Tailwind CSS v4 configuré
- [x] Bootstrap 5.3.8 et Bootstrap Icons installés
- [x] Variables CSS (forest, terracotta, gold, cream)
- [x] Structure des composants créée

## Composants

### Header
- [x] Sticky header avec backdrop blur
- [x] Navigation desktop (6 liens)
- [x] Menu burger avec animation CSS
- [x] Détection du lien actif
- [x] Responsive : 768px, 991px, 1199px, 1200px
- [x] Typographie agrandie (1.15rem liens, 1.05rem bouton)

### Hero
- [x] Background image avec overlay
- [x] Animation typewriter sur subtitle
- [x] Animation glow-text sur titre
- [x] Deux CTA (primaire secondaire)
- [x] Responsive : 900px, 768px, 600px, 400px

### About
- [x] Section "Notre histoire"
- [x] Image de fond responsive
- [x] Liste de points clés avec icônes
- [x] Card avec bordure subtile
- [x] Responsive : 900px, 768px, 600px, 400px

### Menu
- [x] 8 plats répartis en 3 catégories
- [x] Filtres All/Entrée/Plat/Dessert
- [x] Cartes Bootstrap avec images
- [x] Badges colorés par catégorie
- [x] Responsive : 768px, 600px, 400px

### Témoignages
- [x] 3 témoignages clients
- [x] Système d'étoiles (1-5)
- [x] Classes CSS dynamiques selon rating
- [x] Hover effect avec élévation
- [x] Responsive : 768px, 600px, 400px

### Horaires
- [x] Carte de statut ouvert/fermé
- [x] Countdown live avec setInterval
- [x] Mise à jour chaque seconde
- [x] Carte "Aujourd'hui"
- [x] Tableau complet de la semaine
- [x] SSR safe : ngAfterViewInit + setTimeout
- [x] Direct DOM updates via Renderer2
- [x] Images de statut (open/close/error)
- [x] Badge "OUVERT MAINTENANT" centré

### Footer
- [x] Grid 3 colonnes responsive
- [x] Coordonnées complètes
- [x] Liens réseaux sociaux (Facebook, Instagram, WhatsApp)
- [x] Liens rapides
- [x] Année auto
- [x] Responsive : 900px, 768px, 600px, 400px

## Design et UX

- [x] Palette cohérente (forest, terracotta, gold, cream)
- [x] Typographie Poppins
- [x] Animations discrètes (breathe, pulse, typewriter, glow)
- [x] Hover effects sur cartes et liens
- [x] Transitions fluides (0.25s - 0.3s)
- [x] Espacement généreux et respirabilité

## Responsive

- [x] Mobile-first approach
- [x] Breakpoints : 400px, 600px, 768px, 900px, 991px, 1199px, 1200px
- [x] Menu burger fonctionnel
- [x] Grilles adaptatives
- [x] Typographie responsive (clamp)
- [x] Images adaptatives

## Performance

- [x] Build réussi sans erreur
- [x] Standalone components (pas de NgModule)
- [x] Lazy loading implicite
- [x] Images avec loading="lazy"
- [x] CSS minifié en production
- [x] Tree-shaking activé

## SSR

- [x] Prerender HTML fonctionnel
- [x] Pas de window/document dans constructeurs
- [x] isPlatformBrowser pour code navigateur
- [x] ngAfterViewInit pour manipulations DOM
- [x] Renderer2 pour updates DOM sécurisées
- [x] Aucune erreur d'hydratation

## Documentation

- [x] README.md complet
- [x] docs/implementation.md
- [x] docs/quick_start.md
- [x] docs/guide.md
- [x] docs/commits.md
- [x] docs/checklist.md
- [x] Commentaires dans le code
- [x] JSDoc sur méthodes complexes

## Tests manuels

- [x] Desktop : navigation, hover, countdown
- [x] Tablette : menu burger, grilles
- [x] Mobile : stack vertical, lisibilité
- [x] Console : aucune erreur (F12)
- [x] SSR : prerender HTML vérifié
- [x] Liens : navigation smooth scroll
- [x] Images : chargement correct
- [x] Animations : fluides (60fps)

## Accessibilité

- [x] alt sur toutes les images
- [x] aria-label sur boutons icônes
- [x] Contraste suffisant (WCAG AA)
- [x] Navigation clavier possible
- [x] Structure sémantique HTML5

## SEO

- [x] Meta description
- [x] OpenGraph tags
- [x] Title tag
- [x] Lang attribute (fr)
- [x] Favicon

## Prochaines étapes (non bloquant)

- [ ] Ajouter plus d'images menu
- [ ] Intégrer API de réservation
- [ ] Ajouter page de contact
- [ ] Tests unitaires (Jest/Vitest)
- [ ] Tests E2E (Playwright/Cypress)
- [ ] Internationalisation (i18n)
- [ ] PWA (Service Worker)
- [ ] Analytics (Google Analytics)
- [ ] Capture d'écran pour README

---

**Statut global** : ✅ **MVP COMPLET ET FONCTIONNEL**

Date de dernière vérification : 21/07/2026