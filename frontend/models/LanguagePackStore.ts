import loglevel from "loglevel";
const log = loglevel.getLogger("LanguagePackStore");
log.setLevel("debug");
log.debug("LanguagePackStore");

import chai from "chai";
const { expect } = chai;

import { decorate, observable, computed, action } from "mobx";
import { fromPromise } from "mobx-utils";

import { CLDRFramework, LanguageIdType, CLDR } from "@phensley/cldr";
import bent from "bent";

export const SupportedLanguages: LanguageIdType[] = ["en", "es"];

const packurl = `https://cdn.jsdelivr.net/npm/@phensley/cldr@1.2.0/packs`;

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
	loader: Promise<any>;

	constructor(code: LanguageIdType) {
		log.debug("LanguagePack.constructor");
		this.code = code;
		this.loader = fromPromise(getJSON(`${packurl}/${code}.json`)) as any;
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

		this.supportedLanguages = SupportedLanguages.map((code) => {
			return {
				value: code,
				name: generalCLDR.getLanguageDisplayName(code),
			};
		});
	}
}

decorate(LanguagePackStore, {
	supportedLanguages: observable,
});

const store = new LanguagePackStore();

export default store;
