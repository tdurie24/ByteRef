import { ChangeDetectionStrategy, Component, ViewChild, ContentChild } from '@angular/core';
import { NbIconConfig, NbMenuComponent, NbSidebarComponent } from '@nebular/theme';
import { GeneralService } from 'app/@core/services/general.service';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],

  templateUrl: './one-column.html',
})
export class OneColumnLayoutComponent {
  iconsArr: Array<string | NbIconConfig>;

  @ViewChild('sidebar', { static: true }) sidebar: NbSidebarComponent

  @ContentChild(NbMenuComponent)
  menu: NbMenuComponent;

  ngAfterContentInit() {
    this.iconsArr = this.menu.items.map(menuItem => menuItem.icon);
  }

  public showIcons(iconsArr: Array<string | NbIconConfig>) {

    this.menu.items.forEach(
      (menuItem, index) => {
        menuItem.icon = iconsArr[index];
      }
    )
  }

  public hideIcons() {
    this.menu.items.forEach(
      (menuItem) => {
        menuItem.icon = null;
      }
    )
  }

  toggle(sidebarCompacted: boolean): boolean {
    // if (sidebarCompacted) {
    //   this.showIcons(this.iconsArr);
    // }
    // else {
    //   this.hideIcons();
    // }
    return sidebarCompacted;
  }
}
