import log from "loglevel";

import { observable, decorate, action, computed } from "mobx";

import Superfield, { SuperfieldType } from "./models/Superfield";
import CountryField from "./models/CountryField";
import CalendarField from "./models/WeekdayField";

export { SuperfieldType } from "./models/Superfield";

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

	get activeField(): Superfield {
		if (this._fields.has(this.activeSuperfieldType)) {
			return this._fields.get(this.activeSuperfieldType);
		}
		const field = this.createField(this.activeSuperfieldType);
		this._fields.set(this.activeSuperfieldType, field);
		return field;
	}

	createField(type: SuperfieldType): Superfield {
		switch (type) {
			case SuperfieldType.country:
				return new CountryField("en");
			case SuperfieldType.month:
				return new CalendarField("en", SuperfieldType.month);
			case SuperfieldType.weekday:
				return new CalendarField("en", SuperfieldType.weekday);
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
	activeField: computed,
});

const viewModel = new BlockViewModel();

export default viewModel;
