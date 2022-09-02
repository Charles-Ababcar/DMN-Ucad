import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralInfoService } from '../../../../../../shared/services/general-info.service';


type faculteFields = 'nom';
type FormErrors = { [u in faculteFields]: string };
@Component({
  selector: 'app-new-faculte',
  templateUrl: './new-faculte.component.html',
  styleUrls: ['./new-faculte.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewFaculteComponent implements OnInit {
  public faculteForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'nom': ''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public item: any;

  constructor(private fb: FormBuilder,private router: Router, private GeneralInfoService: GeneralInfoService,private toastr:ToastrService) {
    this.faculteForm = new FormGroup({
      nom: new FormControl()
    });
  }

  resetFields() {
    this.faculteForm = this.fb.group({
      nom: new FormControl('', Validators.required)
    });
  }
  showSuccess(){
    this.toastr.success('Nouvelle faculte créée!');
  }

  submit(value) {
    this.GeneralInfoService.createFaculte(value)
      .subscribe(
        res => {
          this.resetFields();
          this.router.navigate(['/general-info/new-departement']);
          this.showSuccess()
        }
      )
  }

  

  cancel() {
    this.router.navigate(['/general-info/new-departement']);
  }

  ngOnInit() { 

  }

}
