import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";

export const App = () => {
  return (
    <div>
      <Header />

      <section className="mt-3">
        <div className="mx-auto max-w-[700px]">
          <Main />
          <Footer />
        </div>
      </section>
    </div>
  );
}