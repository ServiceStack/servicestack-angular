import { Component } from '@angular/core';
import { NavbarDefaults } from '@servicestack/client';
import { NavBase, optionProps, sanitizeOptions } from './core';

@Component({
    selector: 'navbar',
    template: `
        <div *ngIf="items && items.length" [className]="cls(opt.navClass)">
            <nav-link *ngFor="let item of items" [item]="item"
                      [options]="opt" [activePath]="activePath" [navItemClass]="opt.navItemClass"></nav-link>
        </div>
    `
})
export class NavbarComponent extends NavBase {
    get opt() {
        return sanitizeOptions(Object.assign(NavbarDefaults.forNavbar(this.options), optionProps(this)));
    }
}
