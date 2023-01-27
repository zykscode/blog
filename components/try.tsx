import React from 'react';

const MyComponent = () => {
  return (
    <div data-version="v1" style={{ '--flex': 1, '--justify-content': 'flex-start', '--align-items': 'stretch' }} className="geist-container">
      <div className="hero_gradient-button-wrapper">
        <span aria-hidden="true" className="hero_button-bg hero_bg-1"></span>
        <span aria-hidden="true" className="hero_button-bg hero_bg-2"></span>
        <span aria-hidden="true" className="hero_button-bg hero_bg-3"></span>
        <a role="button" tabIndex={0} href="/get-a-demo" type="submit" data-testid="landing-page/hero/get-demo-cta" className="button_base__AOyi_ reset_reset__90FTf reset_reset__P0r5z button_button__dmey4 reset_reset__90FTf reset_reset__P0r5z hero_gradient-button__kkwJu button_large__FQLqa button_ghost__sBWMh" data-geist-button="" data-version="v1">
          <span className="button_content__9hWh7">Get a Demo</span>
        </a>
      </div>
    </div>
  );
};

export default MyComponent;
