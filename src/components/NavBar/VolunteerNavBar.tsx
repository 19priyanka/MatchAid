import { useState } from 'react';
import {
  IconBellRinging,
  IconFingerprint,
  IconReceipt2,
  IconLogout,
} from '@tabler/icons-react';

import classes from './Navbar.module.css';

const data = [
  { link: '', label: 'Home', icon: IconBellRinging },
  { link: '', label: 'My Events', icon: IconReceipt2 },
  { link: '', label: 'Profile', icon: IconFingerprint },
];

export default function VolunteerNavBar() {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={`${classes.link} ${item.label === active ? classes.activeLink : ''}`}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));
  
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
