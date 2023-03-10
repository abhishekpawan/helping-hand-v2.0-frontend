import { useRef, useEffect, useState, useContext } from "react";

import { TbWorld } from "react-icons/tb";
import { AppContext } from "../../App";
import "./Footer.css";

const Footer = () => {
  const myRef = useRef<any>(null);
//   const { isFooterVisible, setIsFooterVisible } = useContext(AppContext);
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       const entry = entries[0];
//       setIsFooterVisible(entry.isIntersecting);
//     });
//     observer.observe(myRef.current);
//   }, []);
  return (
    <footer ref={myRef}>
      {/* <div className="footer-logos row gx-0 p-4 d-flex justify-content-between">
        <div className="col-12 col-lg-7 fw-bold fs-2 p-4 d-flex align-items-center">
          Top companies choose Findemy Business to build in-demand career skills.
        </div>
        <div className="col-12 col-lg-5 p-4 d-flex justify-content-lg-end">
          <span className="my-3 me-3">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg"
              alt="nasdaq"
            />
          </span>
          <span className="my-3 me-3">
            <img
              src="	https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg"
              alt="volkswagen"
            />
          </span>
          <span className="my-3 me-3">
            <img
              src="	https://s.udemycdn.com/partner-logos/v4/box-light.svg"
              alt="box"
            />
          </span>
          <span className="my-3 me-3">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg"
              alt="netapp"
            />
          </span>
          <span className="my-3 me-3">
            <img
              src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg"
              alt="eventbrite"
            />
          </span>
        </div>
      </div> */}
      <div className="footer">
        {/* <div className="footer__language-and-links row g-0">
          <div className="footer__language-btn col-12 col-md-4 order-md-2">
            <button
              aria-label="language"
              // data-bs-toggle="modal"
              // data-bs-target="#exampleModal"
            >
              <TbWorld /> <span>English</span>
            </button>
          </div>
          <ul className="footer__list col-12 col-md-8 order-md-1 row">
            <div className="col-sm-4 p-0">
              <li>
                <a
                  target="_blank"
                  href="https://www.udemy.com/udemy-business/?locale=en_US&mx_pg=search-results&path=%2F&ref=footer"
                >
                  <span>Findemy Business</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.udemy.com/teaching/?ref=teach_footer"
                >
                  <span>Teach on Udemy</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.udemy.com/mobile/">
                  <span>Get the app</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://about.udemy.com/?locale=en-us">
                  <span>About us</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://about.udemy.com/company?locale=en-us#offices"
                >
                  <span>Contact us</span>
                </a>
              </li>
            </div>
            <div className="col-sm-4 p-0">
              <li>
                <a
                  target="_blank"
                  href="https://about.udemy.com/careers?locale=en-us"
                >
                  <span>Careers</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://blog.udemy.com/?ref=footer">
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.udemy.com/affiliate/">
                  <span>Affiliate</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.udemy.com/support/">
                  <span>Help and Support</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://bajajfinserv.in">
                  <span>Investors</span>
                </a>
              </li>
            </div>
            <div className="col-sm-4 p-0">
              <li>
                <a target="_blank" href="https://www.udemy.com/terms/">
                  <span>Terms</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.udemy.com/terms/privacy/">
                  <span>Privacy policy</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="#">
                  <span>Cookie settings</span>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.udemy.com/sitemap/">
                  <span>Sitemap</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://about.udemy.com/accessibility-statement?locale=en-us"
                >
                  <span>Accessibility statement</span>
                </a>
              </li>
            </div>
          </ul>
        </div> */}
        <div className="footer__logo-and-copyright row g-0">
          <div className="footer__logo col-12 col-md-6">Helping Hand</div>
          <div className="footer__copyright col-12 col-md-6">
            © 2023 Helping Hand, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
