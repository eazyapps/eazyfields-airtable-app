import loglevel from "loglevel";
const log = loglevel.getLogger("CountryField");
log.setLevel("debug");
log.debug("CountryField");

import chai from "chai";
const { expect } = chai;

import { observable, action, computed, decorate, toJS } from "mobx";

import { LanguageIdType } from "@phensley/cldr";
import Table from "@airtable/blocks/dist/types/src/models/table";
import { base, cursor } from "@airtable/blocks";
import { FieldType } from "@airtable/blocks/models";
import { fromPromise } from "mobx-utils";

export default class Superfield {
	_table: Table;
	name: string;
	type: FieldType;
	options: any | null;
	language: LanguageIdType;
	creator: Promise<void> | null;
	createError: Error | null;

	constructor(language: LanguageIdType) {
		log.debug("CountryField.constructor, language:", language);
		this._table = null;
		this.name = null;
		this.type = FieldType.SINGLE_SELECT;
		this.options = null;
		this.language = language;
		this.creator = null;
		this.createError = null;
	}

	get table(): Table {
		console.log("Superfield.table get");
		if (this._table) {
			return this._table;
		}
		if (cursor.activeTableId) {
			return base.getTableById(cursor.activeTableId);
		}
		return null;
	}

	set table(table: Table) {
		this._table = table;
	}

	create(values): Promise<void> {
		const name = toJS(this.name);
		const type = toJS(this.type);
		const options = toJS(this.options);
		const choices = options.choices.map((choice) => {
			return { name: choice.name };
		});
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
		this.creator = fromPromise(
			this._table.unstable_createFieldAsync(name, type, { choices: choices })
		);
		this.creator.catch((e) => {
			log.error("Superfield.onCreateError, error:", e);
			this.createError = e;
		});
		return this.creator;
	}

	get isCreating(): boolean {
		return this.creator != null && this.creator.state == "pending";
	}
}

decorate(Superfield, {
	_table: observable,
	table: computed,
	name: observable,
	type: observable,
	options: observable,
	language: observable,
	isCreating: computed,
	createError: observable,
});
