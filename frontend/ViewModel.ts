import log from "loglevel";

import { observable, decorate, action, computed } from "mobx";

import Superfield from "./models/Superfield";
import CountryField from "./models/CountryField";
import WeekdayField from "./models/WeekdayField";

// We use strings for enum values, for easier logging and debugging.
export enum SuperfieldType {
	country = "country",
	weekday = "weekday",
}

export class BlockViewModel {
	// showSettings: boolean;
	_fields: Map<SuperfieldType, Superfield>;
	activeSuperfieldType: SuperfieldType;

	constructor() {
		log.debug("BlockViewModel.constructor");
		// this.showSettings = false;
		this._fields = new Map();
		this.activeSuperfieldType = SuperfieldType.country;
	}

	getField(type: SuperfieldType): Superfield {
		if (this._fields.has(type)) {
			return this._fields.get(type);
		}
		const field = this.createField(type);
		this._fields.set(type, field);
		return field;
	}

	createField(type: SuperfieldType): Superfield {
		switch (type) {
			case SuperfieldType.country:
				return new CountryField("en");
			case SuperfieldType.weekday:
				return new WeekdayField("en");
			default:
				throw new Error(
					`BlockViewModel: No view model class exists for ${type}`
				);
		}
	}

	// toggleShowSettings(): void {
	// 	this.showSettings = !this.showSettings;
	// }

	// hideSettings(): void {
	// 	this.showSettings = false;
	// }
}

decorate(BlockViewModel, {
	// showSettings: observable,
	activeSuperfieldType: observable,
});

const viewModel = new BlockViewModel();

export default viewModel;
