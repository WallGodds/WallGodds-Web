import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Gallery from "./Components/GalleryModule/Gallery";
import "./App.css";
import SignUp from "./Components/CommonModule/SignUpModule/SignUp";
import Home from "./Components/HomeModule/Home";
import Upload from "./Components/UploadModule/Upload";
import Aboutus from "./Components/AboutModule/Aboutus";
import Error404 from "./Components/ErrorModule/Error404";
import Profile from "./Components/ProfileModule/Profile";
import useGoogleAnalytics from "./hooks/useGoogleAnalytics";
import { pageview } from "./utils/analytics";
import Footer from "./Components/AboutModule/Footer";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function AppContent() {
    const location = useLocation();

    // Track page views - remove DEV check for testing
    useEffect(() => {
        pageview(location.pathname + location.search);
    }, [location]);

    return (
        <>
            <Analytics />
            <SpeedInsights />
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Home />} />
                <Route path="/gallery/*" element={<Gallery />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
            <Footer />
        </>
    );
}

function App() {
    // Initialize Google Analytics here
    useGoogleAnalytics();

    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;