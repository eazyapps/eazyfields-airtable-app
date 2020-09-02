import log from "loglevel";

import { observable, decorate, autorun, computed } from "mobx";

import Eazyfield, { EazyfieldType } from "./models/Eazyfield";
import CountryField from "./models/CountryField";
import CalendarField from "./models/CalendarField";
import YearField from "./models/YearField";
import TimeField from "./models/TimeField";
import { globalConfig } from "@airtable/blocks";
import { LanguageIdType } from "@phensley/cldr";

export { EazyfieldType } from "./models/Eazyfield";

export class BlockViewModel {
	_fields: Map<EazyfieldType, Eazyfield>;
	activeEazyfieldType: EazyfieldType;
	activeLanguageSaver: null | Function;
	showHelp: boolean;

	constructor() {
		log.debug("BlockViewModel.constructor");
		this._fields = new Map();
		this.activeEazyfieldType = EazyfieldType.country;
		this.activeLanguageSaver = null;
		this.showHelp =
			(globalConfig.get(["config", "notFirstRun"]) as boolean) !== true;
		if (this.showHelp) {
			globalConfig.setAsync(["config", "notFirstRun"], true);
		}
		// this.showHelp = true;
	}

	get activeField(): Eazyfield {
		let field = this._fields.get(this.activeEazyfieldType);
		if (!field) {
			field = this.createField(this.activeEazyfieldType);
			this._fields.set(this.activeEazyfieldType, field);
		}
		field.reset();

		const activeLanguage = globalConfig.get([
			"config",
			"activeLanguage",
		]) as LanguageIdType;
		if (activeLanguage) {
			field.language = activeLanguage;
		}
		return field;
	}

	createField(type: EazyfieldType): Eazyfield {
		switch (type) {
			case EazyfieldType.country:
				return new CountryField("en");
			case EazyfieldType.year:
				return new YearField("en");
			case EazyfieldType.month:
				return new CalendarField("en", EazyfieldType.month);
			case EazyfieldType.weekday:
				return new CalendarField("en", EazyfieldType.weekday);
			case EazyfieldType.time:
				return new TimeField("en");
			default:
				throw new Error(
					`BlockViewModel: No view model class exists for ${type}`
				);
		}
	}
}

decorate(BlockViewModel, {
	activeEazyfieldType: observable,
	activeField: computed,
	showHelp: observable,
});

const viewModel = new BlockViewModel();

viewModel.activeLanguageSaver = autorun(() => {
	globalConfig.setAsync(
		["config", "activeLanguage"],
		viewModel.activeField.language
	);
});

export default viewModel;
