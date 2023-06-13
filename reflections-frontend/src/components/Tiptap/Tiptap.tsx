import "./styles.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-2 px-3 pb-2">
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={`${
					editor.isActive("bold") ? "is-active" : ""
				} rounded-md border  px-2 py-0.5 `}
			>
				bold
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={`${
					editor.isActive("italic") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				italic
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				className={`${
					editor.isActive("strike") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				strike
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				className={`${
					editor.isActive("code") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				code
			</button>
			<button
				onClick={() => editor.chain().focus().unsetAllMarks().run()}
				className="rounded-md border  px-2 py-0.5 text-white"
			>
				clear marks
			</button>
			<button
				onClick={() => editor.chain().focus().clearNodes().run()}
				className="rounded-md border  px-2 py-0.5 text-white"
			>
				clear nodes
			</button>
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={`${
					editor.isActive("paragraph") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5 `}
			>
				paragraph
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 1 }).run()
				}
				className={`${
					editor.isActive("heading", { level: 1 })
						? "is-active"
						: "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				h1
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 2 }).run()
				}
				className={`${
					editor.isActive("heading", { level: 2 })
						? "is-active"
						: "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				h2
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 3 }).run()
				}
				className={`${
					editor.isActive("heading", { level: 3 })
						? "is-active"
						: "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				h3
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 4 }).run()
				}
				className={`${
					editor.isActive("heading", { level: 4 })
						? "is-active"
						: "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				h4
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 5 }).run()
				}
				className={`${
					editor.isActive("heading", { level: 5 })
						? "is-active"
						: "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				h5
			</button>
			<button
				onClick={() =>
					editor.chain().focus().toggleHeading({ level: 6 }).run()
				}
				className={`${
					editor.isActive("heading", { level: 6 })
						? "is-active"
						: "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				h6
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={`${
					editor.isActive("bulletList") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				bullet list
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={`${
					editor.isActive("orderedList") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				ordered list
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={`${
					editor.isActive("codeBlock") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				code block
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={`${
					editor.isActive("blockquote") ? "is-active" : "text-white"
				} rounded-md border  px-2 py-0.5`}
			>
				blockquote
			</button>
			<button
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
				className="rounded-md border  px-2 py-0.5 text-white"
			>
				horizontal rule
			</button>
			<button
				onClick={() => editor.chain().focus().setHardBreak().run()}
				className="rounded-md border  px-2 py-0.5 text-white"
			>
				hard break
			</button>
			<button
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				className="rounded-md border  px-2 py-0.5 text-white"
			>
				undo
			</button>
			<button
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				className="rounded-md border px-2 py-0.5 text-white"
			>
				redo
			</button>
			<button
				onClick={() => editor.chain().focus().setColor("#958DF1").run()}
				className={`${
					editor.isActive("textStyle", { color: "#958DF1" })
						? "is-active"
						: "text-white"
				} rounded-md border px-2 py-0.5`}
			>
				purple
			</button>
			<button
				onClick={() => editor.chain().focus().setColor("#f18d8d").run()}
				className={`${
					editor.isActive("textStyle", { color: "#f18d8d" })
						? "is-active"
						: "text-white"
				} rounded-md border px-2 py-0.5`}
			>
				orange
			</button>
			<button
				onClick={() => editor.chain().focus().setColor("#7bd88f").run()}
				className={`${
					editor.isActive("textStyle", { color: "#7bd88f" })
						? "is-active"
						: "text-white"
				} rounded-md border px-2 py-0.5`}
			>
				green
			</button>
			<button
				onClick={() => editor.chain().focus().setColor("#58b5e2").run()}
				className={`${
					editor.isActive("textStyle", { color: "#58b5e2" })
						? "is-active"
						: "text-white"
				} rounded-md border px-2 py-0.5`}
			>
				blue
			</button>
			<button
				onClick={() => editor.chain().focus().setColor("#fc618d").run()}
				className={`${
					editor.isActive("textStyle", { color: "#fc618d" })
						? "is-active"
						: "text-white"
				} rounded-md border px-2 py-0.5`}
			>
				red
			</button>
			<button
				onClick={() => editor.chain().focus().setColor("#f0b760").run()}
				className={`${
					editor.isActive("textStyle", { color: "#f0b760" })
						? "is-active"
						: "text-white"
				} rounded-md border px-2 py-0.5`}
			>
				yellow
			</button>
		</div>
	);
};

const Tiptap = ({
	editorValue,
	setNotesValue,
}: {
	editorValue: string;
	setNotesValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const editor = useEditor({
		extensions: [
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure(),
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
		],
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			handleChange(html);
		},
		content: editorValue,
	});

	useEffect(() => {
		editor?.commands.setContent(editorValue);
	}, [editorValue]);

	const handleChange = (newContent: string) => {
		setNotesValue(newContent);
	};

	return (
		<div className="customScroll -mt-2 flex h-full w-full resize-none items-center justify-center overflow-auto">
			<div className="flex h-full resize-none flex-col gap-5 rounded-xl p-5 text-lg text-white">
				<MenuBar editor={editor} />
				<EditorContent
					spellCheck={false}
					editor={editor}
					className="customScroll overflow-auto px-3"
				/>
			</div>
		</div>
	);
};

export default Tiptap;
