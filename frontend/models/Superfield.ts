import loglevel from "loglevel";
const log = loglevel.getLogger("Superfield");
log.setLevel("debug");
log.debug("Superfield");

import chai from "chai";
const { expect } = chai;

import { observable, action, computed, decorate, toJS } from "mobx";

import { LanguageIdType } from "@phensley/cldr";
import { base, cursor } from "@airtable/blocks";
import { Table, Field, FieldType } from "@airtable/blocks/models";
import { fromPromise, IPromiseBasedObservable } from "mobx-utils";

import languagePackStore from "./LanguagePackStore";

// We use strings for enum values, for easier logging and debugging.
// The value of calendar fields (month and weekday) is used to get data from cldr,
// so don't change it
export enum SuperfieldType {
	country = "country",
	year = "year",
	month = "months",
	weekday = "weekdays",
	time = "time",
}

export enum SubmitStatus {
	// We use antd form validationStatus warning, since it has a more appropiate color
	success = "warning",
	error = "error",
}

export interface Choice {
	name: string;
}

export interface Option extends Choice {
	value: string;
}

export default abstract class Superfield {
	_table: Table;
	activeTableId: string;
	name: string;
	type: FieldType;
	optionsByLanguage: Map<LanguageIdType, Option[]>;
	language: LanguageIdType;
	creator: IPromiseBasedObservable<Field> | null;
	createError: Error | null;

	constructor(language: LanguageIdType, defaultName: string) {
		log.debug("CountryField.constructor, language:", language);
		this._table = null;
		this.activeTableId = cursor.activeTableId;
		this.name = defaultName;
		this.type = FieldType.SINGLE_SELECT;
		this.optionsByLanguage = new Map();
		this.language = language;
		this.creator = null;
		this.createError = null;

		cursor.watch(["activeTableId"], this.onActiveTableIdChange);
	}

	get formValues(): any {
		log.debug("Superfield.formValues");

		return {
			table: this.table ? this.table.id : null,
			name: this.name,
			language: this.language,
		};
	}

	get options(): Option[] {
		log.debug("Superfield.options, language:", this.language);
		let options: Option[] = this.optionsByLanguage.get(this.language);
		if (options) {
			return options;
		}
		const pack = languagePackStore.get(this.language);

		if (!pack.cldr) {
			return [];
		}
		options = this.optionsForLanguage;
		this.optionsByLanguage.set(this.language, options);
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

	create(values): IPromiseBasedObservable<Field> {
		const name = toJS(this.name);
		const type = toJS(this.type);
		const choices = this.options.map((choice) => {
			return { name: choice.name };
		});
		const options = { choices: choices };
		log.debug(
			"Superfield.create, name: ",
			name,
			", type:",
			type,
			", options: ",
			options
		);
		this._table = this.table;
		this.creator = fromPromise(
			this._table.unstable_createFieldAsync(name, type, options)
		);
		this.creator.then(
			() => {},
			(rejectReason: any) => {
				log.error("Superfield.onCreateError, error:", rejectReason);
				this.createError = rejectReason;
			}
		);
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

	reset(): void {
		this._table = null;
		this.creator = null;
		this.createError = null;
	}
}

decorate(Superfield, {
	_table: observable,
	table: computed,
	activeTableId: observable,
	name: observable,
	type: observable,
	options: computed,
	language: observable,
	isCreating: computed,
	creator: observable,
	createError: observable,
	submitStatus: computed,
	submitStatusMessage: computed,
	onValuesChange: action,
	onActiveTableIdChange: action.bound,
	formValues: computed,
	reset: action,
});
