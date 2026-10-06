import { Routes } from '@angular/router';
import { ListaAlumnos } from './escuela/listaAlumnos/lista-alumnos';

export const routes: Routes = [
{ 
    path:'formularios',
    children:[
        {
            path:'usuarios',
            loadComponent:()=>
                import('./formularios/usuarios/usuarios').then(
                    (c)=>c.Usuarios
                ),
        },
        {
            path:'zodiaco',
            loadComponent:()=>
                import('./formularios/zodiaco/zodiaco').then(
                    (c)=>c.Zodiaco
                ),
        },
         
    ]
    
},

{ 
    path:'escuela',
    children:[
        {
            path:'listaAlumnos',
            loadComponent:()=>
                import('./escuela/listaAlumnos/lista-alumnos').then(
                    (c)=>c.ListaAlumnos
                ),
        },
       
    ]
    
},

{
    path:'', redirectTo: 'admin', pathMatch:'full'
},

{
    path:'**', redirectTo: 'admin'
},


];
