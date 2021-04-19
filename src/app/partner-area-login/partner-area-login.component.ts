import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthenticationSocialLoginService } from '../_services/authentication-social-login.service';
import { SocialAuthService } from 'angularx-social-login';
import { LoginUser } from '../_model/login-user-model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LojaService } from '../_services/loja.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-partner-area-login',
    templateUrl: './partner-area-login.component.html'
})

export class PartnerAreaLoginComponent implements OnInit {
    form: FormGroup;
    formRegister: FormGroup;
    public submitted = false;
    public parent;
    public login: any;
    public loja: any;
    logo: any;
    public loginUser: LoginUser = new LoginUser();
    modalRef: BsModalRef;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authenticationSocialLoginService: AuthenticationSocialLoginService,
        private route: ActivatedRoute,
        private lojaService: LojaService,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private formBuilder: FormBuilder,
        private authService: SocialAuthService) {
    }

    ngOnInit() {
        // if (this.authenticationService.getCurrentUser()) {
        //     this.router.navigate(['partner-area']);
        // }
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });

        this.formRegister = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });
        this.loja = this.lojaService.loadStoreSelected();
        if (this.loja) {
            this.logo = environment.urlImagesLojas + this.loja.nomeImagem;
          }
    }

    get f() { return this.form.controls; }
    get fr() { return this.formRegister.controls; }

    onLogin() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loginUser.email = this.form.controls.email.value;
        this.loginUser.secret = this.form.controls.secret.value;
        this.authenticationService.login(this.loginUser)
        .subscribe(result => {
            this.authenticationService.clearUser();
            this.authenticationService.addCurrenUser(result);
            return this.router.navigate(['/partner-area']);
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    }

  close() {
      this.modalRef.hide();
      }

      onRegister() {
          this.submitted = true;
          if (this.formRegister.invalid) {
              return;
          }
          this.loginUser.email = this.formRegister.controls.email.value;
          this.loginUser.secret = this.formRegister.controls.secret.value;
          this.authenticationService.registerMaster(this.loginUser)
          .subscribe(result => {
              this.close();
              return this.toastr.success('Usuário registrado com sucesso');
          });
      }
}

