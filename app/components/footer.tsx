import { Link } from "@remix-run/react";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const date = new Date();
  return (
    <footer className="flex flex-col md:flex-row items-center justify-center space-y-5 md:space-y-0 md:justify-between md:items-start my-10">
      <div className="space-y-5">
        <div className="">
          <ul className="flex space-x-3 items-center justify-center text-slate-600 dark:text-slate-500">
            <li>
              <Link
                to="home"
                className="hover:text-sky-500 dark:hover:text-sky-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                className="hover:text-sky-500 dark:hover:text-sky-500"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="articles"
                className="hover:text-sky-500 dark:hover:text-sky-500"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                className="hover:text-sky-500 dark:hover:text-sky-500"
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex space-x-3">
          <Link to="#" target="_blank">
            <Github className="text-slate-600 dark:slate-800 h-5 w-5" />
          </Link>
          <Link to="#" target="_blank">
            <Linkedin className="text-slate-600 dark:slate-800 h-5 w-5" />
          </Link>
        </div>
      </div>
      <div>
        <span className="text-base text-slate-400 dark:text-slate-500">
          &copy;{date.getFullYear()} Fabisch Kamau. All rights reserved
        </span>
      </div>
    </footer>
  );
}
