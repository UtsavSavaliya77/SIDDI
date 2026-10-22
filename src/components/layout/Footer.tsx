import React from 'react';
import { Link } from 'react-router-dom';
import { RollLabel } from '../common/Button';

const groups = [
  {
    title: 'Catalogue',
    links: [
      { label: 'All products', path: '/products' },
      { label: 'Applications', path: '/applications' },
      { label: 'Downloads', path: '/resources' },
    ],
  },
  {
    title: 'Trade',
    links: [
      { label: 'Send a door schedule', path: '/trade-desk' },
      { label: 'Request a quote', path: '/trade-desk' },
      { label: 'About SIDDI', path: '/about' },
    ],
  },
];

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="site-footer__main spec-container">
      <div className="site-footer__brand-block">
        <Link to="/" className="site-footer__brand" aria-label="SIDDI home">
          <img src="/siddi-logo.png" alt="SIDDI" width="1774" height="887" />
        </Link>
        <p>Architectural door hardware and bathroom fittings, made in Rajkot, India.</p>
      </div>
      {groups.map((group) => (
        <div className="site-footer__group" key={group.title}>
          <h2 className="mono-label">{group.title}</h2>
          <ul>
            {group.links.map((link) => (
              <li key={link.label}><Link to={link.path}>{link.label}</Link></li>
            ))}
          </ul>
        </div>
      ))}
      <div className="site-footer__contact">
        <span className="mono-label">Trade desk</span>
        <p>For schedules, samples and project enquiries.</p>
        <Link to="/trade-desk" className="spec-link roll-action"><RollLabel>Contact the trade desk</RollLabel><span aria-hidden="true">→</span></Link>
      </div>
    </div>
    <div className="site-footer__bottom spec-container">
      <span className="mono-label">© {new Date().getFullYear()} SIDDI · Rajkot, India</span>
      <Link to="/privacy">Privacy</Link>
    </div>
  </footer>
);
