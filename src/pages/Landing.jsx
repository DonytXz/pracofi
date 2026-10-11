import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Home from "../components/landing/Home";
import About from "../components/landing/About";
import Contact from "../components/landing/Contact";
import AppShell from "../components/global/AppShell";

export default function Landing() {
  const { hash } = useLocation();

  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (target?.scrollIntoView) target.scrollIntoView();
  }, [hash]);

  return <AppShell><div className="landing-page"><Home /><About /><Contact /></div></AppShell>;
}
