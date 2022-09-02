import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { GeneralInfoService } from '../../../../../../shared/services/general-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-niveau-xamxam',
  templateUrl: './edit-niveau-xamxam.component.html',
  styleUrls: ['./edit-niveau-xamxam.component.scss']
})
export class EditNiveauXamxamComponent implements OnInit {
  public niveauXamxamForm: FormGroup;
  public errorMessage: any;
  public url: any;
  public item: any;
  public avatar: any;
  public sidebaron: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private GeneralInfoService: GeneralInfoService,private toastr :ToastrService) {}

  createForm() {
    this.niveauXamxamForm = this.fb.group({
      libelle: [this.item.libelle, Validators.required],
      poids: [this.item.poids, Validators.required]
    });
  }

  save(value) {
    // value.avatar = this.avatar;
    
    this.GeneralInfoService.updateNiveauXamxam(this.item.id, value)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/new-xamxam']);
          this.showEdit();
        }
      )
  }

  showEdit(){
    this.toastr.success('Informations Niveau Xamxam mis à jour!');
  }

  cancel() {
    this.router.navigate(['/general-info/new-xamxam']);
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
  }

}
