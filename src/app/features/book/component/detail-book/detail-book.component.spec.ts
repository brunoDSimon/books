/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailBookComponent } from './detail-book.component';

describe('DetailBookComponent', () => {
  let component: DetailBookComponent;
  let fixture: ComponentFixture<DetailBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
