import { Component, Input, Output, EventEmitter } from '@angular/core';
import { btnClasses, pick } from '@servicestack/client';
import { BootstrapBase } from './core';

const PROPS = ['id', 'type', 'name', 'autofocus', 'disabled', 'value'];

@Component({
    selector: 'ng-button',
    template: `
    <button (click)="onClick($event)" [className]="cls('btn', btnCls)" [setAttrs]="useAttrs">
        <ng-content></ng-content>
    </button>
    `,
})
export class ButtonComponent extends BootstrapBase {
    @Input() id: string|undefined;
    @Input() name: string|undefined;
    @Input() type: string|undefined;
    @Input() value: string|undefined;
    @Input() autofocus: boolean|undefined;
    @Input() disabled: boolean|undefined;

    @Output() click: EventEmitter<any> = new EventEmitter();

    onClick(e:any) {
        this.click.emit(e);
    }

    get useAttrs() { return Object.assign(pick(this.attrs, PROPS), pick(this, PROPS)); }

    get btnCls() { return btnClasses(this.bootstrapClasses); }
}
