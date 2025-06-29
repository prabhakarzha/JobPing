import React from "react";
import "../styles/landing.css";
import Footer from "../components/Footer";
import jobPinglogo from "../assets/jobPinglogo.png";

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      {/* Section 1 */}
      <section className="section section-hero">
        <img src={jobPinglogo} alt="jobPinglogo" className="landing-logo" />

        <h1 className="title-glow">Welcome to JobPing</h1>
        <marquee className="marquee-text">
          🚧 This website is currently under development 🚧
        </marquee>
      </section>

      {/* Section 2 */}
      <section className="section section-problem">
        <h2 className="animated-heading">
          Applied on Naukri, LinkedIn, Indeed?
        </h2>
        <p className="animated-subtext">
          But no one responds? We get it. That's frustrating.
        </p>
      </section>

      {/* Section 3 */}
      <section className="section section-promise">
        <h2 className="highlight-text">📞 Get Responses That Matter</h2>
        <p className="promise-description">
          Apply to 10 companies, and we’ll make sure you hear back from at least
          5.
        </p>
        <div className="section section-promise">
          <h2 className="cta-text">🔥 Start Your Journey Now</h2>
          <button
            className="cta-button"
            onClick={() => (window.location.href = "/home")}
          >
            Apply for Jobs
          </button>
          {/* 
          <div className="footer">
            Designed & Developed by Prabhakar Kumar | Software Developer
          </div> */}
        </div>

        {/* <footer className="footer">
          Designed & Developed by <strong>Prabhakar Kumar</strong> | Software
          Developer

        </footer> */}
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;
