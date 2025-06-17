import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() label: string = '';
  @Output() btnClick = new EventEmitter<string>;

  handleClick() {
    this.btnClick.emit(this.label);
  }

}
