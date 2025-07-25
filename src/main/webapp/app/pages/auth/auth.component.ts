import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>'
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
