import { Route, Routes } from "react-router-dom";

import { Item } from "./item-route";
import { About } from "./about-route";
import { Feed } from "./feed-route";
import { Error } from "./error-route";

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<Feed />} />
      <Route path="/about" element={<About />} />
      <Route path="/item/:id" element={<Item />} />
      <Route path="/:type/:page" element={<Feed />} />
      <Route path="/:type" element={<Feed />} />

      <Route element={<Error />} />
    </Routes>
  );
};
