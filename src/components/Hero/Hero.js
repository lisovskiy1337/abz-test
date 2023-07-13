import React from "react";
import "./HeroStyle.scss";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content tac">
            <h3 className="h1">Test assignment for front-end developer</h3>
            <p className="hero__content-text">
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
            <button className="btn yellow">Sign up</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
