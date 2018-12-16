import React from 'react';
import CountDown from './CountDown';

const LoadingPage = () => (
  <div className="loader">
    <div> <CountDown /></div>
   <div>
      <img className="loader__image" src="/images/loader.gif" />

   </div>
  </div>
);

export default LoadingPage;
