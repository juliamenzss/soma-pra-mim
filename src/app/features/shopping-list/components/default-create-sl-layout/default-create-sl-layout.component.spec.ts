import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCreateSLLayoutComponent } from './default-create-sl-layout.component';

describe('DefaultCreateSLLayoutComponent', () => {
  let component: DefaultCreateSLLayoutComponent;
  let fixture: ComponentFixture<DefaultCreateSLLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCreateSLLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCreateSLLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
