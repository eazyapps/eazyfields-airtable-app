import loglevel from "loglevel";
const log = loglevel.getLogger("CountryField");
log.setLevel("debug");
log.debug("CountryField");

import chai from "chai";
const { expect } = chai;

import countryList from "country-list";

import { observable, action, computed, decorate } from "mobx";
import * as mobxUtils from "mobx-utils";

import { LanguageIdType, RegionIdType } from "@phensley/cldr";
import languagePackStore from "./LanguagePackStore";
import Superfield, { Option } from "./Superfield";

export interface CountryInfo extends Option {
	value: RegionIdType;
	name: string;
}

export default class CountryField extends Superfield {
	countryCodes: [];

	constructor(language: LanguageIdType) {
		super(language);
		this.countryCodes = countryList.getCodes();
	}

	get optionsForLanguage(): Option[] {
		const pack = languagePackStore.get(this.language);
		if (!pack.cldr) {
			return [];
		}
		const generalCLDR = pack.cldr.General;
		const options = this.countryCodes.map((code) => {
			return {
				value: code,
				name: generalCLDR.getRegionDisplayName(code),
			};
		});
		options.sort(this.compareFunction);
		return options;
	}

	compareFunction(a: CountryInfo, b: CountryInfo): number {
		return a.name.localeCompare(b.name);
	}

	get time(): number {
		return mobxUtils.now();
	}
}

decorate(CountryField, {
	optionsForLanguage: computed,
	time: computed,
});
