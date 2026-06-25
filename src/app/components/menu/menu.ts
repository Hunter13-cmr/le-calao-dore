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
      name: 'Ailes de poulet épicées',
      description: 'Poulet grillé aux épices du Cameroun, servi avec une sauce pimentée maison.',
      price: 19000,
      image: '/assets/menu/poulet.jpg',
      category: 'entree',
    },
    {
      id: 2,
      name: 'Brochettes de poisson braisé',
      description: 'Poisson frais mariné et grillé sur braise, accompagné de légumes croquants.',
      price: 12000,
      image: '/assets/menu/brochettes.jpg',
      category: 'entree',
    },
    {
      id: 3,
      name: 'Poulet DG',
      description: 'Poulet mijoté aux bananes plantains et légumes, plat emblématique de Douala.',
      price: 15000,
      image: '/assets/menu/poulets.jpg',
      category: 'plat',
    },
    {
      id: 4,
      name: 'Ndolé traditionnel',
      description: 'Feuilles d’amarante, arachides et poisson séché, servi avec du riz blanc.',
      price: 14000,
      image: '/assets/menu/ndole.jpg',
      category: 'plat',
    },
    {
      id: 5,
      name: 'Koki au poisson fumé',
      description: 'Préparé avec de la farine de haricots et du poisson fumé, servi bien épicé.',
      price: 16000,
      image: '/assets/menu/dish-1.svg',
      category: 'plat',
    },
    {
      id: 6,
      name: 'Poulet bicyclette grillé',
      description: 'Poulet grillé à la perfection, mariné dans une sauce aux herbes africaines.',
      price: 17000,
      image: '/assets/menu/dish-2.svg',
      category: 'plat',
    },
    {
      id: 7,
      name: 'Beignets de banane',
      description: 'Beignets sucrés et moelleux, parfumés à la vanille et au citron vert.',
      price: 6000,
      image: '/assets/menu/beignet.jpg',
      category: 'dessert',
    },
    {
      id: 6,
      name: 'Poulet bicyclette grillé',
      description: 'Poulet grillé à la perfection, mariné dans une sauce aux herbes africaines.',
      price: 17000,
      image: '/assets/menu/dish-2.svg',
      category: 'plat',
    },
    {
      id: 7,
      name: 'Beignets de banane',
      description: 'Beignets sucrés et moelleux, parfumés à la vanille et au citron vert.',
      price: 6000,
      image: '/assets/menu/beignet.jpg',
      category: 'dessert',
    },
    {
      id: 8,
      name: 'Salade de fruits exotiques',
      description: 'Fruits frais de saison, arrosés d’un sirop léger au gingembre.',
      price: 7000,
      image: '/assets/menu/salade.jpg',
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
