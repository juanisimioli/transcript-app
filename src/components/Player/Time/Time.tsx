import { formatTime } from "@/utils/utils";

const Time = ({ time }: { time: number }) => (
  <span className="w-14">{formatTime(time)}</span>
);

export default Time;
