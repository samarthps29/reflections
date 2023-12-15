export type command = {
	id: string;
	title: string;
	description: string;
};

const commandsArr = [
	{ id: "btn-bold", title: "bold", description: "set text bold" },
	{ id: "btn-italic", title: "italic", description: "set text italic" },
	{ id: "btn-strike", title: "strike", description: "strikethrough text" },
	{ id: "btn-code", title: "code", description: "highlight text as code" },
	{
		id: "btn-bullet",
		title: "bullet list",
		description: "highlight text as unordered list",
	},
];

export { commandsArr };
