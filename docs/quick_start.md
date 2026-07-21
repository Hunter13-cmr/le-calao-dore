# Quick Start — Le Calao Doré

## Installation en 3 étapes

```bash
# 1. Cloner / extraire le projet
cd le-calao-dore

# 2. Installer les dépendances
yarn install
# ou npm install

# 3. Lancer le serveur
yarn start
# ou npm start
```

Port par défaut : `http://localhost:8080`

## Vérifications rapides

- [ ] Page d'accueil avec hero pleine page
- [ ] Navigation smooth scroll vers sections
- [ ] Menu burger fonctionne sur mobile (< 768px)
- [ ] 8 plats affichés dans Menu
- [ ] 3 témoignages avec étoiles
- [ ] Section Horaires avec statut dynamique
- [ ] Footer avec coordonnées et réseaux sociaux

## Commandes utiles

```bash
# Développement avec SSR
yarn start

# Build production
yarn build

# Preview build SSR
yarn serve:ssr:le-calao-dore
```

## Structure rapide

```
src/app/components/
├── header/     → Navigation + menu mobile
├── hero/       → Section d'accueil
├── about/      → Histoire du restaurant
├── menu/       → Carte des plats (8 plats)
├── temoignages/ → Avis clients (3 témoignages)
├── horaires/   → Horaires + countdown live
└── footer/     → Coordonnées + réseaux
```

**Durée d'installation** : ~2 minutes
**Prérequis** : Node.js 18+