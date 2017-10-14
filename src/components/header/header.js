import React from "react";

const Header = ({ title }) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            Twibet
          </a>
        </div>
      </div>
    </nav>
  );
};

export { Header };
