import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
// import { Switch } from '@headlessui/react';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false)

  // Gérer l'effet de scroll pour le background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // const [lang, setLang] = useState("EN");
  // const [enabled, setEnabled] = useState(false);

  // const handleLang = () => {
  //     setEnabled(!enabled);
  //     lang == 'EN' ? setLang('FR') : setLang('EN');
  // }

  const handleDownloadCV = () => {
    // Remplacez 'CV Patrick NAMEGNI.pdf' par le chemin réel de votre CV
    window.location.href = 'CV Patrick NAMEGNI.pdf';
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${isScrolled ? 'bg-primary/90' : ''} transition-all duration-300`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Patrick
            {/* &nbsp; <span className="font-light sm:block hidden">| Fullstack Web Developer</span>*/}
          </p>
        </Link>

        <ul className="list-none hidden md:flex flex-row items-center gap-10">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } text-base hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          
          {/* Bouton Télécharger CV pour desktop */}
          <li>
            <button
              onClick={handleDownloadCV}
              className="flex items-center gap-2 px-4 py-2 border border-white/50 hover:border-white hover:bg-white/10 text-white font-medium text-[16px] rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="#ffffff" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>
              </svg>
              <span className="text-sm hidden lg:inline">Télécharger mon CV</span>
              <span className="lg:hidden">CV</span>
            </button>
          </li>
          
          {/* <li>
                    <div className="flex justify-center items-center gap-2">
                        <p className="text-secondary text-[18px] font-medium">EN</p>
                        <Switch
                            checked={enabled}
                            onChange={handleLang}
                            className={`${
                                enabled ? 'bg-gray-700' : 'bg-gray-500'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                            <span className="sr-only">Enable notifications</span>
                            <span
                                className={`${
                                enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                        <p className="text-secondary text-[18px] font-medium">FR</p>
                    </div>
                </li> */}
        </ul>

        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu icon"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              
              {/* Bouton Télécharger CV pour mobile */}
              <li className="w-full">
                 <button
                   onClick={() => {
                     handleDownloadCV();
                     setToggle(false);
                   }}
                   className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium text-[14px] rounded-lg transition-all duration-300"
                 >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>
                  </svg>
                  Télécharger CV
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
