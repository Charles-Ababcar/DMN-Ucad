import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../../../components/users/user.model';



@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(public db: AngularFirestore) { }


  //Display complete list of 

  public getUsers(): Observable<Array<UserModel>> {
    return this.db.collection<UserModel>('users').valueChanges({ idField: 'id' })
     .pipe(
       map(actions => actions.map(user => {
          
          return { ...user } as UserModel;
        })
      )
    );
  }

  getUser(userId) {
    return this.db.collection('users').doc(userId).snapshotChanges();
  }
  //Display complete list of tournees

  
  //For deleting particular task
  deleteUser(taskKey) {
    return this.db.collection('todo').doc(taskKey).delete();
  }

  //For updating particular task
  updateUser(taskKey, value) {
    return this.db.collection('todo').doc(taskKey).set(
      {
        task: value.task,
        completed: value.completed,
        nameToSearch: value.nameToSearch
      }
    )
  }

  markAll(action) {
    this.db.collection('todo').get().forEach((item) => {
      return item.docs.map(m => {
        return this.db.doc(`todo/${m.id}`).update({ completed: action });
      });
    });
  }

}
