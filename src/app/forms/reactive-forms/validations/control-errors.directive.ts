import { Directive, InjectionToken, Inject, Optional, Host, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, merge, Observable } from 'rxjs';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { ControlErrorComponent } from './control-error.component';
import { FormSubmitDirective } from './form-submit.directive';

export const defaultErrors = {
  required: (error) => `This field is required`,
  minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});

@Directive({
  selector: '[formControl], [formControlName]'
})

export class ControlErrorsDirective {
  ref: ComponentRef<ControlErrorComponent>;
  submit$: Observable<Event>;
  container: ViewContainerRef;

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private control: NgControl,
    @Optional() @Host() private form: FormSubmitDirective,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors
    ) 
    {
      this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
      this.submit$ = this.form ? this.form.submit$ : EMPTY;
    }

  ngOnInit() {
    merge(
      this.submit$,
    this.control.valueChanges).pipe(
    ).subscribe(() => {
      const controlErrors = this.control.errors;
      if (controlErrors) 
      {
       const firstKey = Object.keys(controlErrors)[0];
       const getError = this.errors[firstKey];
       const text = getError(controlErrors[firstKey]);
       this.setError(text);
      }
      else if (this.ref)
      {
        this.setError(null);
      }
    })
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.vcr.createComponent(factory);
    }
 
    this.ref.instance.text = text;
  }

}
