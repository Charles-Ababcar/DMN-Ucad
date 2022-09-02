import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../../../shared/services/member.service';
import { GeneralInfoService } from '../../../shared/services/general-info.service';

type MemberFields = 'lastName' | 'firstName' | 'telephone' | 'sexe' | 'email' | 'cni' | 'adresse' | 'ddn';
type FormErrors = { [u in MemberFields]: string };
@Component({
  selector: 'app-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class NewMemberComponent implements OnInit {
  contactDetail: any;
  public memberForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'lastName': '',
    'firstName': '',
    'telephone': '',
    'sexe': '',
    'email': '',
    'cni': '',
    'adresse': '',
    'ddn': '',
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public entities: any;
  public cellules: any;
  public commissions: any;
  public cellule: any;
  public commission: any;
  public departements: any;
  public professions: any;
  public categories: any;
  public selectedCategorie: any;


  constructor(private fb: FormBuilder, private router: Router, private memberService: MemberService,private toastr:ToastrService,private generalInfoService: GeneralInfoService) {
    this.memberForm = new FormGroup({
      lastName: new FormControl(),
      firstName: new FormControl(),
      email: new FormControl(),
      telephone: new FormControl(),
      sexe: new FormControl(),
      ddn: new FormControl(),
      cni: new FormControl(),
      adresse: new FormControl(),
      adresseDakar: new FormControl(),
      adresseVacances: new FormControl(),
      situationMatrimoniale: new FormControl('CELLIBATAIRE'),
      boursier: new FormControl(true),
      daaraOrigine: new FormControl(),
      etatSante: new FormControl('STABLE'),
      tuteur: new FormControl(),
      telephoneTuteur: new FormControl(),
      departement: new FormControl(),
      profession: new FormControl(),
      cellule: new FormControl(),
      commission: new FormControl()

    });
  }

  resetFields() {
    this.memberForm = this.fb.group({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }
  showSuccess(){
    this.toastr.success('Member Created!');
  }

  submit(value) {
    console.log(value);
    
    try {
      this.memberService.createMember(value).subscribe(
        res => {
          this.resetFields();
          this.router.navigate(['/members/members']);
          this.showSuccess()
        }
      )
      //this.router.navigate(['/members/members']);
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
    this.router.navigate(['/members/members']);
  }

  ngOnInit() { 
    this.generalInfoService.getEntities()
    .subscribe(result => {
      this.entities = result;
      this.cellules = this.entities.filter(cellule => cellule.typeEntite === 'CELLULE');
      this.commissions = this.entities.filter(commission => commission.typeEntite === 'COMMISSION');
    })

    this.generalInfoService.getDepartements()
    .subscribe(result => {
      this.departements = result;
    })

    this.generalInfoService.getProfessions()
    .subscribe(result => {
      this.professions = result;
    })

    this.generalInfoService.getCategories()
    .subscribe(result => {
      this.categories = result;
    })
  }

  changeCat(event: any) {
    //update the ui
    this.selectedCategorie = this.categories.filter(c => c.id === Number(event.target.value))[0].libelle;
    console.log(this.selectedCategorie);
    
  }

}
