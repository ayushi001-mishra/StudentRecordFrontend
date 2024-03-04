import React from 'react';

const Footer = ({ data }) => {

  const shouldSetStaticPosition = data.length > 5;

  return (
    <div className={`footer ${shouldSetStaticPosition ? 'static' : ''}`}>
      <div className="footer-content">
        <p>&copy; Alletec. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;


