import loglevel from "loglevel";
const log = loglevel.getLogger("CountryForm");
// log.setLevel("debug");

import React from "react";

import { observer } from "mobx-react-lite";

import { Form, Select } from "antd";
const { Option } = Select;

import { StyledFormItem, StyledSubmitButton } from "../StyledComponents";

import viewModel, { EazyfieldType } from "../BlockViewModel";
import CountryField from "../models/CountryField";
import BoundSelect from "../components/BoundSelect";
import TableSelector from "../components/TableSelector";
import BoundInput from "../components/BoundInput";
import languagePackStore from "../models/LanguagePackStore";
import Eazyfield from "../models/Eazyfield";
import EazyfieldForm from "./EazyfieldForm";

const CountryForm = observer(({ field }: { field: Eazyfield }) => {
	log.debug("Country.render");

	return <EazyfieldForm field={field} formValues={field.formValues} />;
});

export default CountryForm;
