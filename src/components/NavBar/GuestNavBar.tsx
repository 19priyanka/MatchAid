import { useEffect, useState } from "react";
import { IconHome, IconLogin } from "@tabler/icons-react";

import classes from "./Navbar.module.css";
import { useRouter } from "next/router";

const data = [{ link: "/", label: "Home", icon: IconHome }];

export default function GuestNavBar() {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  useEffect(() => {
    const activeLink = data.find(
      (item) => item.link === router.pathname
    )?.label;
    setActive(activeLink || "");
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
    <nav className={classes.navbar} style={{height: 75}}>
      <div className={classes.navbarMain}>{links}</div>
      <button onClick={() => router.push('/login')} className="absolute bottom-0">
        <div className={classes.link}>
          <IconLogin className={classes.linkIcon} stroke={1.5} />
          <span>Log in</span>
        </div>
      </button>
    </nav>
  );
}
