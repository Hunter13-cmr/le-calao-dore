import {
 Component,
 HostListener,
 OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  anchor: string;
}

@Component({
 selector:'app-header',
 standalone:true,
 imports:[CommonModule],
 templateUrl:'./header.html',
 styleUrls:['./header.css']
})
export class HeaderComponent implements OnInit {

 isMenuOpen = false;

 activeLink = 'Accueil';

 isMobile = false;

 navItems: NavItem[] = [
  { label: 'Accueil', anchor: '#hero' },
  { label: 'Notre histoire', anchor: '#about' },
  { label: 'Menu', anchor: '#menu' },
  { label: 'Témoignages', anchor: '#temoignages' },
  { label: 'Horaires', anchor: '#horaires' },
  { label: 'Contact', anchor: '#contact' },
 ];

 constructor(){}

 ngOnInit(){
  if (typeof window !== 'undefined') {
    this.checkScreen();
  }
 }

 @HostListener('window:resize')
 onResize(){
  this.checkScreen();
 }

  checkScreen(){
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    }
  }

 toggleMenu(){
  this.isMenuOpen = !this.isMenuOpen;
 }

 setActive(link: string){
  this.activeLink = link;
  this.isMenuOpen = false;
 }
}