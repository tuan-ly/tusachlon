import { notion } from './notionClient.js';

async function convertBlocksToHtml(blocks, indentLevel = 0) {
	let html = '';
	const indentStyle = `style="margin-left: ${indentLevel * 20}px;"`;

	for (const block of blocks) {
		switch (block.type) {
			case 'heading_1':
				html += `<h1 ${indentStyle}>${block.heading_1.rich_text[0].text.content}</h1>`;
				break;
			case 'heading_2':
				html += `<h2 ${indentStyle}>${block.heading_2.rich_text[0].text.content}</h2>`;
				break;
			case 'heading_3':
				html += `<h3 ${indentStyle}>${block.heading_3.rich_text[0].text.content}</h3>`;
				break;
			case 'paragraph':
				html += `<p ${indentStyle}>${block.paragraph.rich_text.map((text) => text.text.content).join('')}</p>`;
				break;
			case 'quote':
				html += `<blockquote ${indentStyle}>${block.quote.rich_text.map((text) => text.text.content).join('')}</blockquote>`;
				break;
			case 'image':
				html += `<img ${indentStyle} src="${block.image.file.url}" alt="Notion Image">`;
				break;
			case 'video':
				if (block.video.type === 'external') {
					html += `<iframe ${indentStyle} src="${block.video.external.url}" frameborder="0" allowfullscreen></iframe>`;
				}
				break;
			case 'code':
				html += `<pre ${indentStyle}><code>${block.code.rich_text.map((text) => text.text.content).join('')}</code></pre>`;
				break;
			case 'equation':
				html += `<div ${indentStyle}>\\(${block.equation.expression}\\)</div>`;
				break;
			case 'to_do':
				html += `<div ${indentStyle}><input type="checkbox" ${block.to_do.checked ? 'checked' : ''}>${block.to_do.rich_text.map((text) => text.text.content).join('')}</div>`;
				break;
			case 'bulleted_list_item':
				html += `<ul ${indentStyle}><li>${block.bulleted_list_item.rich_text.map((text) => text.text.content).join('')}</li></ul>`;
				break;
			case 'numbered_list_item':
				html += `<ol ${indentStyle}><li>${block.numbered_list_item.rich_text.map((text) => text.text.content).join('')}</li></ol>`;
				break;
			case 'toggle':
				html += `<details ${indentStyle}><summary>${block.toggle.rich_text.map((text) => text.text.content).join('')}</summary>`;
				if (block.has_children) {
					const childBlocks = await getChildBlocks(block.id);
					const childHtml = await convertBlocksToHtml(childBlocks, indentLevel + 1);
					html += `<div class="child-blocks">${childHtml}</div>`;
				}
				html += `</details>`;
				break;
			case 'divider':
				html += `<hr ${indentStyle} />`;
				break;
			case 'callout':
				html += `<div ${indentStyle} class="callout">${block.callout.rich_text.map((text) => text.text.content).join('')}</div>`;
				break;
			// Add more cases for other block types as needed
			default:
				html += `<div ${indentStyle}>Unsupported block type: ${block.type}</div>`;
		}

		// Check for children blocks
		if (block.has_children && block.type !== 'toggle') {
			const childBlocks = await getChildBlocks(block.id);
			const childHtml = await convertBlocksToHtml(childBlocks, indentLevel + 1);
			html += `<div class="child-blocks">${childHtml}</div>`;
		}
	}

	return html;
}

async function getChildBlocks(blockId) {
	const response = await notion.blocks.children.list({ block_id: blockId });
	return response.results;
}

export async function getPageHtml(pageId) {
	const { results } = await notion.blocks.children.list({ block_id: pageId });
	const html = await convertBlocksToHtml(results);
	return html;
}

// getPageHtml('ba11abad-6640-45c4-aa40-707a19fdf1a0');
