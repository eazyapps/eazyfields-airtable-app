import log from "loglevel";
log.setLevel("debug");

import React, { useState } from "react";

import { observer } from "mobx-react-lite";

import { Form, Input, Switch, Select } from "antd";
const { Option } = Select;

import { TablePicker } from "@airtable/blocks/ui";

import { StyledFormItem } from "../StyledComponents";

import store from "../models/LanguagePackStore";
import viewModel, { SuperfieldType } from "../ViewModel";
import languagePackStore from "../models/LanguagePackStore";
import CountryField from "../models/CountryField";
import Loading from "../LoadingEnglish";

const Country = observer(() => {
	log.debug("Country.render");

	const [table, setTable] = useState(null);

	const field = viewModel.getField(SuperfieldType.country) as CountryField;

	if (languagePackStore.supportedLanguages.length == 0) {
		return <Loading />;
	}

	return (
		<Form>
			<StyledFormItem label="Table to create the field in">
				<TablePicker table={table} onChange={setTable} />
			</StyledFormItem>
			<StyledFormItem label="Language for field values">
				<Select value={field.language} onChange={field.onLanguageChange}>
					{languagePackStore.supportedLanguages.map((language) => (
						<Option key={language.code} value={language.code}>
							{language.displayName}
						</Option>
					))}
				</Select>
			</StyledFormItem>
			<StyledFormItem label="Preview of field values">
				{field.countries.length > 0 ? (
					<Select>
						{field.countries.map((country) => (
							<Option key={country.code} value={country.code}>
								{country.displayName}
							</Option>
						))}
					</Select>
				) : (
					<Select placeholder="Loading values in selected language" />
				)}
			</StyledFormItem>
		</Form>
	);
});

export default Country;
