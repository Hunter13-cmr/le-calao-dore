import { Component, Input } from '@angular/core';

/**
 * Interface pour les données du hero.
 * @property backgroundImage - URL de l'image de fond
 * @property title - Titre principal
 * @property subtitle - Sous-titre avec animation typewriter
 * @property ctaPrimary - Texte du bouton principal
 * @property ctaSecondary - Texte du bouton secondaire
 */
export interface HeroData {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

/**
 * Composant Hero - Section d'accueil principale.
 *
 * Responsabilités :
 * - Afficher le titre et sous-titre avec animations
 * - Présenter deux appels à l'action
 * - Gérer l'image de fond avec overlay
 *
 * @standalone
 * @selector app-hero
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero {
  /**
   * URL de l'image de fond du hero.
   */
  @Input() backgroundImage: string = '/restaurant.jpg';

  /**
   * Titre principal avec animation glow.
   */
  @Input() title: string = 'Les saveurs authentiques du Cameroun';

  /**
   * Sous-titre avec animation typewriter.
   */
  @Input() subtitle: string = 'Un voyage gourmet inspiré de Douala';

  /**
   * Texte du bouton d'action principal.
   */
  @Input() ctaPrimary: string = 'Découvrir le menu';

  /**
   * Texte du bouton d'action secondaire.
   */
  @Input() ctaSecondary: string = 'Réserver une table';
}