import { Route, Routes } from "react-router-dom";
import { About } from "./about-route";
import { ErrorRoute } from "./error-route";
import { Feed } from "./feed-route";
import { Item } from "./item-route";

export const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<Feed />} />
      <Route path="/about" element={<About />} />
      <Route path="/item/:id" element={<Item />} />
      <Route path="/:type/:page" element={<Feed />} />
      <Route path="/:type" element={<Feed />} />

      <Route path="*" element={<ErrorRoute />} />
    </Routes>
  );
};
