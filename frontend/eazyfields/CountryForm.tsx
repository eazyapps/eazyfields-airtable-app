import loglevel from "loglevel";
const log = loglevel.getLogger("CountryForm");
log.setLevel("info");

import React from "react";

import { observer } from "mobx-react-lite";

import Eazyfield from "../models/Eazyfield";
import EazyfieldForm from "./EazyfieldForm";

const CountryForm = observer(({ field }: { field: Eazyfield }) => {
	log.debug("Country.render");

	return <EazyfieldForm field={field} />;
});

export default CountryForm;
