import log from "loglevel";

import { observable, action, computed } from "mobx";

import { CLDRFramework, LanguageIdType } from "@phensley/cldr";
import CountryField, { Superfield } from "./models/CountryField";

export const SupportedLanguages = ["en", "es"];

// We use strings for enum values, for easier logging and debugging.
export enum SuperfieldType {
	country = "country",
	dayOfWeek = "dayOfWeek",
}

export interface BlockViewModel {
	showSettings: boolean;
	_fields: Map<SuperfieldType, Superfield>;
	getField(type: SuperfieldType): Superfield;
	toggleShowSettings(): void;
	hideSettings(): void;
	activeSuperfieldType: SuperfieldType;
}

// We can't use a class for the ViewModel since mobx class decorations don't work for some reason inside blocks,
// not even by calling decorate on the class prototype.
// So we workaround this by creating a pojo and decorating it instead.
const createBlockViewModel = () => {
	log.debug("createBlockViewModel");

	const vm = {
		showSettings: true,
		_fields: new Map(),
		activeSuperfieldType: SuperfieldType.country,

		getField(type: SuperfieldType): Superfield {
			if (this._fields.has(type)) {
				return this._fields.get(type);
			}
			const field = new CountryField("en");
			this._fields.set(type, field);
			return field;
		},

		toggleShowSettings(): void {
			this.showSettings = !this.showSettings;
		},

		hideSettings(): void {
			this.showSettings = false;
		},
	};

	return observable(vm, {
		showSettings: observable,
		activeSuperfieldType: observable,
	});
};

const viewModel = createBlockViewModel();

export default viewModel;
