// Universal function to convert page block content
function convertBlockContent(blocks) {
	const result = blocks.map((block) => {
		const content = {
			id: block.id,
			type: block.type,
			created_time: block.created_time,
			last_edited_time: block.last_edited_time
		};

		switch (block.type) {
			case 'paragraph':
				content.text = block.paragraph.rich_text.map((text) => text.plain_text).join('');
				break;
			case 'heading_1':
			case 'heading_2':
			case 'heading_3':
				content.text = block[block.type].rich_text.map((text) => text.plain_text).join('');
				break;
			case 'to_do':
				content.text = block.to_do.rich_text.map((text) => text.plain_text).join('');
				content.checked = block.to_do.checked;
				break;
			case 'bulleted_list_item':
			case 'numbered_list_item':
				content.text = block[block.type].rich_text.map((text) => text.plain_text).join('');
				break;
			case 'toggle':
				content.text = block.toggle.rich_text.map((text) => text.plain_text).join('');
				content.children = block.has_children ? convertBlockContent(block.children) : [];
				break;
			case 'code':
				content.text = block.code.rich_text.map((text) => text.plain_text).join('');
				content.language = block.code.language;
				break;
			case 'image':
				content.url =
					block.image.type === 'external' ? block.image.external.url : block.image.file.url;
				break;
			case 'video':
				content.url =
					block.video.type === 'external' ? block.video.external.url : block.video.file.url;
				break;
			case 'file':
				content.url =
					block.file.type === 'external' ? block.file.external.url : block.file.file.url;
				break;
			case 'pdf':
				content.url = block.pdf.type === 'external' ? block.pdf.external.url : block.pdf.file.url;
				break;
			case 'bookmark':
				content.url = block.bookmark.url;
				break;
			case 'callout':
				content.text = block.callout.rich_text.map((text) => text.plain_text).join('');
				content.icon = block.callout.icon;
				break;
			case 'quote':
				content.text = block.quote.rich_text.map((text) => text.plain_text).join('');
				break;
			case 'synced_block':
				content.synced_from = block.synced_block.synced_from;
				content.children = block.has_children ? convertBlockContent(block.children) : [];
				break;
			case 'template':
				content.text = block.template.rich_text.map((text) => text.plain_text).join('');
				content.children = block.has_children ? convertBlockContent(block.children) : [];
				break;
			case 'link_to_page':
				content.page_id = block.link_to_page.page_id;
				break;
			default:
				console.warn(`Unknown block type: ${block.type}`);
		}

		return content;
	});

	return result;
}

// Provided JSON block data
// const notionBlocks = [
// 	{
// 		object: 'block',
// 		id: 'b1',
// 		type: 'paragraph',
// 		created_time: '2024-06-04T11:02:00.000Z',
// 		last_edited_time: '2024-06-04T11:03:00.000Z',
// 		paragraph: {
// 			rich_text: [
// 				{
// 					type: 'text',
// 					text: { content: 'This is a paragraph.', link: null },
// 					plain_text: 'This is a paragraph.'
// 				}
// 			],
// 			color: 'default'
// 		}
// 	},
// 	{
// 		object: 'block',
// 		id: 'b2',
// 		type: 'heading_1',
// 		created_time: '2024-06-04T11:02:00.000Z',
// 		last_edited_time: '2024-06-04T11:03:00.000Z',
// 		heading_1: {
// 			rich_text: [
// 				{ type: 'text', text: { content: 'Heading 1', link: null }, plain_text: 'Heading 1' }
// 			],
// 			color: 'default'
// 		}
// 	}
// 	// Add more blocks as needed
// ];

// Extracting the block content
// const extractedBlockContent = convertBlockContent(notionBlocks);
// console.log(extractedBlockContent);

