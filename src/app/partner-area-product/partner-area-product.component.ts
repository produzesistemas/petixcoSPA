import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Produto } from 'src/app/_model/produto-model';
import { ProdutoService } from 'src/app/_services/produto.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { CategoriaService } from '../_services/categoria.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-partner-area-product',
  templateUrl: './partner-area-product.component.html'
})

export class PartnerAreaProductComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lstCategorias = [];
  lst = [];
  produto: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      subCategoriaId: ['']
    });
    const filter: FilterDefaultModel = new FilterDefaultModel();
    forkJoin(
      this.categoriaService.getByFilter(filter),
      this.produtoService.getByFilter(filter)
    ).subscribe(result => {
      this.loadCategorias(result[0]);
      this.lst = result[1];
    });
  }

  get f() { return this.form.controls; }
  getImage(nomeImage) {
    return environment.urlImagesProducts + nomeImage;
}

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    if (this.form.controls.subCategoriaId.value) {
      filter.id = this.form.controls.subCategoriaId.value;
    }
    this.produtoService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/partner-area-product/0/0`]);
  }

  edit(obj: Produto) {
    this.router.navigate([`/partner-area-product/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: Produto) {
    this.produto = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.produtoService.deleteById(this.produto.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.produto);
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
    this.produtoService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }

  loadCategorias(categorias) {
      categorias.forEach(categoria => {
        categoria.subcategorias.forEach(sub => {
          const item: any = {
            label: categoria.descricao + ' / ' + sub.descricao,
            value: sub.id
          };
          this.lstCategorias.push(item);
        });
      });
  }

}
