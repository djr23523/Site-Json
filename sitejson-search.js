/**
 * Copyright 2024 djr23523
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./sitejson-details.js";
import "./sitejson-card.js";
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
    this.loading = false;
    this.siteName='sitejson';
    this.items = [];
    this.value = null;
    this.data="";
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
      loading: { type: Boolean, reflect: true },
      siteName: {type : String},
      items: { type: Array, },
      value: { type: String },
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
      .results{
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <h2>${this.title}</h2>
      <div>
        Site
      </div>
      <div>
        <input id="input" placeholder="Enter https://haxtheweb.org" @input="${this.inputChanged}" />
      </div>
      <button @click=${this.updateResults}>Analyze</button>
    <div class="results">
      <sitejson-details  ></sitejson-details>
    
      ${this.items.map((item,) => html`
      <sitejson-card
        title=${item.title}
        description=${item.description}
      ></sitejson-card>
      `)}
    </div>
    `;
  }
  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      if(this.value.has('site.json')){
        this.updateResults(this.value);
      }
      else if(!this.value.has('site.json')){
        this.value+="/site.json"
      }
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
  fetch(`${this.value}/site.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    this.items = [];
    this.items = data.items;
    this.loading = false;
    this.data=null;
    this.data=data;
  })
  .catch(error => {
    this.items=[];
    this.loading=false;
    this.data=null;
    console.error('There was a problem with the fetch operation:', error);
  });
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