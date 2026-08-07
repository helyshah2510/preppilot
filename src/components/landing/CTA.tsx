import "./CTA.css";
import { ArrowRight } from "lucide-react";

function CTA() {
  return (
    <section className="cta">

      <div className="cta-container">

        <div className="cta-left">

          <h2>Ready To Ace Your Next Interview?</h2>

          <p>
            Practice smarter with AI and ace your next interview.
          </p>

        </div>

        <div className="cta-right">

          <button className="cta-btn">
            Start Practicing
            <ArrowRight size={18} />
          </button>

        </div>

      </div>

    </section>
  );
}

export default CTA;