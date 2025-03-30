import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { ButtonService } from '../../../../shared/services/ui/button.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-create-sl-layout',
  imports: [],
  templateUrl: './default-create-sl-layout.component.html',
  styleUrl: './default-create-sl-layout.component.scss'
})
export class DefaultCreateSLLayoutComponent{
  constructor(public buttonService: ButtonService, private router: Router){}

  @Input() title: string = "";

}
