import React from "react";
import { initializeBlock, loadCSSFromURLAsync } from "@airtable/blocks/ui";
import EazyfieldsBlock from "./EazyfieldsBlock";

loadCSSFromURLAsync(
	"https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.4/antd.min.css"
).then(() =>
	initializeBlock(() => (
		// <SuperblockWrapper>
		<EazyfieldsBlock />
		// </SuperblockWrapper>
	))
);
