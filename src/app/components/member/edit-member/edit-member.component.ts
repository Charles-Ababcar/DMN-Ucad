import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../../../shared/services/member.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditMemberComponent implements OnInit {
  public memberForm: FormGroup;
  public errorMessage: any;
  public url: any;
  public item: any;
  public avatar: any;
  public sidebaron: any;
  public roles : any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private memberService: MemberService,private toastr :ToastrService) {}

  createForm() {
    this.memberForm = this.fb.group({
      lastName: [this.item.lastName, Validators.required],
      firstName: [this.item.firstName, Validators.required],
      email: [this.item.email, Validators.required],
      status:  [this.item.activated, Validators.required],
      role: [this.item.authorities[0], Validators.required],
    });
  }

  save(value) {
    value.avatar = this.avatar;
    // this.memberService.updateUser(this.item.id, value)
    //   .then(
    //     res => {
    //       this.router.navigate(['/members/members']);
    //       this.showEdit();
    //     }
    //   )
  }

  showEdit(){
    this.toastr.success('member Updated!');
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
      this.avatar = reader.result;
    }
  }

  cancel() {
    this.router.navigate(['/members/members']);
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      console.log(data);
      
      if (data) {
        //this.avatar = data.payload.data().avatar;
        this.item = data;
        this.item.id = data.id;
        console.log(this.item);
        this.createForm();
      }
      //
      this.memberService.getAuthorities()
      .subscribe(
        data => {
          console.log(data);
          this.roles = data;
          console.log(this.roles);
          
          // console.log(sessionStorage.getItem("authToken"));
        },
        error => {
          console.log(error);          
        });
    })

  }

}
