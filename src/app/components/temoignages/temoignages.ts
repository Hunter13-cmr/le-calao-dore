import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface représentant un témoignage client.
 * @property id - Identifiant unique
 * @property name - Nom du client
 * @property role - Rôle ou statut du client
 * @property rating - Note sur 5 étoiles
 * @property text - Texte du témoignage
 */
export interface Testimonial {
  readonly id: number;
  readonly name: string;
  readonly role: string;
  readonly rating: number;
  readonly text: string;
}

/**
 * Composant Témoignages - Avis clients avec système de notation.
 *
 * Responsabilités :
 * - Afficher les témoignages clients
 * - Présenter un système d'étoiles (1-5)
 * - Appliquer des couleurs dynamiques selon le rating
 * - Offrir un hover effect avec élévation
 *
 * @standalone
 * @selector app-temoignages
 */
@Component({
  selector: 'app-temoignages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temoignages.html',
  styleUrls: ['./temoignages.css'],
})
export class Temoignages {
  /**
   * Liste des témoignages clients.
   * 3 témoignages avec ratings variés (2, 3, 5).
   */
  readonly testimonials: readonly Testimonial[] = [
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

  /**
   * Tableau des étoiles pour la notation (1 à 5).
   */
  readonly stars = [1, 2, 3, 4, 5] as const;

  /**
   * Retourne la classe CSS selon le rating.
   * < 3 : rating-low (rouge)
   * = 3 : rating-medium (jaune)
   * > 3 : rating-high (vert)
   *
   * @param rating - Note sur 5
   */
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