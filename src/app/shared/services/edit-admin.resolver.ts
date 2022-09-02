import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { AdminService } from './admin.service';

@Injectable()
export class EditAdminResolver implements Resolve<any> {

  constructor(public adminService: AdminService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let adminId = route.paramMap.get('id');
      
      this.adminService.getAdmin(adminId)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    })
  }
}