import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector:'[setAttrs]'
})
export class SetAttrsDirective {
    constructor(private el:ElementRef) {}

    @Input()
    set setAttrs(attrs: any) {
        for (let k in attrs) {
            this.el.nativeElement.setAttribute(k, attrs[k]);
        }
    }
}