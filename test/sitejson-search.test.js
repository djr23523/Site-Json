import { html, fixture, expect } from '@open-wc/testing';
import "../sitejson-search.js";

describe("siteJson test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <sitejson-search
        title="title"
      ></sitejson-search>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
