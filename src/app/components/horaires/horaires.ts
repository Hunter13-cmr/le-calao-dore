import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Horaire {
  jour: string;
  ouverture: string;
  fermeture: string;
}

@Component({
  selector: 'app-horaires',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horaires.html',
  styleUrls: ['./horaires.css'],
})
export class Horaires implements OnInit, OnDestroy {
  horaires: Horaire[] = [
    { jour: 'Lundi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Mardi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Mercredi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Jeudi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Vendredi', ouverture: '08:00', fermeture: '23:00' },
    { jour: 'Samedi', ouverture: '09:00', fermeture: '23:00' },
    { jour: 'Dimanche', ouverture: '09:00', fermeture: '20:00' },
  ];

  currentDay = '';
  currentStatus = { open: false, label: '', detail: '' };
  countdownText = '';
  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Always compute initial values
    this.tick();

    // Use setTimeout to ensure we're past SSR hydration before starting interval
    setTimeout(() => {
      this.tick();
      this.timerId = setInterval(() => {
        this.tick();
      }, 1000);
    });
  }

  ngOnDestroy() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
  }

  private tick() {
    const d = new Date();
    const dayMap = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    this.currentDay = dayMap[d.getDay()];

    const curMin = d.getHours() * 60 + d.getMinutes();
    const curSec = curMin * 60 + d.getSeconds();

    const today = this.horaires.find(x => x.jour === this.currentDay);
    if (!today) {
      this.currentStatus = { open: false, label: 'FERMÉ', detail: 'Horaires non disponibles' };
      this.countdownText = '00:00:00';
      this.cdr.markForCheck();
      return;
    }

    const oMin = this.par(today.ouverture);
    const fMin = this.par(today.fermeture);
    const ouvert = curMin >= oMin && curMin < fMin;

    this.currentStatus = {
      open: ouvert,
      label: ouvert ? 'OUVERT MAINTENANT' : 'FERMÉ',
      detail: ouvert ? `Ferme à ${today.fermeture}` : `Ouvre à ${today.ouverture}`,
    };

    let reste = 0;
    if (ouvert) reste = fMin * 60 - curSec;
    else if (curMin < oMin) reste = oMin * 60 - curSec;
    else reste = (oMin + 1440) * 60 - curSec;

    this.countdownText = this.fmt(reste);
    this.cdr.markForCheck();
  }

  private fmt(s: number): string {
    if (s <= 0) return '00:00:00';
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }

  private par(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }
}