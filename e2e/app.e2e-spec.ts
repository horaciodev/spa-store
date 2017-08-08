import { SpaStorePage } from './app.po';

describe('spa-store App', () => {
  let page: SpaStorePage;

  beforeEach(() => {
    page = new SpaStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
