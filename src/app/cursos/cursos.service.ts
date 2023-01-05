import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso.model';
import { environment } from '../../environments/environment';
import { delay, Observable, take, tap } from 'rxjs';
import * as http from 'http';

@Injectable()
export class CursosService {
  private readonly cursosApi = environment.apiUrl + '/cursos';

  constructor(
    private http: HttpClient,
  ) {
  }

  list(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${ this.cursosApi }`)
      .pipe(
        delay(0),
        tap(console.log),
      );
  }

  private create(curso: Curso) {
    return this.http.post(`${ this.cursosApi }`, curso).pipe(take(1));
  }

  show(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.cursosApi}/${id}`).pipe(take(1));
  }

  private update(curso: Curso) {
    return this.http.put(`${this.cursosApi}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: Curso) {
    if (curso.id) {
      return this.update(curso);
    } else {
      return this.create(curso);
    }
  }
}
