import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showSidebar = false;
  hideSidebar = false;
  constructor(private _router:Router, private route: ActivatedRoute) {

    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidebar = event.urlAfterRedirects.includes('/admin');
        this.hideSidebar =!event.urlAfterRedirects.includes('/admin');
      }
    });

  }
  
}
