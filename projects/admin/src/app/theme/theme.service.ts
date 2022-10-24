import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { ACTIVE_THEME, Theme, THEMES } from "./theme";

@Injectable()
export class ThemeService {

   @Output() themeChange!: EventEmitter<any>;
   constructor(
      @Inject(THEMES) public themes: Theme[],
      @Inject(ACTIVE_THEME) public theme: string
   ) {
   }

   public getActiveTheme() {
      const theme = this.themes.find(item => {
         item.name = this.theme;
      })
      if(!theme){
         return 'error';
      }
      return theme;
   }
   public setTheme(name: string){
      name:this.theme;
      this.themeChange.emit(this.getActiveTheme());

   }
}