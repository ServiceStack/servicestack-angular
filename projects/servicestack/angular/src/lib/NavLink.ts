import { Component, Input } from '@angular/core';
import {
    NavItem, NavOptions, NavDefaults, safeVarName, activeClassNav,
} from '@servicestack/client';
import { NavBase, sanitizeOptions, routePath } from './core';

@Component({
    selector: 'nav-link',
    template: `
        <li *ngIf="show" [className]="cls([item.className, navItemCls])">
            <ng-link [to]="opt.baseHref + item.href" [classList]="[navLinkCls, activeCls]" [id]="id" [attrs]="childProps">
                {{item.label}}
            </ng-link>
            <div *ngFor="let x of item.children" [className]="cls(opt.childNavMenuClass)" aria-labelledby="id">
                <div *ngIf="x.label === '-'" className="dropdown-divider"></div>
                <ng-link *ngIf="x.label !== '-'"  [to]="opt.baseHref + x.href" 
                         [classList]="cls(opt.childNavMenuItemClass, activeClassNav(x, useActivePath))">
                    {{x.label}}
                </ng-link>
            </div>
        </li>
    `
})
export class NavLinkComponent extends NavBase {

    @Input() item: NavItem;
    @Input() options: NavOptions;
    @Input() activePath: string;
    @Input() navItemClass: string;
    @Input() navLinkClass: string;

    get opt() {
        return sanitizeOptions(NavDefaults.forNav(this.options));
    }

    get show() {
        return !(this.item == null || !NavDefaults.showNav(this.item, this.opt.attributes));
    }

    get useActivePath() {
        return this.activePath || this.opt.activePath || routePath(this) || '';
    }

    get hasChildren() {
        return this.item.children && this.item.children.length > 0;
    }

    get navItemCls() {
        return this.hasChildren
            ? this.opt.childNavItemClass
            : this.opt.navItemClass;
    }

    get navLinkCls() {
        return this.hasChildren
            ? this.opt.childNavLinkClass
            : this.opt.navLinkClass;
    }

    get childProps() {
        return this.hasChildren
            ? {
                'role': 'button',
                'data-toggle': 'dropdown',
                'aria-haspopup': 'true',
                'aria-expanded': 'false',
              }
            : {};
    }

    get id() { return this.item.id || this.hasChildren ? safeVarName(this.item.label) : null; }

    get activeCls() {
        return activeClassNav(this.item, this.useActivePath);
    }

    activeClassNav(x: NavItem, activePath: string) { return activeClassNav(x, activePath); }
}
