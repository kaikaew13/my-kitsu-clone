import React from 'react';

import EachNav from '../../components/each-nav/each-nav';

const NavSection = (props) =>
  props.navClass === 'nav-right' ? (
    <nav className={props.navClass}>
      <EachNav dropdown={false}>Sign Up</EachNav>
      <EachNav dropdown={false}>Sign In</EachNav>
    </nav>
  ) : (
    <nav className={props.navClass}>
      <EachNav dropdown={false}>logo</EachNav>
      <EachNav
        dropdown={true}
        dropdownList={[
          { name: 'anime', to: '/' },
          { name: 'manga', to: '/' },
        ]}
      >
        Browse
      </EachNav>
      <EachNav dropdown={false}>Groups</EachNav>
      <EachNav
        dropdown={true}
        dropdownList={[
          { name: '/', to: '/' },
          { name: '/', to: '/' },
          { name: '/', to: '/' },
        ]}
      >
        Feedback
      </EachNav>
    </nav>
  );

export default NavSection;
