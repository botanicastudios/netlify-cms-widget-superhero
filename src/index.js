import Control from "./Control.js";
import Preview from "./Preview.js";
import { superheroStyles } from '@hypervisual/assets'

if (typeof window !== "undefined") {
	window.superheroControl = Control;
	window.superheroPreview = Preview;
}

const attachToCMS = function (CMS) {
	CMS.registerWidget('superhero', Control, Preview)
	CMS.registerPreviewStyle(superheroStyles, {
		raw: true
	})
}

export default {
	Control,
	Preview,
	attachToCMS
}
