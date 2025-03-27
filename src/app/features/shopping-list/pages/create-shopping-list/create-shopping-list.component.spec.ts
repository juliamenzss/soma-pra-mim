import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShoppingListComponent } from './create-shopping-list.component';

describe('CreateShoppingListComponent', () => {
  let component: CreateShoppingListComponent;
  let fixture: ComponentFixture<CreateShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateShoppingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
