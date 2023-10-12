import { NgModule } from '@angular/core';
import { TemperatureKnobViewComponent } from './components/temperature-knob-view/temperature-knob-view.component';
import { CommonModule } from '@angular/common';
import { TempKnobViewNoSignals } from './components/temperature-knob-view/temp-knob-view-no-signals';

@NgModule({
  declarations: [TemperatureKnobViewComponent, TempKnobViewNoSignals],
  imports: [CommonModule],
  exports: [TemperatureKnobViewComponent, TempKnobViewNoSignals]
})
export class SharedModule {}
