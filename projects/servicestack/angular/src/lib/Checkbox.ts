import { Component, Input } from '@angular/core';
import { errorResponse, classNames } from '@servicestack/client';
import { AbstractValueAccessor, MakeProvider } from './core';

@Component({
    selector: 'ng-checkbox',
    template: `
    <div>
        <div [className]="cls('form-check',{'is-invalid':errorField,'form-control':errorField})">
            <input type="checkbox" [id]="name" [name]="name" 
                [checked]="value" (input)="onInput($event.target)"
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
    @Input() name: string|undefined;
    @Input() placeholder: string|undefined;
    @Input() checked: boolean = false;
    @Input() help: string|undefined;
    @Input() inputClass: string = '';
    
    public get value(): boolean {
        return super.value || false;
    }
    @Input() public set value(value: boolean) {
        super.value = value;
    }

    onInput(e: HTMLInputElement|any) { 
        this.value = e?.checked;
    }

    get id(){ return this.name; }
    get errorField(){ return errorResponse.call(this, this.id || ''); }

    cls(...args:any[]) { return classNames(args); }
}
