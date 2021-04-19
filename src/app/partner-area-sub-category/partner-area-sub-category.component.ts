import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { SubCategoria } from 'src/app/_model/sub-categoria-model';
import { SubCategoriaService } from 'src/app/_services/sub-categoria.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-partner-area-sub-category',
  templateUrl: './partner-area-sub-category.component.html'
})

export class PartnerAreaSubCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  subcategoria: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private subCategoriaService: SubCategoriaService,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      descricao: ['']
    });
    this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.name = this.form.controls.descricao.value;
    this.subCategoriaService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-sub-category/0/0`]);
  }

  edit(obj: SubCategoria) {
    this.router.navigate([`/partner-area-sub-category/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: SubCategoria) {
    this.subcategoria = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.subCategoriaService.deleteById(this.subcategoria.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.subcategoria);
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
    this.subCategoriaService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }

}
