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
    @Input() options: NavOptions|undefined;
    @Input() navItemClass: string|undefined;
    @Input() exact: boolean|undefined;
    @Output() click: EventEmitter<any> = new EventEmitter();

    @Input() id: string|undefined;
    @Input() name: string|undefined;
    @Input() autofocus: boolean|undefined;
    @Input() disabled: boolean|undefined;

    onClick(e:any) {
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

    ngOnInit(this: any|any[]) {
        if (this.attrs) {
            for (const k in this.attrs) {
                this[k] = this.attrs[k];
            }
        }
    }
}
