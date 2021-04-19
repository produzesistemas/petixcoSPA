import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/_model/categoria-model';
import { CategoriaService } from 'src/app/_services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';

@Component({
  selector: 'app-partner-area-categoria-form',
  templateUrl: './partner-area-category-form.component.html'
})
export class PartnerAreaCategoryFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public categoria: Categoria = new Categoria();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.categoria.id = Number(params.id);
        }
      });

    this.formAdd = this.formBuilder.group({
      descricao: ['',  Validators.required],
      });

    this.load();
    }

    load() {
      if (this.categoria.id > 0) {
        const filter: FilterDefaultModel = new FilterDefaultModel();
        filter.id = Number(this.categoria.id);
        this.categoriaService.get(this.categoria.id).subscribe(result => {
          this.formAdd.controls.descricao.setValue(result.descricao);
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }

      const categoria = new Categoria(this.formAdd.value);
      if (this.categoria.id > 0) {
        categoria.id = this.categoria.id;
      }
      this.categoriaService.save(categoria).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-category']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-category`]);
    }



}

