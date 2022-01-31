import React from "react";

import { ReactComponent as Fifty } from "../imgs/50-percent.svg";
import { ReactComponent as Thirty } from "../imgs/30-seconds.svg";
import { ReactComponent as AskAudiance } from "../imgs/ask-audience.svg";

export const Hints = ({
  set50,
  set30SecondsDelay,
  setAudienceAnswers,
  isAskAudienceUsed,
  isFiftyFiftyUsed,
  is30SecondDelayUsed,
}) => {
  return (
    <div className="hints">
      {/* <p >50/50</p> */}
      <Fifty
        className={isFiftyFiftyUsed ? "used" : ""}
        onClick={() => set50()}
      />
      <AskAudiance
        className={isAskAudienceUsed ? "used" : ""}
        onClick={() => setAudienceAnswers()}
      />
      <Thirty
        className={is30SecondDelayUsed ? "used" : ""}
        onClick={() => set30SecondsDelay()}
      />
      {/* <p >Ask audience</p>
      <p >30 sec on the clock</p> */}
    </div>
  );
};
