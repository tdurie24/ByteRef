import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    NbDialogService,
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from '@nebular/theme';
import {map, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Moment} from 'moment';
import {SenwesAuthorizationService} from '@senwes/senwes-authorization';
import {environment} from 'environments/environment';
import {DecodedAccessTokenDetails} from "../../../@core/models/decoded.access.token.details";
import {AuthService} from "../../../@core/services/auth.service";
import {AccountService} from "../../../@core/services/account.service";
import {BranchModel} from "../../../@core/models/branch.model";
import {Dialog} from "@syncfusion/ej2-angular-popups";
import {BranchSwitcherComponent} from "../branch-switcher/branch-switcher.component";

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    userPictureOnly: boolean = true;
    user: any;

    liveClockTime: Observable<string>
    pageLoaded: Moment;

    themes = [
        {
            value: 'default',
            name: 'Light',
        },
        {
            value: 'dark',
            name: 'Dark',
        },
        {
            value: 'cosmic',
            name: 'Cosmic',
        },
        {
            value: 'corporate',
            name: 'Corporate',
        },
    ];

    currentTheme = 'default';

    currentApplicationVersion = environment.appVersion;
    currentDB = '';
    notificationsCount = 0;
    loggedInUser: DecodedAccessTokenDetails = undefined;
    selectedBranch: BranchModel = undefined;

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private _authService: SenwesAuthorizationService,
        private breakpointService: NbMediaBreakpointsService,
        private accountService: AccountService,
        private dialogService: NbDialogService,
    ) {
    }

    ngOnInit() {
        this._authService.initializeUser();

        this.currentTheme = this.themeService.currentTheme;

        this.user = this._authService.getUserDisplayName();

        this.prepareAppTheme();
        this.setCurrentLoggedInUser();
        this.setSelectedBranch();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar() {
        this.sidebarService.toggle(true, 'menu-sidebar');
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }

    logOut() {
        this._authService.signout();
    }

    home() {
        this._authService.home();
    }

    private setSelectedBranch() {
        this.accountService.userSelectedBranch$.subscribe({
            next: value => {
                this.selectedBranch = value;
            }
        });
    }

    showBranchDialog() {
        this.dialogService.open(BranchSwitcherComponent, {closeOnEsc: false, closeOnBackdropClick: false})
            .onClose
            .subscribe({
                next: value => {
                    if (value) {
                        this.setSelectedBranch();
                    }
                }
            })
    }

    private prepareAppTheme() {
        const {xl} = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$),
            )
            .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

        this.themeService.onThemeChange()
            .pipe(
                map(({name}) => name),
                takeUntil(this.destroy$),
            )
            .subscribe(themeName => this.currentTheme = themeName);
    }

    private setCurrentLoggedInUser() {
        this.accountService.currentLoggedInUserDetails$.subscribe({
            next: tokenData => {
                this.loggedInUser = tokenData;
            }
        });
    }

}
