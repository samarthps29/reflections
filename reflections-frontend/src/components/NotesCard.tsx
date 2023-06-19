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

	const handleClick = (date: string, notesContent: string) => {
		setIsSaving(true);
		contentServices
			.post("", { date })
			.then((res) => {
				if (res.data.length !== 0) {
					const id = res.data[0]._id;
					contentServices
						.put(id, { notesContent })
						.then(() => {
							setTimeout(() => {
								setIsSaving(false);
							}, 100);
							console.log("Updated Successfully!");
						})
						.catch(() => {
							setTimeout(() => {
								setIsSaving(false);
							}, 100);
							console.log("Could not update the content");
						});
				} else {
					contentServices
						.post("/new", { date, notesContent })
						.then(() => {
							setTimeout(() => {
								setIsSaving(false);
							}, 100);
							console.log("Saved Successfully!");
						})
						.catch(() => {
							setTimeout(() => {
								setIsSaving(false);
							}, 100);
							console.log("Could not save the content");
						});
				}
			})
			.catch(() => {
				console.log("Error");
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
				if (res.data.length !== 0) {
					setTimeout(() => {
						if (res.data[0].notesContent === "") {
							setEditorValue("");
						} else {
							setEditorValue(res.data[0].notesContent);
						}
						setEdit(true);
					}, 100);
				} else {
					setTimeout(() => {
						setEditorValue("");
						setEdit(true);
						console.log("No content for this day yet!");
					}, 100);
				}
			})
			.catch(() => {
				console.log("Error");
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
				if (res.data.length !== 0) {
					setTimeout(() => {
						if (res.data[0].notesContent === "") {
							setEditorValue("");
						} else {
							setEditorValue(res.data[0].notesContent);
						}
						setEdit(true);
					}, 100);
				} else {
					setTimeout(() => {
						setEditorValue("");
						setEdit(true);
						console.log("No content for this day yet!");
					}, 100);
				}
			})
			.catch(() => {
				console.log("Error");
			});
	}, []);

	return (
		<div
			className={`flex h-full w-full flex-col items-center gap-4 bg-[#27282b] px-5 pt-5`}
		>
			<div className="relative flex min-w-full flex-row items-center justify-between px-2 md:px-6">
				<Title title="Notes" />
				<DateSelector handleDateChange={handleDateChange} />
				<ToggleManager
					isSaving={isSaving}
					onClick={() => {
						handleClick(date, notesValue);
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
