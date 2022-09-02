import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { GeneralInfoService } from '../../../../shared/services/general-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-xamxam',
  templateUrl: './edit-xamxam.component.html',
  styleUrls: ['./edit-xamxam.component.scss']
})
export class EditXamxamComponent implements OnInit {
  public xamxamForm: FormGroup;
  public errorMessage: any;
  public url: any;
  public item: any;
  public avatar: any;
  public sidebaron: any;
  public niveauXamxams: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private generalInfoService: GeneralInfoService,private toastr :ToastrService) {}

  createForm() {
    this.xamxamForm = this.fb.group({
      libelle: [this.item.libelle, Validators.required],
      niveau: [this.item.niveauXamXam.libelle, Validators.required]
    });
  }

  save(value) {
    // value.avatar = this.avatar;
    
    this.generalInfoService.updateXamxam(this.item.id, value)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/']);
          this.showEdit();
        }
      )
  }

  showEdit(){
    this.toastr.success('Informations  Xamxam mis à jour!');
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
        this.createForm();
      }
    })

    this.generalInfoService.getNiveauXamxams()
    .subscribe(result => {
      console.log(result);
      this.niveauXamxams = result;
       console.log(this.niveauXamxams[0].libelle);
      
    })
  }

}
