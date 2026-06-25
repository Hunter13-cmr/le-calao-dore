import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-temoignages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temoignages.html',
  styleUrls: ['./temoignages.css'],
})
export class Temoignages {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Aïcha Mbarga',
      role: 'Cliente fidèle',
      rating: 5,
      text: 'Le service est toujours souriant et les plats sont parfaitement assaisonnés. Je recommande chaudement !',
    },
    {
      id: 2,
      name: 'Jean-Claude Nkeng',
      role: 'Voyageur de passage',
      rating: 3,
      text: 'J’ai apprécié la cuisine camerounaise, même si j’aurais aimé un peu plus de chaleur dans l’ambiance.',
    },
    {
      id: 3,
      name: 'Fatou Biloa',
      role: 'Amatrice de gastronomie',
      rating: 2,
      text: 'Le goût était bon mais le service était un peu lent. Dommage, il y a du potentiel.',
    },
  ];

  stars = [1, 2, 3, 4, 5];

  getRatingClass(rating: number): string {
    if (rating < 3) {
      return 'rating-low';
    }
    if (rating === 3) {
      return 'rating-medium';
    }
    return 'rating-high';
  }
}
