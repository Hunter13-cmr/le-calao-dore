import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'entree' | 'plat' | 'dessert';
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu {
  categories: Array<'all' | Dish['category']> = ['all', 'entree', 'plat', 'dessert'];
  activeCategory: 'all' | Dish['category'] = 'all';

  menu: Dish[] = [
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
      name: 'fillet de poisson grillé',
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
    {
      id: 3,
      name: 'Velouté de potimarron',
      description: 'Soupe onctueuse au potimarron, relevée d\'une touche de crème.',
      price: 7000,
      image: '/assets/menu/Velouté de potimarron.jpg',
      category: 'dessert',
    },
  ];

  setCategory(category: 'all' | Dish['category']) {
    this.activeCategory = category;
  }

  get visibleMenu() {
    return this.activeCategory === 'all'
      ? this.menu
      : this.menu.filter((dish) => dish.category === this.activeCategory);
  }

  getCategoryLabel(category: 'all' | Dish['category']) {
    return category === 'all'
      ? 'Tous'
      : category === 'entree'
      ? 'Entrées'
      : category === 'plat'
      ? 'Plats'
      : 'Desserts';
  }
}
