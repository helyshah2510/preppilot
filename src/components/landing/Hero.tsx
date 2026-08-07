import "./Hero.css";
import heroImage from "../../assets/hero.png";

function Hero() {
  return (
    <section className="hero">
      <img src={heroImage} alt="PrepPilot Hero" />
    </section>
  );
}

export default Hero;