import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso.model';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../../shared/alert-modal-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: [ './cursos-lista.component.scss' ],
})
export class CursosListaComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal: any;

  public cursos$: Observable<Curso[]> = EMPTY;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    public deleteModalRef: BsModalRef
  ) { }

  public ngOnInit() {
    /**
     * Utilização sem '| async':
     * this.service.list().subscribe({
     *   next: response => this.cursos = response,
     *   error: err => console.error(err)
     * });
     */

    this.onRefresh();
  }

  public onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError((err, caught) => {
          console.log("Error:", err);
          this.alertService.showErrorAlert('Erro ao carregar cursos. ' + err.message);
          return EMPTY
        })
      );
  }

  public onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  public onDelete(curso: Curso) {
    this.deleteModalRef = this.modalService.show(this.deleteModal);
  }
}
