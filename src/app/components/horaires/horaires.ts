import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  inject,
  Renderer2,
  ElementRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface Horaire {
  jour: string;
  ouverture: string;
  fermeture: string;
}

interface Status {
  open: boolean;
  label: string;
  detail: string;
  image: string;
}

@Component({
  selector: 'app-horaires',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horaires.html',
  styleUrls: ['./horaires.css']
})
export class Horaires implements OnInit, OnDestroy, AfterViewInit {

  private platformId = inject(PLATFORM_ID);

  horaires: Horaire[] = [
    { jour:'Lundi', ouverture:'08:00', fermeture:'22:00' },
    { jour:'Mardi', ouverture:'08:00', fermeture:'22:00' },
    { jour:'Mercredi', ouverture:'08:00', fermeture:'22:00' },
    { jour:'Jeudi', ouverture:'08:00', fermeture:'22:00' },
    { jour:'Vendredi', ouverture:'08:00', fermeture:'23:00' },
    { jour:'Samedi', ouverture:'09:00', fermeture:'23:00' },
    { jour:'Dimanche', ouverture:'09:00', fermeture:'20:00' }
  ];

  currentDay = '';
  currentDate = '';
  currentTime = '';
  countdownText = '00:00:00';
  openSinceText = '';
  closedSinceText = '—';

  currentStatus: Status = {
    open: false,
    label: '',
    detail: '',
    image: '/assets/images/100.webp'
  };

  private timerId: any = null;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      setTimeout(() => this.startLiveUpdates(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.timerId !== null && typeof window !== 'undefined') {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private startLiveUpdates(): void {
    this.refresh();
    this.updateDOMElements();

    this.timerId = window.setInterval(() => {
      this.refresh();
      this.updateDOMElements();
    }, 1000);
  }

  private updateDOMElements(): void {
    const now = new Date();
    const jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const day = jours[now.getDay()];
    const curMin = now.getHours() * 60 + now.getMinutes();
    const curSec = curMin * 60 + now.getSeconds();

    const today = this.horaires.find(h => h.jour === day);
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

  todaySchedule(): Horaire | undefined {
    return this.horaires.find(h => h.jour === this.currentDay);
  }

  private refresh(): void {
    const now = new Date();
    const jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    this.currentDay = jours[now.getDay()];

    this.currentDate = now.toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    this.currentTime = now.toLocaleTimeString('fr-FR');

    const curMin = now.getHours() * 60 + now.getMinutes();
    const curSec = curMin * 60 + now.getSeconds();
    const today = this.horaires.find(h => h.jour === this.currentDay);

    if (!today) {
      this.currentStatus = {
        open: false,
        label: 'FERMÉ',
        detail: 'Horaires indisponibles',
        image: '/assets/images/200.webp'
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
      image: ouvert ? '/assets/images/giphy.gif' : '/assets/images/100.webp'
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

  private fmt(s: number): string {
    if (s <= 0) return '00:00:00';
    return `${String(Math.floor(s / 3600)).padStart(2,'0')}:${String(Math.floor((s % 3600) / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;
  }

  private toMin(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }
}