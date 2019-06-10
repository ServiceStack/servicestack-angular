import { Component, Input } from '@angular/core';
import { errorResponse, classNames } from '@servicestack/client';
import { AbstractValueAccessor, MakeProvider } from './core';

@Component({
    selector: 'ng-checkbox',
    template: `
    <div>
        <div [className]="cls('form-check',{'is-invalid':errorField,'form-control':errorField})">
            <input type="checkbox" [id]="name" [name]="name" (input)="onInput($event.target)"
                [checked]="value" (input)="value = $event.target.checked"
                [className]="cls('form-check-input',{'is-invalid':errorField},inputClass)" >
            <label class="form-check-label" [for]="id"><ng-content></ng-content></label>
        </div>
        <small *ngIf="help" class="text-muted">{{help}}</small>
        <div *ngIf="errorField" class="invalid-feedback">{{errorField}}</div>
    </div>
    `,
    providers: [MakeProvider(CheckboxComponent)],
})
export class CheckboxComponent extends AbstractValueAccessor {

    @Input() responseStatus: any;
    @Input() name: string;
    @Input() placeholder: string;
    @Input() checked: boolean = false;
    @Input() help: string;
    @Input() inputClass: string = '';
    @Input() value: boolean = false;

    onInput(e: HTMLInputElement) { 
        this.value = e.checked;
    }

    get id(){ return this.name; }
    get errorField(){ return errorResponse.call(this, this.id); }

    cls(...args:any[]) { return classNames(args); }
}
