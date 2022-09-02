import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { GeneralInfoService } from '../../../../shared/services/general-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-departement',
  templateUrl: './edit-departement.component.html',
  styleUrls: ['./edit-departement.component.scss']
})
export class EditDepartementComponent implements OnInit {
  public departementForm: FormGroup;
  public errorMessage: any;
  public url: any;
  public item: any;
  public avatar: any;
  public sidebaron: any;
  public facultes: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private generalInfoService: GeneralInfoService,private toastr :ToastrService) {}

  createForm() {
    this.departementForm = this.fb.group({
      nom: [this.item.nom, Validators.required],
      faculte: [this.item.faculte.nom, Validators.required]
    });
  }

  save(value) {
    // value.avatar = this.avatar;
    
    this.generalInfoService.updateDepartement(this.item.id, value)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/']);
          this.showEdit();
        }
      )
  }

  showEdit(){
    this.toastr.success('Informations  departement mis à jour!');
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

    this.generalInfoService.getFacultes()
    .subscribe(result => {
      this.facultes = result;      
    })
  }

}
