import loglevel from "loglevel";
const log = loglevel.getLogger("WeekdayField");
log.setLevel("debug");
log.debug("WeekdayField");

import chai from "chai";
const { expect } = chai;

import { observable, action, computed, decorate } from "mobx";
import * as mobxUtils from "mobx-utils";

import { LanguageIdType, RegionIdType, FieldWidthType } from "@phensley/cldr";
import languagePackStore from "./LanguagePackStore";
import Superfield, { Option } from "./Superfield";

export default class WeekdayField extends Superfield {
	width: FieldWidthType;

	constructor(language: LanguageIdType) {
		super(language);
		this.width = "wide";
	}

	get optionsForLanguage(): Option[] {
		const pack = languagePackStore.get(this.language);
		if (!pack.cldr) {
			return [];
		}
		const calendar = pack.cldr.Calendars;
		const weekdays = calendar.weekdays({ width: this.width });
		const options = [];
		for (const key in weekdays) {
			options.push({ value: key, name: weekdays[key] });
		}

		return options;
	}
}

decorate(WeekdayField, {
	width: observable,
});
