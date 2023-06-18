import { ConfigProvider, DatePicker, theme } from "antd";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { LeftIcon, RightIcon } from "../icons/SVGIcons";

type DateSelectorProps = {
	handleDateChange: (e: dayjs.Dayjs | null) => void;
};

const DateSelector = ({ handleDateChange }: DateSelectorProps) => {
	const datePickerRef = useRef<any>(null);
	const [currDate, setCurrDate] = useState<dayjs.Dayjs>(dayjs());
	const handleDateSelect = (date: dayjs.Dayjs | null) => {
		handleDateChange(date);
		datePickerRef.current?.blur();
		setCurrDate(() => {
			if (date === null) return dayjs();
			else return date;
		});
	};
	return (
		<div className="flex flex-row items-center justify-center">
			<button
				className="-mr-1 opacity-50"
				style={{ marginTop: "0.12em" }}
				onClick={() => handleDateSelect(currDate.add(-1, "day"))}
			>
				<LeftIcon />
			</button>
			<ConfigProvider
				theme={{
					algorithm: theme.darkAlgorithm,
					token: {
						colorInfo: "white",
						colorPrimary: "#b9b0ff",
						// colorTextBase: "white",
						colorText: "#f4f4f4",
						fontSize: 17,
						colorBgElevated: "#1e1f22",
						lineWidth: 0,
						padding: 18,
						paddingXS: 16,
					},
				}}
			>
				<DatePicker
					className="scale-90 rounded-lg bg-transparent font-bold hover:translate-y-0 md:scale-100"
					style={{ width: 129 }}
					value={currDate}
					format="DD-MMM-YYYY"
					onChange={handleDateSelect}
					ref={datePickerRef}
					suffixIcon={null}
					clearIcon={null}
					bordered={false}
					showToday={false}
				/>
			</ConfigProvider>
			<button
				className="opacity-50"
				style={{ marginTop: "0.12em", marginLeft: "-.6rem" }}
				onClick={() => handleDateSelect(currDate.add(+1, "day"))}
			>
				<RightIcon />
			</button>
		</div>
	);
};

export default DateSelector;
