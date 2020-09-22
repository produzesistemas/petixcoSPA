import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../_services/store.service';
import { EnderecoService } from '../_services/endereco.service';
import { Endereco } from '../_model/endereco';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html'
})

export class AddressComponent implements OnInit {
    public productDTO;
    private address: Endereco = new Endereco();
    form: FormGroup;
    public submitted = false;
    public parent;

    constructor( private enderecoService: EnderecoService,
                 private storeService: StoreService,
                 private router: Router,
                 private route: ActivatedRoute,
                 private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.productDTO = this.storeService.loadStoreSelected();
        this.route.params.subscribe(params => {
            if (params.id === '1') {
                this.parent = 1;
            }
        });

        this.form = this.formBuilder.group({
            descricao: ['', Validators.required],
            numero: ['', Validators.required],
            cidade: ['', Validators.required],
            uf: ['', Validators.required],
            bairro: ['', Validators.required],
            pontoReferencia: [''],
            complemento: [''],
            cep: [this.productDTO.store.cep, Validators.required]
        });
        this.form.controls.cep.disable();
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.address = new Endereco(this.form.value);
        this.enderecoService.confirm(this.address);
        if (this.parent === 1) {
            return this.router.navigate(['/checkout']);
        }

  }


}

