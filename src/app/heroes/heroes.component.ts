import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes'; Ya no es necesaria porque usaremos el servicio HEROSERVICE
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  // heroes = HEROES; DEFINICIón para el import sin servicio
  heroes: Hero[] = [];

  // Opciones para corregir el error de inicializador no definido correctamente en el constructos:
  // selectedHero?: Hero;
  // selectedHero!: Hero;
  // selectedHero: Hero | undefined;
  selectedHero?: Hero;

  // hero: Hero = { 
  //   id: 1, 
  //   name: 'Windstorm' 
  // };

  constructor(
    //Usamos el contructor para inicializaciones simplres.
    private heroService: HeroService,
    //Añadimos el mensaje de cada vez que se clique en un heroe
    private messageService: MessageService
  ) { }

  ngOnInit() {
    //LLamamos getHeroes a través de ngOnInit para una mejor práctica
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    //Mensaje de cada Heroe seleccionado
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void{
    //Llamada sincrona, solo para local lo que si llamaramos de manera remota a un servidor nos tardaría en cargar la página además de no perminitrnos hacer nada en ella.
    // this.heroes = this.heroService.getHeroes();

    //LLAMADA ASINCRONA
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
}