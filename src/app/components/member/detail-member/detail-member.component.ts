import { Component, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../../shared/services/e-commerce/products.service';
import { Products, ColorFilter, ProductColor, ProductTags, TagFilter } from '../../../shared/model/e-commerce/product.model';
import { CartService } from '../../../shared/services/e-commerce/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WishListService } from '../../../shared/services/e-commerce/wish-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../../shared/services/member.service';
import { GeneralInfoService } from '../../../shared/services/general-info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-member',
  templateUrl: './detail-member.component.html',
  styleUrls: ['./detail-member.component.scss']
})
export class DetailMemberComponent implements OnInit {

  public item: any;
  public sidebaron: any;
  public enseignements: any;
  public kourels: any;
  public entite: any;
  public departement: any;

  constructor(public memberService: MemberService,private generalInfoService: GeneralInfoService , private route: ActivatedRoute,private toastr :ToastrService,private router: Router) { }

 

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      console.log(data);
      
      if (data) {
        //this.avatar = data.payload.data().avatar;
        this.item = data;
        this.item.id = data.id;

        this.generalInfoService.getDepartement(this.item.departement.id)
        .subscribe(result => {
          this.departement = result;
          console.log(this.departement);
        })

        this.memberService.getMembreEntite()
        .subscribe(result => {
          this.entite = result.filter(e => e.membre.id === this.item.id);
          console.log(this.entite);
        })

        this.memberService.getEnseignements()
        .subscribe(result => {
          this.enseignements = result.filter(e => e.membre.id === this.item.id);
          console.log(this.enseignements);
        })

        this.memberService.getMembreKourel()
        .subscribe(result => {
          this.kourels = result.filter(k => k.membre.id === this.item.id);
          console.log(this.kourels);
        })
        
      }
    })
  }

  deleteEnseignement(id) {
    if(confirm("Etes-vous sûr ?")) {
      this.memberService.deleteEnseignement(id)
      .subscribe(
        res => {
          this.router.navigate(['/members/detail-member',this.item.id]);
          this.showDelete('Enseignement Supprimé !');
        },
        err => {
        }
      )
    }

  }

  deleteMember(id) {
    if(confirm("Etes-vous sûr ?")) {
      this.enseignements.map((enseignement: any) => {
        console.log(enseignement);
        this.memberService.deleteEnseignement(enseignement.id).subscribe(
          res => {
            console.log(res);
            
          },
          err => {
          }
        )
      })

      this.entite.map((entite: any) => {
        console.log(entite);
        this.memberService.deleteMembreEntite(entite.id).subscribe(
          res => {
            console.log(res);
            
          },
          err => {
          }
        )
      })


      this.kourels.map((kourel: any) => {
        console.log(kourel);
        this.memberService.deleteMembreKourel(kourel.id).subscribe(
          res => {
            console.log(res);
            
          },
          err => {
          }
        )
      })

      if(this.enseignements.length == 0 && this.entite.length == 0 && this.kourels.length == 0){
        this.memberService.deleteMember(this.item.id).subscribe(
          res => {
            this.router.navigate(['/members/members']);
            this.showDelete('Membre Supprimé !');
          },
          err => {
          }
        )
      }
      
      // this.memberService.deleteMember(this.item.id).subscribe(
      //   res => {
      //     this.router.navigate(['/members/detail-member',this.item.id]);
      //     this.showDelete('Enseignement Supprimé !');
      //   },
      //   err => {
      //   }
      // )
    }

  }

  showDelete(message:string) {
    this.toastr.error(message);
  }

}
