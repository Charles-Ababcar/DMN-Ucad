import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountToModule } from 'angular-count-to';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members/members.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewMemberComponent } from './new-member/new-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMemberResolver } from '../../shared/services/edit-member.resolver';
import { MemberService } from '../../shared/services/member.service';
import { DetailMemberResolver } from '../../shared/services/detail-member.resolver';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { NewEnseignementComponent } from './detail-member/enseignement/new-enseignement/new-enseignement.component';
import { EditEnseignementComponent } from './detail-member/enseignement/edit-enseignement/edit-enseignement.component';
import { NewEnseignementResolver } from '../../shared/services/new-enseignement.resolver';
import { EditEnseignementResolver } from '../../shared/services/edit-enseignement.resolver';







@NgModule({
  declarations: [MembersComponent,NewMemberComponent,EditMemberComponent,DetailMemberComponent,NewEnseignementComponent,EditEnseignementComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    CountToModule,
    NgbModule,
    GalleryModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MemberService,EditMemberResolver,DetailMemberResolver,NewEnseignementResolver,EditEnseignementResolver]
})
export class MembersModule { }
