import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface IPersonaZodiaco {
  nombre: string;
  apaterno: string;
  amaterno: string;
  edad: number;
  signo: string;
  emoji: string;
}

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
  
  
  vistaActual: 'formulario' | 'registros' = 'formulario';

  personas: IPersonaZodiaco[] = [];
  indiceEdicion: number = -1;

  persona: IPersonaZodiaco = {
    nombre: '',
    apaterno: '',
    amaterno: '',
    edad: 0,
    signo: '',
    emoji: ''
  };

  ngOnInit(): void {
    this.cargarPersonas();

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

  agregarPersona(): void {
    if (
      this.persona.nombre === '' ||
      this.persona.apaterno === '' ||
      this.persona.amaterno === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.indiceEdicion !== -1) {
      this.personas[this.indiceEdicion] = { ...this.persona };
      this.indiceEdicion = -1;
    } else {
      this.personas.push({ ...this.persona });
    }

    localStorage.setItem(
      'personasZodiaco',
      JSON.stringify(this.personas)
    );
  }

  cargarPersonas(): void {
    const datos = localStorage.getItem('personasZodiaco');
    if (datos) {
      this.personas = JSON.parse(datos);
    }
  }

  eliminarPersona(index: number): void {
    this.personas.splice(index, 1);
    localStorage.setItem('personasZodiaco', JSON.stringify(this.personas));
    
    this.indiceEdicion = -1;
    this.limpiarCampos();
  }

  editarPersona(index: number): void {
    this.indiceEdicion = index;
    const p = this.personas[index];
    
    this.persona = { ...p };
    this.resultadoMostrado = true;

    this.formulario.patchValue({
      nombre: p.nombre,
      apaterno: p.apaterno,
      amaterno: p.amaterno
    });

    
    this.vistaActual = 'formulario';
  }

  limpiarCampos(): void {
    this.persona = {
      nombre: '',
      apaterno: '',
      amaterno: '',
      edad: 0,
      signo: '',
      emoji: ''
    };
    this.formulario.reset();
    this.indiceEdicion = -1;
    this.resultadoMostrado = false;
  }

  muestraAlumnos(): void {
    const val = this.formulario.value;

    if (!val.nombre || !val.apaterno || !val.amaterno || !val.dia || !val.mes || !val.anio) {
      alert('Todos los campos son obligatorios');
      return;
    }

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

    this.agregarPersona();

    this.formulario.reset();
    this.indiceEdicion = -1;
  }
}