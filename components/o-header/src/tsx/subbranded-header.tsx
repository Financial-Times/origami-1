export function Subbrand() {
  return (
	<header className="o-header o-header--simple" data-o-component="o-header" data-o-header--no-js>
      <div className="o-header__row o-header__top">
        <div className="o-header__container">
          <div className="o-header__top-wrapper">
            <div className="o-header__top-column o-header__top-column--left">
              <a href="#o-header-search" className="o-header__top-icon-link o-header__top-icon-link--search" aria-controls="o-header-search" title="Open search bar">
                <span className="o-header__top-link-label">Open search bar</span>
              </a>
            </div>

            <div className="o-header__top-column o-header__top-column--center">
              <a className="o-header__top-logo" href="/" title="Go to Financial Times homepage">
                <span className="o-header__visually-hidden">Financial Times</span>
              </a>
            </div>

            <div className="o-header__top-column o-header__top-column--right">
              <a className="o-header__top-icon-link o-header__top-icon-link--hide-s o-header__top-icon-link--myft" href="/myft" aria-label="My F T">
                <span className="o-header__visually-hidden">myFT</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="o-header-search" className="o-header__row o-header__search o--if-js" role="search" data-o-header-search>
        <div className="o-header__container">
          <form className="o-header__search-form" action="/search" role="search" aria-label="Site search">
            <label className="o-header__visually-hidden" for="o-header-search-term-js">Search the <abbr title="Financial Times">FT</abbr></label>
            <input className="o-header__search-term" id="o-header-search-term-js" name="q" type="text" placeholder="Search the FT" />
            <button className="o-header__search-submit" type="submit">
              Search
            </button>
            <button className="o-header__search-close" type="button" aria-controls="o-header-search" title="Close search bar">
              <span className="o-header__visually-hidden">Close search bar</span>
            </button>
          </form>
        </div>
      </div>

      <div className="o-header__drawer" id="o-header-drawer" role="navigation" aria-label="Drawer menu" data-o-header-drawer data-o-header-drawer--no-js>
        <div className="o-header__drawer-inner">
          <div className="o-header__drawer-tools">
            <a className="o-header__drawer-tools-logo" href="/">
              <span className="o-header__visually-hidden">Financial Times</span>
            </a>
            <button type="button" className="o-header__drawer-tools-close" aria-controls="o-header-drawer" title="Close drawer menu">
              <span className="o-header__visually-hidden">Close drawer menu</span>
            </button>
            <p className="o-header__drawer-current-edition">UK Edition</p>
          </div>

          <div className="o-header__drawer-search">
            <form className="o-header__drawer-search-form" action="/search" role="search" aria-label="Site search">
              <label className="o-header__visually-hidden" for="o-header-drawer-search-term">Search the <abbr title="Financial Times">FT</abbr></label>
              <input className="o-header__drawer-search-term" id="o-header-drawer-search-term" name="q" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search the FT" />
              <button className="o-header__drawer-search-submit" type="submit">
                <span className="o-header__visually-hidden">Search</span>
              </button>
            </form>
          </div>

          <nav className="o-header__drawer-menu" aria-label="Edition switcher">
            <ul className="o-header__drawer-menu-list">
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link" href="/?edition=international">Switch to International Edition</a>
              </li>
            </ul>
          </nav>

          <nav className="o-header__drawer-menu o-header__drawer-menu--primary">
            <ul className="o-header__drawer-menu-list">
              <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">
                xxx xxxxxxxx
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--selected" href="#" aria-label="xxxx, current page" aria-current="page">xxxx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xxxxx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-1">
                    Show more xxxxx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-1">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx xxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxx xxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx xxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx xxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx xxxx xxx xxxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-2">
                    Show more xx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-2">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xx xxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xx xxxxxxxx x xxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xx xxxxxxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xxxxxxxxx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-3">
                    Show more xxxxxxxxx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-3">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx x xxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xxxxxxx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-4">
                    Show more xxxxxxx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-4">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxx xxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxx xxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxx xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xxxxxxx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-5">
                    Show more xxxxxxx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-5">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xx xxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxx xxx xxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xxxx x xxxxxxx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-6">
                    Show more xxxx x xxxxxxx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-6">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx xxxxxx xxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx xxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx xxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xxxx x xxxx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-7">
                    Show more xxxx x xxxx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-7">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx x xxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxx x xxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxx xx x xxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <div className="o-header__drawer-menu-toggle-wrapper">
                  <a className="o-header__drawer-menu-link o-header__drawer-menu-link--parent o-header__drawer-menu-link--unselected" href="#">xxxxxxxx xxxxxxx</a>
                  <button className="o-header__drawer-menu-toggle o-header__drawer-menu-toggle--unselected" aria-controls="o-header-drawer-child-8">
                    Show more xxxxxxxx xxxxxxx links
                  </button>
                </div>
                <ul className="o-header__drawer-menu-list o-header__drawer-menu-list--child" id="o-header-drawer-child-8">
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx x xxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxx</a>
                  </li>
                  <li className="o-header__drawer-menu-item">
                    <a className="o-header__drawer-menu-link o-header__drawer-menu-link--child o-header__drawer-menu-link--unselected" href="#">xxxxxxxx x xxxxxxx</a>
                  </li>
                </ul>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxxxxxx x xxxxxxxxxxx</a>
              </li>
              <li className="o-header__drawer-menu-item o-header__drawer-menu-item--heading">
                xx xxxxxxxxxx
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxxxx xxxx xxx xx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxxxx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxxxxxx xxxxxxx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxxx xxxx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--unselected" href="#">xxxxxxxxxxx</a>
              </li>
              <li className="o-header__drawer-menu-item o-header__drawer-menu-item--divide">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--secondary o-header__drawer-menu-link--unselected" href="#">xx xx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--secondary o-header__drawer-menu-link--unselected" href="#">xxxxxxxxx</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link o-header__drawer-menu-link--secondary o-header__drawer-menu-link--unselected" href="#">xxxxxxx xxxxx</a>
              </li>
            </ul>
          </nav>

          <nav className="o-header__drawer-menu o-header__drawer-menu--user">
            <ul className="o-header__drawer-menu-list">
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link" href="/products?segID=400863&amp;segmentID=190b4443-dc03-bd53-e79b-b4b6fbd04e64">Subscribe</a>
              </li>
              <li className="o-header__drawer-menu-item">
                <a className="o-header__drawer-menu-link" href="/login">Sign In</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="o-header__subbrand" data-o-header-subbrand>
        <a className="o-header__subbrand-logo demo-o-header__subbrand-logo" href="/" title="Go to the Life&amp;Arts page">
          <span className="o-header__visually-hidden">Life&amp;Arts</span>
        </a>
      </div>
      <div className="o-header__subnav" role="navigation" aria-label="Sub navigation" data-o-header-subnav>
        <div className="o-header__container">
          <div className="o-header__subnav-wrap-outside">
            <div className="o-header__subnav-wrap-inside" data-o-header-subnav-wrapper>
              <div className="o-header__subnav-content">
                <ol className="o-header__subnav-list o-header__subnav-list--breadcrumb" aria-label="Breadcrumb">
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href aria-current="page" aria-label="xxxx x xxxx, current page">
                      xxxx x xxxx
                    </a>
                  </li>
                </ol>

                <ul className="o-header__subnav-list o-header__subnav-list--children" aria-label="Subsections">
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href="#"> xxxxx x xxxx </a>
                  </li>
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href="#"> xxxxx </a>
                  </li>
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href="#"> xxxx x xxxxx </a>
                  </li>
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href="#"> xxxxxx </a>
                  </li>
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href="#"> xxxxx </a>
                  </li>
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href="#"> xxxx </a>
                  </li>
                  <li className="o-header__subnav-item">
                    <a className="o-header__subnav-link" href="#"> xx xxxxxxxx </a>
                  </li>
                </ul>
              </div>
            </div>
            <button className="o-header__subnav-button o-header__subnav-button--left" aria-hidden="true" disabled></button>
            <button className="o-header__subnav-button o-header__subnav-button--right" aria-hidden="true" disabled></button>
          </div>
        </div>
      </div>
    </header>
  )
}
