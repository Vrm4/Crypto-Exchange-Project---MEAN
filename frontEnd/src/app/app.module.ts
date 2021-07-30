import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HeaderOkComponent } from './header-ok/header-ok.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MarketsComponent } from './markets/markets.component';
import { WalletComponent } from './wallet/wallet.component';
import { MarketDetailComponent } from './market-detail/market-detail.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Swipejs SLider
import { SwiperModule } from 'swiper/angular';
import { ChartComponent } from './chart/chart.component';
import { DepositComponent } from './deposit/deposit.component';
import { BuyHistoryComponent } from './buy-history/buy-history.component';
import { MessagesComponent } from './messages/messages.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    HeaderOkComponent,
    LoginComponent,
    RegisterComponent,
    MarketsComponent,
    WalletComponent,
    MarketDetailComponent,
    FooterComponent,
    ChartComponent,
    DepositComponent,
    BuyHistoryComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SwiperModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
