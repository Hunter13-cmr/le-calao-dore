import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface pour les coordonnées du restaurant.
 * @property address - Adresse physique
 * @property phone - Numéro de téléphone
 * @property email - Adresse email
 */
interface ContactInfo {
  readonly address: string;
  readonly phone: string;
  readonly email: string;
}

/**
 * Interface pour un réseau social.
 * @property name - Nom du réseau
 * @property url - URL du profil
 * @property icon - Classe Bootstrap Icon
 */
interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: string;
}

/**
 * Interface pour un lien rapide.
 * @property label - Texte affiché
 * @property anchor - Ancre cible
 */
interface QuickLink {
  readonly label: string;
  readonly anchor: string;
}

/**
 * Composant Footer - Pied de page avec coordonnées et liens.
 *
 * Responsabilités :
 * - Afficher les coordonnées du restaurant
 * - Présenter les réseaux sociaux
 * - Fournir des liens rapides vers les sections
 * - Afficher l'année de copyright dynamique
 *
 * @standalone
 * @selector app-footer
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  /**
   * Année courante pour le copyright.
   * Calculée automatiquement à l'initialisation.
   */
  readonly currentYear = new Date().getFullYear();

  /**
   * Coordonnées du restaurant.
   */
  readonly contactInfo: ContactInfo = {
    address: 'Akwa, Douala',
    phone: '+237 6 77 88 99 00',
    email: 'contact@lecalaodore.cm',
  };

  /**
   * Réseaux sociaux disponibles.
   */
  readonly socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/le.calao.dore',
      icon: 'bi-facebook',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/le.calao.dore',
      icon: 'bi-instagram',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/237677889900',
      icon: 'bi-whatsapp',
    },
  ];

  /**
   * Liens rapides vers les sections du site.
   */
  readonly quickLinks: QuickLink[] = [
    { label: 'Menu', anchor: '#menu' },
    { label: 'Témoignages', anchor: '#temoignages' },
    { label: 'Horaires', anchor: '#horaires' },
    { label: 'Notre histoire', anchor: '#about' },
  ];
}