import loglevel from "loglevel";
const log = loglevel.getLogger("BaseTracker");
log.setLevel("info");

import { useBase } from "@airtable/blocks/ui";
import viewModel from "./BlockViewModel";

export default function BaseTracker() {
	log.debug("BaseTracker.render");

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const base = useBase();

	setTimeout(() => {
		if (viewModel.activeField) {
			viewModel.activeField.recheckNameExists =
				viewModel.activeField.recheckNameExists + 1;
		}
	});

	return null;
}
