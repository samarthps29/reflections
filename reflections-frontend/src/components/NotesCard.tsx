import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import DateSelector from "./DateSelector";
import Locker from "./ToggleManager";
import Title from "./ComponentTitle";
import contentServices from "../api/contentServices";

const NotesCard = () => {
	const notesRef = useRef<HTMLTextAreaElement>(null);
	const [status, setStatus] = useState(false);
	const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

	const handleClick = (
		date: string,
		notesContent: string,
		todoContent: { id: number; content: string }[]
	) => {
		contentServices
			.post("", { date })
			.then((res) => {
				const id = res.data[0]._id;
				if (notesContent != "") {
					contentServices
						.put(id, { notesContent })
						.then(() => console.log("Updated Successfully!"))
						.catch(() => console.log("Could not update content"));
				}
			})
			.catch(() =>
				contentServices
					.post("/new", { date, notesContent, todoContent })
					.then(() => console.log("Saved Successfully!"))
					.catch(() => console.log("Could not update content"))
			);
	};

	const handleDateChange = (value: dayjs.Dayjs | null) => {
		handleClick(date, notesRef.current!.value, []);
		const dateChanged = value!.format("YYYY-MM-DD");
		setDate(dateChanged);

		contentServices
			.post("", { date: dateChanged })
			.then((res) => {
				if (res.data[0].notesContent === "") {
					notesRef.current!.value = "";
					setStatus(false);
				} else {
					notesRef.current!.value = res.data[0].notesContent;
					setStatus(true);
				}
			})
			.catch(() => {
				notesRef.current!.value = "";
				setStatus(false);
				console.log("No content for this day yet!");
			});
	};

	useEffect(() => {
		handleDateChange(dayjs());
	}, []);

	return (
		//#171010
		// #191919
		<div
			className={`flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-[#222222] p-4`}
		>
			<div className="relative flex min-w-full flex-row items-center justify-center">
				<Title title="Notes" />
				<DateSelector handleDateChange={handleDateChange} />
				<Locker
					status={status}
					setStatus={setStatus}
					onClick={() =>
						handleClick(date, notesRef.current!.value, [])
					}
				/>
			</div>
			<textarea
				// #F7EFE5
				// #ECF2FF
				className={`z-10 w-full resize-none scroll-smooth rounded-md bg-transparent py-2 pl-3 pr-3 font-serif text-lg/[28px] font-medium text-[#E0E5F1] focus:outline-none md:text-xl/[35px]`}
				style={{ minHeight: "32vh" }}
				ref={notesRef}
				disabled={status}
				spellCheck={false}
				required
			/>
		</div>
	);
};

export default NotesCard;
