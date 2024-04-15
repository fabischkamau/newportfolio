import { Menu as MenuIcon } from "lucide-react";
import DarkModeToggle from "./darkmode-toggle";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { Link, NavLink } from "@remix-run/react";

import fk from "~/images/fk.jfif";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export default function Header() {
  return (
    <nav className="flex justify-between items-center w-full">
      <div>
        <Link
          to="/"
          className="text-3xl font-semibold text-slate-950 dark:text-slate-50 tracking-wide"
        >
          fabisch k.
        </Link>
      </div>
      <div className="hidden md:flex md:space-x-3">
        {links.map((link) => (
          <NavLink
            to={link.href}
            key={link.href}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-base text-sky-500 "
                : "font-semibold text-base text-slate-950 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-500 transition duration-150 delay-100"
            }
            end
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex md:hidden">
          <Menu as="div" className="relative">
            <Menu.Button>
              <MenuIcon className="text-slate-900 size-6 dark:text-slate-100 mt-3" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="px-1 py-1 ">
                {" "}
                <Menu.Items className="absolute right-0 mt-5 z-20 p-4 w-56 origin-top-right bg-white rounded-lg  dark:bg-slate-900   shadow-lg ring-1 ring-slate-900/5 dark:ring-slate-200/5 focus:outline-none">
                  {links.map((link) => (
                    /* Use the `active` state to conditionally style the active item. */
                    <Menu.Item key={link.href}>
                      {({ active }) => (
                        <NavLink
                          to={link.href}
                          className={`${
                            active
                              ? "text-sky-600"
                              : "text-slate-800 dark:text-slate-300"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold`}
                        >
                          {link.label}
                        </NavLink>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </div>
            </Transition>
          </Menu>
        </div>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
