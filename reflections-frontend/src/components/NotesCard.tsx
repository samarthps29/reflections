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
	const [isSaving, setIsSaving] = useState(false);
	const [edit, setEdit] = useState(false);

	const handleClick = (
		date: string,
		notesContent: string,
		todoContent: { id: number; content: string }[]
	) => {
		setIsSaving(true);
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
				setTimeout(() => {
					setIsSaving(false);
				}, 1000);
			})
			.catch(() => {
				contentServices
					.post("/new", { date, notesContent, todoContent })
					.then(() => console.log("Saved Successfully!"))
					.catch(() => console.log("Could not save the content"));
				setTimeout(() => {
					setIsSaving(false);
				}, 1000);
			});
	};

	const handleDateChange = (value: dayjs.Dayjs | null) => {
		const dateChanged = value!.format("YYYY-MM-DD");
		setDate(dateChanged);
		setEdit(false);
		setEditorValue("<p>Loading...</p>");
		contentServices
			.post("", { date: dateChanged })
			.then((res) => {
				setTimeout(() => {
					if (res.data[0].notesContent === "") {
						setEditorValue("");
					} else {
						setEditorValue(res.data[0].notesContent);
					}
					setEdit(true);
				}, 1000);
			})
			.catch(() => {
				setTimeout(() => {
					setEditorValue("");
					setEdit(true);
					console.log("No content for this day yet!");
				}, 1000);
			});
	};

	useEffect(() => {
		const dateChanged = dayjs().format("YYYY-MM-DD");
		setDate(dateChanged);
		setEdit(false);
		setEditorValue("<p>Loading...</p>");
		contentServices
			.post("", { date: dateChanged })
			.then((res) => {
				setTimeout(() => {
					if (res.data[0].notesContent === "") {
						setEditorValue("");
					} else {
						setEditorValue(res.data[0].notesContent);
					}
					setEdit(true);
				}, 1000);
			})
			.catch(() => {
				setTimeout(() => {
					setEditorValue("");
					setEdit(true);
					console.log("No content for this day yet!");
				}, 1000);
			});
	}, []);

	return (
		<div
			className={`border-1 flex h-full w-full flex-col items-center gap-4 bg-[#202123] px-5 pt-5`}
		>
			<div className="relative flex min-w-full flex-row items-center justify-between px-6">
				<Title title="Notes" />
				<DateSelector handleDateChange={handleDateChange} />
				<ToggleManager
					isSaving={isSaving}
					onClick={() => {
						handleClick(date, notesValue, []);
					}}
				/>
			</div>
			<Tiptap
				editorValue={editorValue}
				setNotesValue={setNotesValue}
				edit={edit}
			/>
		</div>
	);
};

export default NotesCard;
