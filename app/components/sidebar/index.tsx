import { NavLink } from "@remix-run/react";
import fk from "~/images/fk.jfif";
import {
  LayoutDashboard,
  Newspaper,
  type LucideIcon,
  Briefcase,
  MessageCircleReply,
  Settings,
  User,
  Layers2,
  LineChart,
  ChevronLeft,
  AudioLines,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { USER } from "../dashboardlayout";
import profileImage from "~/images/user-06.png";

interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const menu1: MenuItem[] = [
  {
    name: "OverView",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Blog",
    path: "blog",
    icon: Newspaper,
  },
  {
    name: "Projects",
    path: "projects",
    icon: Briefcase,
  },
  {
    name: "Comments",
    path: "comments",
    icon: MessageCircleReply,
  },
];
const menu2: MenuItem[] = [
  {
    name: "Categories",
    path: "categories",
    icon: Layers2,
  },
  {
    name: "Pages",
    path: "pages",
    icon: Newspaper,
  },
  {
    name: "Analyitics",
    path: "analytics",
    icon: LineChart,
  },
  {
    name: "Profile",
    path: "profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "settings",
    icon: Settings,
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  user,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: USER;
}) {
  return (
    <aside className="w-12 group-aria-expanded/sidebar:w-40 h-full bg-transparent shadow-lg relative p-2 transition duration-150 delay-300 ease-in-out">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-3 group-aria-expanded/sidebar:-right-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-slate-100 focus:outline-none"
      >
        <ChevronLeft className="size-5 hidden group-aria-expanded/sidebar:flex " />
        <AudioLines className="flex size-5 rotate-90 group-aria-expanded/sidebar:hidden" />
      </button>
      <div className="mt-5 mb-2 hidden group-aria-expanded/sidebar:flex flex-col items-center justify-center">
        <img
          src={user?.profile?.avatarUrl ? user.profile.avatarUrl : profileImage}
          alt="fabisch kamau"
          className="size-20 rounded-full object-cover"
        />
        <div>
          <h5 className="text-slate-600 text-sm dark:text-slate-300">
            {user?.profile?.fullName ? user.profile.fullName : "your name"}
          </h5>
        </div>
      </div>
      <div className=" divide-y divide-slate-300">
        <nav className="mt-20 group-aria-expanded/sidebar:mt-2 py-3 flex flex-col gap-y-4 group-aria-expanded/sidebar:gap-y-1  w-full items-center ">
          {menu1.map((link) => (
            <NavLink
              to={link.path}
              key={link.path}
              className={({ isActive }) =>
                cn(
                  isActive &&
                    "group-aria-expanded/sidebar:bg-sky-50 font-semibold text-sky-600",
                  "relative inline-flex gap-2 items-center w-full hover:text-sky-600 group/tooltip group-aria-expanded/sidebar:p-2 rounded-lg"
                )
              }
              end
            >
              <link.icon className="size-5 group-aria-expanded/sidebar:size-4" />{" "}
              <span className="hidden group-aria-expanded/sidebar:flex text-sm">
                {link.name}
              </span>
              <span className="text-xs lowercase p-1  bg-black/55 text-slate-50 absolute rounded-lg -top-5 z-10 hidden  group-hover/tooltip:flex group-aria-expanded/sidebar:hidden">
                {link.name}
              </span>
            </NavLink>
          ))}
        </nav>
        <nav className="mt-5 group-aria-expanded/sidebar:mt-5 py-3 flex flex-col gap-y-4 group-aria-expanded/sidebar:gap-y-1  w-full items-center ">
          {menu2.map((link) => (
            <NavLink
              to={link.path}
              key={link.path}
              className={({ isActive }) =>
                cn(
                  isActive &&
                    "group-aria-expanded/sidebar:bg-sky-50 font-semibold text-sky-600",
                  "relative inline-flex gap-2 items-center w-full hover:text-sky-600 group/tooltip group-aria-expanded/sidebar:p-2 rounded-lg"
                )
              }
              end
            >
              <link.icon className="size-5 group-aria-expanded/sidebar:size-4" />{" "}
              <span className="hidden group-aria-expanded/sidebar:flex text-sm">
                {link.name}
              </span>
              <span className="text-xs lowercase p-1  bg-black/55 text-slate-50 absolute rounded-lg -top-5 z-10 hidden  group-hover/tooltip:flex group-aria-expanded/sidebar:hidden">
                {link.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
