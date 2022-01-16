import React from "react";
import { Route, Routes } from "react-router-dom";

import { Item } from "./Item";
import { About } from "./About";
import { Feed } from "./Feed";
import { Error } from "./Error";

export const Main = () => {
  return (
    <Routes>
      <Route path="/" index element={<Feed />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/item/:id" exact element={<Item />} />
      <Route path="/:type/:page" element={<Feed />} />
      <Route path="/:type" element={<Feed />} />

      <Route element={<Error />} />
    </Routes>
  );
}
