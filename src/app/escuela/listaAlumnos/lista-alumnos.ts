import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';


export interface IAlumno{
  matricula:string;
  nombre:string;
  correo:string;
  materia:string;
}

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-lista-alumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos {
  formulario!: FormGroup;
  

  alumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };

  ngOnInit(): void {
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });
  }

  muestraAlumnos(): void {
    this.alumno.matricula = this.formulario.value.matricula;
    this.alumno.nombre = this.formulario.value.nombre;
    this.alumno.correo = this.formulario.value.correo;
    this.alumno.materia = this.formulario.value.materia;
  }
}
