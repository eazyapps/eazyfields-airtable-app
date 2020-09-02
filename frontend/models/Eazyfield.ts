import loglevel from "loglevel";
const log = loglevel.getLogger("Eazyfield");
log.setLevel("debug");

// import chai from "chai";
// const { expect } = chai;

import { observable, action, computed, decorate, toJS, flow } from "mobx";

import { LanguageIdType } from "@phensley/cldr";
import { base, cursor } from "@airtable/blocks";
import { Table, FieldType } from "@airtable/blocks/models";

import languagePackStore from "./LanguagePackStore";

// We use strings for enum values, for easier logging and debugging.
// The value of calendar fields (month and weekday) is used to get data from cldr,
// so don't change it
export enum EazyfieldType {
	country = "country",
	year = "year",
	month = "months",
	weekday = "weekdays",
	time = "time",
}

export enum ValidateStatus {
	// We use antd form validationStatus warning, since it has a more appropriate color
	success = "success",
	error = "error",
}

export interface Choice {
	name: string;
}

export interface Option extends Choice {
	value: string;
}

export default abstract class Eazyfield {
	_table: Table;
	activeTableId: string;
	activeTable: Table;
	_oldTable: Table;
	name: string;
	// A dummy obserable that is incremented by 1 every time there are field changes.
	recheckNameExists: number;
	type: FieldType;
	optionsByLanguage: Map<LanguageIdType, Option[]>;
	language: LanguageIdType;
	isCreating: boolean;
	submitStatus: ValidateStatus;

	constructor(language: LanguageIdType, defaultName: string) {
		log.debug("Eazyfield.constructor, language:", language);

		this._table = null;
		this._oldTable = null;
		this.recheckNameExists = 1;
		this.type = FieldType.SINGLE_SELECT;
		this.optionsByLanguage = new Map();
		this.language = language;
		this.isCreating = false;
		this.activeTableId = cursor.activeTableId;
		if (this.activeTableId) {
			this.activeTable = base.getTableByIdIfExists(this.activeTableId);
		}

		// That does the initialization properly, no need to duplicate code.
		// this.onActiveTableIdChange();
		this.name = this.getAvailableFieldName(defaultName);
		cursor.watch(["activeTableId"], this.onActiveTableIdChange);
	}

	getAvailableFieldName(defaultName): string {
		if (!this.table || !this.table.getFieldByNameIfExists(defaultName)) {
			return defaultName;
		}
		for (let i = 2; i < 100; i++) {
			const name = `${defaultName}${i}`;
			if (!this.table.getFieldByNameIfExists(name)) {
				return name;
			}
		}
		return defaultName;
	}

	get formValues(): any {
		log.debug("Eazyfield.formValues");

		return {
			table: this.table ? this.table.id : null,
			name: this.name,
			language: this.language,
		};
	}

	get options(): Option[] {
		log.debug("Eazyfield.options, language:", this.language);
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
		log.debug("Eazyfield.onActiveTableIdChange");
		this.activeTableId = cursor.activeTableId;
		if (this.activeTableId) {
			this.activeTable = base.getTableByIdIfExists(this.activeTableId);
			if (!this.activeTable) {
				log.debug(
					"Eazyfield.onActiveTableIdChange - base doesn't return activeTable yet, setting timeout"
				);
				setTimeout(this.onActiveTableIdChange, 300);
			}
		}
	}

	onSelectedTableDeleted(): void {
		log.debug("Eazyfield.onSelectedTableDeleted");
	}

	get table(): Table {
		log.debug("Eazyfield.table get");
		if (this._table) {
			return this._table;
		}
		return this.activeTable;
	}

	// set table(table: Table) {
	// 	log.debug("Eazyfield.table set");

	// 	this._table = table;
	// }

	get nameRules(): any {
		if (this.isCreating || this.submitStatus) {
			return null;
		}
		return [
			{
				required: true,
				message: "Please enter a field name",
			},
		];
	}

	get hasPermission(): boolean {
		if (this.table) {
			return this.table.hasPermissionToCreateField();
		}
		return true;
	}

	get fieldNameExists(): boolean {
		log.debug("Eazyfield.fieldNameExists");

		if (this.isCreating || this.submitStatus) return false;

		if (
			this.recheckNameExists > 0 &&
			this.table &&
			this.name &&
			this.table.getFieldByNameIfExists(this.name) != null
		) {
			return true;
		}
		return false;
	}

	get disableCreateButton(): boolean {
		if (
			this.submitStatus ||
			!this.hasPermission ||
			!this.table ||
			!this.name ||
			this.fieldNameExists ||
			this.options.length === 0
		) {
			return true;
		}
		return false;
	}

	create = flow(function* () {
		try {
			this.isCreating = true;
			const name = toJS(this.name);
			const type = toJS(this.type);
			const choices = this.options.map((choice) => {
				return { name: choice.name };
			});
			const options = { choices: choices };
			log.debug(
				"Eazyfield.create, name: ",
				name,
				", type:",
				type,
				", options: ",
				options
			);
			this._table = this.table;

			yield this._table.createFieldAsync(name, type, options);
			this.submitStatus = ValidateStatus.success;
		} catch (e) {
			log.error("Eazyfield.create, error:", e);
			this.submitStatus = ValidateStatus.error;
			this.createError = e;
		} finally {
			this.isCreating = false;
		}
	});

	get tableStatus(): ValidateStatus {
		if (this.isCreating) return null;

		if (!this.hasPermission) {
			return ValidateStatus.error;
		}
		return null;
	}

	get tableStatusMessage(): string | null {
		if (this.isCreating) return null;

		if (!this.hasPermission) {
			return "You don't have permissions to create fields in this table.";
		}
		return null;
	}

	get fieldNameStatus(): ValidateStatus {
		if (this.isCreating || this.submitStatus) return null;

		if (this.fieldNameExists) {
			return ValidateStatus.error;
		}
		return null;
	}

	get fieldNameStatusMessage(): string | null {
		if (this.isCreating || this.submitStatus) return null;

		if (this.fieldNameExists) {
			return `The "${this.name}" field already exists`;
		}
		return null;
	}

	get submitStatusMessage(): string | null {
		if (!this.submitStatus) {
			return null;
		}
		switch (this.submitStatus) {
			case ValidateStatus.success:
				return `Successfully created the "${this.name}" field in the "${this.table.name}" table`;
			case ValidateStatus.error:
				return `Something went wrong. Please try again. If the problem persists, please contact support@superblocks.at`;
			default:
				return null;
		}
	}

	// Reset so that we don't see the submit status message
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onValuesChange(changedValues, allValues): void {
		this.submitStatus = null;
	}

	reset(): void {
		this._table = null;
		this.submitStatus = null;
	}
}

// @ts-ignore
decorate(Eazyfield, {
	_table: observable.ref,
	table: computed,
	onTableFieldsChanged: action.bound,
	tableChangedReaction: action.bound,
	_oldTable: observable.ref,
	activeTableId: observable,
	activeTable: observable.ref,
	hasPermission: computed,
	name: observable,
	nameRules: computed,
	fieldNameExists: computed,
	recheckNameExists: observable,
	type: observable,
	options: computed,
	disableCreateButton: computed,
	language: observable,
	tableStatus: computed,
	tableStatusMessage: computed,
	fieldNameStatus: computed,
	fieldNameStatusMessage: computed,
	isCreating: observable,
	createError: observable,
	submitStatus: observable,
	submitStatusMessage: computed,
	onValuesChange: action,
	onActiveTableIdChange: action.bound,
	onSelectedTableDeleted: action.bound,
	formValues: computed,
	reset: action,
});
