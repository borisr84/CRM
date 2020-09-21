import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './errorsHandling/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    RouterModule.forRoot(
      [
        {path: 'welcome', component: WelcomeComponent},
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
