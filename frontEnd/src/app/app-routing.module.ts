import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarketsComponent } from './markets/markets.component';
import {WalletComponent} from './wallet/wallet.component'
import {MarketDetailComponent} from './market-detail/market-detail.component'
import { ChartComponent } from './chart/chart.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DepositComponent } from './deposit/deposit.component';
import { BuyHistoryComponent } from './buy-history/buy-history.component';
const routes: Routes = [
  {path : '' , redirectTo: '/dashboard' ,pathMatch: 'full'},
  {path: 'dashboard' , component : DashboardComponent},
  {path : 'wallet' , component : WalletComponent},
  {path : 'markets' , component : MarketsComponent},
  {path : 'market-detail/:name', component : MarketDetailComponent},
  {path : 'chart/:name' , component : ChartComponent},
  {path : 'register' , component : RegisterComponent},
  {path : 'login' , component: LoginComponent},
  {path : 'deposit' , component : DepositComponent},
  {path : 'buy-history' , component : BuyHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
