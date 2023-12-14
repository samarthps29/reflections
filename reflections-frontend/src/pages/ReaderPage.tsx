import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link, useLocation, useParams } from "react-router-dom";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import cpp from "highlight.js/lib/languages/cpp";
import js from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import { createLowlight } from "lowlight";
import { SmilieReplacer } from "../components/Tiptap/SmilieReplacer";

const lowlight = createLowlight();
lowlight.register("cpp", cpp);
lowlight.register("py", python);
lowlight.register("js", js);

// console.log(lowlight.listLanguages());

const ReaderPage = () => {
	const params = useParams();
	const location = useLocation();
	const noteValue = location.state?.value,
		noteTitle = location.state?.title,
		noteID = params.id;
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
			}),
			CodeBlockLowlight.configure({
				languageClassPrefix: "language-",
				lowlight,
			}),
			SmilieReplacer,
		],

		content: noteValue,
		editable: false,
	});

	return (
		<div className="min-w-screen flex min-h-screen justify-center bg-[#1f1f1f]">
			<Link
				to={"/"}
				state={{ noteID }}
				className="fixed bottom-3 left-3 font-inter text-xs font-semibold text-[#e2e2e2]"
			>
				Back
			</Link>
			<div className="flex min-h-full w-11/12 flex-col bg-[#363636] px-8 py-6 font-inter text-white sm:w-4/5 md:w-3/4">
				<p className="flex w-1/2 border-b-2 border-[#a3a3a3] bg-transparent text-xl font-semibold text-[#e8e8e8] sm:w-2/5 md:w-1/4">
					{noteTitle}
				</p>
				<EditorContent
					className="mt-6 text-[#e9e9e9]"
					editor={editor}
					spellCheck="false"
				/>
			</div>
		</div>
	);
};

export default ReaderPage;
