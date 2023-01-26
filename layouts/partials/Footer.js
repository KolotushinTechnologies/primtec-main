import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;
  return (
    <footer className="section section-primary-background text-theme-light pb-0">
      <div className="container">
        {/* footer menu */}
        <div className="row">
          {footer.map((col) => {
            return (
              <div className="mb-12 sm:col-6 lg:col-3 footer-style" key={col.name}>
                {markdownify(col.name, "h2", "h4")}
                <ul className="mt-6">
                  {col?.menu.map((item) => (
                    <li className="mb-1" key={item.text}>
                      <Link href={item.url} rel="">
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {/* social icons */}
          <div className="md-12 sm:col-6 lg:col-3 text-theme-light">
            <Link className="text-white" href="/" aria-label="Bigspring">
              <h4 className="text-white text-left">Primtec</h4>
            </Link>
            {markdownify(footer_content, "p", "mt-3 mb-6 text-white")}
            <Social source={social} className="social-icons mb-8 text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
