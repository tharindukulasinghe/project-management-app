import React, { Component } from "react";
import "./home.css";
class Home extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <header class="masthead text-center text-white">
          <div class="masthead-content">
            <div class="container">
              <h1 class="masthead-heading mb-0">Project Management System</h1>
              <h2 class="masthead-subheading mb-0">IT Fac</h2>
            </div>
          </div>
          <div class="bg-circle-1 bg-circle" />
          <div class="bg-circle-2 bg-circle" />
          <div class="bg-circle-3 bg-circle" />
          <div class="bg-circle-4 bg-circle" />
        </header>

        <section>
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 order-lg-2">
                <div class="p-5">
                  <img
                    class="img-fluid rounded-circle"
                    src="img/01.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-lg-6 order-lg-1">
                <div class="p-5">
                  <h2 class="display-4">For those about to rock...</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod aliquid, mollitia odio veniam sit iste esse assumenda
                    amet aperiam exercitationem, ea animi blanditiis recusandae!
                    Ratione voluptatum molestiae adipisci, beatae obcaecati.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6">
                <div class="p-5">
                  <img
                    class="img-fluid rounded-circle"
                    src="img/02.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="p-5">
                  <h2 class="display-4">We salute you!</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod aliquid, mollitia odio veniam sit iste esse assumenda
                    amet aperiam exercitationem, ea animi blanditiis recusandae!
                    Ratione voluptatum molestiae adipisci, beatae obcaecati.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 order-lg-2">
                <div class="p-5">
                  <img
                    class="img-fluid rounded-circle"
                    src="img/03.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-lg-6 order-lg-1">
                <div class="p-5">
                  <h2 class="display-4">Let there be rock!</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quod aliquid, mollitia odio veniam sit iste esse assumenda
                    amet aperiam exercitationem, ea animi blanditiis recusandae!
                    Ratione voluptatum molestiae adipisci, beatae obcaecati.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer class="py-5 bg-black">
          <div class="container">
            <p class="m-0 text-center text-white small">
              Copyright &copy; Your Website 2019
            </p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Home;
