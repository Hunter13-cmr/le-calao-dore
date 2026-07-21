import { Component } from '@angular/core';

/**
 * Interface représentant un élément de navigation.
 * @property label - Texte affiché dans le lien
 * @property anchor - Ancre cible (#section)
 */
interface NavItem {
  label: string;
  anchor: string;
}

/**
 * Composant Header - Navigation principale et menu mobile.
 *
 * Responsabilités :
 * - Afficher le logo et les liens de navigation
 * - Gérer le menu hamburger sur mobile
 * - Détecter et mettre en évidence le lien actif
 * - Permettre le scroll smooth vers les sections
 *
 * @standalone
 */
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  /**
   * État d'ouverture du menu mobile.
   * @private
   */
  isMenuOpen = false;

  /**
   * Lien actuellement actif dans la navigation.
   * Initialisé à 'Accueil' par défaut.
   */
  activeLink = 'Accueil';

  /**
   * Liste des éléments de navigation.
   * Chaque item possède un label et une ancre.
   */
  readonly navItems: readonly NavItem[] = [
    { label: 'Accueil', anchor: '#hero' },
    { label: 'Notre histoire', anchor: '#about' },
    { label: 'Menu', anchor: '#menu' },
    { label: 'Témoignages', anchor: '#temoignages' },
    { label: 'Horaires', anchor: '#horaires' },
    { label: 'Contact', anchor: '#contact' },
  ];

  /**
   * Bascule l'état d'ouverture du menu mobile.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Définit le lien actif et ferme le menu mobile.
   * @param link - Le label du lien à activer
   */
  setActive(link: string): void {
    this.activeLink = link;
    this.isMenuOpen = false;
  }
}