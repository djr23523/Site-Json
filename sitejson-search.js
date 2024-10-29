/**
 * Copyright 2024 djr23523
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `sitejson-search`
 * 
 * @demo index.html
 * @element sitejson-search
 */
export class siteJsonSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "sitejson-search";
  }

  constructor() {
    super();
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/sitejson-search.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--sitejson-search-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <h2>${this.title}</h2>
    <details open>
      <summary>Search inputs</summary>
      <div>
        <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
      </div>
    </details>
    <div class="results">
    
      ${this.items.map((item, index) => html`
      <nasa-image
        source="${item.links[0].href}"
        title="${item.data[0].title}" 
        seccreator="${item.data[0].secondary_creator}"
      ></nasa-image>
      `)}
    </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(siteJsonSearch.tag, siteJsonSearch);