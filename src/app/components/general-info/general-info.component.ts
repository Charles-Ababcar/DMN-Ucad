import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import { GeneralInfoService } from '../../shared/services/general-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { CommissionModel } from './commissions/commission.model';
import { CelluleModel } from './cellules/cellule.model';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralInfoComponent implements OnInit{

  public item: any;
  public entities: any;
  public cellules: any;
  public commissions: any;
  public xamxams: any;
  public facultes: any;
  public departements: any;
  
  constructor(private generalInfoService: GeneralInfoService,private route: ActivatedRoute,public db: AngularFirestore,private router: Router,private toastr :ToastrService) {
  }

  ngOnInit() {

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        // this.avatar = data.payload.data().avatar;
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    })

    this.generalInfoService.getEntities()
    .subscribe(result => {
      this.entities = result;
      this.cellules = this.entities.filter(cellule => cellule.typeEntite === "CELLULE");
      this.commissions = this.entities.filter(commission => commission.typeEntite === "COMMISSION");
    })

    this.generalInfoService.getXamxams()
    .subscribe(result => {
      this.xamxams = result;
    })

    this.generalInfoService.getFacultes()
    .subscribe(result => {      
      this.facultes = result;
    })

    this.generalInfoService.getDepartements()
    .subscribe(result => {
      this.departements = result;
    })
  }

  showDelete(message:string) {
    this.toastr.error(message);
  }


  deleteEntity(id) {
    if(confirm("Etes-vous sûr ?")) {
      this.generalInfoService.deleteEntity(id)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/']);
          this.showDelete('Entité Supprimée !');
        },
        err => {
        }
      )
    }

  }

  deleteXamxam(id) {
    if(confirm("Etes-vous sûr ?")) {
      this.generalInfoService.deleteXamxam(id)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/']);
          this.showDelete('Livre Supprimé !');
        },
        err => {
        }
      )
    }
  }

  deleteDepartement(id) {
    if(confirm("Etes-vous sûr ?")) {
      this.generalInfoService.deleteDepartement(id)
      .subscribe(
        res => {
          this.router.navigate(['/general-info/']);
          this.showDelete('Departement Supprimé !');
        },
        err => {
        }
      )
    }
  }

}	
