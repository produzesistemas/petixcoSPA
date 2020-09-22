import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { EnderecoService } from '../_services/endereco.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    form: FormGroup;
    public submitted = false;
    public parent;

    constructor( private toastr: ToastrService,
                 private enderecoService: EnderecoService,
                 private authenticationService: AuthenticationService,
                 private spinner: NgxSpinnerService,
                 private router: Router,
                 private route: ActivatedRoute,
                 private formBuilder: FormBuilder) {
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            if (params.id === '1') {
                this.parent = 1;
            }
        });

        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });
    }

    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        const formControls = this.form.controls;
        this.spinner.show();
        this.authenticationService.login(formControls.email.value, formControls.secret.value, 'Cliente')
        .subscribe(result => {
        this.spinner.hide();
        if (this.parent === 1) {
            if (this.enderecoService.load() === null) {
                return this.router.navigate(['/address/1']);
            }
            return this.router.navigate(['/checkout']);
        }



        }, (error: any) => {
            this.spinner.hide();
            return this.toastr.error(error.error.error_description);
        });
  }


}

