import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface représentant un plat du menu.
 * @property id - Identifiant unique
 * @property name - Nom du plat
 * @property description - Description courte
 * @property price - Prix en FCFA
 * @property image - URL de l'image
 * @property category - Catégorie (entree, plat, dessert)
 */
export interface Dish {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly image: string;
  readonly category: 'entree' | 'plat' | 'dessert';
}

/**
 * Composant Menu - Carte des plats avec filtres.
 *
 * Responsabilités :
 * - Afficher les plats du restaurant
 * - Filtrer par catégorie (All, Entrée, Plat, Dessert)
 * - Présenter les prix en FCFA
 *
 * @standalone
 * @selector app-menu
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu {
  /**
   * Catégories disponibles pour le filtrage.
   * 'all' inclut toutes les catégories.
   */
  readonly categories: Array<'all' | Dish['category']> = [
    'all',
    'entree',
    'plat',
    'dessert',
  ];

  /**
   * Catégorie actuellement sélectionnée.
   * Par défaut : 'all' (tous les plats)
   */
  activeCategory: 'all' | Dish['category'] = 'all';

  /**
   * Liste complète des plats du menu.
   * 8 plats répartis en 3 catégories.
   */
  readonly menu: Dish[] = [
    {
      id: 1,
      name: 'Salade César',
      description: 'Laitue croquante, poulet grillé, croûtons, parmesan et sauce César.',
      price: 19000,
      image: '/assets/menu/Salade César.jpg',
      category: 'entree',
    },
    {
      id: 2,
      name: 'Bruschetta',
      description: 'Pain grillé garni de tomates fraîches, basilic, ail et huile d\'olive.',
      price: 12000,
      image: '/assets/menu/Bruschetta.jpg',
      category: 'entree',
    },
    {
      id: 1,
      name: 'Poulet DG',
      description: 'Spécialité camerounaise à base de poulet, plantains mûrs et légumes.',
      price: 15000,
      image: '/assets/menu/poulet DG.jpg',
      category: 'plat',
    },
    {
      id: 2,
      name: 'Fillet de poisson grillé',
      description: 'Accompagné de légumes sautés et de riz parfumé.',
      price: 14000,
      image: '/assets/menu/fillet de poisson grille.jpg',
      category: 'plat',
    },
    {
      id: 3,
      name: 'Pâte à la carbonara',
      description: 'Pâtes crémeuses au lard, parmesan et poivre noir.',
      price: 16000,
      image: '/assets/menu/plat a la carbonara.jpg',
      category: 'plat',
    },
    {
      id: 1,
      name: 'Fondant au chocolat',
      description: 'Servi chaud avec une boule de glace à la vanille.',
      price: 6000,
      image: '/assets/menu/Fondant au chocolat.jpg',
      category: 'dessert',
    },
    {
      id: 2,
      name: 'Tarte aux pommes',
      description: 'Pâte croustillante garnie de pommes caramélisées',
      price: 17000,
      image: '/assets/menu/Tarte aux pommes.jpg',
      category: 'dessert',
    },
    {
      id: 3,
      name: 'Salade de fruits',
      description: 'Mélange de fruits frais de saison, léger et rafraîchissant.',
      price: 6000,
      image: '/assets/menu/Salade de fruits.jpg',
      category: 'dessert',
    },
  ];

  /**
   * Définit la catégorie active et déclenche le filtrage.
   * @param category - La catégorie à afficher
   */
  setCategory(category: 'all' | Dish['category']): void {
    this.activeCategory = category;
  }

  /**
   * Retourne la liste des plats selon la catégorie sélectionnée.
   * Si 'all' est sélectionné, retourne tous les plats.
   */
  get visibleMenu(): Dish[] {
    return this.activeCategory === 'all'
      ? this.menu
      : this.menu.filter((dish) => dish.category === this.activeCategory);
  }

  /**
   * Retourne le label lisible d'une catégorie.
   * @param category - Code de la catégorie
   */
  getCategoryLabel(category: 'all' | Dish['category']): string {
    switch (category) {
      case 'all':
        return 'Tous';
      case 'entree':
        return 'Entrées';
      case 'plat':
        return 'Plats';
      case 'dessert':
        return 'Desserts';
      default:
        return category;
    }
  }
}