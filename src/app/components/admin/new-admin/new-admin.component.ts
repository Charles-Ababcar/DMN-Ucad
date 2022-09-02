import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../../shared/services/admin.service';

type AdminFields = 'lastName' | 'firstName' | 'phone' | 'profileImg' | 'address' | 'password' | 'repeatPassword';
type FormErrors = { [u in AdminFields]: string };
@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class NewAdminComponent implements OnInit {
  contactDetail: any;
  public adminForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'lastName': '',
    'firstName': '',
    'phone': '',
    'profileImg': '',
    'address': '',
    'password':'',
    'repeatPassword':''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public cities : Array<any>;
  public city : City;
  selectedPeople = [{ name: 'Karyn Wright' }];
  
  roles = [
    { id: 1, name: "ROLE_ADMIN" },
    { id: 2, name: "ROLE_USER" }
  ];
  
  // cars = [
  //   { id: 1, name: "BMW Hyundai" },
  //   { id: 2, name: "Kia Tata" },
  //   { id: 3, name: "Volkswagen Ford" },
  //   { id: 4, name: "Renault Audi" },
  //   { id: 5, name: "Mercedes Benz Skoda" },
  // ];
  
  // selected = [{ id: 3, name: "Volkswagen Ford" }];
  

  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService,private toastr:ToastrService) {
    this.adminForm = new FormGroup({
      username: new FormControl(),
      lastName: new FormControl(),
      firstName: new FormControl(),
      email: new FormControl(),
      status: new FormControl(),
      roles: new FormControl(),
      password: new FormControl(),
      repeatPassword: new FormControl()
    });
  }

  resetFields() {
    this.adminForm = this.fb.group({
      username: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required),
    });
  }
  showSuccess(){
    this.toastr.success('Admin Created!');
  }

  submit(value) {
    console.log(value);
    
    try {
      this.adminService.createAdmin(value);
      this.router.navigate(['/admins/admins']);
    } catch (error) {
    }

  }

  //FileUpload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  cancel() {
    this.router.navigate(['/admins/admins']);
  }

  ngOnInit() { 

  }

}
class City{
  id: string;
}
