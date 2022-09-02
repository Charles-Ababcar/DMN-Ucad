import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralInfoService } from '../../../../shared/services/general-info.service';


type departementFields = 'nom' | 'faculte';
type FormErrors = { [u in departementFields]: string };
@Component({
  selector: 'app-new-departement',
  templateUrl: './new-departement.component.html',
  styleUrls: ['./new-departement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewDepartementComponent implements OnInit {
  public departementForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'nom': '',
    'faculte': ''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public item: any;
  public facultes: any;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private generalInfoService: GeneralInfoService,private toastr:ToastrService) {
    this.departementForm = new FormGroup({
      nom: new FormControl(),
      faculte: new FormControl()
    });
  }

  resetFields() {
    this.departementForm = this.fb.group({
      nom:  ['', Validators.required],
      faculte: ['', Validators.required]
    });
  }
  showSuccess(){
    this.toastr.success('Nouveau Departement créé!');
  }

  submit(value) {
    console.log(value);
    
    this.generalInfoService.createDepartement(value)
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

    this.generalInfoService.getFacultes()
    .subscribe(result => {
      console.log(result);
      this.facultes = result;
    })
  }

  deletefaculte(id) {
    if(confirm("Etes-vous sûr ?")) {
      this.generalInfoService.deleteFaculte(id)
      .subscribe(
        res => {
          
          this.showDelete('faculte Supprimé !');
          this.router.navigate(['/general-info/new-departement']);
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
