import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container">
      <h2>About</h2>

      <div className="accordion" id="aboutAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              About Our Platform1
            </button>
          </h2>

          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">We're an e-commerce platform</div>
          </div>
        </div>
      </div>

      <div className="accordion" id="aboutAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              About Our Platform2
            </button>
          </h2>

          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">We're an e-commerce platform</div>
          </div>
        </div>
      </div>

      <div className="accordion" id="aboutAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              About Our Platform3
            </button>
          </h2>

          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">We're an e-commerce platform</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
