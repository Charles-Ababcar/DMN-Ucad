import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { EditMemberResolver } from '../../shared/services/edit-member.resolver';
import { NewMemberComponent } from './new-member/new-member.component';
import { DetailMemberResolver } from '../../shared/services/detail-member.resolver';
import { DetailMemberComponent } from './detail-member/detail-member.component';
import { NewEnseignementComponent } from './detail-member/enseignement/new-enseignement/new-enseignement.component';
import { EditEnseignementComponent } from './detail-member/enseignement/edit-enseignement/edit-enseignement.component';
import { NewEnseignementResolver } from '../../shared/services/new-enseignement.resolver';
import { EditEnseignementResolver } from '../../shared/services/edit-enseignement.resolver';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'members',
        component: MembersComponent,
        data: {
          title: "Members",
          breadcrumb: "Members"
        }
      },
      {
        path: 'new-member',
        component: NewMemberComponent,
        data: {
          title: "New Member",
          breadcrumb: "New Member"
        }
      },
      {
        path: 'edit-member/:id',
        component: EditMemberComponent,
        resolve: {
          data: EditMemberResolver
        },
        data: {
          title: "Edit Member",
          breadcrumb: "Edit Member"
        }
      },
      {
        path: 'detail-member/:id',
        component: DetailMemberComponent,
        resolve: {
          data: DetailMemberResolver
        },
        data: {
          title: "Detail Member",
          breadcrumb: "Detail Member"
        }
      },
      {
        path: 'detail-member/new-enseignement/:idMember',
        component: NewEnseignementComponent,
        resolve: {
          data: NewEnseignementResolver
        },
        data: {
          title: "Nouvel enseignement",
          breadcrumb: "Nouvel enseignement"
        }
      },
      {
        path: 'detail-member/edit-enseignement/:id',
        component: EditEnseignementComponent,
        resolve: {
          data: EditEnseignementResolver
        },
        data: {
          title: "Edit enseignement",
          breadcrumb: "Edit enseignement"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
