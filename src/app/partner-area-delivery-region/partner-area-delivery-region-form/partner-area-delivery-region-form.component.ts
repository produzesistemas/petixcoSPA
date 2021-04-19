import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LojaCEP } from 'src/app/_model/loja-cep-model';
import { LojaCEPService } from 'src/app/_services/loja-cep.service';
import { ToastrService } from 'ngx-toastr';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';

@Component({
  selector: 'app-partner-area-delivery-region-form',
  templateUrl: './partner-area-delivery-region-form.component.html'
})
export class PartnerAreaDeliveryRegionFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public lojaCep: LojaCEP = new LojaCEP();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private lojaCEPService: LojaCEPService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {

        if (params.id > 0) {
          this.lojaCep.id = Number(params.id);
        }

      });

    this.formAdd = this.formBuilder.group({
      cep: ['',  Validators.required],
      valorTaxa: [0],
      });

    this.load();
    }

    load() {
      if (this.lojaCep.id > 0) {
        const filter: FilterDefaultModel = new FilterDefaultModel();
        filter.id = Number(this.lojaCep.id);
        this.lojaCEPService.get(this.lojaCep.id).subscribe(result => {
          this.formAdd.controls.cep.setValue(result.cep);
          this.formAdd.controls.valorTaxa.setValue(result.valorFrete);
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }

      const lojacep = new LojaCEP(this.formAdd.value);
      lojacep.cep = this.formAdd.controls.cep.value;
      lojacep.valorFrete = this.formAdd.controls.valorTaxa.value;
      if (this.lojaCep.id > 0) {
        lojacep.id = this.lojaCep.id;
      }
      this.lojaCEPService.save(lojacep).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-delivery-region']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-delivery-region`]);
    }



}

