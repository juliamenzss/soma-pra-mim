import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

type InputTypes = "text" | "email" | "password";

@Component({
  selector: 'app-primary-input',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent), //ref o proprio input
      multi: true
    }
  ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})

export class PrimaryInputComponent implements ControlValueAccessor {

  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = ""; //nome do input p/ acessibilidade

  value: string = '' //valor inicial do input
  onChange: any = () => {}; //func quando o valor muda
  onTouched: any = () => {}; //func quando o usuario interage com o input

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value) // metodo atualiza o valor e informa o angular
  }
  writeValue(value: any): void {
    this.value = value // preenche input autm se ja tiver valor
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}
}
