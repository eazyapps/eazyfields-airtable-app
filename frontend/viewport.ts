import { viewport } from "@airtable/blocks";
export { viewport as default } from "@airtable/blocks";

export enum Mobile {
	maxWidth = 767,
}

export enum Tablet {
	minWidth = 768,
	maxWidth = 991,
	maxWidthPx = "991px",
}

export enum Desktop {
	minWidth = 992,
	minWidthPx = "992px",
}

Object.assign(viewport, {
	isDesktop(): boolean {
		return viewport.size.width >= Desktop.minWidth;
	},
});
