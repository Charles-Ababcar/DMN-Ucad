import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { UsersService } from './users.service';

@Injectable()
export class EditUtilisateurResolver implements Resolve<any> {

  constructor(public usersService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.usersService.getUser(userId)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    })
  }
}