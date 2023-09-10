import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'logistic-details-full',
    templateUrl: './logistic-details-full.component.html',
    styleUrls: ['./logistic-details-full.component.scss']
})
export class LogisticDetailsFullComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
                private matDialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
    }

}
