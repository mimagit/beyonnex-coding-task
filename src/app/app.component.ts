import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedImplementationType: 'w_signals' | 'wo_signals' = 'w_signals';

  minTemp = 10;
  maxTemp = 90;
  targetTemp = 14;

  constructor() {}

  onMinTempChange(value: number): void {
    this.minTemp = value;
  }

  onMaxTempChange(value: number): void {
    this.maxTemp = value;
  }

  onTargetTempChange(value: number): void {
    this.targetTemp = value;
  }
}
