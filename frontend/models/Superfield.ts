import loglevel from "loglevel";
const log = loglevel.getLogger("Superfield");
log.setLevel("debug");
log.debug("Superfield");

import chai from "chai";
const { expect } = chai;

import { observable, action, computed, decorate, toJS } from "mobx";

import { LanguageIdType } from "@phensley/cldr";
import Table from "@airtable/blocks/dist/types/src/models/table";
import { base, cursor } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import { fromPromise } from "mobx-utils";

import languagePackStore from "./LanguagePackStore";

export enum SubmitStatus {
	// We use antd form validationStatus warning, since it has a more appropiate color
	success = "warning",
	error = "error",
}

export interface Option {
	value: string;
	name: string;
}

export interface Choice {
	name: string;
}

export default abstract class Superfield {
	_table: Table;
	activeTableId: string;
	name: string;
	type: FieldType;
	optionsByLanguage: Map<LanguageIdType, Option[]>;
	choices: Choice[] | null;
	language: LanguageIdType;
	creator: Promise<void> | null;
	createError: Error | null;

	constructor(language: LanguageIdType) {
		log.debug("CountryField.constructor, language:", language);
		this._table = null;
		this.activeTableId = cursor.activeTableId;
		this.name = null;
		this.type = FieldType.SINGLE_SELECT;
		this.optionsByLanguage = new Map();
		this.choices = null;
		this.language = language;
		this.creator = null;
		this.createError = null;

		cursor.watch(["activeTableId"], this.onActiveTableIdChange);
	}

	get options(): Option[] {
		log.debug("Superfield.options get, language:", this.language);
		let options: Option[] = this.optionsByLanguage.get(this.language);
		if (options) {
			this.choices = options;
			return options;
		}
		const pack = languagePackStore.get(this.language);
		log.debug("Superfield.options, pack.loadingStatus:", pack.loadingStatus);
		log.debug("Superfield.options, pack.isLoaded:", pack.isLoaded);

		if (!pack.cldr) {
			return [];
		}
		options = this.optionsForLanguage;
		this.optionsByLanguage.set(this.language, options);
		this.choices = options;
		return options;
	}

	abstract get optionsForLanguage(): Option[];

	onActiveTableIdChange(): void {
		log.debug("Superfield.onActiveTableIdChange");
		this.activeTableId = cursor.activeTableId;
	}

	get table(): Table {
		log.debug("Superfield.table get");
		if (this._table) {
			return this._table;
		}
		if (this.activeTableId) {
			const table = base.getTableById(cursor.activeTableId);
			log.debug("Superfield.table get, activeTable:", table.name);
			return table;
		}
		return null;
	}

	set table(table: Table) {
		this._table = table;
	}

	create(values): Promise<void> {
		const name = toJS(this.name);
		const type = toJS(this.type);
		const choices = toJS(this.choices).map((choice) => {
			return { name: choice.name };
		});
		const options = { choices: choices };
		log.debug(
			"Superfield.create, name: ",
			name,
			", type:",
			type,
			", options: ",
			options,
			", choices: ",
			choices
		);
		this._table = this.table;
		this.creator = fromPromise(
			this._table.unstable_createFieldAsync(name, type, options)
		);
		this.creator.catch((e) => {
			log.error("Superfield.onCreateError, error:", e);
			this.createError = e;
		});
		return this.creator;
	}

	get isCreating(): boolean {
		const value: boolean =
			this.creator != null && this.creator.state == "pending";
		log.debug("Superfield.isCreating:", value);
		return value;
	}

	get submitStatus(): SubmitStatus {
		if (!this.creator) {
			return null;
		}
		switch (this.creator.state) {
			case "fulfilled":
				return SubmitStatus.success;
			case "rejected":
				return SubmitStatus.error;
		}
		return null;
	}

	get submitStatusMessage(): string | null {
		if (!this.submitStatus) {
			return null;
		}
		switch (this.submitStatus) {
			case SubmitStatus.success:
				return `Successfully created the ${this.name} field in the ${this._table.name} table`;
			case SubmitStatus.error:
				return `Something went wrong. Please try again. If the problem persists, please contact support@superblocks.at`;
		}
	}

	// Reset so that we don't see the submit status message
	onValuesChange(changedValues, allValues): void {
		if (this.submitStatus != null) {
			this.creator = null;
			this.createError = null;
		}
	}
}

decorate(Superfield, {
	_table: observable,
	table: computed,
	activeTableId: observable,
	name: observable,
	type: observable,
	choices: observable,
	options: computed,
	language: observable,
	isCreating: computed,
	creator: observable,
	createError: observable,
	submitStatus: computed,
	submitStatusMessage: computed,
	onValuesChange: action,
	onActiveTableIdChange: action.bound,
});
