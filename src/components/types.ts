import { KeyTextField, LinkField } from "@prismicio/types";

export interface NavigationItem {
	label: KeyTextField; // Allow KeyTextField (nullable string)
	link: LinkField;
	cta_button?: boolean;
}

export interface Settings {
	data: {
		site_name: KeyTextField;
		subslogan: KeyTextField;
		navigation: NavigationItem[];
	};
}

export interface Locale {
	lang: string;
	lang_name: string;
	url: string;
}
