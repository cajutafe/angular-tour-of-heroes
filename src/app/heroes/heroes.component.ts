import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes'; Ya no es necesaria porque usaremos el servicio HEROSERVICE
import { HeroService } from '../hero.service';
//Ya se envia el mensaje directamente desde HeroService
// import { MessageService } from '../message.service';

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
  // selectedHero?: Hero; //Ya no es necesaria porque lo hacemos mediante enrutamiento a una vista diferente

  // hero: Hero = { 
  //   id: 1, 
  //   name: 'Windstorm' 
  // };

  constructor(
    //Usamos el contructor para inicializaciones simples.
    private heroService: HeroService,
    //Añadimos el mensaje de cada vez que se clique en un heroe
    // private messageService: MessageService //Se enseñará directamente en su url
  ) { }

  ngOnInit() {
    //LLamamos getHeroes a través de ngOnInit para una mejor práctica
    this.getHeroes();
  }

  //Ya no se mostrará el heroe seleccionado en las vista principal por lo que el mensaje y el onSelect no son necesarios. 
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   //Mensaje de cada Heroe seleccionado
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  getHeroes(): void{
    //Llamada sincrona, solo para local lo que si llamaramos de manera remota a un servidor nos tardaría en cargar la página además de no perminitrnos hacer nada en ella.
    // this.heroes = this.heroService.getHeroes();

    //LLAMADA ASINCRONA
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void{
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });

  }

  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}