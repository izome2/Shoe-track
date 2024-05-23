import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <video className="logo-video" autoPlay loop muted style={{ marginRight: '200px' }}>
        <source src="src/assets/video/logooo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SplashScreen;

const styles = `
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 9999;
    opacity: 1;
    transition: opacity 3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .splash-screen.fade-out {
    opacity: 0;
    pointer-events: none;
  }

  .logo-video {
    width: 80vw; 
    height: 80vh; 
    max-width: 400px;
    max-height: 400px;
  }

  @media (max-width: 768px) {
    .logo-video {
      width: 90vw; 
      height: 70vh; 
      margin-right: 0;
      max-width: none;
      max-height: none;
    }
  }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
