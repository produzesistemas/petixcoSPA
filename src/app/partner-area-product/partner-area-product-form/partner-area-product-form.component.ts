import { Component, OnInit, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../../_services/produto.service';
import { CategoriaService } from '../../_services/categoria.service';
import { Produto } from '../../_model/produto-model';
import { forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';

@Component({
  selector: 'app-partner-area-product-form',
  templateUrl: './partner-area-product-form.component.html'
})

export class PartnerAreaProductFormComponent implements OnInit {
  public currentUser;
  form: FormGroup;
  formFileUpload: FormGroup;
  fileToUpload: File = null;
  uploaded = false;
  lstCategorias = [];
  logo: any;
  public submitted = false;
  public isPromocional = false;
  public file: any;
  public produto: Produto = new Produto();
  constructor(private toastr: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private produtoService: ProdutoService,
              private categoriaService: CategoriaService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.produto.id = Number(params.id);
      }
    });

    this.form = this.formBuilder.group({
      file: ['', Validators.required],
      detalhe: ['', Validators.required],
      descricao: ['', Validators.required],
      subCategoriaId: ['', Validators.required],
      destaque: ['', Validators.required],
      promocao: ['', Validators.required],
      valor: ['', Validators.required],
      valorPromocional: ['']
    });
    this.loadForm();
  }

  loadForm() {
    if (this.produto.id !== undefined) {
      this.loadCategoriasAndProduto();
    } else {
      this.loadCategorias();
    }
  }

loadCategorias() {
  const filter: FilterDefaultModel = new FilterDefaultModel();
  this.categoriaService.getByFilter(filter).subscribe(categorias => {
    categorias.forEach(categoria => {
      categoria.subcategorias.forEach(sub => {
        const item: any = {
          label: categoria.descricao + ' / ' + sub.descricao,
          value: sub.id
        };
        this.lstCategorias.push(item);
      });
    });
  });
}

loadCategoriasAndProduto() {
  const filter: FilterDefaultModel = new FilterDefaultModel();
  forkJoin(
    this.produtoService.get(this.produto.id),
    this.categoriaService.getByFilter(filter)
  ).subscribe(result => {
    if (result[0] != null) {
      this.loadObject(result[0]);
    }
    result[1].forEach(categoria => {
      categoria.subcategorias.forEach(sub => {
        const item: any = {
          label: categoria.descricao + ' / ' + sub.descricao,
          value: sub.id
        };
        this.lstCategorias.push(item);
      });
    });
  });
}

  get f() { return this.form.controls; }

  loadObject(item) {
    this.form.controls.descricao.setValue(item.descricao);
    this.form.controls.detalhe.setValue(item.detalhe);
    this.form.controls.valor.setValue(item.valor);
    this.form.controls.valorPromocional.setValue(item.valorPromocional);
    this.form.controls.descricao.setValue(item.descricao);
    this.form.controls.descricao.setValue(item.descricao);
    this.form.controls.subCategoriaId.setValue(item.subCategoriaId);
    this.form.controls.promocao.setValue(item.promocao.toString());
    this.form.controls.destaque.setValue(item.destaque.toString());
    this.logo = environment.urlImagesProducts + item.nomeImagem;
  }

  onCancel() {
    this.router.navigate([`/partner-area-product`]);
  }


  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSave() {
    this.submitted = true;
    if (this.logo) {
      this.form.controls.file.clearValidators();
      this.form.controls.file.updateValueAndValidity();
    }
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    this.produto.descricao = this.form.controls.descricao.value;
    this.produto.detalhe = this.form.controls.detalhe.value;
    this.produto.subCategoriaId = Number(this.form.controls.subCategoriaId.value);
    this.produto.destaque = this.form.controls.destaque.value === 'false' ? false : true;
    this.produto.promocao = this.form.controls.promocao.value === 'false' ? false : true;
    this.produto.valor = this.form.controls.valor.value;
    this.produto.valorPromocional = this.form.controls.valorPromocional.value;
    formData.append('produto', JSON.stringify(this.produto));
    formData.append('file', this.file);
    this.produtoService.save(formData).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['partner-area-product']);
    });
  }

  handleChange(evt) {
    if (evt.target.checked) {
      if (evt.target.id === 'promocaoYes') {
        this.isPromocional = true;
        this.form.controls.valorPromocional.setValidators([Validators.required, Validators.minLength(1)]);
      }
      if (evt.target.id === 'promocaoNo') {
        this.isPromocional = false;
        this.form.controls.valorPromocional.clearValidators();
        this.form.controls.valorPromocional.updateValueAndValidity();
      }
    }
  }

}

