import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../../@core/services/account.service";
import {NbDialogRef} from "@nebular/theme";
import {BranchModel} from "../../../@core/models/branch.model";

@Component({
    selector: 'branch-switcher',
    templateUrl: './branch-switcher.component.html',
    styleUrls: ['./branch-switcher.component.scss']
})
export class BranchSwitcherComponent implements OnInit {

    branches: BranchModel[] = [];
    selectedBranchId: string;
    selectedBranch:BranchModel=undefined;

    constructor(
        private dialogRef: NbDialogRef<BranchSwitcherComponent>,
        private accountService: AccountService ) { }

    ngOnInit() {
        this.branches = this.accountService.userBranches;
        this.accountService.userSelectedBranch$.subscribe(
            {
                next:value => {
                    this.selectedBranch = value;
                }
            }
        )
    }

    onBranchSelected(branchId) {
        this.selectedBranchId = branchId;
        // this.accountService.switchBranch(branchId);
        // this.dialogRef.close(branchId);
    }

    onClose() {
        this.dialogRef.close();
    }

    saveChanges() {
        this.accountService.switchBranch(this.selectedBranchId);
        this.dialogRef.close(this.selectedBranchId);
    }
}
