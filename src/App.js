import React, { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader.js";
const Hero = lazy(() => import("./components/Hero/Hero"));
const GetSection = lazy(() => import("./components/GetSection/GetSection"));
const PostSection = lazy(() => import("./components/PostSection/PostSection"));

function App() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="tac mt-140">
            <Loader />
          </div>
        }
      >
        <main className="main">
          <Hero />
          <GetSection />
          <PostSection />
        </main>
      </Suspense>
    </>
  );
}

export default App;
