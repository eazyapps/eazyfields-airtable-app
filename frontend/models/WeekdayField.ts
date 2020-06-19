import loglevel from "loglevel";
const log = loglevel.getLogger("CalendarField");
log.setLevel("debug");
log.debug("CalendarField");

import chai from "chai";
const { expect } = chai;

import { observable, action, computed, decorate } from "mobx";

import { LanguageIdType, FieldWidthType } from "@phensley/cldr";
import languagePackStore from "./LanguagePackStore";
import Superfield, { SuperfieldType, Option } from "./Superfield";

const widths: FieldWidthType[] = ["wide", "abbreviated", "short", "narrow"];

export default class CalendarField extends Superfield {
	width: FieldWidthType;
	superfieldType: SuperfieldType;

	constructor(language: LanguageIdType, SuperfieldType: SuperfieldType) {
		super(language);
		this.width = "wide";
		this.superfieldType = SuperfieldType;
	}

	get calendarFieldFormValues(): any {
		log.debug("CalendarField.calendarFieldFormValues");

		return {
			width: this.width,
			...this.formValues,
		};
	}

	get widthOptions(): Option[] {
		log.debug("CalendarField.formatOptions");
		const pack = languagePackStore.get(this.language);
		if (!pack.cldr) {
			return [];
		}
		const calendar = pack.cldr.Calendars;
		const widthOptions = widths.map((width) => {
			const names = calendar[this.superfieldType]({
				width: width,
				context: "standalone",
			});
			return {
				value: width,
				name: `${names["1"]}, ${names["2"]}, ...`,
			};
		});
		return widthOptions;
	}

	get options(): Option[] {
		log.debug("CalendarField.options");
		const pack = languagePackStore.get(this.language);
		if (!pack.cldr) {
			return [];
		}
		const calendar = pack.cldr.Calendars;
		const names = calendar[this.superfieldType]({
			width: this.width,
			context: "standalone",
		});
		const options = [];
		for (const key in names) {
			options.push({ value: key, name: names[key] });
		}
		this.choices = options;
		return options;
	}

	get optionsForLanguage(): Option[] {
		const pack = languagePackStore.get(this.language);
		if (!pack.cldr) {
			return [];
		}
		const calendar = pack.cldr.Calendars;
		const names = calendar[this.superfieldType]({
			width: this.width,
			context: "standalone",
		});
		const options = [];
		for (const key in names) {
			options.push({ value: key, name: names[key] });
		}

		return options;
	}
}

decorate(CalendarField, {
	width: observable,
	options: computed,
	widthOptions: computed,
	calendarFieldFormValues: computed,
});
