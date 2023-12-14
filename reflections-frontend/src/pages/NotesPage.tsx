import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import contentServices from "../api/contentServices";
import Tiptap from "../components/Tiptap/Tiptap";
import ConfirmDialogBox from "../components/ConfirmDialogBox";
import BottomNavBar from "../components/BottomNavBar";
import SideBarNoteItem from "../components/SideBarNoteItem";

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
	const [showSideBar, setShowSideBar] = useState(() => {
		if (window.innerWidth <= 600) return false;
		else return true;
	});
	const [changeNote, setChangeNote] = useState(false);
	const [currNoteID, setCurrNoteID] = useState("");
	const [lastUpdate, setLastUpdate] = useState<Dayjs | null>(null);
	const [selectedOption, setSelectedOption] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState("Save");
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [confirmSave, setConfirmSave] = useState(false);
	const [_, setCurrNoteValue] = useState("");
	const [recentsCount, setRecentsCount] = useState(() => {
		const cnt = localStorage.getItem("recentsCount");
		const defaultVal = 10000000;
		if (cnt !== null) {
			return parseInt(cnt, 10);
		} else {
			localStorage.setItem("recentsCount", defaultVal.toString());
			return defaultVal;
		}
	});
	const navigate = useNavigate();
	const location = useLocation();

	function handleNoteSave(
		title: string,
		notesContent: string,
		mover: Boolean = false
	) {
		if (!title) return;
		const saveTime: Dayjs = dayjs();
		if (currNoteID !== "") {
			setIsSaving("Saving");
			contentServices
				.put(currNoteID, {
					date: saveTime.valueOf(),
					title,
					notesContent,
				})
				.then(() => {
					!mover && setLastUpdate(saveTime);
					!mover && setCurrNoteValue(notesContent);
					setRecentResults((prev) => {
						return prev.map((item) => {
							if (item._id === currNoteID) {
								return {
									_id: currNoteID,
									notesContent,
									title,
									date: saveTime,
								};
							} else return item;
						});
					});
					sortNotes();
					setTimeout(() => {
						setIsSaving("Save Successful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 1000);
					}, 1000);
				})
				.catch(() => {
					setTimeout(() => {
						setIsSaving("Save Unsuccessful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 1000);
					}, 1000);
				});
		} else {
			setIsSaving("Saving");
			contentServices
				.post("/new", {
					date: saveTime.valueOf(),
					title,
					notesContent,
				})
				.then((res) => {
					!mover && setCurrNoteID(res.data.id);
					!mover && setCurrNoteValue(notesContent);
					!mover && setLastUpdate(saveTime);
					setRecentResults((prev) => {
						return [
							...prev,
							{
								_id: res.data.id,
								notesContent,
								title,
								date: saveTime,
							},
						];
					});
					sortNotes();

					setTimeout(() => {
						setIsSaving("Save Successful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 1000);
					}, 1000);
				})
				.catch(() => {
					setTimeout(() => {
						setIsSaving("Save Unsuccessful!");
						setTimeout(() => {
							setIsSaving("Save");
						}, 1000);
					}, 1000);
				});
		}
	}

	function handleDeleteNote() {
		contentServices
			.delete(currNoteID)
			.then(() => {
				setCurrNoteValue("");
				setEditorValue("");
				setChangeNote(true);
				title.current!.value = "";
				setLastUpdate(null);
				// console.log(currNoteID);
				setRecentResults(
					recentResults.filter((item) => {
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

	function handleCheckNoteSave() {
		// console.log("value of confirm save is ", confirmSave);
		return new Promise((resolve) => {
			const checkInterval = setInterval(() => {
				let x: Boolean = true;
				setConfirmSave((prev) => {
					// console.log("first value of prev is ", prev);
					x = prev;
					return prev;
				});

				if (!x) {
					// console.log("yesss");
					clearInterval(checkInterval);
					resolve("resolve confirmed");
				}
			}, 100);
		});
	}

	function sortNotes() {
		setRecentResults((prev) => {
			return prev.sort((a, b) => {
				return dayjs(b.date!).valueOf() - dayjs(a.date!).valueOf();
			});
		});
	}

	function handleSideBarItemClick(item: note) {
		let x: string = "",
			y: string = "";
		setCurrNoteValue((prev) => {
			x = prev;
			return prev;
		});
		setEditorValue((prev) => {
			y = prev;
			return prev;
		});

		if (x !== y) {
			// console.log(
			// 	"values differ"
			// );
			setConfirmSave(true);
			handleCheckNoteSave().then(() => {
				// console.log(
				// 	"dialog box appears"
				// );
				title.current!.value = item.title;
				setEditorValue(item.notesContent);
				setCurrNoteValue(item.notesContent);
				setCurrNoteID(item._id);
				setChangeNote(true);
				setLastUpdate(() => {
					if (item.date) return dayjs(item.date);
					else return null;
				});
			});
		} else {
			title.current!.value = item.title;
			setEditorValue(item.notesContent);
			setCurrNoteValue(item.notesContent);
			setCurrNoteID(item._id);
			setChangeNote(true);
			setLastUpdate(() => {
				if (item.date) return dayjs(item.date);
				else return null;
			});
		}
	}

	useEffect(() => {
		setIsLoading(true);
		contentServices
			.get("/recents")
			.then((res) => {
				setIsLoading(false);
				setRecentResults(res.data);
			})
			.catch(() => {
				setIsLoading(false);
				setRecentResults([]);
			});
	}, []);

	useEffect(() => {
		if (location.state !== null && location.state.noteID !== null) {
			contentServices
				.get("/search/" + location.state.noteID)
				.then((res) => {
					setCurrNoteID(res.data._id);
					setEditorValue(res.data.notesContent);
					setChangeNote(true);
					title.current!.value = res.data.title;
					setLastUpdate(dayjs(res.data.date));
					setCurrNoteValue(res.data.notesContent);
				})
				.catch((e) => {
					console.log("An error occurred", e);
				});
			// imp keep note
			window.history.replaceState({ noteID: null }, document.title);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("recentsCount", recentsCount.toString());
	}, [recentsCount]);

	return (
		<div
			className="min-w-screen flex h-screen justify-center"
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					setConfirmDelete(false);
					setConfirmSave(false);
				}
			}}
		>
			{confirmDelete && (
				<ConfirmDialogBox
					message="Are you sure you want to delete this note?"
					textBtnA="Delete"
					textBtnB="Cancel"
					functionA={handleDeleteNote}
					functionB={() => setConfirmDelete(false)}
				/>
			)}
			{confirmSave && (
				<ConfirmDialogBox
					message="Changes made to the note are not saved"
					textBtnA="Discard"
					textBtnB="Save"
					functionA={() => {
						setConfirmSave(false);
					}}
					functionB={() => {
						if (title.current?.value) {
							handleNoteSave(
								title.current?.value,
								editorValue,
								true
							);
						}
						setConfirmSave(false);
					}}
				/>
			)}

			{showSideBar && (
				<div className="lg:1/4 md:1/3 flex h-screen w-3/4 flex-col items-center border-r-[1px] border-[#515151] bg-[#1e1e1e] sm:w-2/5">
					<input
						className="363636 mb-2 mt-8 h-fit w-4/5 rounded-lg bg-[#363636] px-2 py-[7px] text-[17px] font-semibold text-[#dadada]"
						placeholder="Search"
						spellCheck="false"
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
					<div className="flex h-full w-full flex-col items-center overflow-auto">
						<div className="flex h-full w-11/12 flex-col items-start">
							<div className="mb-2 mt-4 flex w-full items-center justify-between">
								<div className="flex whitespace-pre-wrap text-sm text-[#a1a1a1]">
									<button
										className={`${
											selectedOption === 0 &&
											"font-semibold text-[#dadada]"
										}`}
										onClick={() => setSelectedOption(0)}
									>
										Recents{" "}
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
								</div>
								<div className="flex whitespace-pre-wrap text-[#a1a1a1]">
									<button
										className={`${
											recentsCount === 5
												? "text-[#dadada]"
												: ""
										}`}
										onClick={() => {
											setRecentsCount(5);
										}}
									>
										5{" "}
									</button>
									<button
										className={`${
											recentsCount === 10
												? "text-[#dadada]"
												: ""
										}`}
										onClick={() => {
											setRecentsCount(10);
										}}
									>
										10{" "}
									</button>
									<button
										className={`${
											recentsCount === 15
												? "text-[#dadada]"
												: ""
										}`}
										onClick={() => {
											setRecentsCount(15);
										}}
									>
										15{" "}
									</button>
									<button
										className={`${
											recentsCount === 10000000
												? "text-[#dadada]"
												: ""
										}`}
										onClick={() => {
											setRecentsCount(10000000);
										}}
									>
										INF{" "}
									</button>
								</div>
							</div>
							<div className="customScroll flex h-fit w-full flex-col overflow-auto">
								{(selectedOption === 0
									? recentResults
									: searchResults
								)
									.slice(0, recentsCount)
									.map((item, index) => {
										return (
											<SideBarNoteItem
												onClick={() =>
													handleSideBarItemClick(item)
												}
												bgColor={
													currNoteID === item._id
														? "bg-[#4b4b4b]"
														: "bg-[#333333]"
												}
												textA={item.title}
												textB={index + 1}
												key={item._id}
												lastEditTime={dayjs(
													item.date
												).format("DD-MMM, HH:mm")}
											/>
										);
									})}
							</div>
							{(selectedOption === 0 &&
								recentResults.length === 0) ||
							(selectedOption === 1 &&
								searchResults.length === 0) ? (
								<div className="mt-4 flex w-11/12 items-center justify-center text-[#a1a1a1]">
									{isLoading ? "Loading" : "Nothing Here"}
								</div>
							) : (
								<div className="flex w-full pt-8"></div>
							)}
						</div>
					</div>
				</div>
			)}

			<div
				className={`flex ${
					showSideBar ? "w-1/4 sm:w-3/5 md:w-2/3 lg:w-3/4" : "w-full"
				}`}
			>
				<Tiptap
					title={title}
					editorValue={editorValue}
					setEditorValue={setEditorValue}
					changeNote={changeNote}
					setChangeNote={setChangeNote}
				/>
			</div>

			<BottomNavBar
				sideBarText={showSideBar ? "Hide Sidebar" : "Show Sidebar"}
				sideBarFunction={() => {
					setShowSideBar((prev) => !prev);
				}}
				clearText="Clear"
				clearFunction={() => {
					setSearchResults([]);
					setEditorValue("");
					setChangeNote(true);
					setCurrNoteID("");
					setCurrNoteValue("");
					title.current!.value = "";
					searchInput.current!.value = "";
					setLastUpdate(null);
				}}
				newText="New"
				newFunction={() => {
					setEditorValue("");
					setChangeNote(true);
					title.current!.value = "";
					setCurrNoteID("");
					setCurrNoteValue("");
					setLastUpdate(null);
				}}
				deleteText="Delete"
				deleteFunction={() => {
					setConfirmDelete(true);
				}}
				enableDelete={currNoteID === "" ? true : false}
				readingModeText="Reading Mode"
				readingModeFunction={() => {
					navigate(`${currNoteID}/reader`, {
						state: {
							title: title.current?.value,
							value: editorValue,
						},
					});
				}}
				enableReadingMode={currNoteID === "" ? true : false}
				saveStatusText={isSaving}
				saveStatusFunction={() => {
					if (title.current?.value) {
						handleNoteSave(title.current?.value, editorValue);
					}
				}}
				enableSave={isSaving !== "Save" ? true : false}
				saveTimeText={
					lastUpdate === null
						? "Never"
						: lastUpdate?.format("DD-MMM-YYYY | HH:mm")
				}
			/>
		</div>
	);
};

export default NotesPage;
