import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavOptions, LinkButtonDefaults, trimEnd, pick, btnClasses, activeClass } from '@servicestack/client';
import { BootstrapBase, optionProps, sanitizeOptions } from './core';

@Component({
    selector: 'link-button',
    template: `
        <ng-link [to]="hashPrefix + href" [attrs]="useAttrs" (click)="onClick($event)" 
                 [classList]="[opt.navItemClass, activeCls, btnCls]">
            <ng-content></ng-content>
        </ng-link>
    `
})
export class LinkButtonComponent extends BootstrapBase {

    @Input() href: string = '';
    @Input() options: NavOptions;
    @Input() navItemClass: string;
    @Input() exact: boolean;
    @Output() click: EventEmitter<any> = new EventEmitter();

    @Input() id: string;
    @Input() name: string;
    @Input() autofocus: boolean;
    @Input() disabled: boolean;

    onClick(e) {
        this.click.emit(e);
    }

    get opt() {
        return sanitizeOptions(Object.assign(LinkButtonDefaults.forLinkButton(this.options), optionProps(this)));
    }

    get activeHref() {
        return this.href != null ? this.opt.activePath || location.pathname : null;
    }

    get hashPrefix() {
        return trimEnd(this.opt.baseHref || '', '/');
    }

    get useAttrs() {
        return pick(this, ['id', 'name', 'autofocus', 'disabled']);
    }

    get activeCls() {
        return activeClass(this.href || null, this.activeHref, this.exact);
    }

    get btnCls() {
        return btnClasses(this.bootstrapClasses);
    }

    ngOnInit() {
        if (this.attrs) {
            for (const k in this.attrs) {
                this[k] = this.attrs[k];
            }
        }
    }
}
