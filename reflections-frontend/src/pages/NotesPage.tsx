import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useLocation, useNavigate } from "react-router-dom";
import contentServices from "../api/contentServices";
import BottomNavBar from "../components/BottomNavBar";
import ConfirmDialogBox from "../components/ConfirmDialogBox";
import SearchModal from "../components/SearchModal";
import SideBarNoteItem from "../components/SideBarNoteItem";
import Tiptap from "../components/Tiptap/Tiptap";
import { command } from "../constants/Commands";
import { removeHtmlTags } from "../utility/utility";

export type note = {
	_id: string;
	title: string;
	notesContent: string;
	date: Dayjs | null;
};

const NotesPage = () => {
	const [editorValue, setEditorValue] = useState<string>("");
	const [searchParamValue, setSearchParamValue] = useState("content");
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
	const [currNoteValue, setCurrNoteValue] = useState("");
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
	const [showModalSearch, setShowModalSearch] = useState(false);
	const [btnId, setBtnId] = useState({ id: "", status: true });
	const navigate = useNavigate();
	const location = useLocation();

	const handleNoteSave = (
		title: string,
		notesContent: string,
		mover: Boolean = false
	) => {
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
						setIsSaving("Update Successful");
						setTimeout(() => {
							setIsSaving("Save");
						}, 1000);
					}, 1000);
				})
				.catch(() => {
					setTimeout(() => {
						setIsSaving("Update Unsuccessful");
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
						setIsSaving("Save Successful");
						setTimeout(() => {
							setIsSaving("Save");
						}, 1000);
					}, 1000);
				})
				.catch(() => {
					setTimeout(() => {
						setIsSaving("Save Unsuccessful");
						setTimeout(() => {
							setIsSaving("Save");
						}, 1000);
					}, 1000);
				});
		}
	};

	const handleDeleteNote = () => {
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
	};

	const handleCheckNoteSave = () => {
		// TODO: use callback hook here as well
		return new Promise((resolve) => {
			const checkInterval = setInterval(() => {
				let x: Boolean = true;
				setConfirmSave((prev) => {
					x = prev;
					return prev;
				});

				if (!x) {
					clearInterval(checkInterval);
					resolve("resolve confirmed");
				}
			}, 100);
		});
	};

	const sortNotes = () => {
		setRecentResults((prev) => {
			return prev.sort((a, b) => {
				return dayjs(b.date!).valueOf() - dayjs(a.date!).valueOf();
			});
		});
	};

	const handleClear = () => {
		// TODO: what if the note has changed
		setSearchResults([]);
		setEditorValue("");
		setChangeNote(true);
		setCurrNoteID("");
		setCurrNoteValue("");
		title.current!.value = "";
		searchInput.current!.value = "";
		setLastUpdate(null);
	};

	const handleReader = () => {
		if (currNoteID !== "")
			navigate(`${currNoteID}/reader`, {
				state: {
					title: title.current?.value,
					value: editorValue,
				},
			});
	};

	const handleNoteItemClick = useCallback(
		(item: note) => {
			if (currNoteValue !== editorValue) {
				// console.log(editorValue, currNoteValue);
				setConfirmSave(true);
				// console.log(
				// 	"dialog box appears"
				// );

				// function is required so that we can wait until the dialog box
				// disappears and then continue as normal
				// TODO: is there a better way?
				handleCheckNoteSave().then(() => {
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
		},
		[editorValue, currNoteValue]
	);

	const handleCommandClick = (item: command) => {
		setBtnId((prev) => {
			return { id: item.id, status: !prev.status };
		});
	};

	const keyDownHandler = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setShowModalSearch(false);
				setConfirmDelete(false);
				setConfirmSave(false);
			} else if (e.ctrlKey && (e.key === "k" || e.key === "K")) {
				e.preventDefault();
				setShowModalSearch((prev) => !prev);
			} else if (e.ctrlKey && (e.key === "s" || e.key === "S")) {
				e.preventDefault();
				if (title.current?.value) {
					handleNoteSave(title.current?.value, editorValue);
				}
			} else if (
				e.ctrlKey &&
				e.shiftKey &&
				(e.key === "h" || e.key === "H")
			) {
				e.preventDefault();
				setShowSideBar((prev) => !prev);
			}
		},
		[editorValue]
	);

	const keyDownHandlerSave = (e: globalThis.KeyboardEvent) => {
		e.preventDefault();
		if (title.current?.value) {
			handleNoteSave(title.current?.value, editorValue);
		}
	};

	const keyDownHandlerClear = (e: globalThis.KeyboardEvent) => {
		e.preventDefault();
		handleClear();
	};

	const keyDownHandlerReader = (e: globalThis.KeyboardEvent) => {
		e.preventDefault();
		handleReader();
	};

	const keyDownHandlerDelete = (e: globalThis.KeyboardEvent) => {
		e.preventDefault();
		setConfirmDelete(true);
	};

	useEffect(() => {
		setIsLoading(true);
		contentServices
			.post("/search", { searchParam: "date", searchArg: "" })
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
				.post("/search", {
					searchParam: "id",
					searchArg: location.state.noteID,
				})
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

	useEffect(() => {
		window.addEventListener("keydown", keyDownHandler);
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
		};
	}, [keyDownHandler]);

	useHotkeys(["ctrl+s", "ctrl+S"], keyDownHandlerSave);
	useHotkeys(["ctrl+shift+c", "ctrl+shift+C"], keyDownHandlerClear);
	useHotkeys(["ctrl+shift+d", "ctrl+shift+D"], keyDownHandlerDelete);
	useHotkeys(["ctrl+shift+z", "ctrl+shift+Z"], keyDownHandlerReader, [
		currNoteID,
		editorValue,
	]);

	return (
		<div
			className="min-w-screen flex h-screen justify-center"
			// tabIndex is used so that the component can be focused
			tabIndex={0}
		>
			{showModalSearch && (
				<SearchModal
					notesArr={recentResults}
					handleNoteClick={handleNoteItemClick}
					handleCommandClick={handleCommandClick}
					setShowModal={setShowModalSearch}
				/>
			)}
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
				<div className="flex h-screen w-full flex-col items-center border-r-[1px] border-[#484848] bg-[#1e1e1e] sm:w-2/5 md:w-1/3 lg:w-1/4">
					<input
						className="mb-2 mt-8 h-fit w-4/5 rounded-lg bg-[#363636] px-2 py-[7px] text-[17px] font-semibold text-[#dadada]"
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
											searchParam: searchParamValue,
											searchArg:
												searchInput.current?.value,
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
							<div className="mt-2.5 flex w-full items-center justify-between text-sm text-[#a1a1a1]">
								<button
									onClick={() => {
										setSearchParamValue((prev) => {
											if (prev === "title")
												return "content";
											else return "title";
										});
									}}
								>
									{searchParamValue === "title"
										? "Search by Heading"
										: "Search by Content"}
								</button>
							</div>
							<div className="mb-2  flex w-full items-center justify-between">
								<div className="flex whitespace-pre-wrap text-sm text-[#a1a1a1]">
									<button
										className={`${
											selectedOption === 0 &&
											"selectedBtn text-[#dadada]"
										}`}
										onClick={() => setSelectedOption(0)}
									>
										Recents{" "}
									</button>{" "}
									|{" "}
									<button
										className={`${
											selectedOption === 1 &&
											"selectedBtn text-[#dadada]"
										}`}
										onClick={() => setSelectedOption(1)}
									>
										Results{" "}
									</button>
									{/* <button
										className={`${
											selectedOption === 1 &&
											"selectedBtn text-[#dadada]"
										}`}
										onClick={() => {
											setSearchParamValue((prev) => {
												if (prev === "title")
													return "content";
												else return "title";
											});
										}}
									>
										[
										{searchParamValue === "title"
											? "T"
											: "C"}
										]
									</button> */}
								</div>
								<div className="flex whitespace-pre-wrap text-sm text-[#a1a1a1]">
									{/* TODO: change this to a button component */}
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
													handleNoteItemClick(item)
												}
												bgColor={
													currNoteID === item._id
														? "bg-[#4b4b4b]"
														: "bg-[#333333]"
												}
												textA={item.title}
												textB={index + 1}
												keyVal={item._id}
												textC={
													selectedOption === 0
														? "Last Edited : " +
														  dayjs(
																item.date
														  ).format(
																"DD-MMM, HH:mm"
														  )
														: removeHtmlTags(
																item.notesContent
														  )
												}
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
					showSideBar ? "w-0 sm:w-3/5 md:w-2/3 lg:w-3/4" : "w-full"
				}`}
			>
				<Tiptap
					title={title}
					editorValue={editorValue}
					setEditorValue={setEditorValue}
					changeNote={changeNote}
					setChangeNote={setChangeNote}
					btnId={btnId}
				/>
			</div>

			<BottomNavBar
				editorValue={editorValue}
				sideBarText={showSideBar ? "Hide Sidebar" : "Show Sidebar"}
				sideBarFunction={() => {
					setShowSideBar((prev) => !prev);
				}}
				clearText="Clear"
				clearFunction={handleClear}
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
				readingModeText="Zen Mode"
				readingModeFunction={handleReader}
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
