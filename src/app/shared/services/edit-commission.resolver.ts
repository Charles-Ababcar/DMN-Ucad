import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { GeneralInfoService } from './general-info.service';

@Injectable()
export class EditCommissionResolver implements Resolve<any> {

  constructor(public generalInfoService: GeneralInfoService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let commissionId = route.paramMap.get('id');
      
      this.generalInfoService.getEntity(commissionId)
        .subscribe(          
          data => {
            resolve(data);
          }
        );
    })
  }
}