import log from "loglevel";
log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import languagePackStore from "./models/LanguagePackStore";
import viewModel, { SuperfieldType } from "./BlockViewModel";
import CountryForm from "./superfields/CountryForm";
import Loading from "./Loading";
import Superfield from "./models/Superfield";
import CalendarFieldForm from "./superfields/CalendarFieldForm";
import CalendarField from "./models/CalendarField";
import YearFieldForm from "./superfields/YearFieldForm";
import YearField from "./models/YearField";
import TimeFieldForm from "./superfields/TimeFieldForm";
import TimeField from "./models/TimeField";

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
		case SuperfieldType.time:
			return <TimeFieldForm field={field as TimeField} />;
		default:
			throw new Error(
				`SuperfieldRouter: No superfield editor found for ${viewModel.activeSuperfieldType}`
			);
	}
});

export default SuperfieldRouter;
