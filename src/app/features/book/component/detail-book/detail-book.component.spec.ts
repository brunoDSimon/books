import { BooksService } from './../../services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailBookComponent } from './detail-book.component';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';

describe('DetailBookComponent', () => {
  let component: DetailBookComponent;
  let fixture: ComponentFixture<DetailBookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailBookComponent,
        BooksService,
        ActivatedRoute,
        Router,
        DataBooksService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  beforeEach(() => TestBed.configureTestingModule({
    imports: [BooksService],
    providers: [DetailBookComponent]
  }));
  beforeEach(() => TestBed.configureTestingModule({
    imports: [BooksService],
    providers: [DetailBookComponent]
  }));
  beforeEach(() => TestBed.configureTestingModule({
    imports: [Router],
    providers: [DetailBookComponent]
  }));
  beforeEach(() => TestBed.configureTestingModule({
    imports: [DataBooksService],
    providers: [DetailBookComponent]
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
