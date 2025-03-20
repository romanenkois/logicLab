import { Component } from '@angular/core';
import { ConsoleJavascriptComponent } from "../../widgets/console-javascript/console-javascript.component";

@Component({
  selector: 'app-console',
  imports: [ConsoleJavascriptComponent],
  templateUrl: './console.component.html',
  styleUrl: './console.component.scss'
})
export default class ConsoleComponent {

}
