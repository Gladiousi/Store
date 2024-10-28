"use client";

import { Provider } from "react-redux";
import store from "../store";
import "../app/globals.css";
import Header from "@/components/layout/Header";
import Foter from "@/components/layout/Foter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Provider store={store}>
          <main>{children}</main>
        </Provider>
        <Foter />
      </body>
    </html>
  );
}
