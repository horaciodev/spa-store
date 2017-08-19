import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  constructor(private location: Location, private authSvc: AuthService) {  }

  ngOnInit() {}

  login(){
    this.authSvc.startSigninMainWindow();
  }
}
