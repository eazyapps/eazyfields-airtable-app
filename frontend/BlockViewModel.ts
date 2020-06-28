import log from "loglevel";

import { observable, decorate, autorun, computed } from "mobx";

import Superfield, { SuperfieldType } from "./models/Superfield";
import CountryField from "./models/CountryField";
import CalendarField from "./models/CalendarField";
import YearField from "./models/YearField";
import TimeField from "./models/TimeField";
import { globalConfig } from "@airtable/blocks";
import { LanguageIdType } from "@phensley/cldr";

export { SuperfieldType } from "./models/Superfield";

export class BlockViewModel {
	_fields: Map<SuperfieldType, Superfield>;
	activeSuperfieldType: SuperfieldType;
	activeLanguageSaver: null | Function;

	constructor() {
		log.debug("BlockViewModel.constructor");
		this._fields = new Map();
		this.activeSuperfieldType = SuperfieldType.country;
		this.activeLanguageSaver = null;
	}

	get activeField(): Superfield {
		let field = this._fields.get(this.activeSuperfieldType);
		if (!field) {
			field = this.createField(this.activeSuperfieldType);
			this._fields.set(this.activeSuperfieldType, field);
		}
		const activeLanguage = globalConfig.get([
			"config",
			"activeLanguage",
		]) as LanguageIdType;
		if (activeLanguage) {
			field.language = activeLanguage;
		}
		return field;
	}

	createField(type: SuperfieldType): Superfield {
		switch (type) {
			case SuperfieldType.country:
				return new CountryField("en");
			case SuperfieldType.year:
				return new YearField("en");
			case SuperfieldType.month:
				return new CalendarField("en", SuperfieldType.month);
			case SuperfieldType.weekday:
				return new CalendarField("en", SuperfieldType.weekday);
			case SuperfieldType.time:
				return new TimeField("en");
			default:
				throw new Error(
					`BlockViewModel: No view model class exists for ${type}`
				);
		}
	}
}

decorate(BlockViewModel, {
	activeSuperfieldType: observable,
	activeField: computed,
});

const viewModel = new BlockViewModel();

viewModel.activeLanguageSaver = autorun(() => {
	globalConfig.setAsync(
		["config", "activeLanguage"],
		viewModel.activeField.language
	);
});

export default viewModel;
