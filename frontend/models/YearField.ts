import loglevel from "loglevel";
const log = loglevel.getLogger("YearField");
log.setLevel("info");

import { observable, computed, decorate } from "mobx";

import { LanguageIdType } from "@phensley/cldr";
import Eazyfield, { Option } from "./Eazyfield";

export default class YearField extends Eazyfield {
	firstYear: number;
	lastYear: number;

	constructor(language: LanguageIdType) {
		super(language, "Year", () => {
			return {
				startTime: this.firstYear,
				endTime: this.lastYear,
			};
		});
		this.firstYear = 1920;
		this.lastYear = 2030;
	}

	get options(): Option[] {
		log.debug("YearField.options");

		if (!this.isValid) {
			return [];
		}

		const options = [];
		for (let y = this.firstYear; y <= this.lastYear; y++) {
			options.push({ value: y, name: y.toString() });
		}

		return options;
	}

	get isValid() {
		return (
			typeof this.firstYear == "number" &&
			typeof this.lastYear == "number" &&
			this.firstYear < this.lastYear
		);
	}

	formValidator(): void | Promise<void> {
		log.debug(
			"YearField.formValidator, firstYear:",
			this.firstYear,
			", lastYear:",
			this.lastYear
		);
		if (
			typeof this.firstYear != "number" ||
			typeof this.lastYear != "number" ||
			this.firstYear < this.lastYear
		) {
			return Promise.resolve();
		}
		return Promise.reject("Last year needs to be bigger than first");
	}

	get optionsForLanguage(): Option[] {
		return [];
	}
}

decorate(YearField, {
	firstYear: observable,
	lastYear: observable,
	isValid: computed,
	options: computed,
	optionsForLanguage: computed,
});
