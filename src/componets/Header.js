import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    //const {branding} = props;

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-info">
        <div className="container">
          <a href="/" className="navbar-brand">
            Bulk SMSER
          </a>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fa fa-home" /> Single
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/bulksms" className="nav-link">
                  <i className="fa fa-plus" /> Bulk
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};


export default Header;