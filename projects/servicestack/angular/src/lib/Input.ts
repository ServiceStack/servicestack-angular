import { Component, Input } from '@angular/core';
import { errorResponse, classNames } from '@servicestack/client';
import { AbstractValueAccessor, MakeProvider } from './core';

function inputSelectedValues(input: HTMLInputElement) {
    if (input.form == null) {
        throw new Error('multiple values must be within a <form> element');
    }

    const selectedValues = (Array.from(input.form.elements) as HTMLInputElement[])
        .filter((el) => el.name === input.name && el.checked)
        .map((el) => el.value);
    return selectedValues;
}

@Component({
    selector: 'ng-input',
    template: `
    <div>
        <label *ngIf="label" [className]="isCheck ? 'form-check-label' : 'form-label'" [for]="id">{{label}}</label>
        <div *ngIf="isCheck" [className]="cls(['form-check',{'is-invalid':hasError,'form-control':hasError}])">
            <template *ngIf="type === 'radio'">
                <div *ngFor="let kvp of kvpValues" [className]="cls(['custom-control','custom-radio',{'custom-control-inline':inline}])">
                    <input type="radio" [id]="concat(id,'-',kvp.key)" [name]="id" [value]="kvp.key"
                        [className]="cls('custom-control-input',inputClass)" [checked]="value==kvp.key" (input)="onInput($event.target)" />
                    <label class="custom-control-label" [for]="concat(id,'-',kvp.key)">{{kvp.value}}</label>
                </div>
            </template>
            <template *ngIf="type === 'checkbox'">
                <div *ngFor="let kvp of kvpValues" [className]="cls('custom-control','custom-checkbox',{'custom-control-inline':inline})">
                    <input type="checkbox" [id]="concat(id,'-',kvp.key)" [name]="id" [value]="kvp.key"
                        class="form-check-input" [checked]="hasValue(kvp.key)" (input)="onInputValues($event.target)" />
                    <label class="form-check-label" [for]="concat(id,'-',kvp.key)">{{kvp.value}}</label>
                </div>
            </template>
            <small *ngIf="help" class="text-muted">{{help}}</small>
        </div>
        <input *ngIf="!isCheck" [type]="type" [id]="id" [name]="id" (input)="onInput($event.target)" [value]="value"
            [className]="cls('form-control',{'is-invalid':errorField},inputClass)"
            [placeholder]="placeholder" />
        <small *ngIf="!isCheck && help" class="text-muted">{{help}}</small>
        <div *ngIf="hasError" class="invalid-feedback">{{errorField}}</div>
    </div>
    `,
    providers: [MakeProvider(InputComponent)],
})
export class InputComponent extends AbstractValueAccessor {

    @Input() responseStatus: object|undefined;
    @Input() type: string = 'text';
    @Input() name: string|undefined;
    @Input() placeholder: string|undefined;
    @Input() label: string|undefined;
    @Input() help: string|undefined;
    @Input() inputClass: string = 'form-control-lg';
    @Input() inline: boolean = false;
    // @ts-ignore
    @Input() value: string[]|string;
    @Input() values: any[] = [];

    onInput(e: HTMLInputElement|any) { 
        this.value = e.value;
    }

    onInputValues(e: HTMLInputElement|any) { 
        this.value = inputSelectedValues(e);
    }

    get id(){ return this.name||''; }

    concat(prefix: string, id: string, suffix: string) { return prefix + id + (suffix || ''); }
    get isCheck(){ return this.type === 'radio' || this.type === 'checkbox'; }
    get errorField(){ return errorResponse.call(this, this.id || ''); }
    get hasError(){ return !!this.errorField; }
    get kvpValues() {
        const kvps = (this.values || []).map((x) => typeof x === 'string'
            ? { key: x, value: x }
            : x);
        return kvps;
    }

    hasValue(elValue: string) {
        return this.type === 'checkbox'
            ? (this.value instanceof Array
                ? this.value.indexOf(elValue) >= 0
                : false)
            : this.value === elValue;
    }

    cls(...args:any[]) { return classNames(args); }
}
