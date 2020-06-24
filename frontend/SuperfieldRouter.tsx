import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import languagePackStore from "./models/LanguagePackStore";
import viewModel, { SuperfieldType } from "./ViewModel";
import CountryForm from "./superfields/Country";
import Loading from "./LoadingEnglish";
import Superfield from "./models/Superfield";
import CalendarFieldForm from "./superfields/WeekdayForm";
import CalendarField from "./models/WeekdayField";
import YearFieldForm from "./superfields/YearFieldForm";
import YearField from "./models/YearField";

const SuperfieldRouter = observer(() => {
	log.debug(
		"SuperfieldRouter.render, activeSuperfieldType",
		viewModel.activeSuperfieldType
	);

	if (languagePackStore.supportedLanguages.length == 0) {
		return <Loading />;
	}

	const field: Superfield = viewModel.activeField;

	switch (viewModel.activeSuperfieldType) {
		case SuperfieldType.country:
			return <CountryForm field={field} />;
		case SuperfieldType.year:
			return <YearFieldForm field={field as YearField} />;
		case SuperfieldType.month:
			return <CalendarFieldForm field={field as CalendarField} />;
		case SuperfieldType.weekday:
			return <CalendarFieldForm field={field as CalendarField} />;
		default:
			throw new Error(
				`SuperfieldRouter: No superfield editor found for ${viewModel.activeSuperfieldType}`
			);
	}
});

export default SuperfieldRouter;
