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
import Superfield from "./Superfield";

export interface CountryInfo {
	value: RegionIdType;
	name: string;
}

export default class CountryField extends Superfield {
	countriesByLanguage: Map<LanguageIdType, CountryInfo[]>;
	countryCodes: [];

	constructor(language: LanguageIdType) {
		super(language);
		this.countriesByLanguage = new Map();
		this.countryCodes = countryList.getCodes();
	}

	get countries(): CountryInfo[] {
		log.debug("CountryField.countries, language:", this.language);
		let countries: CountryInfo[] = this.countriesByLanguage.get(this.language);
		if (countries) {
			this.options = { choices: countries };
			return countries;
		}
		const pack = languagePackStore.get(this.language);
		log.debug(
			"CountryField.countries, pack.loadingStatus:",
			pack.loadingStatus
		);
		log.debug("CountryField.countries, pack.isLoaded:", pack.isLoaded);

		if (!pack.cldr) {
			return [];
		}
		const generalCLDR = languagePackStore.get(this.language).cldr.General;
		countries = this.countryCodes.map((code) => {
			return {
				value: code,
				name: generalCLDR.getRegionDisplayName(code),
			};
		});
		countries.sort(this.compareFunction);
		this.countriesByLanguage.set(this.language, countries);
		this.options = { choices: countries };
		return countries;
	}

	compareFunction(a: CountryInfo, b: CountryInfo): number {
		return a.name.localeCompare(b.name);
	}

	get time(): number {
		return mobxUtils.now();
	}
}

decorate(CountryField, {
	countries: computed,
	time: computed,
});
