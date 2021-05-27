import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavBase, BootstrapBase, NavBootstrapBase } from './core';
import { SetAttrsDirective } from './SetAttrs';
import { ForbiddenComponent } from './Forbidden';
import { NavbarComponent } from './Navbar';
import { NavLinkComponent } from './NavLink';
import { LinkComponent } from './Link';
import { LinkButtonComponent } from './LinkButton';
import { ErrorSummaryComponent } from './ErrorSummary';
import { InputComponent } from './Input';
import { CheckboxComponent } from './Checkbox';
import { ButtonComponent } from './Button';
import { NavButtonGroupComponent } from './NavButtonGroup';
import { NavLinkButtonComponent } from './NavLinkButton';

export { NavBase, BootstrapBase, NavBootstrapBase };

@NgModule({
  declarations: [
    NavBase, BootstrapBase, NavBootstrapBase,
    SetAttrsDirective,
    ForbiddenComponent,
    NavbarComponent,
    NavLinkComponent,
    LinkComponent,
    LinkButtonComponent,
    ErrorSummaryComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    NavButtonGroupComponent,
    NavLinkButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavBase, BootstrapBase, NavBootstrapBase,
    SetAttrsDirective,
    ForbiddenComponent,
    NavbarComponent,
    NavLinkComponent,
    LinkComponent,
    LinkButtonComponent,
    ErrorSummaryComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    NavButtonGroupComponent,
    NavLinkButtonComponent,
  ]
})
export class ServiceStackModule { }
