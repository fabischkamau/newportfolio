import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-10">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
