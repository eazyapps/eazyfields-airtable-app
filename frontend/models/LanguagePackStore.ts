import loglevel from "loglevel";
const log = loglevel.getLogger("LanguagePackStore");
log.setLevel("debug");

import chai from "chai";
const { expect } = chai;

import { decorate, observable } from "mobx";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import { CLDRFramework, LanguageIdType, CLDR } from "@phensley/cldr";
import bent from "bent";
import { Option } from "./Eazyfield";

export const SupportedLanguages: LanguageIdType[] = [
	"en",
	"af",
	"am",
	"ar",
	"as",
	"az",
	"be",
	"bg",
	"bn",
	"bs",
	"ca",
	"cs",
	"cy",
	"da",
	"de",
	"el",
	"es",
	"et",
	"eu",
	"fa",
	"fi",
	"fil",
	"fr",
	"ga",
	"gl",
	"gu",
	"he",
	"hi",
	"hr",
	"hu",
	"hy",
	"id",
	"is",
	"it",
	"ja",
	"jv",
	"ka",
	"kk",
	"km",
	"kn",
	"ko",
	"ky",
	"lo",
	"lt",
	"lv",
	"mk",
	"ml",
	"mn",
	"mr",
	"ms",
	"my",
	"nb",
	"ne",
	"nl",
	"or",
	"pa",
	"pl",
	"ps",
	"pt",
	"ro",
	"ru",
	"sd",
	"si",
	"sk",
	"sl",
	"so",
	"sq",
	"sr",
	"sv",
	"sw",
	"ta",
	"te",
	"th",
	"tk",
	"tr",
	"uk",
	"ur",
	"uz",
	"vi",
	"yue",
	"zh",
	"zu",
];

const packurl = `https://cdn.jsdelivr.net/npm/@phensley/cldr@1.2.1/packs`;

export enum LoadingStatus {
	pending = "pending",
	fulfilled = "fulfilled",
	rejected = "rejected",
}

export interface LanguageInfo {
	value: LanguageIdType;
	name: string;
}

// export interface LanguagePackStore {
// 	supportedLanguages: LanguageInfo[];
// 	packs: Map<LanguageIdType, LanguagePack>;
// 	get(code: LanguageIdType): LanguagePack;
// 	_loader(language: LanguageIdType): object;
// 	framework?: CLDRFramework;
// 	onEnglishLoaded(): void;
// }

const getJSON = bent("GET", "json", 200);

export class LanguagePack {
	code: LanguageIdType;
	json: object;
	cldr: CLDR;
	loader: IPromiseBasedObservable<any> | null;

	constructor(code: LanguageIdType) {
		log.debug("LanguagePack.constructor");
		this.code = code;
		this.loader = fromPromise(getJSON(`${packurl}/${code}.json`));
		this.loader.then(this.onLoaded.bind(this));
	}

	get loadingStatus() {
		return this.loader.state;
	}

	get isLoaded() {
		return this.loadingStatus == LoadingStatus.fulfilled;
	}

	onLoaded(json) {
		log.debug("LanguagePack.onLoaded, json:", json);
		this.json = json;
	}
}

decorate(LanguagePack, {
	json: observable,
	cldr: observable,
});

export class LanguagePackStore {
	supportedLanguages: LanguageInfo[];
	packs: Map<LanguageIdType, LanguagePack>;
	framework: CLDRFramework;

	constructor() {
		log.debug("LanguagePackStore.constructor");
		this.supportedLanguages = [];
		this.packs = new Map();
		this.framework = new CLDRFramework({
			loader: this._loader.bind(this),
		});
		this.get("en").loader.then(this.onEnglishLoaded.bind(this));
	}

	get(code: LanguageIdType): LanguagePack {
		if (this.packs.has(code)) {
			return this.packs.get(code);
		}
		const pack: LanguagePack = new LanguagePack(code);
		pack.loader.then(() => {
			log.debug("LanguagePackStore.get, onLoaded");
			pack.cldr = this.framework.get(code);
		});
		this.packs.set(code, pack);
		return pack;
	}

	// Fetch the language resource pack for this version.
	_loader(code: LanguageIdType): object {
		log.debug("LanguagePackStore._loader, code:", code);
		const pack = this.packs.get(code);
		expect(pack).to.be.ok;
		log.debug("LanguagePackStore._loader, pack:", pack);
		return pack.json;
	}

	onEnglishLoaded() {
		log.debug("LanguagePackStore.onEnglishLoaded");
		const generalCLDR = this.get("en").cldr.General;

		// Since it's not an action, we first sort and then set the obserable
		const languageOptions = SupportedLanguages.map((code) => {
			return {
				value: code,
				name: generalCLDR.getLanguageDisplayName(code),
			};
		});

		languageOptions.sort(this.compareFunction);

		this.supportedLanguages = languageOptions;
	}

	compareFunction(a: Option, b: Option): number {
		return a.name.localeCompare(b.name);
	}
}

decorate(LanguagePackStore, {
	supportedLanguages: observable,
});

const store = new LanguagePackStore();

export default store;
