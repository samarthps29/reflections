import { useEffect, useRef, useState } from "react";
import { note } from "../pages/NotesPage";
import { commandsArr } from "../constants/Commands";
import { command } from "../constants/Commands";

export type dataItem = {
	title: string;
	type: string;
} & Partial<note> &
	Partial<command>;

type SearchModalProps = {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	notesArr: note[];
	handleNoteClick: (item: note) => void;
	handleCommandClick: (item: command) => void;
};

const SearchModal = ({
	notesArr,
	handleNoteClick,
	handleCommandClick,
	setShowModal,
}: SearchModalProps) => {
	const [data, setData] = useState<dataItem[]>([]);
	const [dataArr, setDataArr] = useState<dataItem[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [selectedItemIndex, setSelectedItemIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const searchRef = useRef<HTMLInputElement>(null);
	const scrollContainer = document.getElementById("scrollContainer");
	let itemElement;

	// dataArr is the combination of notes and commands
	// data is the filtered list from dataArr based on search query

	function convertToNote(item: dataItem) {
		let temp: note = {
			_id: "",
			date: null,
			title: "",
			notesContent: "",
		};
		temp._id = item._id!;
		temp.title = item.title;
		temp.notesContent = item.notesContent!;
		temp.date = item.date!;
		return temp;
	}

	function convertToCommand(item: dataItem) {
		let temp: command = {
			id: "",
			title: "",
			description: "",
		};
		temp.id = item.id!;
		temp.title = item.title;
		temp.description = item.description!;
		return temp;
	}

	function keyDownHandler(e: KeyboardEvent) {
		let dataArrLocal: dataItem[];
		setData((prev) => {
			dataArrLocal = prev;
			return prev;
		});
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setSelectedItemIndex((prev) => {
					if (prev === dataArrLocal.length - 1) return prev;
					else return prev + 1;
				});
				break;
			case "ArrowUp":
				e.preventDefault();
				setSelectedItemIndex((prev) => {
					if (prev === 0) return prev;
					else return prev - 1;
				});
				break;
			// case "Enter":
			// 	e.preventDefault();
			// 	setSelectedItemIndex((prev) => {
			// 		// console.log(dataArrLocal);
			// 		if (dataArrLocal[prev].type === "note") {
			// 			handleNoteClick(convertToNote(dataArrLocal[prev]));
			// 		} else {
			// 			handleCommandClick(
			// 				convertToCommand(dataArrLocal[prev])
			// 			);
			// 			// console.log(dataArrLocal[prev].id!);
			// 			// setBtnId(dataArrLocal[prev].id!);
			// 		}
			// 		setShowModal(false);
			// 		return prev;
			// 	});
			// 	break;
			case "Enter":
				e.preventDefault();
				console.log(data);
				if (data[selectedItemIndex].type === "note") {
					handleNoteClick(convertToNote(data[selectedItemIndex]));
				} else {
					handleCommandClick(
						convertToCommand(data[selectedItemIndex])
					);
				}
				setShowModal(false);
				break;
		}
	}
	
	useEffect(() => {
		setDataArr([
			...notesArr.map((item) => {
				return { ...item, type: "note" };
			}),
			...commandsArr.map((item) => {
				return { ...item, type: "command" };
			}),
		]);
		setDataArr((prev) => {
			setData(prev);
			setIsLoading(false);
			return prev;
		});
	}, []);

	useEffect(() => {
		if (searchRef.current) searchRef.current.focus();
	}, []);

	useEffect(() => {
		setData(
			dataArr.filter((item: dataItem) => {
				if (
					item.title.toLowerCase().includes(searchValue.toLowerCase())
				)
					return true;
				else return false;
			})
		);
		setSelectedItemIndex(0);
	}, [searchValue]);

	useEffect(() => {
		itemElement = document.getElementById(`item-${selectedItemIndex}`);
		// console.log(itemElement);
		if (itemElement) {
			const rect = itemElement.getBoundingClientRect();
			// console.log(scrollContainer);
			// console.log(rect, scrollContainer?.offsetHeight);
			const isInView =
				rect.top >= 128 &&
				rect.bottom - 128 <= scrollContainer?.offsetHeight!;

			if (!isInView) {
				// Scroll only if the selected item is outside the current view
				itemElement.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
				});
			}
		}
	}, [selectedItemIndex]);

	useEffect(() => {
		window.addEventListener("keydown", keyDownHandler);
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
		};
	}, []);

	return (
		<div
			className="fixed z-10 flex h-screen w-screen justify-center bg-black/[80%]"
			// onKeyDown={keyDownHandler}
		>
			<div className="mt-12 flex h-[70%] w-1/2 flex-col items-center gap-4 rounded-lg bg-[#333333] p-4">
				<input
					type="text"
					className="flex h-14 w-full items-center rounded-lg bg-[#1e1e1e] px-4 py-3	 text-white"
					ref={searchRef}
					placeholder="Search"
					value={searchValue}
					onChange={(e) => {
						setSearchValue(e.target.value);
					}}
				/>
				<div
					className="customScroll flex h-full w-full flex-col overflow-y-auto "
					id="scrollContainer"
				>
					{isLoading ? (
						<div>Loading</div>
					) : (
						data.map((item, index) => {
							return (
								<div
									id={`item-${index}`}
									key={index}
									className={`mb-2 w-full items-start justify-center rounded-lg ${
										index === selectedItemIndex
											? "bg-[#4b4b4b]"
											: ""
									} px-2 py-2 hover:bg-[#4b4b4b]`}
									onClick={() => {
										if (item.type === "note") {
											handleNoteClick(
												convertToNote(item)
											);
										} else {
											handleCommandClick(
												convertToCommand(item)
											);
											// setBtnId(item.id!);
										}
										setShowModal(false);
									}}
								>
									<div className="flex justify-between ">
										<p className="text-[#e5e2e2]">
											{`(${item.type}) ` +
												`${
													item.type === "note"
														? item.title
														: item.description
												}`}
										</p>
										<p className="text-[#e5e2e2]">
											{`${
												item.type === "note"
													? item.date
													: item.title
											}`}
										</p>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
