import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const pagesRoutes: Routes = [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [VerificaTokenGuard],
                data: { titulo: 'Tablero' }
            },
            {path: 'progress', component: ProgressComponent, data: { titulo: 'Barra de progreso' } },
            {path: 'grafica1', component: Graficas1Component, data: { titulo: 'Gráfica' } },
            {path: 'promesas', component: PromesasComponent,  data: { titulo: 'Promesas' } },
            {path: 'rxjs', component: RxjsComponent,  data: { titulo: 'RxJs' }},
            {path: 'account-settings', component: AccoutSettingsComponent,  data: { titulo: 'Ajustes del Tema' }},
            {path: 'perfil', component: ProfileComponent,  data: { titulo: 'Perfil de usuario' }},
            {path: 'busqueda/:termino', component: BusquedaComponent,  data: { titulo: 'Buscador' }},

            // Mantenimientos
            {
                path: 'usuarios',
                canActivate: [AdminGuard],
                component: UsuariosComponent,
                data: { titulo: 'Mantenimiento de usuarios' }
            },
            {path: 'hospitales', component: HospitalesComponent,  data: { titulo: 'Mantenimiento de hospitales' }},
            {path: 'medicos', component: MedicosComponent,  data: { titulo: 'Mantenimiento de medicos' }},
            {path: 'medico/:id', component: MedicoComponent,  data: { titulo: 'Actualizar medico' }},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
