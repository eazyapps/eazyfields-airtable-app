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

export interface CountryInfo {
	code: RegionIdType;
	displayName: string;
}

export interface Superfield {}

export default class CountryField implements Superfield {
	language: LanguageIdType;
	countriesByLanguage: Map<LanguageIdType, CountryInfo[]>;
	countryCodes: [];

	constructor(language: LanguageIdType) {
		log.debug("CountryField.constructor, language:", language);
		this.language = language;
		this.countriesByLanguage = new Map();
		this.countryCodes = countryList.getCodes();
	}

	get countries(): CountryInfo[] {
		log.debug("CountryField.countries, language:", this.language);
		if (this.countriesByLanguage.has(this.language)) {
			return this.countriesByLanguage.get(this.language);
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
		const countries: CountryInfo[] = this.countryCodes.map((code) => {
			return {
				code: code,
				displayName: generalCLDR.getRegionDisplayName(code),
			};
		});
		this.countriesByLanguage.set(this.language, countries);
		return countries;
	}

	get time(): number {
		return mobxUtils.now();
	}

	onLanguageChange(language) {
		log.debug("CountryField.onLanguageChange, language:", language);
		this.language = language;
	}
}

decorate(CountryField, {
	language: observable,
	countries: computed,
	time: computed,
	onLanguageChange: action.bound,
});
