import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-partner-area',
    templateUrl: './partner-area.component.html'
})

export class PartnerAreaComponent implements OnInit {

    constructor( private toastr: ToastrService,
                 private router: Router) {
    }

    ngOnInit() {

}

}

