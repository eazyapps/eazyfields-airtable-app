import loglevel from "loglevel";
const log = loglevel.getLogger("TimeField");
// log.setLevel("debug");

import moment, { Moment } from "moment";

import { observable, computed, decorate } from "mobx";

import { LanguageIdType } from "@phensley/cldr";
import Eazyfield, { Option } from "./Eazyfield";

export default class TimeField extends Eazyfield {
	// In minutes from midnight
	startTime: Moment;
	endTime: Moment;
	// In minutes
	gap: number;

	constructor(language: LanguageIdType) {
		super(language, "Time", () => {
			return {
				startTime: this.startTime,
				endTime: this.endTime,
				gap: this.gap,
			};
		});
		this.startTime = moment.utc("08:00", "HH:mm");
		this.endTime = moment.utc("17:00", "HH:mm");
		this.gap = 30;
	}

	get options(): Option[] {
		log.debug("TimeField.options");

		if (!this.isValid) {
			return [];
		}

		const options = [];
		for (
			let time = moment.utc(this.startTime);
			time.isSameOrBefore(this.endTime);
			time.add(this.gap, "minutes")
		) {
			const timeString = time.format("HH:mm");
			options.push({ value: timeString, name: timeString });
		}

		return options;
	}

	get isValid() {
		return this.startTime.isBefore(this.endTime) && typeof this.gap == "number";
	}

	get optionsForLanguage(): Option[] {
		return [];
	}
}

decorate(TimeField, {
	startTime: observable,
	endTime: observable,
	gap: observable,
	isValid: computed,
	options: computed,
	optionsForLanguage: computed,
});
