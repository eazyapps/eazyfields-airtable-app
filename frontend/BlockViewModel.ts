import log from "loglevel";

import { observable, decorate, autorun, reaction, action } from "mobx";

import Eazyfield, { EazyfieldType } from "./models/Eazyfield";
import CountryField from "./models/CountryField";
import CalendarField from "./models/CalendarField";
import YearField from "./models/YearField";
import TimeField from "./models/TimeField";
import { base, globalConfig } from "@airtable/blocks";
import { LanguageIdType } from "@phensley/cldr";

export { EazyfieldType } from "./models/Eazyfield";

export class BlockViewModel {
	_fields: Map<EazyfieldType, Eazyfield>;
	activeEazyfieldType: EazyfieldType;
	activeField: Eazyfield;
	activeLanguageSaver: null | Function;
	showHelp: boolean;
	hasPermissions: boolean;

	constructor() {
		log.debug("BlockViewModel.constructor");
		this.hasPermissions = base.hasPermissionToCreateTable();
		if (!this.hasPermissions) {
			this.showHelp = false;
			return;
		}
		this._fields = new Map();
		this.activeEazyfieldType = EazyfieldType.country;
		this.activeLanguageSaver = null;
		this.showHelp =
			(globalConfig.get(["config", "notFirstRun"]) as boolean) !== true;
		if (this.showHelp) {
			globalConfig.setAsync(["config", "notFirstRun"], true);
		}
		reaction(
			() => {
				return this.activeEazyfieldType;
			},
			this.fieldTypeChangedReaction,
			{ fireImmediately: true }
		);
		// this.showHelp = true;
	}

	fieldTypeChangedReaction(fieldType: EazyfieldType) {
		this.activeField = this._fields.get(fieldType);
		if (!this.activeField) {
			this.activeField = this.createField(fieldType);
			this._fields.set(this.activeEazyfieldType, this.activeField);
			const activeLanguage = globalConfig.get([
				"config",
				"activeLanguage",
			]) as LanguageIdType;
			if (activeLanguage) {
				this.activeField.language = activeLanguage;
			}
		} else {
			this.activeField.reset();
		}
	}

	// TODO reaction for this
	// } else {
	// field.reset();

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
	activeField: observable,
	showHelp: observable,
	fieldTypeChangedReaction: action.bound,
});

const viewModel = new BlockViewModel();

viewModel.activeLanguageSaver = autorun(() => {
	globalConfig.setAsync(
		["config", "activeLanguage"],
		viewModel.activeField.language
	);
});

export default viewModel;
