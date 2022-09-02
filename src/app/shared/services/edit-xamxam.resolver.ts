import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { GeneralInfoService } from './general-info.service';

@Injectable()
export class EditXamxamResolver implements Resolve<any> {

  constructor(public generalInfoService: GeneralInfoService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let xamxamId = route.paramMap.get('id');
      
      this.generalInfoService.getXamxam(xamxamId)
        .subscribe(          
          data => {
            console.log(data);
            
            resolve(data);
          }
        );
    })
  }
}