import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import Modal from "@layouts/components/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const Header = ({ nameCity, setNameCity }) => {
  //router
  const router = useRouter();

  // distructuring the main menu from menu object
  const { main } = menu;

  // let localStorageItem;

  // if (typeof window !== 'undefined') {
  //   // Perform localStorage action
  //   localStorageItem = localStorage;
  // }

  // states declaration
  const [navOpen, setNavOpen] = useState(false);
  const [modal, setModal] = useState(false);

  // logo source
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;
  const { cities } = config;

  // console.log(cities);

  return (
    <header
      className="header"
      style={{
        position: "fixed",
        zIndex: "10",
        width: "100%",
      }}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo />
        </div>

        {/* navbar toggler */}
        <button
          id="show-button"
          className="order-2 flex cursor-pointer items-center md:hidden md:order-1"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Главное Меню</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Главное Меню</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div
          id="nav-menu"
          className={`order-3 md:order-1 ${navOpen ? "max-h-[1000px]" : "max-h-0"
            }`}
        >
          <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block ${router.asPath === menu.url ? "nav-link-active" : ""
                        }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {/* {enable && (
              <li className="md:hidden">
                <button
                  className="btn btn-primary z-0 py-[14px]"
                  onClick={() => setModal(!modal)}
                  rel=""
                >
                  {nameCity}
                </button>
              </li>
            )} */}
          </ul>
        </div>
        {
          modal ? <Modal
            isVisible={true}
            title={`Ваш город: ${nameCity}`}
            content={<div>{cities.filter((city) => city !== nameCity).map((city, i) => <button onClick={() => {
              setNameCity(city);
              localStorage.setItem("city", city);
              document.location.reload();
            }} className="btn btn-primary" key={`city-${i}`}>{city}</button>)}</div>}
            onClose={() => setModal(!modal)}
          />
            :
            null
        }
        {enable && (
          <div className="d-flex order-1 ml-auto min-w-[200px] items-center justify-end md:ml-0 md:flex md:order-2">
            <button className="btn btn-primary z-0 py-[14px]" onClick={() => setModal(!modal)} rel="">
              {/* {cities.map((city) => city)} */}
              {nameCity}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
