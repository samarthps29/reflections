export type command = {
	id: string;
	title: string;
	description: string;
};

const commandsArr = [
	{
		id: "btn-bold",
		title: "Bold",
		description: "Emphasize text with strong weight",
	},
	{
		id: "btn-italic",
		title: "Italic",
		description: "Style text in a slanted manner",
	},
	{
		id: "btn-strike",
		title: "Strike",
		description: "Cross out text",
	},
	{
		id: "btn-code",
		title: "Code",
		description: "Highlight text as code",
	},
	{
		id: "btn-bullet",
		title: "Bullet List",
		description: "Create an unordered list",
	},
	{
		id: "btn-paragraph",
		title: "Paragraph",
		description: "Insert a new paragraph",
	},
	{
		id: "btn-number",
		title: "Number",
		description: "Create an ordered list",
	},
	{
		id: "btn-codeblock",
		title: "Code Block",
		description: "Insert a block of code",
	},
	{
		id: "btn-blockquote",
		title: "Blockquote",
		description: "Insert a block of quoted text",
	},
	{
		id: "btn-horizontalrule",
		title: "Horizontal Rule",
		description: "Insert a horizontal dividing line",
	},
	{
		id: "btn-h1",
		title: "Heading 1",
		description: "Insert a top-level heading",
	},
	{
		id: "btn-h2",
		title: "Heading 2",
		description: "Insert a second-level heading",
	},
	{
		id: "btn-purple",
		title: "Purple",
		description: "Apply a purple color to the selected content",
	},
	{
		id: "btn-blue",
		title: "Blue",
		description: "Apply a blue color to the selected content",
	},
	{
		id: "btn-teal",
		title: "Teal",
		description: "Apply a teal color to the selected content",
	},
	{
		id: "btn-clearmarks",
		title: "Clear Marks",
		description: "Remove formatting marks from the text",
	},
	{
		id: "btn-clearnodes",
		title: "Clear Nodes",
		description: "Clear all the styling applied",
	},
	{
		id: "btn-undo",
		title: "Undo",
		description: "Reverse the last editing action",
	},
	{
		id: "btn-redo",
		title: "Redo",
		description: "Reapply the last undone action",
	},
];

export { commandsArr };
