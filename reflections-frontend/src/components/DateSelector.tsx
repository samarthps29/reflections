import { ConfigProvider, DatePicker, theme } from "antd";
import dayjs from "dayjs";

type DateSelectorProps = {
	handleDateChange: (e: dayjs.Dayjs | null) => void;
};

const DateSelector = ({ handleDateChange }: DateSelectorProps) => {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					colorInfo: "white",
					colorPrimary: "#7286D3",
					colorTextBase: "white",
					fontSize: 17,
				},
			}}
		>
			<DatePicker
				className="border-1 scale-90 rounded-lg border border-[#222222] bg-transparent py-1 pb-1.5 font-bold hover:translate-y-0 hover:border-[#222222] md:scale-100"
				style={{ width: 123 }}
				defaultValue={dayjs()}
				format="DD-MMM-YYYY"
				onChange={(date) => handleDateChange(date)}
				suffixIcon={null}
				clearIcon={null}
			/>
		</ConfigProvider>
	);
};

export default DateSelector;
