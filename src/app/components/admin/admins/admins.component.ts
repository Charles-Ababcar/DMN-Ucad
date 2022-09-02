import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminService } from '../../../shared/services/admin.service';



@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  public admins: Array<any>;

  constructor(private adminService: AdminService,private router: Router,private toastr :ToastrService) { }
  ngOnInit() { 
    console.log("ok");
    
    this.adminService.getAdmins()
    .subscribe(
      data => {
        this.admins = data;
        
        // console.log(sessionStorage.getItem("authToken"));
      },
      error => {
        console.log(error);          
      });
  }
  delete(adminLogin) {
    this.adminService.deleteAdmin(adminLogin).subscribe(
      res => {
        this.router.navigate(['/admins/admins']);
        this.showDelete();
      },
    )
      
      
  }
  showDelete() {
    this.toastr.error('User Deleted !');
  }

}
