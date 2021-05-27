import { Component, Input, Output, EventEmitter } from '@angular/core';
import { classNames, pick } from '@servicestack/client';

const PROPS = ['id', 'name', 'autofocus'];

@Component({
    selector: 'ng-link',
    template: `
    <ng-template #content><ng-content></ng-content></ng-template>
    <a *ngIf="!to" href="javascript:void(0)" (click)="onClick($event)" [className]="cls" [setAttrs]="useAttrs"><ng-container *ngTemplateOutlet="content"></ng-container></a>
    <a *ngIf="to && isAbsolute"  [href]="to" [className]="cls" [setAttrs]="useAttrs"><ng-container *ngTemplateOutlet="content"></ng-container></a>
    <a *ngIf="to && !isAbsolute" [routerLink]="to" [className]="cls" [setAttrs]="useAttrs"><ng-container *ngTemplateOutlet="content"></ng-container></a>
    `
})
export class LinkComponent {

    @Input() classList: string[] = [];
    @Input() to: string|undefined;
    @Output() click: EventEmitter<any> = new EventEmitter();

    @Input() attrs: any;
    @Input() id: string|undefined;
    @Input() name: string|undefined;
    @Input() autofocus: boolean|undefined;
    @Input() disabled: boolean|undefined;

    onClick(e:any) {
        this.click.emit(e);
    }

    get cls() { return classNames(this.classList); }

    get isAbsolute() {
        return this.to && (this.to.startsWith('http://') || this.to.startsWith('https://') || this.to.startsWith('://'));
    }

    get useAttrs() { return Object.assign(pick(this.attrs, PROPS), pick(this, PROPS)); }
}
