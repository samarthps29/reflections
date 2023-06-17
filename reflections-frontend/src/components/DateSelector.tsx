import { ConfigProvider, DatePicker, theme } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";

type DateSelectorProps = {
	handleDateChange: (e: dayjs.Dayjs | null) => void;
};

const DateSelector = ({ handleDateChange }: DateSelectorProps) => {
	const datePickerRef = useRef<any>(null);
	const handleDateSelect = (date: dayjs.Dayjs | null) => {
		handleDateChange(date);
		datePickerRef.current?.blur();
	};
	return (
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
				className="rounded-lg bg-transparent font-bold hover:translate-y-0 scale-90 md:scale-100"
				style={{ width: 129 }}
				defaultValue={dayjs()}
				format="DD-MMM-YYYY"
				onChange={handleDateSelect}
				ref={datePickerRef}
				suffixIcon={null}
				clearIcon={null}
				bordered={false}
				showToday={false}
			/>
		</ConfigProvider>
	);
};

export default DateSelector;
