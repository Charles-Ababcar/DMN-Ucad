import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { GeneralInfoService } from '../../../../../../shared/services/general-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-faculte',
  templateUrl: './edit-faculte.component.html',
  styleUrls: ['./edit-faculte.component.scss']
})
export class EditFaculteComponent implements OnInit {
  public faculteForm: FormGroup;
  public errorMessage: any;
  public url: any;
  public item: any;
  public avatar: any;
  public sidebaron: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private GeneralInfoService: GeneralInfoService,private toastr :ToastrService) {}

  createForm() {
    this.faculteForm = this.fb.group({
      nom: [this.item.nom, Validators.required]
    });
  }

  save(value) {
    // value.avatar = this.avatar;
    
    this.GeneralInfoService.updateFaculte(this.item.id, value)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/new-departement']);
          this.showEdit();
        }
      )
  }

  showEdit(){
    this.toastr.success('Informations faculte mises à jour!');
  }

  cancel() {
    this.router.navigate(['/general-info/new-departement']);
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
