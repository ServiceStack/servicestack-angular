import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    template: `
        <div class="forbidden">
            <h3>
                You are not authorized to access
                <code *ngIf="usePath">{{usePath}}</code>
                <span *ngIf="!usePath">this page</span>
            </h3>
            <p *ngIf="useMessage">{{useMessage}}</p>
            <p *ngIf="!useMessage && useRole">Missing role <code>{{useRole}}</code></p>
            <p *ngIf="!useMessage && usePermission">Missing permission <code>{{usePermission}}</code></p>
        </div>    
    `
})
export class ForbiddenComponent implements OnInit {
    @Input() message: string;
    @Input() path: string;
    @Input() role: string;
    @Input() permission: string;

    useMessage = '';
    usePath = '';
    useRole = '';
    usePermission = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router
      ) { }

    ngOnInit() {
        // Can pass params via props, queryString, or pushState
        this.useMessage = window.history.state.message || this.route.snapshot.paramMap.get('message') || this.message;
        this.usePath = window.history.state.path || this.route.snapshot.paramMap.get('path') || this.path;
        this.useRole = window.history.state.role || this.route.snapshot.paramMap.get('role') || this.role;
        this.usePermission = window.history.state.permission || this.route.snapshot.paramMap.get('permission') || this.permission;
    }    
}
