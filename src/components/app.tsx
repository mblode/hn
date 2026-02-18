import { Analytics } from "./analytics.tsx";
import { Footer } from "./footer.tsx";
import { Header } from "./header.tsx";
import { RootRoutes } from "./root-routes.tsx";

export const App = () => {
  return (
    <div>
      <Analytics />
      <Header />

      <section>
        <div className="mx-auto max-w-[620px]">
          <RootRoutes />
          <Footer />
        </div>
      </section>
    </div>
  );
};
