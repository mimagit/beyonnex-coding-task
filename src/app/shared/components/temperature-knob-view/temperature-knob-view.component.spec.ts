import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureKnobViewComponent } from './temperature-knob-view.component';
import { By } from '@angular/platform-browser';

describe('TemperatureKnobViewComponent', () => {
  let component: TemperatureKnobViewComponent;
  let fixture: ComponentFixture<TemperatureKnobViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemperatureKnobViewComponent]
    });
    fixture = TestBed.createComponent(TemperatureKnobViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setComponentInputs(min: number, max: number, target: number) {
    fixture.componentRef.setInput('minTemp', min);
    fixture.componentRef.setInput('maxTemp', max);
    fixture.componentRef.setInput('targetTemp', target);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show temperature', () => {
    const targetTemp = 60;
    setComponentInputs(30, 90, targetTemp);

    expect(fixture.debugElement.query(By.css('.target-temperature')).nativeElement.textContent).toContain(targetTemp);
    expect(component.hasError).toBeFalsy();
  });

  it('should calculate temperature in percents correctly', () => {
    const targetTemp = 60;
    const expectedPercent = 50;
    setComponentInputs(30, 90, targetTemp);

    expect(component.targetTempInPercents()).toEqual(expectedPercent);
  });

  it('should show error when temperature is out of range', () => {
    setComponentInputs(30, 90, 150);
    expect(component.hasError).toBeTruthy();
  });

  it('should show error when minTemp is greater than maxTemp', () => {
    setComponentInputs(90, 30, 60);
    expect(component.hasError).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.error'))).toBeTruthy();
  });
});
