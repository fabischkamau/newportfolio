import React, { useState, ReactNode, useEffect } from "react";
import Header from "~/components/dashheader";
import Sidebar from "~/components/sidebar";
export type USER = {
  id: string;
  email: string;
  profile: {
    id: string;
    userId: string;
    fullName: string | null;
    bio: string | null;
    avatarUrl: string | null;
    metadata: string | null;
    updatedAt: Date;
  } | null;
} | null;

const DashBoardLayout: React.FC<{ user: USER; children: ReactNode }> = ({
  children,
  user,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isSmall = screenWidth <= 768;
      if (isSmall) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarOpen]);
  return (
    <main
      className="flex gap-x-2 text-slate-700 dark:text-slate-100 group/sidebar sm:h-dvh md:h-screen rounded-r-lg bg-white dark:bg-inherit"
      aria-expanded={sidebarOpen}
    >
      <Sidebar
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 overflow-y-auto  shadow-md rounded-l-lg relative">
        <Header user={user} />
        <div>{children}</div>
      </div>
    </main>
  );
};

export default DashBoardLayout;
