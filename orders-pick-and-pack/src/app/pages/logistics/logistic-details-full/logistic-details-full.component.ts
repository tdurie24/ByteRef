import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'logistic-details-full',
    templateUrl: './logistic-details-full.component.html',
    styleUrls: ['./logistic-details-full.component.scss']
})
export class LogisticDetailsFullComponent implements OnInit {

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
    }

}
