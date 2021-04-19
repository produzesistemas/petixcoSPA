import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubCategoria } from 'src/app/_model/sub-categoria-model';
import { SubCategoriaService } from 'src/app/_services/sub-categoria.service';
import { ToastrService } from 'ngx-toastr';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';
import { CategoriaService } from '../../_services/categoria.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-partner-area-sub-categoria-form',
  templateUrl: './partner-area-sub-category-form.component.html'
})
export class PartnerAreaSubCategoryFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  categorias = [];
  public subcategoria: SubCategoria = new SubCategoria();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private subCategoriaService: SubCategoriaService,
    private categoriaService: CategoriaService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.subcategoria.id = Number(params.id);
        }
      });

    this.formAdd = this.formBuilder.group({
      descricao: ['',  Validators.required],
      categoria: ['',  Validators.required]
      });

      if (this.subcategoria.id > 0) { 
        this.load();
      } else {
        this.loadCategorias();
      }
    
    }

    loadCategorias() {
      const filter: FilterDefaultModel = new FilterDefaultModel();
      this.categoriaService.getByFilter(filter).subscribe(categorias => {
          this.categorias = categorias;
      });
    }

    load() {
      const filter: FilterDefaultModel = new FilterDefaultModel();
      forkJoin(
        this.subCategoriaService.get(this.subcategoria.id),
        this.categoriaService.getByFilter(filter)
      ).subscribe(result => {
        this.subcategoria = result[0];
        this.categorias = result[1];
        this.formAdd.controls.descricao.setValue(this.subcategoria.descricao);
        this.formAdd.controls.categoria.setValue(this.categorias.find(x => x.id == this.subcategoria.categoriaId));
      });
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }

      const subcategoria = new SubCategoria();
      if (this.subcategoria.id > 0) {
        subcategoria.id = this.subcategoria.id;
      }
      subcategoria.descricao = this.formAdd.controls.descricao.value;
      subcategoria.categoriaId = this.formAdd.controls.categoria.value.id;
      this.subCategoriaService.save(subcategoria).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-sub-category']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-sub-category`]);
    }



}

