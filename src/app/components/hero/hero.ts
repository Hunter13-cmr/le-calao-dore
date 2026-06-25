import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero {
  backgroundImage = '/restaurant.jpg';
  title = 'Les saveurs authentiques du Cameroun';
  subtitle = 'Un voyage gourmet inspiré de Douala';
  ctaPrimary = 'Voir le menu';
  ctaSecondary = 'Contactez-nous';
}

