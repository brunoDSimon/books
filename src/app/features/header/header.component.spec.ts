import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { BooksService } from '../book/services/books.service';
import { DataBooksService } from 'src/app/shared/service/dataBooks.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
      HeaderComponent,
      Router,
      BooksService,
      DataBooksService,
      HttpClientTestingModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [HeaderComponent]
  }));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [BooksService],
    providers: [HeaderComponent]
  }));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [Router],
    providers: [HeaderComponent]
  }));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [DataBooksService],
    providers: [HeaderComponent]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
