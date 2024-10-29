import { html, fixture, expect } from '@open-wc/testing';
import "../site-json.js";

describe("siteJson test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <site-json
        title="title"
      ></site-json>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
