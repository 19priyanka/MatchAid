import { useEffect, useState } from "react";
import {
  IconBellRinging,
  IconFingerprint,
  IconReceipt2,
  IconLogout,
} from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { useRouter } from "next/router";


const data = [
  { link: "/homePage", label: "Home", icon: IconBellRinging },
  { link: "/events", label: "My Events", icon: IconReceipt2 },
  {
    link: "/Profile/Profile",
    label: "Profile",
    icon: IconFingerprint,
  },

];

export default function VolunteerNavBar() {
  const router = useRouter();
  const [active, setActive] = useState("");

  useEffect(() => {
    const activeLink = data.find(
      (item) => item.link === router.pathname
    )?.label;
    setActive(activeLink || '');
  }, [router.pathname]);

  const handleLinkClick = (label: any, link: any) => {
    setActive(label);
    router.push(link);
  };

  const links = data.map((item) => {
    console.log("active:", active);
    console.log("item.label:", item.label);
    return (
      <div
        className={`${classes.link} ${
          item.label === active ? classes.activeLink : ""
        }`}
        key={item.label}
        onClick={() => handleLinkClick(item.label, item.link)}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </div>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <div className={classes.link} onClick={() => handleLinkClick('Logout', '/Login/Login')}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </div>
      </div>
  
    </nav>
  );
}