// Universal function to convert page block content to Markdown
function convertBlocksToMarkdown(blocks) {
	const markdownLines = blocks.map((block) => {
		let mdContent = '';

		switch (block.type) {
			case 'paragraph':
				mdContent = block.paragraph.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'heading_1':
				mdContent = '# ' + block.heading_1.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'heading_2':
				mdContent =
					'## ' + block.heading_2.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'heading_3':
				mdContent =
					'### ' + block.heading_3.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'to_do':
				mdContent =
					`- [${block.to_do.checked ? 'x' : ' '}] ` +
					block.to_do.rich_text.map((text) => text.plain_text).join('') +
					'\n';
				break;
			case 'bulleted_list_item':
				mdContent =
					'- ' + block.bulleted_list_item.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'numbered_list_item':
				mdContent =
					'1. ' + block.numbered_list_item.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'toggle':
				mdContent =
					'<details>\n<summary>' +
					block.toggle.rich_text.map((text) => text.plain_text).join('') +
					'</summary>\n';
				if (block.has_children) {
					mdContent += convertBlocksToMarkdown(block.children).join('') + '\n';
				}
				mdContent += '</details>\n';
				break;
			case 'code':
				mdContent =
					'```' +
					block.code.language +
					'\n' +
					block.code.rich_text.map((text) => text.plain_text).join('') +
					'\n```\n';
				break;
			case 'image':
				const imageUrl =
					block.image.type === 'external' ? block.image.external.url : block.image.file.url;
				mdContent = `![Image](${imageUrl})\n`;
				break;
			case 'video':
				const videoUrl =
					block.video.type === 'external' ? block.video.external.url : block.video.file.url;
				mdContent = `[Video](${videoUrl})\n`;
				break;
			case 'file':
				const fileUrl =
					block.file.type === 'external' ? block.file.external.url : block.file.file.url;
				mdContent = `[File](${fileUrl})\n`;
				break;
			case 'pdf':
				const pdfUrl = block.pdf.type === 'external' ? block.pdf.external.url : block.pdf.file.url;
				mdContent = `[PDF](${pdfUrl})\n`;
				break;
			case 'bookmark':
				mdContent = `[Bookmark](${block.bookmark.url})\n`;
				break;
			case 'callout':
				mdContent = '> ' + block.callout.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'quote':
				mdContent = '> ' + block.quote.rich_text.map((text) => text.plain_text).join('') + '\n';
				break;
			case 'synced_block':
				if (block.has_children) {
					mdContent += convertBlocksToMarkdown(block.children).join('') + '\n';
				}
				break;
			case 'template':
				mdContent = block.template.rich_text.map((text) => text.plain_text).join('') + '\n';
				if (block.has_children) {
					mdContent += convertBlocksToMarkdown(block.children).join('') + '\n';
				}
				break;
			case 'link_to_page':
				mdContent = `[Page](${block.link_to_page.page_id})\n`;
				break;
			default:
				console.warn(`Unknown block type: ${block.type}`);
		}

		return mdContent;
	});

	return markdownLines;
}

// Provided JSON block data
const notionBlocks = [
	{
		object: 'block',
		id: 'b1',
		type: 'paragraph',
		created_time: '2024-06-04T11:02:00.000Z',
		last_edited_time: '2024-06-04T11:03:00.000Z',
		paragraph: {
			rich_text: [
				{
					type: 'text',
					text: { content: 'This is a paragraph.', link: null },
					plain_text: 'This is a paragraph.'
				}
			],
			color: 'default'
		}
	},
	{
		object: 'block',
		id: 'b2',
		type: 'heading_1',
		created_time: '2024-06-04T11:02:00.000Z',
		last_edited_time: '2024-06-04T11:03:00.000Z',
		heading_1: {
			rich_text: [
				{ type: 'text', text: { content: 'Heading 1', link: null }, plain_text: 'Heading 1' }
			],
			color: 'default'
		}
	}
	// Add more blocks as needed
];

// Extracting the block content to Markdown
const extractedBlockContentMarkdown = convertBlocksToMarkdown(notionBlocks);
console.log(extractedBlockContentMarkdown.join(''));
