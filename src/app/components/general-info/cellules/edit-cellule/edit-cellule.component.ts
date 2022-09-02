import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule } from '@angular/forms';
import { GeneralInfoService } from '../../../../shared/services/general-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-cellule',
  templateUrl: './edit-cellule.component.html',
  styleUrls: ['./edit-cellule.component.scss']
})
export class EditCelluleComponent implements OnInit {
  public celluleForm: FormGroup;
  public errorMessage: any;
  public url: any;
  public item: any;
  public avatar: any;
  public sidebaron: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private GeneralInfoService: GeneralInfoService,private toastr :ToastrService) {}

  createForm() {
    this.celluleForm = this.fb.group({
      nom: [this.item.nom, Validators.required],
      description: [this.item.description, Validators.required]
    });
  }

  save(value) {
    // value.avatar = this.avatar;
    
    this.GeneralInfoService.updateEntity(this.item, value)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/']);
          this.showEdit();
        }
      )
  }

  showEdit(){
    this.toastr.success('Informations cellule mis à jour!');
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
  }

}
