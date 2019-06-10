import { Component, Input } from '@angular/core';
import { errorResponseExcept } from '@servicestack/client';

@Component({
    selector: 'error-summary',
    template: `
        <div *ngIf="errorSummary" class="alert alert-danger mt-2">{{errorSummary}}</div>
    `
})
export class ErrorSummaryComponent {

    @Input() responseStatus!: object;
    @Input() except!: string;

    get errorSummary(){ return errorResponseExcept.call(this, this.except); }
}
