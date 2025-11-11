import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="site-root">
      {/* ---------- Header ---------- */}
      <header className="hero-header">
        <div className="logo">Jadoo.</div>
        <nav className="nav">
          <a href="#destinations">Destinations</a>
          <a href="#services">Services</a>
          <a href="#bookings">Bookings</a>
          <button className="btn-ghost" onClick={() => nav("/login")}>
            Login
          </button>
          <button className="btn-primary" onClick={() => nav("/register")}>
            Sign up
          </button>
        </nav>
      </header>

      {/* ---------- Hero Section ---------- */}
      <section className="hero">
        <div className="hero-left">
          <small className="eyebrow">BEST DESTINATIONS AROUND THE WORLD</small>
          <h1 className="hero-title">
            Travel, enjoy and live a new and full life
          </h1>
          <p className="lead">
            Built Wicket longer admire do barton vanity itself do in it.
            Preferred to sportsmen it engrossed listening. Park gate sell they
            west hard for the.
          </p>
          <div className="hero-ctas">
            <button
              className="btn-primary"
              onClick={() => nav("/destinations")}
            >
              Find out more
            </button>
            <button className="btn-ghost">▶ Play Demo</button>
          </div>
        </div>

        <div className="hero-right">
          {/* Place your image at /public/images/hero.png */}
          <img className="hero-image" alt="Travel" src="/images/hero.png" />
        </div>
      </section>

      {/* ---------- Services Section ---------- */}
      <section id="services" className="services">
        <h3 className="services-title">We Offer Best Services</h3>
        <div className="services-grid">
          <div className="service">
            <img
              src="https://images.unsplash.com/photo-1506765515384-028b60a970df?q=60&w=200&auto=format&fit=crop"
              alt="weather"
            />
            <h4>Calculated Weather</h4>
            <p>Built Wicket longer admire do barton vanity itself do in it.</p>
          </div>
          <div className="service">
            <img
              src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=60&w=200&auto=format&fit=crop"
              alt="flights"
            />
            <h4>Best Flights</h4>
            <p>Engrossed listening. Park gate sell they west hard for.</p>
          </div>
          <div className="service">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=60&w=200&auto=format&fit=crop"
              alt="events"
            />
            <h4>Local Events</h4>
            <p>Barton vanity itself do in it. Preferred to sportsmen.</p>
          </div>
          <div className="service">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=60&w=200&auto=format&fit=crop"
              alt="custom"
            />
            <h4>Customization</h4>
            <p>We deliver outsourced aviation services for military customers.</p>
          </div>
        </div>
      </section>

      {/* ---------- Top Destinations ---------- */}
      <section id="destinations" className="top-destinations">
        <div className="section-header">
          <small className="eyebrow">Top Destinations</small>
          <h2>Popular Destinations</h2>
          <p>
            From historical cities to natural spectaculars, come see the best of
            the world!
          </p>
        </div>

        <div className="destinations-grid">
          {[
            {
              name: "Rome, Italy",
              img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop",
              price: "$5.42k",
              days: "10 Days Trip",
              rating: "4.8",
            },
            {
              name: "London, UK",
              img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop",
              price: "$4.2k",
              days: "12 Days Trip",
              rating: "4.7",
            },
            {
              name: "Paris, France",
              img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop",
              price: "$4.8k",
              days: "7 Days Trip",
              rating: "4.9",
            },
          ].map((d, i) => (
            <div className="destination-card" key={i}>
              <div className="card-image">
                <img src={d.img} alt={d.name} />
              </div>
              <div className="card-content">
                <div className="location">
                  <h3>{d.name}</h3>
                  <div className="price">{d.price}</div>
                </div>
                <div className="details">
                  <span>
                    <i className="icon-calendar"></i> {d.days}
                  </span>
                  <span>
                    <i className="icon-star"></i> {d.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Easy Steps ---------- */}
      <section className="easy-steps">
        <div className="steps-content">
          <h2>Book Your Next Trip In 3 Easy Steps</h2>
          <div className="steps-list">
            <div className="step">
              <div className="step-icon step1"></div>
              <div className="step-text">
                <h4>Choose Destination</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  tortor tempus.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-icon step2"></div>
              <div className="step-text">
                <h4>Make Payment</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  tortor tempus.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-icon step3"></div>
              <div className="step-text">
                <h4>Reach Airport on Selected Date</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna,
                  tortor tempus.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="steps-showcase">
          <div className="trip-card">
            <img
              src="https://images.unsplash.com/photo-1548777123-e216912df7d8?q=80&w=1000&auto=format&fit=crop"
              alt="Trip to Greece"
            />
            <div className="trip-content">
              <h4>Trip To Greece</h4>
              <p>14–29 June | by Robbin Joseph</p>
              <div className="trip-footer">
                <div className="people">
                  👥 <span>24 people going</span>
                </div>
                <span className="like-button">❤️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="testimonials">
        <h3>What People Say About Us</h3>
        <div className="test-grid">
          <div className="test-card">
            <p>
              “On the Windows talking painted pasture yet its express parties
              use. Sure last upon he same as no wonder. We relaxed and enjoyed
              the trip.”
            </p>
            <strong>Mike Taylor</strong>
            <small>CEO of Red Button</small>
          </div>
        </div>
      </section>

      {/* ---------- Subscribe ---------- */}
      <section className="subscribe">
        <div className="subscribe-box">
          <h4>
            Subscribe to get information, latest news and other interesting
            offers about Jadoo
          </h4>
          <div className="subscribe-form">
            <input placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="site-footer">
        <div className="footer-inner">Jadoo. © 2025 All rights reserved</div>
      </footer>
    </div>
  );
}
