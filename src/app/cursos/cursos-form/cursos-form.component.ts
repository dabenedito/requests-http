import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal-service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: [ './cursos-form.component.scss' ],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CursosService,
    private alert: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) {
  }

  public ngOnInit() {
    const curso = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      id: [ curso.id ],
      nome: [ curso.nome, [ Validators.required, Validators.minLength(3), Validators.maxLength(25) ] ],
    });
  }

  public hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  public onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      let action = this.form.value.id ? 'atualziado' : 'criado';

        this.service.save(this.form.value).subscribe({
          next: () => {
            this.alert.showSuccessAlert(`Curso ${action} com sucesso`, 2000);
            this.location.back();
          },
          error: err => this.alert.showErrorAlert(`Erro ao ${action} o curso: ` + err.message),
          complete: () => console.log('Request ok'),
        });
    }
  }

  public onCancel() {
    this.submitted = false;
    this.form.reset();
  }
}
