import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public userid!: number;
  userdetails!: User;
  constructor(private activatedRoute: ActivatedRoute ,private api:ApiService){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>
      {
        this.userid = val['id'];
        this.fetchDetails(this.userid);

      })
  }
fetchDetails(userid:number){
  this.api.getUserId(userid)
  .subscribe(res=>{
    this.userdetails =res;
    
  })
}
}
