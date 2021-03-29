import React from "react";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={style.body}>
      Copyright <a
      href="https://jdev.pl"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Visit my site"
      title="Visit my site">
        <span className={style.signature}>
          <span className={style["firstname-sign"]}>Mikołaj</span>
          <span> </span><span className={style["lastname-sign"]}>Jadczak</span>
        </span>
      </a>
    </footer>
  );
};

export default Footer;
