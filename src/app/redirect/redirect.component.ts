import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  count = 3;
  constructor(private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.count--;
      if (this.count === 0) {
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
