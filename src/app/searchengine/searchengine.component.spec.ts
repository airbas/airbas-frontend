import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchengineComponent } from './searchengine.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchengineComponent', () => {
  let component: SearchengineComponent;
  let fixture: ComponentFixture<SearchengineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [FormsModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [ SearchengineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
