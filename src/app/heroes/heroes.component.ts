import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes = HEROES;
  // Opciones para corregir el error de inicializador no definido correctamente en el constructos:
  // selectedHero?: Hero;
  // selectedHero!: Hero;
  // selectedHero: Hero | undefined;
  selectedHero?: Hero;

  // hero: Hero = { 
  //   id: 1, 
  //   name: 'Windstorm' 
  // };

  constructor() { }

  ngOnInit() {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}