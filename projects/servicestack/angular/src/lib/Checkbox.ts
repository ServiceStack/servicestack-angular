import { Component, Input } from '@angular/core';
import { errorResponse, classNames } from '@servicestack/client';
import { MakeProvider } from './core';
import { ControlValueAccessor } from '@angular/forms';

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
export class CheckboxComponent implements ControlValueAccessor {

    @Input() responseStatus: any;
    @Input() name: string|undefined;
    @Input() placeholder: string|undefined;
    @Input() checked: boolean = false;
    @Input() help: string|undefined;
    @Input() inputClass: string = '';
    
    @Input()
    _value: boolean = false;
    get value(): boolean { return this._value; };
    set value(v: boolean) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }

    writeValue(value: any) {
      this._value = value;
      // warning: comment below if only want to emit on user intervention
      this.onChange(value);
    }

    onChange = (_:any) => {};
    onTouched = () => {};
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    onInput(e: HTMLInputElement|any) { 
        this.value = e?.checked;
    }

    get id(){ return this.name; }
    get errorField(){ return errorResponse.call(this, this.id || ''); }

    cls(...args:any[]) { return classNames(args); }
}
