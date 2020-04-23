import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScriptLoader {

    constructor(@Inject(DOCUMENT) private _document: any) { }

    loadScriptsAndStyles() {
        const scripts = ['popper', 'svgs', 'bootstrap'];
        const styles = ['styles', 'fonts-lato', 'fonts-raleway', 'indigo-pink', 'bootstrap-css', 'nouislider'];
        scripts.forEach((bundleName) => {
            this.loadScript(bundleName + '.js');
        });
        styles.forEach((bundleName) => {
            this.loadStyle(bundleName + '.css');
        });
    }

    loadScript(scriptUrl: string) {
        const script = this._document.createElement('script');
        script.src = scriptUrl;
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
}