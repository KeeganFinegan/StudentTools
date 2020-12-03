import React from 'react';
import video from '../assets/anim_2.mp4';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-1">
        <div className="home-1-text">
          <h1 className="home-text">Take control of</h1>
          <h1 className="home-text">your learning experience.</h1>
        </div>
      </div>
      <div className="home-2">
        <video src={video} autoPlay loop />
      </div>
      <div className="home-3">
        <h1>_______</h1>
      </div>
    </div>
  );
};

export default Home;
