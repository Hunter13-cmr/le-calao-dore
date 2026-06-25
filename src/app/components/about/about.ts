import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About {
  title = 'Notre histoire';
  description =
    'Né au cœur de Douala, Le Calao Doré est une célébration des traditions culinaires camerounaises. Nous allions savoir-faire familial, ingrédients locaux et service premium pour offrir une expérience mémorable.';
  storyPoints = [
    'Une cuisine de marché préparée avec passion',
    'Recettes transmises de génération en génération',
    'Une ambiance chaleureuse et contemporaine',
  ];
}
