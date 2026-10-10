import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  styleUrl: './zodiaco.css',
  templateUrl: './zodiaco.html',
})
export class Zodiaco implements OnInit {
  formulario!: FormGroup;
  resultadoMostrado = false;

  persona = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    edad: 0,
    signo: '',
    emoji: ''
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      apaterno: new FormControl(''),
      amaterno: new FormControl(''),
      dia: new FormControl(''),
      mes: new FormControl(''),
      anio: new FormControl(''),
      sexo: new FormControl('')
    });
  }

  muestraAlumnos(): void {
    const val = this.formulario.value;
    this.persona.nombre = val.nombre;
    this.persona.apaterno = val.apaterno;
    this.persona.amaterno = val.amaterno;


    const anioNac = Number(val.anio);
    const mesNac = Number(val.mes);
    const diaNac = Number(val.dia);
    
    const hoy = new Date();
    let edad = hoy.getFullYear() - anioNac;
    const mesActual = hoy.getMonth() + 1;
    const diaActual = hoy.getDate();

    if (mesActual < mesNac || (mesActual === mesNac && diaActual < diaNac)) {
      edad--;
    }
    this.persona.edad = edad >= 0 ? edad : 0;

    // Esta parte me ayudo  agregar emojis a los signos para imprimir 
    const signosChinos = [
      { nombre: 'Rata', emoji: '🐀' },
      { nombre: 'Buey', emoji: '🐂' },
      { nombre: 'Tigre', emoji: '🐅' },
      { nombre: 'Conejo', emoji: '🐇' },
      { nombre: 'Dragón', emoji: '🐉' },
      { nombre: 'Serpiente', emoji: '🐍' },
      { nombre: 'Caballo', emoji: '🐎' },
      { nombre: 'Cabra', emoji: '🐐' },
      { nombre: 'Mono', emoji: '🐒' },
      { nombre: 'Gallo', emoji: '🐓' },
      { nombre: 'Perro', emoji: '🐕' },
      { nombre: 'Cerdo', emoji: '🐖' }
    ];

    const indice = (anioNac - 4) % 12;
    const signoObj = signosChinos[indice >= 0 ? indice : (indice + 12) % 12];
    
    this.persona.signo = signoObj.nombre;
    this.persona.emoji = signoObj.emoji;

    this.resultadoMostrado = true;
  }
}