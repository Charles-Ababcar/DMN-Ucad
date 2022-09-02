import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralInfoService } from '../../../../../../shared/services/general-info.service';


type niveauXamxamFields = 'libelle' | 'poids';
type FormErrors = { [u in niveauXamxamFields]: string };
@Component({
  selector: 'app-new-niveau-xamxam',
  templateUrl: './new-niveau-xamxam.component.html',
  styleUrls: ['./new-niveau-xamxam.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewNiveauXamxamComponent implements OnInit {
  public niveauXamxamForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'libelle': '',
    'poids': ''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public item: any;

  constructor(private fb: FormBuilder,private router: Router, private GeneralInfoService: GeneralInfoService,private toastr:ToastrService) {
    this.niveauXamxamForm = new FormGroup({
      libelle: new FormControl(),
      poids: new FormControl()
    });
  }

  resetFields() {
    this.niveauXamxamForm = this.fb.group({
      libelle: new FormControl('', Validators.required),
      poids: new FormControl('', Validators.required)
    });
  }
  showSuccess(){
    this.toastr.success('Nouveau Niveau Xam xam créé!');
  }

  submit(value) {
    this.GeneralInfoService.createNiveauXamxam(value)
      .subscribe(
        res => {
          this.resetFields();
          this.router.navigate(['/general-info/new-xamxam']);
          this.showSuccess()
        }
      )
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
    this.router.navigate(['/general-info/new-xamxam']);
  }

  ngOnInit() { 

  }

}
