import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, Observable } from "rxjs";
import { OptionsInterface } from "../interface/option.interface";
import { DefaultOptions } from "../model/option.model";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private readonly options: OptionsInterface;
    private readonly darkThemeSubject$: BehaviorSubject<any>;
    private renderer2!: Renderer2
    constructor(
        private rendererFactory: RendererFactory2,

    ) {
        this.options = DefaultOptions;
        this.renderer2 = this.rendererFactory.createRenderer(null, null);
        this.darkThemeSubject$ = new BehaviorSubject(this._getDarkTheme());
        this.darkThemeSubject$.getValue() ? this._enable : this._disable();
    }

    get darkThemeSubject(): Observable<any> {
        
        //distinctUntilChanged faghat zamani etefagh miofte ke BehaviorSubject emoon taghir karde bashe 
        return this.darkThemeSubject$.asObservable().pipe(distinctUntilChanged());
        
    }

    public onToggle() {
        console.log('onToggle');
        
        this.darkThemeSubject$.getValue() ? this._disable() : this._enable();
    
        
        
    }


    private _enable() {
        console.log('_enable');
        
        const { element, darkMode, lightMode } = this.options;
        this.renderer2.addClass(element, darkMode);
        this.renderer2.removeClass(element, lightMode);
        this._SetDarkThemeToLocalStorage(true);
        this.darkThemeSubject$.next(true);
    }
    private _disable() {
        console.log('_disable');

        const { element, darkMode, lightMode } = this.options;
        this.renderer2.addClass(element, lightMode);
        this.renderer2.removeClass(element, darkMode);
        this._SetDarkThemeToLocalStorage(false);
        this.darkThemeSubject$.next(false);

    }

    private _SetDarkThemeToLocalStorage(darkMode: boolean) {
        let set=localStorage.setItem(this.options.storageKey, JSON.stringify({ darkMode }));
        console.log('darkMode',this.options.storageKey, darkMode);
        
    }

    private _getDarkTheme() {
        localStorage.getItem(this.options.storageKey);
    }

}