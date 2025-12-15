import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula';
import { PeliculasService } from '../services/PeliculasService';

@Component({
  selector: 'app-peliculas',
  standalone: false,
  templateUrl: './peliculas.html',
  styleUrls: ['./peliculas.css']
})
export class PeliculasComponent implements OnInit {

  peliculas: Pelicula[] = [];

  pelicula: Pelicula = {
    titulo: '',
    descripcion: '',
    classificacion: '',
    genero: '',
    director: '',
    anio: new Date().getFullYear()
  };

  editando = false;
  peliculaId = '';

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.obtenerPeliculas();
  }

  obtenerPeliculas() {
    this.peliculasService.getPeliculas().subscribe(data => {
      this.peliculas = data;
    });
  }

  guardarPelicula() {
    // Validar todos los campos
    if (!this.validarCampos()) {
      return;
    }

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

  validarCampos(): boolean {
    // Validar título
    if (!this.pelicula.titulo || !this.pelicula.titulo.trim()) {
      alert('El título es requerido');
      return false;
    }

    // Validar descripción
    if (!this.pelicula.descripcion || !this.pelicula.descripcion.trim()) {
      alert('La descripción es requerida');
      return false;
    }

    // Validar clasificación
    if (!this.pelicula.classificacion || !this.pelicula.classificacion.trim()) {
      alert('La clasificación es requerida');
      return false;
    }

    // Validar género
    if (!this.pelicula.genero || !this.pelicula.genero.trim()) {
      alert('El género es requerido');
      return false;
    }

    // Validar director
    if (!this.pelicula.director || !this.pelicula.director.trim()) {
      alert('El director es requerido');
      return false;
    }

    // Validar año
    if (!this.pelicula.anio || this.pelicula.anio <= 0) {
      alert('El año debe ser válido');
      return false;
    }

    // Validar que el año no sea futuro
    const currentYear = new Date().getFullYear();
    if (this.pelicula.anio > currentYear + 5) { // Permite películas hasta 5 años en el futuro
      alert(`El año no puede ser mayor a ${currentYear + 5}`);
      return false;
    }

    return true;
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
    this.pelicula = { titulo: '', descripcion: '', classificacion: '', genero: '', director: '', anio: new Date().getFullYear() };
    this.editando = false;
    this.peliculaId = '';
  }

}


