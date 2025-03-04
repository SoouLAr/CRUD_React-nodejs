import React from "react";
import { Link } from "react-router-dom";
export const NotFound = () => {
  return (
    <div class="page-wrap d-flex flex-row align-items-center mt-4">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <span class="display-1 d-block">404</span>
            <div class="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <Link to="/" class="btn btn-link">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
