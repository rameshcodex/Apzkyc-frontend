import React from 'react';

function StatsGoogleMap() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509364!2d144.95373631531665!3d-37.81627937975163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f0e613%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1619838125896!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
}

export default StatsGoogleMap;
