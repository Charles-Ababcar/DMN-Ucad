import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from "../../shared/shared.module";

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UsersComponent],

  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    SharedModule,
    NgbModule
  ]
})
export class UsersModule { }
