import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() label: string = '';
  @Input() buttonType: string = 'number';
  @Input() span: number = 1;
  @Input() disabled: boolean = false;
  @Output() btnClick = new EventEmitter<string>;

  handleClick() {
    if (!this.disabled) {
      this.btnClick.emit(this.label);
    }
  }
}
