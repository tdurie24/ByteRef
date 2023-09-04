import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Moment } from 'moment';
import { SenwesAuthorizationService } from '@senwes/senwes-authorization';
import { environment } from 'environments/environment';

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


  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private _authService: SenwesAuthorizationService,
    private breakpointService: NbMediaBreakpointsService,
  ) {
  }

  ngOnInit() {
    this._authService.initializeUser();

    this.currentTheme = this.themeService.currentTheme;

    this.user = this._authService.getUserDisplayName();

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);


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
}
