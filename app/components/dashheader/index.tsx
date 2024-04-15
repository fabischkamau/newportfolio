import { Menu, Transition } from "@headlessui/react";
import DarkModeToggle from "../darkmode-toggle";
import fk from "~/images/fk.jfif";
import { Link } from "@remix-run/react";
import { LogOut, Newspaper, Settings, User } from "lucide-react";
import { USER } from "../dashboardlayout";
import profileImage from "~/images/user-06.png";

export default function DashHeader({ user }: { user: USER }) {
  return (
    <nav className="p-2 shadow-lg flex w-full justify-between items-center sticky-5 z-10 bg-white dark:bg-inherit">
      <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-100 first-letter:uppercase">
        {user?.profile?.fullName ? user.profile.fullName : "Your Name"}
      </h4>
      <div className="flex gap-2 items-center">
        <DarkModeToggle />
        <div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="size-8 rounded-full">
                <img
                  src={
                    user?.profile?.avatarUrl
                      ? user.profile.avatarUrl
                      : profileImage
                  }
                  alt={
                    user?.profile?.fullName ? user.profile.fullName : "yourname"
                  }
                  className="rounded-full"
                />
              </Menu.Button>
            </div>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-3 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <div className="p-2">
                    <h5 className="text-sm text-slate-600 dark:text-slate-400">
                      {user?.profile?.fullName}
                    </h5>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="profile"
                        className={`${
                          active ? "bg-sky-500 text-white" : "text-slate-700"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-x-2`}
                      >
                        <User className="size-5 " /> Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="blog"
                        className={`${
                          active ? "bg-sky-500 text-white" : "text-slate-700"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-x-2`}
                      >
                        <Newspaper className="size-5 " /> Blog
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="settings"
                        className={`${
                          active ? "bg-sky-500 text-white" : "text-slate-700"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-x-2`}
                      >
                        <Settings className="size-5 " /> Settings
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <form
                    action="/action/logout"
                    method="post"
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="group flex w-full items-center rounded-md px-2 py-2 text-sm text-rose-600 gap-x-2"
                    >
                      <LogOut className="size-5 " />
                      Logout
                    </button>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
