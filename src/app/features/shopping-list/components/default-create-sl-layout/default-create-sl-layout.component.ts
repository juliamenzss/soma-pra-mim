import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/ui/button/button.component";
import { ButtonService } from '../../../../shared/services/ui/button.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-create-sl-layout',
  imports: [ButtonComponent],
  templateUrl: './default-create-sl-layout.component.html',
  styleUrl: './default-create-sl-layout.component.scss'
})
export class DefaultCreateSLLayoutComponent implements OnInit{
  @Input() title: string = "";
  @Input() primaryButtonText: string = 'Criar';
  @Input() secondaryButtonText: string = 'Voltar';
  @Input() disablePrimaryBtn: boolean = true;

  @Output("submit") submit = new EventEmitter();
  @Output("navigate") navigate = new EventEmitter();

  constructor(public buttonService: ButtonService, private router: Router){}

  ngOnInit() {
    this.buttonService.setText('Criar Lista', 'Voltar', '/');

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Mudanças detectadas:', changes);
  }


handleSubmit(){
this.submit.emit();
}

handleNavigate() {
  const route = this.buttonService.navigateRoute();
  this.router.navigate([route]);
}

}
