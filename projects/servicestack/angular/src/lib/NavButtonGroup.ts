import { Component, Output, EventEmitter } from '@angular/core';
import { NavButtonGroupDefaults } from '@servicestack/client';
import { NavBootstrapBase, optionProps, sanitizeOptions } from './core';

@Component({
    selector: 'nav-button-group',
    template: `
        <div *ngIf="items && items.length" [className]="clsName">
            <nav-link-button *ngFor="let item of items" [item]="item" [className]="clsBlock"
                             (click)="onClick($event)" [options]="opt" [attrs]="bootstrapAttrs"></nav-link-button>
        </div>
    `
})
export class NavButtonGroupComponent extends NavBootstrapBase {

    @Output() click: EventEmitter<any> = new EventEmitter();

    onClick(e:any) {
        this.click.emit(e);
    }

    get opt() {
        return sanitizeOptions(Object.assign(NavButtonGroupDefaults.forNavButtonGroup(this.options), optionProps(this)));
    }
    
    get clsName() {
        return (this.block !== false ? null : this.vertical !== false ? 'btn-group-vertical' : this.opt.navClass) || '';
    }

    //Angular creates wrapper html tags, so need to lift class so bootstrap `.btn-block + .btn-block` applies
    get clsBlock() {        
        return this.block !== false ? 'btn-block' : ''; 
    }
}
