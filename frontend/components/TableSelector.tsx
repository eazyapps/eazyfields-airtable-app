import loglevel from "loglevel";
const log = loglevel.getLogger("TableSelector");
// log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import { Select } from "antd";
const { Option } = Select;

import { useBase } from "@airtable/blocks/ui";

import FormItem from "../components/FormItem";

import Eazyfield from "../models/Eazyfield";
import { StyledFormItem } from "../StyledComponents";

const TableSelector = observer(({ field }: { field: Eazyfield }) => {
	log.debug(
		"TableSelector.render, table:",
		field.table && !field.table.isDeleted ? field.table.name : "null"
	);

	const base = useBase();

	if (field.table && field.table.isDeleted) {
		log.debug("TableSelector - table was deleted");
		if (field._table === field.table) {
			log.debug("TableSelector - deleted table was selected table");
			field._table = null;
		}
		return null;
	}

	const value = field.table ? field.table.id : null;

	const onSelect = (tableId) => {
		log.debug("TableSelector.onSelect, tableId:", tableId);
		const table = base.getTableByIdIfExists(tableId);
		log.debug("TableSelector.onSelect, table:", table ? table.name : "null");
		field.table = table;
	};

	return (
		<StyledFormItem
			// name="table"
			label="Table to create the field in"
			// rules={[{ required: true, message: "Please select a table" }]}
			validateStatus={field.tableStatus}
			help={field.tableStatusMessage}
			{...FormItem.getLayoutProps(24)}
		>
			<Select value={value} onSelect={onSelect}>
				{base.tables.map((table) => (
					<Option key={table.id} value={table.id}>
						{table.name}
					</Option>
				))}
			</Select>
		</StyledFormItem>
	);
});

export default TableSelector;
