import { NavItem, NavOptions, classNames } from '@servicestack/client';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export function bootstrapAttrs() {
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
    @Input() primary: boolean;
    @Input('outline-primary') outlinePrimary: boolean;
    @Input() secondary: boolean;
    @Input('outline-secondary') outlineSecondary: boolean;
    @Input() success: boolean;
    @Input('outline-success') outlineSuccess: boolean;
    @Input() info: boolean;
    @Input('outline-info') outlineInfo: boolean;
    @Input() warning: boolean;
    @Input('outline-warning') outlineWarning: boolean;
    @Input() danger: boolean;
    @Input('outline-danger') outlineDanger: boolean;
    @Input() light: boolean;
    @Input('outline-light') outlineLight: boolean;
    @Input() dark: boolean;
    @Input('outline-dark') outlineDark: boolean;

    @Input() lg: boolean;
    @Input() md: boolean;
    @Input() sm: boolean;
    @Input() xs: boolean;

    @Input() block: boolean;
    @Input() vertical: boolean;
    @Input() horizontal: boolean;

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
    @Input() items: NavItem[];
    @Input() options: NavOptions;
    @Input() attributes: string[];
    @Input() activePath: string;
    @Input() baseHref: string;
    @Input() navClass: string;
    @Input() navItemClass: string;
    @Input() navLinkClass: string;
    @Input() childNavItemClass: string;
    @Input() childNavLinkClass: string;
    @Input() childNavMenuClass: string;
    @Input() childNavMenuItemClass: string;
}

@Component({
    template: `<i></i>`
})
export class NavBase {
    @Input() message = '';   
    @Input() items: NavItem[];
    @Input() options: NavOptions;
    @Input() attributes: string[];
    @Input() activePath: string;
    @Input() baseHref: string;
    @Input() navClass: string;
    @Input() navItemClass: string;
    @Input() navLinkClass: string;
    @Input() childNavItemClass: string;
    @Input() childNavLinkClass: string;
    @Input() childNavMenuClass: string;
    @Input() childNavMenuItemClass: string;
    @Input() attrs: any;

    cls(...args:any[]) { return classNames(args); }
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
    _value: any = '';
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

    onChange = (_) => {};
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
