import loglevel from "loglevel";
const log = loglevel.getLogger("EazyfieldRouter");
// log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import languagePackStore from "./models/LanguagePackStore";
import viewModel, { EazyfieldType } from "./BlockViewModel";
import CountryForm from "./eazyfields/CountryForm";
import Loading from "./Loading";
import Eazyfield from "./models/Eazyfield";
import CalendarFieldForm from "./eazyfields/CalendarFieldForm";
import CalendarField from "./models/CalendarField";
import YearFieldForm from "./eazyfields/YearFieldForm";
import YearField from "./models/YearField";
import TimeFieldForm from "./eazyfields/TimeFieldForm";
import TimeField from "./models/TimeField";

const EazyfieldRouter = observer(() => {
	log.debug(
		"EazyfieldRouter.render, activeEazyfieldType",
		viewModel.activeEazyfieldType
	);

	if (languagePackStore.supportedLanguages.length == 0) {
		return <Loading />;
	}

	const field: Eazyfield = viewModel.activeField;

	switch (viewModel.activeEazyfieldType) {
		case EazyfieldType.country:
			return <CountryForm field={field} />;
		case EazyfieldType.year:
			return <YearFieldForm field={field as YearField} />;
		case EazyfieldType.month:
			return <CalendarFieldForm field={field as CalendarField} />;
		case EazyfieldType.weekday:
			return <CalendarFieldForm field={field as CalendarField} />;
		case EazyfieldType.time:
			return <TimeFieldForm field={field as TimeField} />;
		default:
			throw new Error(
				`EazyfieldRouter: No eazyfield editor found for ${viewModel.activeEazyfieldType}`
			);
	}
});

export default EazyfieldRouter;
