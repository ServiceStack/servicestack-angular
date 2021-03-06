import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavItem, NavOptions, NavDefaults, NavLinkDefaults, trimEnd, activeClassNav, btnClasses } from '@servicestack/client';
import { BootstrapBase, optionProps, sanitizeOptions, routePath } from './core';

@Component({
    selector: 'nav-link-button',
    template: `
        <ng-link *ngIf="show"
                [to]="hashPrefix + (item?.href||'')" (click)="onClick($event)" [id]="item?.id"
                [classList]="[item?.className||'', opt.navItemClass, activeCls, btnCls]">
            <i *ngIf="item?.iconClass" [className]="item?.iconClass||''"></i>
            {{item?.label || ''}}
        </ng-link>
    `
})
export class NavLinkButtonComponent extends BootstrapBase {

    @Input() href: string|undefined;
    @Input() item: NavItem|undefined;
    @Input() options: NavOptions|undefined;
    @Input() id: string|undefined;
    @Input() baseHref: string|undefined;
    @Input() activePath: string|undefined;
    @Input() navItemClass: string|undefined;
    @Input() exact: boolean|undefined;
    @Output() click: EventEmitter<any> = new EventEmitter();

    onClick(e:any) {
        this.click.emit(e);
    }

    get opt() {
        return sanitizeOptions(Object.assign(NavLinkDefaults.forNavLink(this.options), optionProps(this)));
    }

    get show() {
        return !(this.item == null || !NavDefaults.showNav(this.item, this.opt.attributes));
    }

    get useActivePath() {
        return this.activePath || this.opt.activePath || routePath(this) || '';
    }

    get hashPrefix() {
        return trimEnd(this.baseHref || this.opt.baseHref || '', '/');
    }

    get activeCls() {
        return this.item && activeClassNav(this.item, this.useActivePath);
    }

    get btnCls() {
        return btnClasses(this.bootstrapClasses);
    }
}
