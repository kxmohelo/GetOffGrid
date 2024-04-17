import CalculationForm from "./components/calculation-form";
import Footer from "./components/footer";
import Header from "./components/header";
import Report from "./components/report";
import { lazy, Suspense, forwardRef, useState } from "react";
import { useHover } from '@uidotdev/usehooks';
import { Route, Routes } from "react-router-dom";

// Lazy-load the video component
const Video = lazy(() => import("./components/video"));

function App() {
    const [introHoverRef, isIntroHover] = useHover();

    return (
        <div id="app">
            {/* Header */}
            <Header />

            {/* Background video */}
            <div className="absolute top-[66px] w-full h-[300px] object-cover z-0">
                <Suspense
                    fallback={<img
                        src="images/bg-image.webp"
                        alt="Background video placeholder"
                        className="w-full h-full object-cover" />
                    }
                >
                    <Video />
                </Suspense>
            </div>

            {/* Content */}
            <div className="container text-gray-100" >
                {/* Intro */}
                <div
                    ref={introHoverRef}
                    className="relative mt-[66px] h-[300px] my-auto flex flex-col justify-center "
                >
                    <h1
                        className="text-5xl max-sm:text-4xl font-bold max-sm:mx-4 hover:bg-black/30"
                        style={{ backgroundColor: isIntroHover ? "rgba(0, 0, 0, 0.3)" : "" }}
                    >
                        Solar Installation Calculator
                    </h1>
                    <h2
                        className="uppercase text-lg max-sm:text-base font-medium pt-2 max-sm:mx-4"
                        style={{ backgroundColor: isIntroHover ? "rgba(0, 0, 0, 0.3)" : "" }}
                    >
                        Everything you need to know about structure mounting
                    </h2>
                </div>

                {/* Outlet for user input and installation report*/}
                <div className="relative py-16 max-lg:py-14 max-sm:py-12">
                    <Routes>
                        <Route
                            exact path="/"
                            element={<CalculationForm />} />
                        <Route
                            path="/report"
                            element={<Report />} />
                    </Routes>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div >
    );
}

export default App;