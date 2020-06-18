import log from "loglevel";

import { observable, decorate, action, computed } from "mobx";

import CountryField, { Superfield } from "./models/CountryField";

// We use strings for enum values, for easier logging and debugging.
export enum SuperfieldType {
	country = "country",
	dayOfWeek = "dayOfWeek",
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
		const field = new CountryField("en");
		this._fields.set(type, field);
		return field;
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
