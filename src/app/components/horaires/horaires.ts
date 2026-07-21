import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  inject,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/**
 * Interface représentant un horaire journalier.
 * @property jour - Jour de la semaine
 * @property ouverture - Heure d'ouverture (HH:mm)
 * @property fermeture - Heure de fermeture (HH:mm)
 */
export interface Horaire {
  readonly jour: string;
  readonly ouverture: string;
  readonly fermeture: string;
}

/**
 * Interface pour le statut d'ouverture.
 * @property open - true si le restaurant est ouvert
 * @property label - Label affiché (OUVERT MAINTENANT / FERMÉ)
 * @property detail - Message détaillé
 * @property image - URL de l'image de statut
 */
interface Status {
  open: boolean;
  label: string;
  detail: string;
  image: string;
}

/**
 * Composant Horaires - Statut et compte à rebours.
 *
 * Responsabilités :
 * - Afficher le statut ouvert/fermé en temps réel
 * - Afficher un compte à rebours avant fermeture/ouverture
 * - Afficher la carte "Aujourd'hui" avec horaires du jour
 * - Afficher le tableau complet de la semaine
 * - Mettre à jour les secondes dynamiquement (SSR-safe)
 *
 * @standalone
 * @selector app-horaires
 */
@Component({
  selector: 'app-horaires',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horaires.html',
  styleUrls: ['./horaires.css'],
})
export class Horaires implements OnInit, OnDestroy, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  /**
   * Horaires de la semaine (lundi-dimanche).
   * 7 entrées couvrant tous les jours.
   */
  readonly horaires: readonly Horaire[] = [
    { jour: 'Lundi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Mardi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Mercredi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Jeudi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Vendredi', ouverture: '08:00', fermeture: '23:00' },
    { jour: 'Samedi', ouverture: '09:00', fermeture: '23:00' },
    { jour: 'Dimanche', ouverture: '09:00', fermeture: '20:00' },
  ];

  /**
   * Jour actuel (ex: "Lundi").
   * Mis à jour chaque seconde.
   */
  currentDay = '';

  /**
   * Date formatée en français.
   * Ex: "Lundi 20 juillet 2026"
   */
  currentDate = '';

  /**
   * Heure actuelle formatée (HH:mm:ss).
   * Mise à jour chaque seconde.
   */
  currentTime = '';

  /**
   * Compte à rebours formaté (HH:mm:ss).
   * Décrémente chaque seconde.
   */
  countdownText = '00:00:00';

  /**
   * Texte "Ouvert depuis Xh Ymin".
   * Mis à jour chaque seconde quand ouvert.
   */
  openSinceText = '';

  /**
   * Texte "Fermé depuis" (statut statique).
   */
  closedSinceText = '—';

  /**
   * Statut actuel d'ouverture.
   * Contient toutes les informations affichées dans la carte.
   */
  currentStatus: Status = {
    open: false,
    label: '',
    detail: '',
    image: '/assets/images/100.webp',
  };

  /**
   * ID du timer setInterval.
   * @private
   */
  private timerId: any = null;

  /**
   * Constructeur avec injection de Renderer2 et ElementRef.
   * Renderer2 utilisé pour les updates DOM sécurisées (SSR-compatible).
   */
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  /**
   * Initialisation du composant.
   * Calcule les valeurs initiales pour le prerender SSR.
   */
  ngOnInit(): void {
    this.refresh();
  }

  /**
   * Après l'initialisation de la vue.
   * Démarre les mises à jour live UNIQUEMENT dans le navigateur.
   * Le délai de 100ms garantit le passage de l'hydratation SSR.
   */
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.startLiveUpdates(), 100);
    }
  }

  /**
   * Nettoyage lors de la destruction du composant.
   * Supprime le timer pour éviter les fuites mémoire.
   */
  ngOnDestroy(): void {
    if (this.timerId !== null && typeof window !== 'undefined') {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Démarre les mises à jour en temps réel.
   * Calcule une première fois, puis lance le timer.
   * @private
   */
  private startLiveUpdates(): void {
    this.refresh();
    this.updateDOMElements();

    this.timerId = window.setInterval(() => {
      this.refresh();
      this.updateDOMElements();
    }, 1000);
  }

  /**
   * Met à jour directement les nœuds DOM pour les secondes.
   * Bypasse le change detection Angular pour garantir la fluidité.
   * @private
   */
  private updateDOMElements(): void {
    const now = new Date();
    const jours = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ];
    const day = jours[now.getDay()];
    const curMin = now.getHours() * 60 + now.getMinutes();
    const curSec = curMin * 60 + now.getSeconds();

    const today = this.horaires.find((h) => h.jour === day);
    if (!today) return;

    const oMin = this.toMin(today.ouverture);
    const fMin = this.toMin(today.fermeture);
    const ouvert = curMin >= oMin && curMin < fMin;

    const timeStr = now.toLocaleTimeString('fr-FR');
    let countdown = 0;

    if (ouvert) countdown = fMin * 60 - curSec;
    else if (curMin < oMin) countdown = oMin * 60 - curSec;
    else countdown = (oMin + 1440) * 60 - curSec;

    const nativeEl = this.el.nativeElement;

    const timeNodes = nativeEl.querySelectorAll('.time-box span');
    timeNodes.forEach((node: any) => {
      this.renderer.setProperty(node, 'textContent', timeStr);
    });

    const countdownNodes = nativeEl.querySelectorAll('.countdown-value');
    countdownNodes.forEach((node: any) => {
      this.renderer.setProperty(node, 'textContent', this.fmt(countdown));
    });
  }

  /**
   * Retourne l'horaire du jour actuel.
   * @returns Horaire ou undefined si non trouvé
   */
  todaySchedule(): Horaire | undefined {
    return this.horaires.find((h) => h.jour === this.currentDay);
  }

  /**
   * Recalcule toutes les valeurs à partir de l'heure actuelle.
   * Utilisé par ngOnInit et setInterval.
   * @private
   */
  private refresh(): void {
    const now = new Date();
    const jours = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ];
    this.currentDay = jours[now.getDay()];

    this.currentDate = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    this.currentTime = now.toLocaleTimeString('fr-FR');

    const curMin = now.getHours() * 60 + now.getMinutes();
    const curSec = curMin * 60 + now.getSeconds();
    const today = this.horaires.find((h) => h.jour === this.currentDay);

    if (!today) {
      this.currentStatus = {
        open: false,
        label: 'FERMÉ',
        detail: 'Horaires indisponibles',
        image: '/assets/images/200.webp',
      };
      this.countdownText = '00:00:00';
      return;
    }

    const oMin = this.toMin(today.ouverture);
    const fMin = this.toMin(today.fermeture);
    const ouvert = curMin >= oMin && curMin < fMin;

    this.currentStatus = {
      open: ouvert,
      label: ouvert ? 'OUVERT MAINTENANT' : 'FERMÉ',
      detail: ouvert
        ? `Nous vous accueillons jusqu'à ${today.fermeture}`
        : `Ouverture à ${today.ouverture}`,
      image: ouvert ? '/assets/images/giphy.gif' : '/assets/images/100.webp',
    };

    if (ouvert) {
      const diff = curMin - oMin;
      this.openSinceText = `${Math.floor(diff / 60)}h ${diff % 60}min`;
    } else {
      this.openSinceText = '—';
    }

    let reste = 0;
    if (ouvert) reste = fMin * 60 - curSec;
    else if (curMin < oMin) reste = oMin * 60 - curSec;
    else reste = (oMin + 1440) * 60 - curSec;

    this.countdownText = this.fmt(reste);
  }

  /**
   * Formate un nombre de secondes en HH:mm:ss.
   * @param s - Secondes à formater
   * @returns Chaîne formatée (ex: "06:32:15")
   * @private
   */
  private fmt(s: number): string {
    if (s <= 0) return '00:00:00';
    return `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  }

  /**
   * Convertit une heure HH:mm en minutes.
   * @param time - Heure au format "HH:mm"
   * @returns Nombre de minutes depuis minuit
   * @private
   */
  private toMin(time: string): number {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  }
}