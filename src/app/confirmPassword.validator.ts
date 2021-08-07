import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator (passwBasis: string, passwMatch: string) {
    return (formGroup: FormGroup) => {
        const basis = formGroup.controls[passwBasis];
        const match = formGroup.controls[passwMatch];
        if (match.errors && !match.errors.confirmPasswordValidator) {
            return;
        }
        if (basis.value !== match.value) {
            match.setErrors({ confirmPasswordValidator: true});
        } else {
            match.setErrors(null);
        }
    }
}