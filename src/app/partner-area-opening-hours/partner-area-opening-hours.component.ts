import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { HorarioFuncionamento } from 'src/app/_model/horario-funcionamento';
import { HorarioFuncionamentoService } from 'src/app/_services/horario-funcionamento.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DaysWeekService } from 'src/app/_services/days-week.service';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-partner-area-opening-hours',
  templateUrl: './partner-area-opening-hours.component.html'
})

export class PartnerAreaOpeningHoursComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  horarioFuncionamento: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;
  daysWeek: any[] = [];

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private horarioFuncionamentoService: HorarioFuncionamentoService,
    private router: Router,
    private daysWeekService: DaysWeekService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      dia: ['']
    });
    this.daysWeek = this.daysWeekService.get();
    this.onSubmit(null);
  }

  get f() { return this.form.controls; }

  onSubmit(e) {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    if ((e !== null) && (Number(e.target.value) > 0)) {
      filter.id = Number(e.target.value);
    }
    filter.name = '';
    this.horarioFuncionamentoService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-opening-hours/0/0`]);
  }

  edit(obj: HorarioFuncionamento) {
    this.router.navigate([`/partner-area-opening-hours/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: HorarioFuncionamento) {
    this.horarioFuncionamento = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.horarioFuncionamentoService.deleteById(this.horarioFuncionamento.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.horarioFuncionamento);
      if (index !== -1) {
        this.lst.splice(index, 1);
      }
      this.closeDelete();
      this.toastr.success('Excluído com sucesso!', '');
    });
  }

  closeDelete() {
  this.modalDelete.hide();
  }

  getDayWeek(item) {
    return this.daysWeekService.getNameDayWeek(item.dia);
  }

  onActive(item) {
    this.horarioFuncionamentoService.active(item).subscribe(result => {
      this.onSubmit(null);
    });
  }

}
