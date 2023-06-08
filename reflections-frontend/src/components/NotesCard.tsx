import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import contentServices from "../api/contentServices";
import ComponentTitle from "./ComponentTitle";
import DateSelector from "./DateSelector";
import ToggleManager from "./ToggleManager";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const NotesCard = () => {
	const notesRef = useRef<HTMLTextAreaElement>(null);
	const [notesValue, setNotesValue] = useState("");
	const [status, setStatus] = useState(false);
	const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

	const handleClick = (
		date: string,
		notesContent: string,
		todoContent: { id: number; content: string }[]
	) => {
		setNotesValue(() => {
			if (notesContent) {
				return notesContent;
			} else return "";
		});
		contentServices
			.post("", { date })
			.then((res) => {
				const id = res.data[0]._id;
				contentServices
					.put(id, { notesContent })
					.then(() => console.log("Updated Successfully!"))
					.catch(() => console.log("Could not update content"));
			})
			.catch(() =>
				contentServices
					.post("/new", { date, notesContent, todoContent })
					.then(() => console.log("Saved Successfully!"))
					.catch(() => console.log("Could not update content"))
			);
	};

	const handleDateChange = (value: dayjs.Dayjs | null) => {
		if (notesRef && notesRef.current) {
			handleClick(date, notesRef.current?.value, []);
		}
		const dateChanged = value!.format("YYYY-MM-DD");
		setDate(dateChanged);

		contentServices
			.post("", { date: dateChanged })
			.then((res) => {
				if (res.data[0].notesContent === "") {
					if (notesRef && notesRef.current) {
						notesRef.current.value = "";
					}
					setNotesValue("");
					setStatus(false);
				} else {
					if (notesRef && notesRef.current) {
						notesRef.current.value = res.data[0].notesContent;
					}
					setNotesValue(res.data[0].notesContent);
					setStatus(true);
				}
			})
			.catch(() => {
				if (notesRef && notesRef.current) {
					notesRef.current.value = "";
				}
				setNotesValue("");
				setStatus(false);
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
					if (notesRef && notesRef.current) {
						notesRef.current.value = "";
					}
					setNotesValue("");
					setStatus(false);
				} else {
					if (notesRef && notesRef.current) {
						notesRef.current.value = res.data[0].notesContent;
					}
					setNotesValue(res.data[0].notesContent);
					setStatus(true);
				}
			})
			.catch(() => {
				if (notesRef && notesRef.current) {
					notesRef.current.value = "";
				}
				setNotesValue("");
				setStatus(false);
				console.log("No content for this day yet!");
			});
	}, []);

	return (
		<div
			className={`flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-[#222222] p-4`}
		>
			<div className="relative flex min-w-full flex-row items-center justify-center">
				<ComponentTitle title="Notes" />
				<DateSelector handleDateChange={handleDateChange} />
				<ToggleManager
					status={status}
					setStatus={setStatus}
					onClick={() => {
						if (notesRef && notesRef.current)
							handleClick(date, notesRef.current!.value, []);
					}}
				/>
			</div>
			{status ? (
				<ReactMarkdown
					className={`customScroll h-full w-full resize-none overflow-auto scroll-smooth whitespace-pre-line rounded-md bg-transparent py-2 pl-3 pr-3 text-start font-serif text-lg/[28px] font-medium tracking-normal text-[#E0E5F1] focus:outline-none md:text-xl/[35px]`}
					components={{
						h1: ({ children }) => (
							<span className="text-start font-serif text-4xl tracking-normal text-[#E0E5F1]">
								{children}
							</span>
						),
						h2: ({ children }) => (
							<span className="text-start font-serif text-3xl tracking-normal text-[#E0E5F1]">
								{children}
							</span>
						),
						h3: ({ children }) => (
							<span className="text-start font-serif text-2xl tracking-normal text-[#E0E5F1]">
								{children}
							</span>
						),
					}}
				>
					{notesValue}
				</ReactMarkdown>
			) : (
				<textarea
					className={`h-full w-full resize-none scroll-smooth rounded-md bg-transparent py-2 pl-3 pr-3 font-serif text-lg/[28px] font-medium text-[#E0E5F1] focus:outline-none md:text-xl/[35px]`}
					style={{ minHeight: "32vh" }}
					defaultValue={notesValue}
					ref={notesRef}
					spellCheck={false}
					required
				/>
			)}
		</div>
	);
};

export default NotesCard;
