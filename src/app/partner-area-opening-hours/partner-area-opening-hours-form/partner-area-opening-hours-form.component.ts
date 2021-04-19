import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HorarioFuncionamento } from 'src/app/_model/horario-funcionamento';
import { HorarioFuncionamentoService } from 'src/app/_services/horario-funcionamento.service';
import { DaysWeekService } from 'src/app/_services/days-week.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-partner-area-opening-hours-form',
  templateUrl: './partner-area-opening-hours-form.component.html'
})
export class PartnerAreaOpeningHoursFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public horarioFuncionamento: HorarioFuncionamento = new HorarioFuncionamento();
  daysWeek: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private horarioFuncionamentoService: HorarioFuncionamentoService,
    private daysWeekService: DaysWeekService
  ) { }

  get q() { return this.formAdd.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.horarioFuncionamento.id = Number(params.id);
        }
      });

    this.formAdd = this.formBuilder.group({
        dia: ['', [Validators.required]],
        horaInicial: ['', [Validators.required]],
        horaFinal: ['', [Validators.required]],
      });

    this.daysWeek = this.daysWeekService.get();
    this.load();
    }

    load() {
      if (this.horarioFuncionamento.id > 0) {
        this.horarioFuncionamentoService.get(this.horarioFuncionamento.id).subscribe(result => {
          this.formAdd.controls.dia.setValue(result.dia);
          this.formAdd.controls.horaInicial.setValue(result.horaInicial);
          this.formAdd.controls.horaFinal.setValue(result.horaFinal);
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }

      const horario = new HorarioFuncionamento(this.formAdd.value);
      horario.dia = Number(this.formAdd.controls.dia.value);
      if (this.horarioFuncionamento.id > 0) {
        horario.id = this.horarioFuncionamento.id;
      }
      this.horarioFuncionamentoService.save(horario).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/partner-area-opening-hours']);
    });
    }

    onCancel() {
      this.router.navigate([`/partner-area-opening-hours`]);
    }



}

