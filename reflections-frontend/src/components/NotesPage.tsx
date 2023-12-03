import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import contentServices from "../api/contentServices";
import Tiptap from "./Tiptap/Tiptap";

type note = {
	_id: string;
	title: string;
	notesContent: string;
	date: Dayjs | null;
};

const NotesPage = () => {
	const [editorValue, setEditorValue] = useState<string>("");
	const searchInput = useRef<HTMLInputElement>(null);
	const title = useRef<HTMLInputElement>(null);
	const [searchResults, setSearchResults] = useState<note[]>([]);
	const [recentResults, setRecentResults] = useState<note[]>([]);
	const [showSearch, setShowSearch] = useState(true);
	const [changeNote, setChangeNote] = useState(false);
	const [currNoteID, setCurrNoteID] = useState("");
	const [lastUpdate, setLastUpdate] = useState<Dayjs | null>(null);
	const [selectedOption, setSelectedOption] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState("Save");
	const [confirmDelete, setConfirmDelete] = useState(false);

	const handleClick = (title: string, notesContent: string) => {
		if (!title) return;
		const saveTime: Dayjs = dayjs();
		if (currNoteID !== "") {
			setIsSaving("Saving");
			contentServices
				.put(currNoteID, {
					date: dayjs().valueOf(),
					title,
					notesContent,
				})
				.then(() => {
					setLastUpdate(saveTime);
					// setSearchResults((prev) => {
					// 	return prev.map((item) => {
					// 		if (item._id === currNoteID) {
					// 			return {
					// 				_id: currNoteID,
					// 				notesContent,
					// 				title,
					// 				date: lastUpdate,
					// 			};
					// 		} else return item;
					// 	});
					// });
					setTimeout(() => {
						setIsSaving("Save Successful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 2000);
					}, 2000);
					console.log("Updated Successfully!");
				})
				.catch(() => {
					setTimeout(() => {
						setIsSaving("Save Unsuccessful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 2000);
					}, 2000);
					console.log("Could not update the content");
				});
		} else {
			setIsSaving("Saving");
			contentServices
				.post("/new", {
					date: dayjs().valueOf(),
					title,
					notesContent,
				})
				.then((res) => {
					setCurrNoteID(res.data.id);
					setLastUpdate(saveTime);
					// setSearchResults((prev) => {
					// 	return [
					// 		...prev,
					// 		{
					// 			_id: currNoteID,
					// 			notesContent,
					// 			title,
					// 			date: lastUpdate,
					// 		},
					// 	];
					// });
					setTimeout(() => {
						setIsSaving("Save Successful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 2000);
					}, 2000);
					console.log("Saved Successfully!");
				})
				.catch(() => {
					setTimeout(() => {
						setIsSaving("Save Unsuccessful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 2000);
					}, 2000);
					console.log("Could not save the content");
				});
		}
	};

	function deleteNote() {
		contentServices
			.delete(currNoteID)
			.then(() => {
				setEditorValue("");
				setChangeNote(true);
				title.current!.value = "";
				setLastUpdate(null);
				console.log(currNoteID);
				setSearchResults(
					searchResults.filter((item) => {
						if (item._id !== currNoteID) return true;
						else return false;
					})
				);
				setCurrNoteID("");
				console.log("Content Removed Successfully");
			})
			.catch(() => {
				console.log("An error occurred");
			});
		setConfirmDelete(false);
	}

	useEffect(() => {
		contentServices
			.get("/recents")
			.then((res) => {
				console.log(res.data[0]);
				setRecentResults(res.data);
				// setClearStatus(false);
			})
			.catch(() => {
				setRecentResults([]);
			});
	}, []);

	return (
		<div
			className="min-w-screen oveerflow-hidden flex h-screen justify-center"
			onKeyDown={(e) => {
				if (e.key === "Escape") setConfirmDelete(false);
			}}
		>
			{confirmDelete && (
				<div className="text-md fixed bottom-10 right-4 flex flex-col justify-center gap-3 rounded-lg bg-[#444444] px-4 py-3 font-semibold text-[#e3e3e3]">
					Are you sure you want to delete this note?
					<div className="flex justify-end gap-2 font-semibold">
						<button
							className="rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#FF6969] hover:text-black"
							onClick={deleteNote}
						>
							Delete
						</button>
						<button
							className="rounded-md bg-[#292929] px-2 py-[5px] hover:bg-[#8de86b] hover:text-black"
							onClick={() => setConfirmDelete(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			{showSearch && (
				<div className="customScroll flex h-full w-1/4 flex-col items-center overflow-auto border-r-[1px] border-[#515151] bg-[#1f1f1f] pb-12">
					<input
						className="363636 mb-2 mt-8 h-fit w-4/5 rounded-lg bg-[#363636] px-2 py-[7px] text-[17px] font-semibold text-[#dadada]"
						placeholder="Search"
						ref={searchInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setSearchResults([]);
								setIsLoading(true);
								setSelectedOption(1);
								setTimeout(() => {
									contentServices
										.post("/search", {
											title: searchInput.current?.value,
										})
										.then((res) => {
											console.log(res.data[0]);
											setIsLoading(false);
											setSearchResults(res.data);
										})
										.catch(() => {
											setIsLoading(false);
											setSearchResults([]);
										});
								}, 700);
							}
						}}
					/>
					<div className="flex h-full w-full flex-col items-center">
						<div className="items-startmb flex h-full w-11/12 flex-col">
							<p className="mb-2 mt-4 text-sm text-[#a1a1a1]">
								<button
									className={`${
										selectedOption === 0 &&
										"font-semibold text-[#dadada]"
									}`}
									onClick={() => setSelectedOption(0)}
								>
									Recents
								</button>{" "}
								|{" "}
								<button
									className={`${
										selectedOption === 1 &&
										"font-semibold text-[#dadada]"
									}`}
									onClick={() => setSelectedOption(1)}
								>
									Results
								</button>
							</p>
							{selectedOption === 1 &&
								searchResults.map((item) => {
									return (
										<div
											className="mb-3 w-full items-start justify-center rounded-lg bg-[#444444] px-2 py-2"
											key={item._id}
											onClick={() => {
												console.log("div clicked");
												title.current!.value =
													item.title;
												setEditorValue(
													item.notesContent
												);
												setCurrNoteID(item._id);
												setChangeNote(true);
												setLastUpdate(() => {
													if (item.date)
														return dayjs(item.date);
													else return null;
												});
											}}
										>
											<p className="text-[#e5e2e2]">
												{item.title}
											</p>
											<p className="text-[#bcbcbc]">
												Last Edited :{" "}
												{dayjs(item.date).format(
													"DD-MMM, HH:mm"
												)}
											</p>
										</div>
									);
								})}
							{selectedOption === 0 &&
								recentResults.map((item) => {
									return (
										<div
											className="mb-3 w-full items-start justify-center rounded-lg bg-[#444444] px-2 py-2"
											key={item._id}
											onClick={() => {
												console.log("div clicked");
												title.current!.value =
													item.title;
												setEditorValue(
													item.notesContent
												);
												setCurrNoteID(item._id);
												setChangeNote(true);
												setLastUpdate(() => {
													if (item.date)
														return dayjs(item.date);
													else return null;
												});
											}}
										>
											<p className="text-[#e5e2e2]">
												{item.title}
											</p>
											<p className="text-[#bcbcbc]">
												Last Edited :{" "}
												{dayjs(item.date).format(
													"DD-MMM, HH:mm"
												)}
											</p>
										</div>
									);
								})}
							{((selectedOption === 0 &&
								recentResults.length === 0) ||
								(selectedOption === 1 &&
									searchResults.length === 0)) && (
								<div className="mt-4 flex w-11/12 items-center justify-center text-[#a1a1a1]">
									{isLoading ? "Loading" : "Nothing Here"}
								</div>
							)}
						</div>
					</div>
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

			{/* Bottom Navbar */}
			<div className="fixed bottom-0 flex w-full justify-between bg-[#3c3e41] px-1 py-[1.5px]">
				{/* why do we require flex here?? */}
				<div className="left-0 flex">
					<button
						className="mr-4 font-inter text-xs tracking-wider text-white"
						onClick={() => {
							setShowSearch((prev) => !prev);
						}}
					>
						{showSearch ? "Hide Sidebar" : "Show Sidebar"}
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
						}}
					>
						Clear
					</button>
					<button
						className="mr-4 font-inter text-xs tracking-wider text-white"
						onClick={() => {
							setEditorValue("");
							setChangeNote(true);
							title.current!.value = "";
							setCurrNoteID("");
							setLastUpdate(null);
						}}
					>
						New
					</button>
					<button
						className="font-inter text-xs tracking-wider text-white"
						onClick={() => {
							setConfirmDelete(true);
							setTimeout(() => {
								setConfirmDelete(false);
							}, 5000);
						}}
						disabled={currNoteID === "" ? true : false}
					>
						Delete
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
						disabled={isSaving !== "Save" ? true : false}
					>
						{isSaving}
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

export default NotesPage;
