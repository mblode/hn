import { Route, Routes } from "react-router-dom";
import { About } from "./about-route";
import { ErrorRoute } from "./error-route";
import { Feed } from "./feed-route";
import { Item } from "./item-route";

export const RootRoutes = () => {
  return (
    <Routes>
      <Route element={<Feed />} index path="/" />
      <Route element={<About />} path="/about" />
      <Route element={<Item />} path="/item/:id" />
      <Route element={<Feed />} path="/:type/:page" />
      <Route element={<Feed />} path="/:type" />

      <Route element={<ErrorRoute />} path="*" />
    </Routes>
  );
};
