import loglevel from "loglevel";
const log = loglevel.getLogger("CalendarField");
log.setLevel("info");

// import chai from "chai";
// const { expect } = chai;

import { observable, computed, decorate } from "mobx";

import { LanguageIdType, FieldWidthType } from "@phensley/cldr";
import languagePackStore from "./LanguagePackStore";
import Eazyfield, { EazyfieldType, Option } from "./Eazyfield";

const widths: FieldWidthType[] = ["wide", "abbreviated", "short", "narrow"];

export default class CalendarField extends Eazyfield {
	width: FieldWidthType;
	eazyfieldType: EazyfieldType;

	constructor(language: LanguageIdType, eazyfieldType: EazyfieldType) {
		super(
			language,
			eazyfieldType == EazyfieldType.month ? "Month" : "Day",
			() => {
				return this.width;
			}
		);
		this.width = "wide";
		this.eazyfieldType = eazyfieldType;
	}

	get widthOptions(): Option[] {
		log.debug("CalendarField.formatOptions");
		const pack = languagePackStore.get(this.language);
		if (!pack.cldr) {
			return [];
		}
		const calendar = pack.cldr.Calendars;
		const widthOptions = widths.map((width) => {
			const names = calendar[this.eazyfieldType]({
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
		const names = calendar[this.eazyfieldType]({
			width: this.width,
			context: "standalone",
		});
		const options = [];
		for (const key in names) {
			options.push({ value: key, name: names[key] });
		}
		return options;
	}

	get optionsForLanguage(): Option[] {
		const pack = languagePackStore.get(this.language);
		if (!pack.cldr) {
			return [];
		}
		const calendar = pack.cldr.Calendars;
		const names = calendar[this.eazyfieldType]({
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
});
