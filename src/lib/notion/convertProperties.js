/**
 * Converts the properties of a JSON object dynamically based on a provided schema.
 *
 * @param {Object} json - The JSON object to convert.
 * @param {Object} [schema=null] - The schema to use for determining which properties to extract. If not provided, the properties will be extracted from the JSON object itself.
 * @return {Object} - The converted JSON object with the extracted properties.
 */
export function convertPropertiesDynamically(json, schema = null) {
	const result = {
		id: json.id // Include the id property of the page
	};

	// If schema is provided, use it to determine which properties to extract
	const propertiesToExtract = schema || json.properties;

	for (const [key, propName] of Object.entries(propertiesToExtract)) {
		const value = schema ? json.properties[propName] : propName;
		if (!value) {
			continue;
		}

		switch (value.type) {
			case 'created_time':
				result[key] = value.created_time;
				break;
			case 'last_edited_time':
				result[key] = value.last_edited_time;
				break;
			case 'checkbox':
				result[key] = value.checkbox;
				break;
			case 'multi_select':
				result[key] = value.multi_select.map((item) => item.name); // Extract names of multi-select options
				break;
			case 'relation':
				result[key] = value.relation.length > 0 ? value.relation.map((rel) => rel.id) : [];
				break;
			case 'title':
				result[key] = value.title.length > 0 ? value.title[0].text.content : null;
				break;
			case 'text':
				result[key] = value.text.length > 0 ? value.text[0].text.content : null;
				break;
			case 'number':
				result[key] = value.number;
				break;
			case 'select':
				result[key] = value.select ? value.select.name : null;
				break;
			case 'date':
				result[key] = value.date ? value.date.start : null;
				break;
			case 'formula':
				result[key] = value.formula ? value.formula.string : null;
				break;
			case 'rollup':
				result[key] = value.rollup
					? value.rollup.array.map((item) => item.string).join(', ')
					: null;
				break;
			case 'people':
				result[key] = value.people.map((person) => person.id);
				break;
			case 'files':
				result[key] = value.files.map((file) => file.name);
				break;
			case 'url':
				result[key] = value.url;
				break;
			case 'email':
				result[key] = value.email;
				break;
			case 'phone_number':
				result[key] = value.phone_number;
				break;
			default:
				console.warn(`Unknown type: ${value.type}`);
		}
	}

	return result;
}
