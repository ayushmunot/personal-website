import React, {Suspense, setState} from "react";
import "./twitter.css";
import Loading from "../loading/Loading";
import {TwitterTimelineEmbed} from "react-twitter-embed";
import { twitterDetails } from "../../portfolio";

const renderLoader = () => <Loading />;
const cantDisplayError = "<div class='centerContent'><h2>Can't load? Check privacy protection settings</h2></div>";

function timeOut(){
  setTimeout(function() {
    if (!(document.getElementById('twitter').innerHTML.includes('iframe'))){
      document.getElementById('twitter').innerHTML = cantDisplayError ;
    }
  },
  10000);
}
var widthScreen=(window.screen.width*0.5);
export default function Twitter() {
	if (twitterDetails.userName) {
		return (
        <Suspense fallback={renderLoader()}>
          <div class="tw-main-div" id="twitter">       
                  <div className="centerContent">
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName ={ twitterDetails.userName }
                    options={{height:400, width: '50%'}}
                    placeholder={renderLoader()}
                    autoHeight= {false}
                    borderColor= "#F44336"
                    noFooter= {true}
                    onload= {timeOut()}
                    theme={'dark'}
                  />
                  </div>
          </div>
        </Suspense>
  );  
	} else {  
		return null;
	}
}