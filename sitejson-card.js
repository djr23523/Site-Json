import { LitElement, html, css } from "lit";

export class SitejsonImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.lastupdated='';
    this.description='';
    this.additional='';
    this.alt="";
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        lastupdated: { type : String },
        description: { type : String },
        additional: {type : String},
        alt: { type: String},
    };
  }

  static get styles() {
    return [css`
    

    .image {
    display: inline-block;
    background-color:var(--ddd-theme-default-disabled);
    margin:var(--ddd-spacing-m-4);
    padding:var(--ddd-spacing-p-5);
    }


    .image img {
    display: flex;
    max-width: 100%;
    max-height: 100%;
    width: 240px;
    height: 240px;
    margin:var(--ddd-spacing-4);
    padding:var(--ddd-spacing-4);
    justify-content:center;
    align-items: center;
    }
    .image:hover {
      background-color:var(--ddd-theme-default-nittanyNavy);

    }
    a {
      text-decoration:none;
    }
    .title{
      font-size:var(--ddd-font-size-2);
      color:red;
      text-align:center;
    }
    .sc{
      font-size:var(--ddd-font-size-2);
      color:var(--ddd-theme-default-original87Pink);
      text-align:center;
    }
    `];
  }

  render() {
    return html`
    <a href="${this.source}" target="_blank">
    <div class="image">
        <img src="${this.source}" alt="${this.alt}"/>
        <div>${this.lastupdated}</div>
        <div>${this.description}</div>
        <div class="title">${this.title}</div>
        
    </div>
    </a>
    `;
  }
static get tag() {
    return "sitejson-image";
  }
}
customElements.define(SitejsonImage.tag, SitejsonImage);