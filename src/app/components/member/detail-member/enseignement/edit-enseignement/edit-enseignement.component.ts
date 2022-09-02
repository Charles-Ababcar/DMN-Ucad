import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../../../../../shared/services/member.service';
import { GeneralInfoService } from '../../../../../shared/services/general-info.service';

@Component({
  selector: 'app-edit-enseignement',
  templateUrl: './edit-enseignement.component.html',
  styleUrls: ['./edit-enseignement.component.scss']
})
export class EditEnseignementComponent implements OnInit {
  public enseignementForm: FormGroup;
  public errorMessage: any;
  public url: any;
  public item: any;
  public doing: boolean;
  public type: any;
  public avatar: any;
  public sidebaron: any;
  public xamxams: any;
  public corans: any;
  private selectedXamxam: string;
  private selectedCoran: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public memberService: MemberService,private generalInfoService: GeneralInfoService,private toastr :ToastrService) {}

  createForm() {
    this.enseignementForm = this.fb.group({
      startDate: [this.item.dateDebut],
      endDate:  [this.item.dateFin],
      doing:  [this.item.encours],
      enseignementType:  [this.type],
      xamxam: [this.selectedXamxam],
      coran:  [this.selectedCoran],
    });
  }

  save(value) {
    // value.avatar = this.avatar;
    value.member = this.item.membre;
    if(value.enseignementType == 'xamxam'){
        this.memberService.updateEnseignement(value,'xamxam',this.item.id)
        .subscribe(
          res => {
            this.router.navigate(['/members/detail-member',this.item.membre.id]);
            this.showEdit();
          }
        )

    }else{
      this.memberService.updateEnseignement(value,'coran',this.item.id)
      .subscribe(
        res => {
          this.router.navigate(['/members/detail-member',this.item.membre.id]);
          this.showEdit();
        }
      )
    }

  }

  showEdit(){
    this.toastr.success('Informations enseignement mis à jour!');
  }

  cancel() {
    this.router.navigate(['/general-info/']);
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      console.log(data);
      
      if (data) {
        //this.avatar = data.payload.data().avatar;
        this.item = data;
        this.item.id = data.id;
        this.doing = this.item.encours;
        if(this.item.xamXam != null){
          this.type = "xamxam";
          this.selectedXamxam = this.item.xamXam.id;
        }else{
          this.type = "coran";
          this.selectedCoran =  this.item.coran.id;
        }
        this.createForm();
      }
    })

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

}
