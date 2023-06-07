import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import contentServices from "../api/contentServices";
import { CheckIcon, PlusIcon1 } from "../icons/SVGIcons";
import "../styles/index.css";
import ComponentTitle from "./ComponentTitle";
import DateSelector from "./DateSelector";
import ToggleManager from "./ToggleManager";

const TodoCard = () => {
	const [status, setStatus] = useState(false);
	const [date, setDate] = useState("");
	const [items, setItems] = useState<
		{ id: string; content: string; height: number; done: boolean }[]
	>([]);

	const handleClick = (date: string) => {
		setItems((prevItems) => {
			return prevItems.filter((item) => item.content.trim() !== "");
		});
		contentServices
			.post("", { date })
			.then((res) => {
				const id = res.data[0]._id;
				contentServices
					.put(id, {
						todoContent: items.filter(
							(item) => item.content.trim() !== ""
						),
					})
					.then(() => console.log("Updated Successfully!"))
					.catch((err) => console.log(err));
			})
			.catch(() =>
				contentServices
					.post("/new", {
						date,
						notesContent: "",
						todoContent: items.filter(
							(item) => item.content.trim() !== ""
						),
					})
					.then(() => console.log("Saved Successfully!"))
					.catch((err) => console.log(err))
			);
	};

	const handleDateChange = (value: dayjs.Dayjs | null) => {
		if (date) handleClick(date);
		const dateChanged = value!.format("YYYY-MM-DD");
		setDate(dateChanged);

		contentServices
			.post("", { date: dateChanged })
			.then((res) => {
				setItems(() => res.data[0].todoContent);
				if (res.data[0].todoContent.length === 0) {
					setStatus(false);
					setItems([
						{
							id: uuidV4(),
							content: "",
							height: 77,
							done: false,
						},
					]);
				} else setStatus(true);
			})
			.catch(() => {
				setItems([
					{
						id: uuidV4(),
						content: "",
						height: 77,
						done: false,
					},
				]);
				setStatus(false);
			});
	};

	const handleListUpdate = (
		id: string,
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setItems((items) => {
			return items.map((item) => {
				if (item.id === id)
					return {
						...item,
						content: event.target.value,
						height: event.target.scrollHeight + 5,
					};
				else return item;
			});
		});
		event.target.style.height = "auto";
		event.target.style.height = `${event.target.scrollHeight + 5}px`;
	};

	const addListItem = () => {
		if (
			status ||
			(items.length > 0 && items[items.length - 1].content === "")
		) {
			// do nothing
		} else {
			setItems((prevItems) => {
				return [
					...prevItems,
					{
						id: uuidV4(),
						content: "",
						height: 77,
						done: false,
					},
				];
			});
		}
	};

	useEffect(() => {
		handleDateChange(dayjs());
	}, []);

	return (
		// #191919
		<div
			className={`z-10 flex h-full w-full flex-col items-center gap-4 overflow-auto scroll-smooth rounded-2xl bg-[#222222] p-4`}
		>
			<div className="relative flex min-w-full flex-row items-center justify-center">
				<ComponentTitle title="Todo" />
				<DateSelector handleDateChange={handleDateChange} />
				<ToggleManager
					status={status}
					setStatus={setStatus}
					onClick={() => !status && handleClick(date)}
				/>
			</div>
			<div
				className={`scDiv w-full grow overflow-auto scroll-smooth rounded-md bg-transparent px-2 text-xl font-medium`}
			>
				<ul className="flex flex-col gap-3 pr-2">
					{items.map((item) => {
						if (!item.done) {
							return (
								<div className="relative" key={item.id}>
									<li>
										<textarea
											style={{ height: item.height }}
											value={item.content}
											className={`border-1 w-full resize-none scroll-smooth rounded-xl border border-stone-600 border-opacity-70
											bg-transparent py-2 pl-2 pr-2 font-serif text-lg/[28px] font-medium tracking-tight text-[#E0E5F1] focus:outline-none md:text-xl/[33px]`}
											spellCheck={false}
											disabled={status}
											onChange={(event) =>
												handleListUpdate(item.id, event)
											}
										/>
									</li>
									<button
										className="absolute bottom-4 right-3 pb-0.5 text-sm text-[#d9d1c3]"
										onClick={() => {
											setItems((prevItems) => {
												return prevItems.map(
													(prevItem) => {
														return prevItem.id ===
															item.id
															? {
																	...prevItem,
																	done: !status
																		? !prevItem.done
																		: prevItem.done,
															  }
															: prevItem;
													}
												);
											});
										}}
									>
										{<CheckIcon />}
									</button>
								</div>
							);
						}
					})}
					{items.map((item) => {
						if (item.done) {
							return (
								<div className="relative" key={item.id}>
									<li>
										<textarea
											// #B9B2A6
											style={{ height: item.height }}
											value={item.content}
											className={`border-1 z-10 w-full resize-none scroll-smooth rounded-xl border border-stone-600 border-opacity-70 bg-transparent py-2 pl-2 pr-2 font-serif text-lg/[28px] font-medium tracking-tight text-[#E0E5F1] line-through decoration-[#E0E5F1] decoration-2 focus:outline-none md:text-xl/[33px]`}
											spellCheck={false}
											disabled={item.done}
											onChange={(event) =>
												handleListUpdate(item.id, event)
											}
										/>
									</li>
									<button
										className="absolute bottom-4 right-3 pb-1 text-sm text-[#d9d1c3]"
										onClick={() => {
											setItems((prevItems) => {
												return prevItems.map(
													(prevItem) => {
														return prevItem.id ===
															item.id
															? {
																	...prevItem,
																	done: !status
																		? !prevItem.done
																		: prevItem.done,
															  }
															: prevItem;
													}
												);
											});
										}}
									>
										{<CheckIcon />}
									</button>
								</div>
							);
						}
					})}
				</ul>
				<div className="flex justify-end pr-2.5">
					<button
						className={`border-1 ml-1 mt-3 rounded-lg border border-stone-600 border-opacity-70 p-1 text-sm text-[#E0E5F1]`}
						onClick={addListItem}
					>
						<PlusIcon1 />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TodoCard;
