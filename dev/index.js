import "./bootstrap.js";
import CMS, { init } from "netlify-cms";
import "netlify-cms/dist/cms.css";
import { Control, Preview } from "../src";
import { superheroStyles } from '@hypervisual/assets'

const config = {
	backend: {
		name: "test-repo",
		login: false
	},
	media_folder: "assets",
	collections: [
		{
			name: "test",
			label: "test",
			files: [
				{
					file: "./src/test.yml",
					name: "superhero_test",
					label: "Superhero Test",
					fields: [
						{
							name: "superhero_widget",
							label: "Superhero",
							widget: "superhero"
						}
					]
				}
			]
		}
	]
};

CMS.registerWidget("superhero", Control, Preview);

CMS.registerPreviewStyle(superheroStyles, {
	raw: true
})

init({ config });
