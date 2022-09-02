import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl,ReactiveFormsModule  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GeneralInfoService } from '../../../../shared/services/general-info.service';


type celluleFields = 'nom' | 'description';
type FormErrors = { [u in celluleFields]: string };
@Component({
  selector: 'app-new-cellule',
  templateUrl: './new-cellule.component.html',
  styleUrls: ['./new-cellule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewCelluleComponent implements OnInit {
  public celluleForm: FormGroup;
  public sidebaron: any;
  public formErrors: FormErrors = {
    'nom': '',
    'description': ''
  };
  public errorMessage: any;
  public url: any;
  public avatraLink: any;
  public item: any;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router, private GeneralInfoService: GeneralInfoService,private toastr:ToastrService) {
    this.celluleForm = new FormGroup({
      nom: new FormControl(),
      description: new FormControl()
    });
  }

  resetFields() {
    this.celluleForm = this.fb.group({
      nom: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }
  showSuccess(){
    this.toastr.success('Nouvelle cellule créée!');
  }

  submit(value) {
    const typeEntite = "CELLULE";
    this.GeneralInfoService.createEntity(value,typeEntite)
      .subscribe(
        res => {
          this.resetFields();
          this.router.navigate(['/general-info/']);
          this.showSuccess()
        }
      )
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
        
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    })
  }

}
