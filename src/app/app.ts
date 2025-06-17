import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Calculator } from "./components/calculator/calculator";

@Component({
  selector: 'app-root',
  imports: [Calculator],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'calculator';
}
