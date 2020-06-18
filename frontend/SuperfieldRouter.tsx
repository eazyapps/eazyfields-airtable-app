import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import viewModel, { SuperfieldType } from "./ViewModel";
import Country from "./superfields/Country";

const SuperfieldRouter = observer(() => {
	log.debug(
		"SuperfieldRouter.render, activeSuperfieldType",
		viewModel.activeSuperfieldType
	);

	switch (viewModel.activeSuperfieldType) {
		case SuperfieldType.country:
			return <Country />;
		default:
			throw new Error(
				`SuperfieldRouter: No superfield editor found for ${viewModel.activeSuperfieldType}`
			);
	}
});

export default SuperfieldRouter;
