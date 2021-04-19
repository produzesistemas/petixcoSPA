import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { LojaCEP } from 'src/app/_model/loja-cep-model';
import { LojaCEPService } from 'src/app/_services/loja-cep.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DaysWeekService } from 'src/app/_services/days-week.service';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-partner-area-delivery-region',
  templateUrl: './partner-area-delivery-region.component.html'
})

export class PartnerAreaDeliveryRegionComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  lojaCep: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private lojaCEPService: LojaCEPService,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      cep: ['']
    });
    this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.name = this.form.controls.cep.value;
    this.lojaCEPService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-delivery-region/0/0`]);
  }

  edit(obj: LojaCEP) {
    this.router.navigate([`/partner-area-delivery-region/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: LojaCEP) {
    this.lojaCep = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.lojaCEPService.deleteById(this.lojaCep.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.lojaCep);
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

   onActive(item) {
    this.lojaCEPService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }

}
