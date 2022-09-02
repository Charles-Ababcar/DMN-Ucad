import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralInfoService } from '../../../../shared/services/general-info.service';


type xamxamFields = 'libelle' | 'niveau';
type FormErrors = { [u in xamxamFields]: string };
@Component({
  selector: 'app-new-xamxam',
  templateUrl: './new-xamxam.component.html',
  styleUrls: ['./new-xamxam.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewXamxamComponent implements OnInit {
  public xamxamForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'libelle': '',
    'niveau': ''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public item: any;
  public niveauXamxams: any;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private generalInfoService: GeneralInfoService,private toastr:ToastrService) {
    this.xamxamForm = new FormGroup({
      libelle: new FormControl(),
      niveau: new FormControl()
    });
  }

  resetFields() {
    this.xamxamForm = this.fb.group({
      libelle:  ['', Validators.required],
      niveau: ['', Validators.required]
    });
  }
  showSuccess(){
    this.toastr.success('Nouveau  Xam xam créé!');
  }

  submit(value) {
    console.log(value);
    
    this.generalInfoService.createXamxam(value)
      .subscribe(
        res => {
          this.resetFields();
          this.router.navigate(['/general-info/']);
          this.showSuccess()
        }
      )
  }


  cancel() {
    this.router.navigate(['/general-info/']);
  }

  ngOnInit() { 

    this.generalInfoService.getNiveauXamxams()
    .subscribe(result => {
      console.log(result);
      this.niveauXamxams = result;
       console.log(this.niveauXamxams[0].libelle);
    })
  }

  deleteNiveauXamxam(id) {
    if(confirm("Etes-vous sûr ?")) {
      this.generalInfoService.deleteNiveauXamxam(id)
      .subscribe(
        res => {
          
          this.showDelete('Niveau Supprimé !');
          this.router.navigate(['/general-info/new-xamxam']);
        },
        err => {
        }
      )
    }

  }
  showDelete(message:string) {
    this.toastr.success(message);
  }

}
