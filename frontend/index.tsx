import React from "react";
import { initializeBlock, loadCSSFromURLAsync } from "@airtable/blocks/ui";
import SupefieldsBlock from "./SuperfieldsBlock";

loadCSSFromURLAsync(
	"https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.4/antd.min.css"
).then(() =>
	initializeBlock(() => (
		// <SuperblockWrapper>
		<SupefieldsBlock />
		// </SuperblockWrapper>
	))
);
