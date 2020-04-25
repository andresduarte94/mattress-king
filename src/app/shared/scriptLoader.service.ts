import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class ScriptLoader {

    constructor(@Inject(DOCUMENT) private _document: any) { }

    loadScriptsAndStyles() {
        const scripts = ['popper', 'bootstrap'];
        const styles = ['styles', 'fonts-lato', 'fonts-raleway', 'indigo-pink', 'bootstrap-css', 'nouislider'];
        scripts.forEach((bundleName) => {
            this.loadScript(bundleName + '.js');
        });
        styles.forEach((bundleName) => {
            this.loadStyle(bundleName + '.css');
        });
        this.loadSvgs();
    }

    loadScript(scriptUrl: string) {
        const script = this._document.createElement('script');
        script.src = scriptUrl;
        script.defer = true;
        this._document.body.appendChild(script);
    }

    loadStyle(styletUrl: string) {
        // Inject preload css element
        const preloadElement = this._document.createElement('link');
        preloadElement.rel = 'preload';
        preloadElement.as = 'style';
        preloadElement.href = styletUrl;
        this._document.body.appendChild(preloadElement);

        // Inject stylesheet css element
        const lazyStyleElement = document.createElement('link');
        lazyStyleElement.rel = 'stylesheet';
        lazyStyleElement.href = styletUrl;
        this._document.body.appendChild(lazyStyleElement);
    }

    loadSvgs() {
        var parser = new DOMParser();
        var ajaxdoc = parser.parseFromString(
            `<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
              <symbol id="icon-home" viewBox="0 0 32 32">
              <title>home</title>
              <path d="M32 19l-6-6v-9h-4v5l-6-6-16 16v1h4v10h10v-6h4v6h10v-10h4z"></path>
              </symbol>
              <symbol id="icon-phone" viewBox="0 0 32 32">
              <title>phone</title>
              <path d="M22 20c-2 2-2 4-4 4s-4-2-6-4-4-4-4-6 2-2 4-4-4-8-6-8-6 6-6 6c0 4 4.109 12.109 8 16s12 8 16 8c0 0 6-4 6-6s-6-8-8-6z"></path>
              </symbol>
              <symbol id="icon-envelop" viewBox="0 0 32 32">
              <title>envelop</title>
              <path d="M29 4h-26c-1.65 0-3 1.35-3 3v20c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-20c0-1.65-1.35-3-3-3zM12.461 17.199l-8.461 6.59v-15.676l8.461 9.086zM5.512 8h20.976l-10.488 7.875-10.488-7.875zM12.79 17.553l3.21 3.447 3.21-3.447 6.58 8.447h-19.579l6.58-8.447zM19.539 17.199l8.461-9.086v15.676l-8.461-6.59z"></path>
              </symbol>
              <symbol id="icon-star-empty" viewBox="0 0 32 32">
                 <title>star-empty</title>
                 <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z"></path>
              </symbol>
              <symbol id="icon-star-full" viewBox="0 0 32 32">
                 <title>star-full</title>
                 <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
              </symbol>
         </defs>
         </svg>`
            , "image/svg+xml");
        this._document.body.appendChild(ajaxdoc.getElementsByTagName('svg')[0]);
    }
}