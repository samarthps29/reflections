import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import cpp from "highlight.js/lib/languages/cpp";
import js from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import { createLowlight } from "lowlight";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../api/userServices";
import { SmilieReplacer } from "./SmilieReplacer";
import "./styles.scss";

const lowlight = createLowlight();
lowlight.register("cpp", cpp);
lowlight.register("py", python);
lowlight.register("js", js);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
	if (!editor) {
		return null;
	}
	const navigate = useNavigate();
	return (
		<div className="flex justify-center text-[17px]">
			<div className="customScroll mx-8 mt-8 flex gap-1 overflow-auto rounded-lg bg-[#363636] px-1 py-[5px] text-[#a1a1a1]">
				<button
					id="btn-bold"
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					className={`flex ${
						editor.isActive("bold") ? "is-active" : ""
					} rounded-md px-2 py-0.5`}
				>
					bold
				</button>
				<button
					id="btn-italic"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={
						!editor.can().chain().focus().toggleItalic().run()
					}
					className={`flex ${
						editor.isActive("italic") ? "is-active" : ""
					} rounded-md px-2 py-0.5 `}
				>
					italic
				</button>
				<button
					id="btn-strike"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={
						!editor.can().chain().focus().toggleStrike().run()
					}
					className={`flex ${
						editor.isActive("strike") ? "is-active" : ""
					} rounded-md px-2 py-0.5`}
				>
					strike
				</button>
				<button
					id="btn-code"
					onClick={() => editor.chain().focus().toggleCode().run()}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					className={`flex ${
						editor.isActive("code") ? "is-active" : ""
					} rounded-md px-2 py-0.5 `}
				>
					code
				</button>

				<button
					onClick={() => editor.chain().focus().setParagraph().run()}
					className={`${
						editor.isActive("paragraph") ? "is-active" : ""
					} flex rounded-md px-2 py-0.5 `}
				>
					paragraph
				</button>
				<button
					id="btn-bullet"
					onClick={() =>
						editor.chain().focus().toggleBulletList().run()
					}
					className={`${
						editor.isActive("bulletList") ? "is-active" : ""
					} flex rounded-md px-2 py-0.5 `}
				>
					bulletlist
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleOrderedList().run()
					}
					className={`${
						editor.isActive("orderedList") ? "is-active" : ""
					} rounded-md    px-2 py-0.5 `}
				>
					orderedlist
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleCodeBlock().run()
					}
					className={`${
						editor.isActive("codeBlock") ? "is-active" : ""
					} flex rounded-md px-2 py-0.5 `}
				>
					codeblock
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleBlockquote().run()
					}
					className={`${
						editor.isActive("blockquote") ? "is-active" : ""
					} flex rounded-md px-2 py-0.5 `}
				>
					blockquote
				</button>
				<button
					onClick={() =>
						editor.chain().focus().setHorizontalRule().run()
					}
					className="flex rounded-md px-2 py-0.5  "
				>
					horizontalrule
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={`${
						editor.isActive("heading", { level: 3 })
							? "is-active"
							: ""
					} flex rounded-md px-2 py-0.5 `}
				>
					h1
				</button>
				<button
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 4 }).run()
					}
					className={`${
						editor.isActive("heading", { level: 4 })
							? "is-active"
							: ""
					} flex rounded-md px-2 py-0.5 `}
				>
					h2
				</button>
				<button
					onClick={() =>
						editor
							.chain()
							.focus()
							.toggleHighlight({ color: "#b197fc" })
							.setColor(
								editor?.isActive("highlight", {
									color: "#b197fc",
								})
									? ""
									: "#000000"
							)
							.run()
					}
					className={`${
						editor.isActive("highlight", { color: "#b197fc" })
							? "is-active"
							: ""
					}
				flex rounded-md px-2 py-0.5`}
				>
					purple
				</button>
				<button
					onClick={() =>
						editor
							.chain()
							.focus()
							.toggleHighlight({ color: "#74c0fc" })
							.setColor(
								editor?.isActive("highlight", {
									color: "#74c0fc",
								})
									? ""
									: "#000000"
							)
							.run()
					}
					className={`${
						editor.isActive("highlight", { color: "#74c0fc" })
							? "is-active"
							: ""
					} flex rounded-md px-2 py-0.5`}
				>
					blue
				</button>
				<button
					onClick={() =>
						editor
							.chain()
							.focus()
							.toggleHighlight({ color: "#0ec3ac" })
							.setColor(
								editor?.isActive("highlight", {
									color: "#0ec3ac",
								})
									? ""
									: "#000000"
							)
							.run()
					}
					className={`${
						editor.isActive("highlight", { color: "#0ec3ac" })
							? "is-active"
							: ""
					} flex rounded-md px-2 py-0.5`}
				>
					teal
				</button>
				<button
					onClick={() => editor.chain().focus().unsetAllMarks().run()}
					className="flex rounded-md px-2 py-0.5  "
				>
					clearmarks
				</button>
				<button
					onClick={() => editor.chain().focus().clearNodes().run()}
					className="flex rounded-md px-2 py-0.5  "
				>
					clearnodes
				</button>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					className="flex rounded-md px-2 py-0.5  "
				>
					undo
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
					className="flex rounded-md px-2 py-0.5  "
				>
					redo
				</button>
				<button
					className="logoutBtn flex rounded-md px-2 py-0.5 hover:border-0 hover:bg-[#da6888] hover:text-stone-900"
					onClick={() => {
						userServices.get("/logout");
						localStorage.removeItem("userName");
						localStorage.removeItem("recentsCount");
						localStorage.removeItem("accessToken");
						navigate("/login");
					}}
				>
					logout
				</button>
			</div>
		</div>
	);
};

const Tiptap = ({
	editorValue,
	setEditorValue,
	title,
	changeNote,
	setChangeNote,
	btnId,
}: {
	editorValue: string;
	setEditorValue: React.Dispatch<React.SetStateAction<string>>;
	btnId: string;
	title: React.RefObject<HTMLInputElement>;
	changeNote: Boolean;
	setChangeNote: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const editor = useEditor({
		extensions: [
			Typography,
			Highlight.configure({ multicolor: true }),
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
				codeBlock: false,
				dropcursor: false,
				gapcursor: false,
				hardBreak: false,
			}),
			SmilieReplacer,
			CodeBlockLowlight.configure({
				languageClassPrefix: "language-",
				lowlight,
			}),
		],
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			handleChange(html);
		},
		content: editorValue,
		editable: true,
	});

	useEffect(() => {
		if (changeNote) {
			editor?.commands.setContent(editorValue);
			setChangeNote(false);
		}
	}, [changeNote]);

	const handleChange = (newContent: string) => {
		setEditorValue(newContent);
	};

	useEffect(() => {
		const element = document.getElementById(btnId);
		if (element) element.click();
	}, [btnId]);

	return (
		<div className="customScroll flex h-full w-full flex-col gap-5 overflow-auto bg-[#1e1e1e]">
			<MenuBar editor={editor} />
			<input
				className="mx-8 mt-8 flex w-1/2 border-b-2 border-[#515151] bg-transparent text-xl font-semibold text-[#dadada] sm:w-2/5 md:w-1/4"
				placeholder="title goes here"
				ref={title}
				spellCheck="false"
			/>
			<EditorContent
				spellCheck={false}
				editor={editor}
				// text-[#bcbcbc]
				className="customScroll mx-8 mb-12 mt-2 font-inter text-lg leading-6 text-[#c0c0c0]"
			/>
		</div>
	);
};

export default Tiptap;
