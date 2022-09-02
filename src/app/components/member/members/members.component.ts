import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MemberService } from '../../../shared/services/member.service';



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  public members: any;

  constructor(private memberService: MemberService,private router: Router,private toastr :ToastrService) { }
  ngOnInit() { 
    console.log("ok");
    
    this.memberService.getMembers()
    .subscribe(
      data => {
        this.members = data;
        
        console.log(this.members);
      },
      error => {
        console.log(error);          
      });
  }
  delete(memberLogin) {
    this.memberService.deleteMember(memberLogin).subscribe(
      res => {
        this.router.navigate(['/members/members']);
        this.showDelete();
      },
    )
      
      
  }
  showDelete() {
    this.toastr.error('User Deleted !');
  }

}
