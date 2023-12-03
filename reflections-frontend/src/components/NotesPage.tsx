import { useRef, useState } from "react";
import contentServices from "../api/contentServices";
import Tiptap from "./Tiptap/Tiptap";
import dayjs, { Dayjs } from "dayjs";

const NotesCard = () => {
	const [editorValue, setEditorValue] = useState<string>("");
	const searchInput = useRef<HTMLInputElement>(null);
	const title = useRef<HTMLInputElement>(null);
	// const [isSaving, setIsSaving] = useState(false);
	const [searchResults, setSearchResults] = useState<
		{ _id: string; title: string; notesContent: string; date: Dayjs }[]
	>([]);
	const [showSearch, setShowSearch] = useState(true);
	const [changeNote, setChangeNote] = useState(false);
	const [currNoteID, setCurrNoteID] = useState("");
	const [lastUpdate, setLastUpdate] = useState<Dayjs | null>(null);
	const [clearStatus, setClearStatus] = useState(true);

	// each note will have its unique note id as well
	const handleClick = (title: string, notesContent: string) => {
		// setIsSaving(true);
		if (currNoteID !== "") {
			contentServices
				.put(currNoteID, {
					date: dayjs().valueOf(),
					title,
					notesContent,
				})
				.then(() => {
					// setTimeout(() => {
					// 	setIsSaving(false);
					// }, 100);
					console.log("Updated Successfully!");
				})
				.catch(() => {
					// setTimeout(() => {
					// 	setIsSaving(false);
					// }, 100);
					console.log("Could not update the content");
				});
		} else {
			contentServices
				.post("/new", {
					date: dayjs().valueOf(),
					title,
					notesContent,
				})
				.then(() => {
					// setTimeout(() => {
					// 	setIsSaving(false);
					// }, 100);
					console.log("Saved Successfully!");
				})
				.catch(() => {
					// setTimeout(() => {
					// 	setIsSaving(false);
					// }, 100);
					console.log("Could not save the content");
				});
		}
	};

	return (
		<div className="flex w-screen">
			{showSearch && (
				<div className="flex w-1/4 flex-col items-center border-r-[1px] border-[#515151] bg-[#1f1f1f]">
					<input
						className="363636 mb-2 mt-8 h-fit w-4/5 rounded-lg bg-[#363636] px-2 py-[7px] text-[17px] font-semibold text-[#dadada]"
						placeholder="Search"
						ref={searchInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								contentServices
									.post("/", {
										title: searchInput.current?.value,
									})
									.then((res) => {
										console.log(res.data[0]);
										setSearchResults(res.data);
										setClearStatus(false);
									})
									.catch(() => {
										setSearchResults([]);
									});
							}
						}}
					/>
					{searchResults.map((item) => {
						return (
							<div
								className="mt-4 w-11/12 items-start justify-center rounded-lg bg-[#444444] px-2 py-2"
								onClick={() => {
									console.log("div clicked");
									title.current!.value = item.title;
									setEditorValue(item.notesContent);
									setCurrNoteID(item._id);
									setChangeNote(true);
									setLastUpdate(() => {
										if (item.date) return dayjs(item.date);
										else return null;
									});
								}}
							>
								<p className="text-[#e5e2e2]">{item.title}</p>
								<p className="text-[#bcbcbc]">
									{item.notesContent}
								</p>
							</div>
						);
					})}
					{!clearStatus && searchResults.length === 0 && (
						<div className="mt-4 flex w-11/12 items-center justify-center text-[#a1a1a1]">
							No results Found
						</div>
					)}
				</div>
			)}
			<div className={`flex ${showSearch ? "w-3/4" : "w-full"}`}>
				<Tiptap
					title={title}
					editorValue={editorValue}
					setEditorValue={setEditorValue}
					changeNote={changeNote}
					setChangeNote={setChangeNote}
				/>
			</div>
			<div className="fixed bottom-0 flex w-full justify-between bg-[#3c3e41] px-1 py-[1.5px]">
				{/* why do we require flex here?? */}
				<div className="left-0 flex">
					<button
						className="mr-4 font-inter text-xs tracking-wider text-white"
						onClick={() => {
							setShowSearch((prev) => !prev);
						}}
					>
						{showSearch ? "Hide Search" : "Show Search"}
					</button>
					<button
						className="mr-4 font-inter text-xs tracking-wider text-white"
						onClick={() => {
							setSearchResults([]);
							setEditorValue("");
							setChangeNote(true);
							title.current!.value = "";
							searchInput.current!.value = "";
							setLastUpdate(null);
							setClearStatus(true);
						}}
					>
						Clear
					</button>
					<button
						className="font-inter text-xs tracking-wider text-white"
						onClick={() => {
							setEditorValue("");
							setChangeNote(true);
							title.current!.value = "";
							setLastUpdate(null);
						}}
					>
						New
					</button>
				</div>

				<div className="right-0 flex">
					<button
						className="mr-4 font-inter text-xs tracking-wider text-white"
						onClick={() => {
							if (title.current?.value) {
								handleClick(title.current?.value, editorValue);
							}
						}}
					>
						Save
					</button>
					<p className="font-inter text-xs tracking-wider text-white">
						Last saved:{" "}
						{lastUpdate === null
							? "Never"
							: lastUpdate?.format("DD-MMM-YYYY | HH:mm")}
					</p>
				</div>
			</div>
		</div>
	);
};

export default NotesCard;
