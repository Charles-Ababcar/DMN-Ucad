import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../../../../../shared/services/member.service';
import { GeneralInfoService } from '../../../../../shared/services/general-info.service';



type enseignementFields = 'nom' | 'description';
type FormErrors = { [u in enseignementFields]: string };
@Component({
  selector: 'app-new-enseignement',
  templateUrl: './new-enseignement.component.html',
  styleUrls: ['./new-enseignement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewEnseignementComponent implements OnInit {
  public enseignementForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'nom': '',
    'description': ''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public item: any;
  public type: any;
  public xamxams: any;
  public selectedXamxams = [];
  public corans: any;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, public memberService: MemberService,private generalInfoService: GeneralInfoService,private toastr:ToastrService) {
    this.enseignementForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
      doing: new FormControl(),
      enseignementType: new FormControl(),
      xamxam: new FormControl(),
      coran: new FormControl()
    });
  }

  resetFields() {
    this.enseignementForm = this.fb.group({
      nom: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }
  showSuccess(){
    this.toastr.success('Nouvelle enseignement créée!');
  }

  submit(value) {
    console.log(value);

      value.member = this.item;
      if(value.enseignementType == 'xamxam'){
        for (let i = 0; i < value.xamxam.length; i++) {
          const idXamxam = Number(value.xamxam[i]);
          this.memberService.createEnseignement(value,idXamxam)
          .subscribe(
            res => {
              this.resetFields();
              this.router.navigate(['/members/detail-member',this.item.id]);
              this.showSuccess()
            }
          )
        }

      }else{
        this.memberService.createEnseignement(value,null)
        .subscribe(
          res => {
            this.resetFields();
            this.router.navigate(['/members/detail-member',this.item.id]);
            this.showSuccess()
          }
        )
      }

    
    console.log(this.selectedXamxams);


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
    this.router.navigate(['/general-info/',this.item.id]);
  }

  ngOnInit() { 

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        
        this.item = data;
        this.item.id = data.id;
        
        this.generalInfoService.getXamxams()
        .subscribe(result => {
          this.xamxams = result;
          console.log(this.xamxams);
          
        })

        this.generalInfoService.getCorans()
        .subscribe(result => {
          this.corans = result;
        })
    }
    })
  }
  changeType (event: any) {
    //update the ui
    this.type = event.target.value;
  }

}
