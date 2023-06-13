import dayjs from "dayjs";
import { useEffect, useState } from "react";
import contentServices from "../api/contentServices";
import Title from "./ComponentTitle";
import DateSelector from "./DateSelector";
import Tiptap from "./Tiptap/Tiptap";
import ToggleManager from "./ToggleManager";

const NotesCard = () => {
	const [notesValue, setNotesValue] = useState<string>("");
	const [editorValue, setEditorValue] = useState<string>("");
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
						.catch(() =>
							console.log("Could not update the content")
						);
				}
			})
			.catch(() =>
				contentServices
					.post("/new", { date, notesContent, todoContent })
					.then(() => console.log("Saved Successfully!"))
					.catch(() => console.log("Could not save the content"))
			);
	};

	const handleDateChange = (value: dayjs.Dayjs | null) => {
		const dateChanged = value!.format("YYYY-MM-DD");
		setDate(dateChanged);

		contentServices
			.post("", { date: dateChanged })
			.then((res) => {
				if (res.data[0].notesContent === "") {
					setEditorValue("");
				} else {
					setEditorValue(res.data[0].notesContent);
				}
			})
			.catch(() => {
				setEditorValue("");
				console.log("No content for this day yet!");
			});
	};

	useEffect(() => {
		const dateChanged = dayjs().format("YYYY-MM-DD");
		setDate(dateChanged);
		contentServices
			.post("", { date: dateChanged })
			.then((res) => {
				if (res.data[0].notesContent === "") {
					setEditorValue("");
				} else {
					setEditorValue(res.data[0].notesContent);
				}
			})
			.catch(() => {
				setEditorValue("");
				console.log("No content for this day yet!");
			});
	}, []);

	return (
		<div
			className={`border-1 flex h-full w-full flex-col items-center gap-4 rounded-md bg-[#202123] px-5 pt-5`}
		>
			<div className="relative flex min-w-full flex-row items-center justify-between px-6">
				<Title title="Notes" />
				<DateSelector handleDateChange={handleDateChange} />
				<ToggleManager
					onClick={() => {
						handleClick(date, notesValue, []);
					}}
				/>
			</div>
			<Tiptap editorValue={editorValue} setNotesValue={setNotesValue} />
		</div>
	);
};

export default NotesCard;
