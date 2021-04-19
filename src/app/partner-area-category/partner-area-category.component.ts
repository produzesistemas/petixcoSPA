import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/_model/categoria-model';
import { CategoriaService } from 'src/app/_services/categoria.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-partner-area-category',
  templateUrl: './partner-area-category.component.html'
})

export class PartnerAreaCategoryComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  categoria: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private categoriaService: CategoriaService,
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
    if (this.form.controls.descricao.value) {
      filter.name = this.form.controls.descricao.value;
    }
    
    this.categoriaService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-category/0/0`]);
  }

  edit(obj: Categoria) {
    this.router.navigate([`/partner-area-category/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: Categoria) {
    this.categoria = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.categoriaService.deleteById(this.categoria.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.categoria);
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
    this.categoriaService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }

}
