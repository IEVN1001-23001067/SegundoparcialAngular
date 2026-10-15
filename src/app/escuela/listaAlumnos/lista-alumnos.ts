import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
export interface IAlumno {
  matricula: string;
  nombre: string;
  correo: string;
  materia: string;
}
 
@Component({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-listaAlumnos',
  styleUrl: './lista-alumnos.css',
  templateUrl: './lista-alumnos.html',
})
export class ListaAlumnos implements OnInit {
 
  formulario!: FormGroup;
  alumnos: IAlumno[] = [];
  indiceEdicion: number = -1;
 
  nuevoAlumno: IAlumno = {
    matricula: '',
    nombre: '',
    correo: '',
    materia: ''
  };
 
  ngOnInit(): void {
    this.cargarAlumnos();
    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl(''),
    });
  }
 
  agregarAlumno(): void {
   
  
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;

    if (
      !this.nuevoAlumno.matricula || this.nuevoAlumno.matricula.trim() === '' ||
      !this.nuevoAlumno.nombre || this.nuevoAlumno.nombre.trim() === '' ||
      !this.nuevoAlumno.correo || this.nuevoAlumno.correo.trim() === '' ||
      !this.nuevoAlumno.materia || this.nuevoAlumno.materia.trim() === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
 
    if (this.indiceEdicion !== -1) {
      
      this.alumnos[this.indiceEdicion] = { ...this.nuevoAlumno };
      this.indiceEdicion = -1;
    } else {
 
      this.alumnos.push({ ...this.nuevoAlumno });
    }
 
    localStorage.setItem(
      'alumnos',
      JSON.stringify(this.alumnos)
    );

   
    this.limpiarCampos();
  }
 
  muestraAlumnos(): void {
    this.agregarAlumno();
  }
 
  cargarAlumnos(): void {
    const datos = localStorage.getItem('alumnos');
    if (datos) {
      this.alumnos = JSON.parse(datos);
    }
  }
 
  editarAlumnos(index: number): void {
 
    this.indiceEdicion = index;
    const alumno = this.alumnos[index];

    this.nuevoAlumno = { ...alumno };

    this.formulario.patchValue({
      matricula: alumno.matricula,
      nombre: alumno.nombre,
      correo: alumno.correo,
      materia: alumno.materia
    });
  }

  eliminarAlumno(index: number): void {
    this.alumnos.splice(index, 1);
    localStorage.setItem(
      'alumnos', 
      JSON.stringify(this.alumnos)
    );
    if (this.indiceEdicion === index) {
      this.indiceEdicion = -1;
      this.limpiarCampos();
    }
  }
  
  limpiarCampos(): void {
    this.nuevoAlumno = {
      matricula: '',
      nombre: '',
      correo: '',
      materia: ''
    };
    this.formulario.reset();
    this.indiceEdicion = -1;
  }
}