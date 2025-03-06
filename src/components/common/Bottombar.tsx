import { bottombarLinks } from "@/constants";
import { INavLink } from "@/models";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <li key={link.label}>
            <Link
              to={link.route}
              className={`${isActive && "bg-primary-500 rounded-[10px]"} flex-center flex-col gap-1 p-2 transition`}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                className={`${isActive && "invert-white"}`}
                width={18}
                height={18}
              />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
          </li>
        );
      })}
    </section>
  );
};

export default Bottombar;
