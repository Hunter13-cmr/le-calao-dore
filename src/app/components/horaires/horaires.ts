import { Component } from '@angular/core';
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
export class Horaires {
  horaires: Horaire[] = [
    { jour: 'Lundi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Mardi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Mercredi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Jeudi', ouverture: '08:00', fermeture: '22:00' },
    { jour: 'Vendredi', ouverture: '08:00', fermeture: '23:00' },
    { jour: 'Samedi', ouverture: '09:00', fermeture: '23:00' },
    { jour: 'Dimanche', ouverture: '09:00', fermeture: '20:00' },
  ];

  currentDay = this.formatToday();
  currentStatus = this.calculateStatus();

  private formatToday(): string {
    const dayMap = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayMap[new Date().getDay()];
  }

  private parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private calculateStatus(): { open: boolean; label: string; detail: string } {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todayHours = this.horaires.find((horaire) => horaire.jour === this.currentDay);

    if (!todayHours) {
      return { open: false, label: 'FERMÉ', detail: 'Horaires non disponibles' };
    }

    const openMinutes = this.parseTime(todayHours.ouverture);
    const closeMinutes = this.parseTime(todayHours.fermeture);
    const open = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
    return {
      open,
      label: open ? 'OUVERT MAINTENANT' : 'FERMÉ',
      detail: open
        ? `Nous fermons à ${todayHours.fermeture}`
        : `Nous ouvrons à ${todayHours.ouverture}`,
    };
  }
}
