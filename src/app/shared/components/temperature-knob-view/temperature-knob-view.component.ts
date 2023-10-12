import { ChangeDetectionStrategy, Component, computed, Input, OnChanges, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-temperature-knob-view',
  templateUrl: './temperature-knob-view.component.html',
  styleUrls: ['./temperature-knob-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureKnobViewComponent {
  private _minTemp = signal<number>(0);
  @Input({ required: true })
  set minTemp(value: number) {
    this._minTemp.set(value);
  }

  private _maxTemp = signal<number>(0);
  @Input({ required: true })
  set maxTemp(value: number) {
    this._maxTemp.set(value);
  }

  private _targetTemp = signal<number>(0);
  @Input({ required: true })
  set targetTemp(value: number) {
    this._targetTemp.set(value);
  }

  get targetTemp() {
    return this._targetTemp();
  }

  targetTempInPercents = computed(() =>
    this.calculateTemperatureInPercents(this._minTemp(), this._maxTemp(), this.targetTemp)
  );

  hasError = false;

  constructor() {}

  private calculateTemperatureInPercents(min: number, max: number, temp: number): number {
    if (!this.isValidRange(min, max) || !this.isValidTemperature(min, max, temp)) {
      this.hasError = true;
      return 0;
    }
    this.hasError = false;

    return ((temp - min) / (max - min)) * 100;
  }

  private isValidRange(min: number, max: number): boolean {
    return min < max;
  }

  private isValidTemperature(min: number, max: number, value: number): boolean {
    return value >= min && value <= max;
  }
}
