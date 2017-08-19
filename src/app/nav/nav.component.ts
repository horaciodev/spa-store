import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'app/shared/services/auth.service';

import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private loadedUserSubscription: Subscription;
  _user: any;
  userName :string;

  constructor(private authSvc: AuthService) {  }

  ngOnInit() {
    this.loadedUserSubscription = this.authSvc.userLoadedEvent.subscribe(user=>{
        this._user = user;
        this.userName = this._user.profile.name;
    });
  }

  startSignoutMainWindow() {
    this.authSvc.startSignoutMainWindow();
  }

  public ngOnDestroy(): void {
    if(this.loadedUserSubscription){
      this.loadedUserSubscription.unsubscribe();
    }
  }
}
