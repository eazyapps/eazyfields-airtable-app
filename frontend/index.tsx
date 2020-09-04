import loglevel from "loglevel";
const log = loglevel.getLogger("index");
// log.setLevel("debug");

// const _listeners = [];

// EventTarget.prototype.addEventListenerBase =
// 	EventTarget.prototype.addEventListener;
// EventTarget.prototype.addEventListener = function (type, listener) {
// 	// log.debug("addEventListener, type:", type);
// 	if (type === "error" && this instanceof Window) {
// 		log.debug("addEventListener, target:", this);
// 		return;
// 		// log.debug("addEventListener, listener:", listener);
// 	}
// 	_listeners.push({ target: this, type: type, listener: listener });
// 	this.addEventListenerBase(type, listener);
// };

import React from "react";
import "mobx-react-lite/batchingForReactDom";
import { initializeBlock, loadCSSFromURLAsync } from "@airtable/blocks/ui";
import EazyfieldsBlock from "./EazyfieldsBlock";

loadCSSFromURLAsync(
	"https://cdnjs.cloudflare.com/ajax/libs/antd/4.3.4/antd.min.css"
).then(() =>
	initializeBlock(() => (
		// <SuperblockWrapper>
		<EazyfieldsBlock />
		// </SuperblockWrapper>
	))
);
