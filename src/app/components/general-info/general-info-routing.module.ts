import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInfoComponent } from './general-info.component';
import { NewCelluleComponent } from './cellules/new-cellule/new-cellule.component';
import { EditCelluleComponent } from './cellules/edit-cellule/edit-cellule.component';
import { EditCelluleResolver } from '../../shared/services/edit-cellule.resolver';
import { NewCommissionComponent } from './commissions/new-commission/new-commission.component';
import { EditCommissionComponent } from './commissions/edit-commission/edit-commission.component';
import { EditCommissionResolver } from '../../shared/services/edit-commission.resolver';
import { NewXamxamComponent } from './xamxam/new-xamxam/new-xamxam.component';
import { EditXamxamComponent } from './xamxam/edit-xamxam/edit-xamxam.component';
import { EditXamxamResolver } from '../../shared/services/edit-xamxam.resolver';
import { NewNiveauXamxamComponent } from './xamxam/new-xamxam/niveau-xamxam/new-niveau-xamxam/new-niveau-xamxam.component';
import { EditNiveauXamxamComponent } from './xamxam/new-xamxam/niveau-xamxam/edit-niveau-xamxam/edit-niveau-xamxam.component';
import { EditNiveauXamxamResolver } from 'src/app/shared/services/edit-niveau-xamxam.resolver';
import { NewDepartementComponent } from './departement/new-departement/new-departement.component';
import { EditDepartementComponent } from './departement/edit-departement/edit-departement.component';
import { EditDepartementResolver } from '../../shared/services/edit-departement.resolver';
import { NewFaculteComponent } from './departement/new-departement/faculte/new-faculte/new-faculte.component';
import { EditFaculteComponent } from './departement/new-departement/faculte/edit-faculte/edit-faculte.component';
import { EditFaculteResolver } from 'src/app/shared/services/edit-faculte.resolver';





const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GeneralInfoComponent,
        data: {
          title: "general",
          breadcrumb: ""
        }
      },
      {
        path: 'new-cellule',
        component: NewCelluleComponent,
        data: {
          title: "Nouvelle cellule",
          breadcrumb: "Nouvelle cellule"
        }
      },
      {
        path: 'edit-cellule/:id',
        component: EditCelluleComponent,
        resolve: {
          data: EditCelluleResolver
        },
        data: {
          title: "Modifier cellule",
          breadcrumb: "Modifier cellule"
        }
      },
      {
        path: 'new-commission',
        component: NewCommissionComponent,
        data: {
          title: "Nouvelle commission",
          breadcrumb: "Nouvelle commission"
        }
      },
      {
        path: 'edit-commission/:id',
        component: EditCommissionComponent,
        resolve: {
          data: EditCommissionResolver
        },
        data: {
          title: "Modifier commission",
          breadcrumb: "Modifier commission"
        }
      },
      {
        path: 'new-xamxam',
        component: NewXamxamComponent,
        data: {
          title: "Nouveau Livre",
          breadcrumb: "Nouveau Livre"
        }
      },
      {
        path: 'edit-xamxam/:id',
        component: EditXamxamComponent,
        resolve: {
          data: EditXamxamResolver
        },
        data: {
          title: "Modifier xamxam",
          breadcrumb: "Modifier xamxam"
        }
      },
      {
        path: 'new-xamxam/new-niveau-xamxam',
        component: NewNiveauXamxamComponent,
        data: {
          title: "Nouveau Niveau",
          breadcrumb: "Nouveau Niveau"
        }
      },
      {
        path: 'new-xamxam/edit-niveau-xamxam/:id',
        component: EditNiveauXamxamComponent,
        resolve: {
          data: EditNiveauXamxamResolver
        },
        data: {
          title: "Modifier niveau xamxam",
          breadcrumb: "Modifier niveau xamxam"
        }
      },
      {
        path: 'new-departement',
        component: NewDepartementComponent,
        data: {
          title: "Nouveau departement",
          breadcrumb: "Nouveau departement"
        }
      },
      {
        path: 'edit-departement/:id',
        component: EditDepartementComponent,
        resolve: {
          data: EditDepartementResolver
        },
        data: {
          title: "Modifier departement",
          breadcrumb: "Modifier departement"
        }
      },
      {
        path: 'new-departement/new-faculte',
        component: NewFaculteComponent,
        data: {
          title: "Nouvelle faculte",
          breadcrumb: "Nouvelle Faculte"
        }
      },
      {
        path: 'new-departement/edit-faculte/:id',
        component: EditFaculteComponent,
        resolve: {
          data: EditFaculteResolver
        },
        data: {
          title: "Modifier Faculte",
          breadcrumb: "Modifier Faculte"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInfoRoutingModule { }
