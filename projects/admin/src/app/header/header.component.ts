import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from '../shared/service/theme.service';

@Component({
   selector: 'header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
   readonly darkMode$: Observable<boolean> = this._themeService.darkThemeSubject;
   constructor(
      private _themeService: ThemeService,
   ) {

   }

   public onToggle() {
      this._themeService.onToggle();
   }


}
