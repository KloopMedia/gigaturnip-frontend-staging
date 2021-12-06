import React from "react";
import {CampaignContext} from "../../pages/campaigns/Campaigns";

export const useCampaign = () => React.useContext(CampaignContext);