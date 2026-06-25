import { Component } from '@angular/core';

import { Hero } from "./components/hero/hero";
import { Menu } from "./components/menu/menu";
import { Temoignages } from "./components/temoignages/temoignages";
import { Horaires } from "./components/horaires/horaires";
import { Footer } from "./components/footer/footer";
import { HeaderComponent } from "./components/header/header";
import { About } from "./components/about/about";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Hero,
    Menu,
    Temoignages,
    Horaires,
    Footer,
    HeaderComponent
    ,About
],
  templateUrl: './app.html'
})
export class App {}