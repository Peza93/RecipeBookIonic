import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { EditRecipePage } from "../pages/edit-recipe/edit-recipe";
import { TabsPage } from "../pages/tabs/tabs";
import { RecipesPage } from "../pages/recipes/recipes";
import { RecipePage } from "../pages/recipe/recipe";
import { ShoppingListPage } from "../pages/shopping-list/shopping-list";
import { ShoppingListService } from "../services/shopping-list";
import { RecipeService } from '../services/recpies';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../services/auth';
import { DatabaseOptions } from '../pages/database-options/database-options';


@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    TabsPage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    SignupPage,
    SigninPage,
    DatabaseOptions

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipePage,
    TabsPage,
    RecipesPage,
    RecipePage,
    ShoppingListPage,
    SignupPage,
    SigninPage,
    DatabaseOptions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService,
    AuthService
  ]
})
export class AppModule {}
