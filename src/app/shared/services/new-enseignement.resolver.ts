import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { MemberService } from './member.service';

@Injectable()
export class NewEnseignementResolver implements Resolve<any> {

  constructor(public memberService: MemberService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      let memberId = route.paramMap.get('idMember');
      
      this.memberService.getMember(memberId)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    })
  }
}