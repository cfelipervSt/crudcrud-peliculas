import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { PeliculasService } from '../services/PeliculasService';

@Component({
  selector: 'app-peliculas',
  standalone:false,
  templateUrl: './peliculas.html',
  styleUrls: ['./peliculas.css']
})
export class PeliculasComponent implements OnInit {

  peliculas: Pelicula[] = [];

  pelicula: Pelicula = {
    titulo: '',
    descripcion:'',
    classificacion: '',
    genero:'',
    director: '',
    anio: new Date().getFullYear()
  };

  editando = false;
  peliculaId = '';

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas() {
    this.peliculasService.getPeliculas().subscribe(data => {
      this.peliculas = data;
    });
  }

  guardarPelicula() {
    if (this.editando) {
      this.peliculasService.actualizarPelicula(this.peliculaId, this.pelicula)
        .subscribe(() => {
          this.resetFormulario();
          this.obtenerPeliculas();
        });
    } else {
      this.peliculasService.crearPelicula(this.pelicula)
        .subscribe(() => {
          this.resetFormulario();
          this.obtenerPeliculas();
        });
    }
  }

  editarPelicula(p: Pelicula) {
    this.editando = true;
    this.peliculaId = p._id!;
    this.pelicula = { ...p };
  }

eliminarPelicula(id: string) {
  // Mostrar confirmación
  const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar esta película?');
  
  if (confirmacion) {
    this.peliculasService.eliminarPelicula(id)
      .subscribe(() => {
        this.obtenerPeliculas();
        // Opcional: mostrar mensaje de éxito
        alert('Película eliminada correctamente');
      }, error => {
        alert('Error al eliminar la película');
      });
  } else {
    console.log('Eliminación cancelada');
  }
}

  resetFormulario() {
    this.pelicula = { titulo: '',descripcion: '', classificacion:'',genero:'',director: '', anio: new Date().getFullYear() };
    this.editando = false;
    this.peliculaId = '';
  }

}


