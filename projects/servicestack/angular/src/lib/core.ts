import { NavItem, NavOptions, classNames } from '@servicestack/client';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export function bootstrapAttrs(this: any) {
    return {
        'primary': this.primary,
        'outline-primary': this.outlinePrimary,
        'secondary': this.secondary,
        'outline-secondary': this.outlineSecondary,
        'success': this.success,
        'outline-success': this.outlineSuccess,
        'info': this.info,
        'outline-info': this.outlineInfo,
        'warning': this.warning,
        'outline-warning': this.outlineWarning,
        'danger': this.danger,
        'outline-danger': this.outlineDanger,
        'light': this.light,
        'outline-light': this.outlineLight,
        'dark': this.dark,
        'outline-dark': this.outlineDark,
        'lg': this.lg,
        'md': this.md,
        'sm': this.sm,
        'xs': this.xs,
        'block': this.block,
    } as any;
}

@Component({
    template: `<i></i>`
})
export class BootstrapBase {
    @Input() primary: boolean|undefined;
    @Input('outline-primary') outlinePrimary: boolean|undefined;
    @Input() secondary: boolean|undefined;
    @Input('outline-secondary') outlineSecondary: boolean|undefined;
    @Input() success: boolean|undefined;
    @Input('outline-success') outlineSuccess: boolean|undefined;
    @Input() info: boolean|undefined;
    @Input('outline-info') outlineInfo: boolean|undefined;
    @Input() warning: boolean|undefined;
    @Input('outline-warning') outlineWarning: boolean|undefined;
    @Input() danger: boolean|undefined;
    @Input('outline-danger') outlineDanger: boolean|undefined;
    @Input() light: boolean|undefined;
    @Input('outline-light') outlineLight: boolean|undefined;
    @Input() dark: boolean|undefined;
    @Input('outline-dark') outlineDark: boolean|undefined;

    @Input() lg: boolean|undefined;
    @Input() md: boolean|undefined;
    @Input() sm: boolean|undefined;
    @Input() xs: boolean|undefined;

    @Input() block: boolean|undefined;
    @Input() vertical: boolean|undefined;
    @Input() horizontal: boolean|undefined;

    @Input() attrs: any;

    get bootstrapAttrs() {
        return Object.assign(bootstrapAttrs.call(this), this.attrs ? bootstrapAttrs.call(this.attrs) : {});
    }

    get bootstrapClasses() {
        const props = this.bootstrapAttrs;
        const ret: any = {};
        Object.keys(props).forEach((k: any) => {
            if (props[k] !== false && props[k] != null) {
                ret[k] = props[k] || true;
            }
        });
        return ret;
    }

    cls(...args:any[]) { return classNames(args); }
}

@Component({
    template: `<i></i>`
})
export class NavBootstrapBase extends BootstrapBase {
    @Input() items: NavItem[] = [];
    @Input() options: NavOptions|undefined;
    @Input() attributes: string[] = [];
    @Input() activePath: string|undefined;
    @Input() baseHref: string|undefined;
    @Input() navClass: string|undefined;
    @Input() navItemClass: string|undefined;
    @Input() navLinkClass: string|undefined;
    @Input() childNavItemClass: string|undefined;
    @Input() childNavLinkClass: string|undefined;
    @Input() childNavMenuClass: string|undefined;
    @Input() childNavMenuItemClass: string|undefined;
}

@Component({
    template: `<i></i>`
})
export class NavBase {
    @Input() message = '';   
    @Input() items: NavItem[] = [];
    @Input() options: NavOptions|undefined;
    @Input() attributes: string[] = [];
    @Input() activePath: string|undefined;
    @Input() baseHref: string|undefined;
    @Input() navClass: string|undefined;
    @Input() navItemClass: string|undefined;
    @Input() navLinkClass: string|undefined;
    @Input() childNavItemClass: string|undefined;
    @Input() childNavLinkClass: string|undefined;
    @Input() childNavMenuClass: string|undefined;
    @Input() childNavMenuItemClass: string|undefined;
    @Input() attrs: any;

    cls(...args:any[]|any) { return classNames(args); }
}

const OptionKeys = ['attributes', 'activePath', 'baseHref', 'navClass', 'navItemClass', 'navLinkClass',
                    'childNavItemClass', 'childNavLinkClass', 'childNavMenuClass', 'childNavMenuItemClass' ];
export function optionProps(props: any) {
    const to: any = {};
    for (const key of OptionKeys) {
        if (props[key]) {
            to[key] = props[key];
        }
    }
    return to;
}

export function sanitizeOptions(opt: any) {
    if (!opt.baseHref) {
        opt.baseHref = '';
    }
    return opt;
}

export function routePath(component: any) {
    return location.pathname;
}


export abstract class AbstractValueAccessor implements ControlValueAccessor {
    private _value: any = '';
    get value(): any { return this._value; };
    set value(v: any) {
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
}

export function MakeProvider(type : any){
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true
  };
}
