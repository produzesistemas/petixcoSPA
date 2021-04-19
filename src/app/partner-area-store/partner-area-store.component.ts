import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { LojaService } from '../_services/loja.service';
import { Loja } from 'src/app/_model/loja-model';
import { NgxViacepService } from '@brunoc/ngx-viacep';

@Component({
    selector: 'app-partner-area-store',
    templateUrl: './partner-area-store.component.html'
})

export class PartnerAreaStoreComponent implements OnInit {
    public currentUser;
    form: FormGroup;
    formFileUpload: FormGroup;
    cidades: any[];
    fileToUpload: File = null;
    logo: any;
    public submitted = false;
    public loja: Loja = new Loja();
    public file: any;
    constructor( private toastr: ToastrService,
                 private router: Router,
                 private formBuilder: FormBuilder,
                 private authenticationService: AuthenticationService,
                 private lojaService: LojaService,
                 private viacep: NgxViacepService) {
    }

    ngOnInit() {
      this.form = this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        logradouro: ['', Validators.required],
        bairro: ['', Validators.required],
        telefone: ['', Validators.required],
        cnpj: ['', Validators.required],
        cep: ['', Validators.required],
        contato: ['', Validators.required],
        nomeCidade: ['', Validators.required],
        numero: ['', Validators.required],
        politicaTroca: [''],
        politicaEntrega: [''],
        quemSomos: [''],
        valorMinimoProduto: [0],
        id: [0]
      });

      this.currentUser = this.authenticationService.getCurrentUser();
      this.lojaService.get().subscribe((result) => {
          this.loja = result;
          if (this.loja) {
            this.logo = environment.urlImagesLojas + this.loja.nomeImagem;
            this.load(this.loja);
          }
});

      this.disableControls();
}

load(loja: Loja) {
  this.form.controls.id.setValue(loja.id);
  this.form.controls.nome.setValue(loja.nome);
  this.form.controls.descricao.setValue(loja.descricao);
  this.form.controls.logradouro.setValue(loja.logradouro);
  this.form.controls.nomeCidade.setValue(loja.nomeCidade);
  this.form.controls.bairro.setValue(loja.bairro);
  this.form.controls.cep.setValue(loja.cep);
  this.form.controls.numero.setValue(loja.numero);
  this.form.controls.cnpj.setValue(loja.cnpj);
  this.form.controls.contato.setValue(loja.contato);
  this.form.controls.telefone.setValue(loja.telefone);
  this.form.controls.politicaTroca.setValue(loja.politicaTroca);
  this.form.controls.quemSomos.setValue(loja.quemSomos);
  this.form.controls.politicaEntrega.setValue(loja.politicaEntrega);
  this.form.controls.valorMinimoProduto.setValue(loja.valorMinimoProduto);
}

get f() { return this.form.controls; }

onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    if ((this.file === undefined) && (this.logo === undefined)){
      this.toastr.error('Selecione uma logomarca!');
      return;
    }

    const formData = new FormData();
    this.enableControls();
    const loja = new Loja(this.form.value);
    formData.append('store', JSON.stringify(loja));
    formData.append('file', this.file);
    this.lojaService.save(formData).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['partner-area']);
  });
}

  disableControls() {
    this.form.controls.logradouro.disable();
    this.form.controls.bairro.disable();
    this.form.controls.nomeCidade.disable();
  }

  enableControls() {
    this.form.controls.logradouro.enable();
    this.form.controls.bairro.enable();
    this.form.controls.nomeCidade.enable();
  }


  onSearchLocation() {
    this.submitted = true;
    if (this.form.controls.cep.invalid) {
        return;
    }
    this.viacep.buscarPorCep(this.form.controls.cep.value).then(result => {
      if (result !== undefined) {
          this.setEndereco(result);
      }
  });

  }

  setEndereco(endereco) {
    this.form.controls.logradouro.setValue(endereco.logradouro);
    this.form.controls.bairro.setValue(endereco.bairro);
    this.form.controls.numero.setValue(endereco.numero);
    this.form.controls.nomeCidade.setValue(endereco.localidade);
}

}

