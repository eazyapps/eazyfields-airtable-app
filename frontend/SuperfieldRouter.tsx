import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import languagePackStore from "./models/LanguagePackStore";
import viewModel, { SuperfieldType } from "./ViewModel";
import CountryForm from "./superfields/Country";
import Loading from "./LoadingEnglish";
import Superfield from "./models/Superfield";
import WeekdayField from "./models/WeekdayField";
import WeekdayForm from "./superfields/WeekdayForm";

const SuperfieldRouter = observer(() => {
	log.debug(
		"SuperfieldRouter.render, activeSuperfieldType",
		viewModel.activeSuperfieldType
	);

	if (languagePackStore.supportedLanguages.length == 0) {
		return <Loading />;
	}

	const field: Superfield = viewModel.getField(viewModel.activeSuperfieldType);

	switch (viewModel.activeSuperfieldType) {
		case SuperfieldType.country:
			return <CountryForm field={field} />;
		case SuperfieldType.weekday:
			return <WeekdayForm field={field} />;
		default:
			throw new Error(
				`SuperfieldRouter: No superfield editor found for ${viewModel.activeSuperfieldType}`
			);
	}
});

export default SuperfieldRouter;
