import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { GeneralInfoService } from './general-info.service';

@Injectable()
export class EditFaculteResolver implements Resolve<any> {

  constructor(public generalInfoService: GeneralInfoService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let facId = route.paramMap.get('id');
      
      this.generalInfoService.getFaculte(facId)
        .subscribe(          
          data => {
            console.log(data);
            
            resolve(data);
          }
        );
    })
  }
}