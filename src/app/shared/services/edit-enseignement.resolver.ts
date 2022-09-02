import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { MemberService } from './member.service';

@Injectable()
export class EditEnseignementResolver implements Resolve<any> {

  constructor(public memberService: MemberService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let id = route.paramMap.get('id');
      
      this.memberService.getEnseignement(id)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    })
  }
}