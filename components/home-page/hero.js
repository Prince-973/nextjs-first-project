import React from "react";
import classes from "./hero.module.css";
import Image from "next/image";
function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.png"
          alt="An Image showing Max"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi , I am</h1>
      <p>
        I blog about web development - especially frontend like Anguler or React
      </p>
    </section>
  );
}

export default Hero;
