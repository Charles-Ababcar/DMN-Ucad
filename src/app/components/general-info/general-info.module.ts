import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from "../../shared/shared.module";

import { GeneralInfoRoutingModule } from './general-info-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewCelluleComponent } from './cellules/new-cellule/new-cellule.component';
import { EditCelluleComponent } from './cellules/edit-cellule/edit-cellule.component';
import { EditCelluleResolver } from '../../shared/services/edit-cellule.resolver';
import { NewCommissionComponent } from './commissions/new-commission/new-commission.component';
import { EditCommissionComponent } from './commissions/edit-commission/edit-commission.component';
import { EditCommissionResolver } from '../../shared/services/edit-commission.resolver';
import { GeneralInfoComponent } from './general-info.component';
import { NewXamxamComponent } from './xamxam/new-xamxam/new-xamxam.component';
import { EditXamxamComponent } from './xamxam/edit-xamxam/edit-xamxam.component';
import { EditXamxamResolver } from '../../shared/services/edit-xamxam.resolver';
import { NewNiveauXamxamComponent } from './xamxam/new-xamxam/niveau-xamxam/new-niveau-xamxam/new-niveau-xamxam.component';
import { EditNiveauXamxamComponent } from './xamxam/new-xamxam/niveau-xamxam/edit-niveau-xamxam/edit-niveau-xamxam.component';
import { EditNiveauXamxamResolver } from '../../shared/services/edit-niveau-xamxam.resolver';
import { NewDepartementComponent } from './departement/new-departement/new-departement.component';
import { EditDepartementComponent } from './departement/edit-departement/edit-departement.component';
import { NewFaculteComponent } from './departement/new-departement/faculte/new-faculte/new-faculte.component';
import { EditFaculteComponent } from './departement/new-departement/faculte/edit-faculte/edit-faculte.component';
import { EditDepartementResolver } from '../../shared/services/edit-departement.resolver';
import { EditFaculteResolver } from '../../shared/services/edit-faculte.resolver';




@NgModule({
  declarations: [GeneralInfoComponent,NewCelluleComponent,EditCelluleComponent,NewCommissionComponent,EditCommissionComponent,NewXamxamComponent,EditXamxamComponent,NewNiveauXamxamComponent,EditNiveauXamxamComponent,NewDepartementComponent,EditDepartementComponent,NewFaculteComponent,EditFaculteComponent],

  imports: [
    CommonModule,
    GeneralInfoRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [EditCelluleResolver,EditCommissionResolver,EditXamxamResolver,EditNiveauXamxamResolver,EditDepartementResolver,EditFaculteResolver]
})
export class GeneralInfoModule { }
