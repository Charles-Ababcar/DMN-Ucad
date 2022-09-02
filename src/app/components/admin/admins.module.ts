import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins/admins.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewAdminComponent } from './new-admin/new-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAdminResolver } from '../../shared/services/edit-admin.resolver';
import { AdminService } from '../../shared/services/admin.service';


@NgModule({
  declarations: [AdminsComponent,NewAdminComponent,EditAdminComponent],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    CountToModule,
    NgbModule,
    GalleryModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AdminService,EditAdminResolver]
})
export class AdminsModule { }
