import { Component } from '@angular/core';

interface NavItem {
  label: string;
  anchor: string;
}

@Component({
 selector:'app-header',
 standalone:true,
 templateUrl:'./header.html',
 styleUrls:['./header.css']
})
export class HeaderComponent {

 isMenuOpen = false;

 activeLink = 'Accueil';

 navItems: NavItem[] = [
  { label: 'Accueil', anchor: '#hero' },
  { label: 'Notre histoire', anchor: '#about' },
  { label: 'Menu', anchor: '#menu' },
  { label: 'Témoignages', anchor: '#temoignages' },
  { label: 'Horaires', anchor: '#horaires' },
  { label: 'Contact', anchor: '#contact' },
 ];

 toggleMenu(){
  this.isMenuOpen = !this.isMenuOpen;
 }

 setActive(link: string){
  this.activeLink = link;
  this.isMenuOpen = false;
 }
}
