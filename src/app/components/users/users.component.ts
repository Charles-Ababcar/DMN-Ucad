import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsersService } from '../../shared/services/firebase/users.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public title: any
  public term: string
  public items: Array<UserModel>;



  constructor(private UsersService: UsersService,public db: AngularFirestore) {

  }


  public getData() {
    //Get complete list of 
    
    this.UsersService.getUsers()
    .subscribe(result => {
      this.items = result;

      this.items.map(v=>{

      })

    })
  }

  ngOnInit() { 
    this.getData();    
  }


}
