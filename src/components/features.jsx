import React, { Component } from "react";
import "./features.css";
class Features extends Component {
  state = {};
  render() {
    return (
      <div className="container down">
        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              First featurette heading.{" "}
              <span class="text-muted">It'll blow your mind.</span>
            </h2>
            <p class="lead">
              Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
              ligula porta felis euismod semper. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus
              commodo.
            </p>
          </div>
          <div class="col-md-5">
            <img
              class="featurette-image img-fluid mx-auto"
              src="https://picsum.photos/500/500?random"
              alt="Generic placeholder image"
            />
          </div>
        </div>
        <hr class="featurette-divider" />
        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">
              Oh yeah, it's that good.{" "}
              <span class="text-muted">See for yourself.</span>
            </h2>
            <p class="lead">
              Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
              ligula porta felis euismod semper. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus
              commodo.
            </p>
          </div>
          <div class="col-md-5 order-md-1">
            <img
              class="featurette-image img-fluid mx-auto"
              src="https://picsum.photos/500/500?random"
              alt="Generic placeholder image"
            />
          </div>
        </div>
        <hr class="featurette-divider" />
        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              And lastly, this one. <span class="text-muted">Checkmate.</span>
            </h2>
            <p class="lead">
              Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
              ligula porta felis euismod semper. Praesent commodo cursus magna,
              vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus
              commodo.
            </p>
          </div>
          <div class="col-md-5">
            <img
              class="featurette-image img-fluid mx-auto"
              src="https://picsum.photos/500/500?random"
              alt="Generic placeholder image"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Features;
