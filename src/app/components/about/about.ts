import { Component, Input } from '@angular/core';

/**
 * Interface pour les données de la section About.
 * @property title - Titre de la section
 * @property description - Description narrative
 * @property storyPoints - Liste des points clés
 */
export interface AboutData {
  title: string;
  description: string;
  storyPoints: readonly string[];
}

/**
 * Composant About - Histoire et valeurs du restaurant.
 *
 * Responsabilités :
 * - Présenter l'histoire du restaurant
 * - Afficher les points clés avec icônes
 * - Montrer une image de fond responsive
 *
 * @standalone
 * @selector app-about
 */
@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {
  /**
   * Titre principal de la section.
   */
  @Input() title: string = 'Notre histoire';

  /**
   * Description narrative du restaurant.
   */
  @Input() description: string =
    'Né au cœur de Douala, Le Calao Doré est une célébration des traditions culinaires camerounaises. Nous allions savoir-faire familial, ingrédients locaux et service premium pour offrir une expérience mémorable.';

  /**
   * Points clés de l'histoire (listés avec icônes).
   */
  @Input() readonly storyPoints: readonly string[] = [
    'Une cuisine de marché préparée avec passion',
    'Recettes transmises de génération en génération',
    'Une ambiance chaleureuse et contemporaine',
  ];
}