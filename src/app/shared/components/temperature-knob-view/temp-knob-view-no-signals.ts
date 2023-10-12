import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-temp-knob-view-no-signals',
  template:
    '<div class="knob-container">' +
    '  <div class="knob" [ngClass]="{error: hasError}" [style.--temp-in-percents]="targetTempInPercents"></div>\n' +
    '</div>\n' +
    '<div class="target-temperature" [ngClass]="{error: hasError}">{{targetTemp}}℃</div>\n' +
    '<div class="error" *ngIf="hasError">\n' +
    '  Invalid range or temperature out of the range.\n' +
    '</div>',
  styleUrls: ['./temperature-knob-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TempKnobViewNoSignals implements OnChanges {
  @Input() minTemp = 0;
  @Input() maxTemp = 0;
  @Input() targetTemp = 0;

  targetTempInPercents = 0;
  hasError = false;

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

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['minTemp'] && changes['minTemp'].currentValue) ||
      (changes['maxTemp'] && changes['maxTemp'].currentValue) ||
      (changes['targetTemp'] && changes['targetTemp'].currentValue)
    ) {
      this.targetTempInPercents = this.calculateTemperatureInPercents(this.minTemp, this.maxTemp, this.targetTemp);
    }
  }
}
