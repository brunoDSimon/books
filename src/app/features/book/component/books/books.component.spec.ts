import { waitForAsync } from '@angular/core/testing';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BooksComponent } from './books.component';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';
import { Router } from '@angular/router';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksComponent,
        DataBooksService,
        Router,
        BrowserDynamicTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [DataBooksService],
    providers: [BooksComponent]
  }));
  beforeEach(() => TestBed.configureTestingModule({
    imports: [BrowserDynamicTestingModule],
    providers: [BooksComponent]
  }));
  beforeEach(() => TestBed.configureTestingModule({
    imports: [Router],
    providers: [BooksComponent]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
