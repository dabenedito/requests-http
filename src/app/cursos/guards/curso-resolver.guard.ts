import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Curso } from '../curso.model';
import { Observable, of } from 'rxjs';
import { CursosService } from '../cursos.service';

@Injectable({
  providedIn: 'root',
})
export class CursoResolverGuard implements Resolve<Curso> {
  constructor(
    private service: CursosService,
  ) {
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Curso>{
    if (route.params && route.params['id']) {
      return this.service.show(route.params['id']);
    }

    console.log("Resolver");
    // @ts-ignore
    return of({
      id: null,
      nome: null
    });
  }
}
