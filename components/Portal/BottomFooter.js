import React from "react";

function BottomFooter() {
  return (
    <footer className="mt-5 p-5 border-top bg-lighter">
      <div className="row text-gray-dark text-center">
        <div className="col">
          <small>
            <strong>Disclaimer: </strong>
            The data on this site is curated by a team of volunteers under the umbrella of
            <a href="http://covid19india.org" className="ml-1">Covid19India.org</a> from multiple sources
            including news reports, Twitter posts and official Govt Websites like the
            <a href="https://www.mohfw.gov.in/" className="ml-1">MoFHW</a> site.
          </small>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col text-center">
          <a className="github-button" href="https://github.com/covid19india/CovidCrowd/fork"
             data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-repo-forked"
             data-size="large" data-show-count="true" aria-label="Fork covid19india/CovidCrowd on GitHub">
            Fork on Github
          </a>
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-size="large"
             data-via="covid19indiaorg" data-hashtags="covid19india" data-dnt="true" data-show-count="false">
            Tweet
          </a>
        </div>
      </div>
    </footer>
  );
}

export default BottomFooter;