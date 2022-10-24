import { Component } from '@angular/core';
import { ThemeService } from '../theme/theme.service';

@Component({
   selector: 'header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

   constructor(
      private _themeService: ThemeService
   ) {

   }

   public switchTheme() {
      let active = this._themeService.getActiveTheme();
      if (active == "lightTheme") {
         this._themeService.setTheme('darkTheme');
      }else{
         this._themeService.setTheme('lightTheme');
      }
   }

}
