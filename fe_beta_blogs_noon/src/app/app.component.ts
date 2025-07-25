import { Component } from '@angular/core';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fe_beta_blogs_noon';
}
