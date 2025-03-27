import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Item, ListItemComponent } from './list-item.component';
import { By } from '@angular/platform-browser';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListItemComponent);
  });

  it('deve renderizar 3 itens', () => {
    const fakeItems: Item[] = [
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' },
    ];

    fixture.componentRef.setInput('data', fakeItems);
    fixture.detectChanges();

    const itemDebugEls = fixture.debugElement.queryAll(
      By.css('[data-testid="dataItem-listItem"]'));

    expect(itemDebugEls.length).toBe(fakeItems.length);

    itemDebugEls.forEach((itemDebugEl, index) => {
      expect(itemDebugEl.nativeElement.textContent).toBe(fakeItems[index].name);
    });
  });
});
