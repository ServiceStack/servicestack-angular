import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavItem, NavOptions, NavDefaults, NavLinkDefaults, trimEnd, activeClassNav, btnClasses } from '@servicestack/client';
import { BootstrapBase, optionProps, sanitizeOptions, routePath } from './core';

function parseIconHtml(html: string) {
    const match = /class="([^"]+)/.exec(html);
    if (match != null) {
        return match[1];
    }
    return null;
}

@Component({
    selector: 'nav-link-button',
    template: `
        <ng-link *ngIf="show"
                [to]="hashPrefix + item.href" (click)="onClick($event)" [id]="item.id"
                [classList]="[item.className, opt.navItemClass, activeCls, btnCls]">
            <i *ngIf="iconCls" [className]="iconCls"></i>
            {{item.label}}
        </ng-link>
    `
})
export class NavLinkButtonComponent extends BootstrapBase {

    @Input() href: string;
    @Input() item: NavItem;
    @Input() options: NavOptions;
    @Input() id: string;
    @Input() baseHref: string;
    @Input() activePath: string;
    @Input() navItemClass: string;
    @Input() exact: boolean;
    @Output() click: EventEmitter<any> = new EventEmitter();

    onClick(e) {
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
        return activeClassNav(this.item, this.useActivePath);
    }

    get btnCls() {
        return btnClasses(this.bootstrapClasses);
    }

    get iconCls() {
        return parseIconHtml(this.item.iconHtml);
    }
}
