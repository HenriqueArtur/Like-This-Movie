import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Like This Movie';
  public isAuthenticated = false;

  public logout(): void {
    // todo
  }
}
