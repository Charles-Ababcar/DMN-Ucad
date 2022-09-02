import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { EditAdminResolver } from '../../shared/services/edit-admin.resolver';
import { NewAdminComponent } from './new-admin/new-admin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admins',
        component: AdminsComponent,
        data: {
          title: "Admins",
          breadcrumb: "Admins"
        }
      },
      {
        path: 'new-admin',
        component: NewAdminComponent,
        data: {
          title: "New Admin",
          breadcrumb: "New Admin"
        }
      },
      {
        path: 'edit-admin/:id',
        component: EditAdminComponent,
        resolve: {
          data: EditAdminResolver
        },
        data: {
          title: "Edit Admin",
          breadcrumb: "Edit Admin"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
