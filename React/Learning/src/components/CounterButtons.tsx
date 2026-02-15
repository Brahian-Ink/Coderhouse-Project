type CounterButtonsProps = {
  onIncrement: () => void;
  onDecrement: () => void;
  disableIncrement: boolean;
  disableDecrement: boolean;
};

export default function CounterButtons({
  onIncrement,
  onDecrement,
  disableDecrement,
  disableIncrement,
}: CounterButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onIncrement}
        disabled={disableIncrement}
        className={`px-4 py-2 rounded text-white
    ${disableIncrement ? "bg-gray-500 cursor-not-allowed"
    : "bg-green-500 cursor-pointer hover:opacity-90"}`}
      >
        +
      </button>

      <button
        onClick={onDecrement}
        disabled={disableDecrement}
        className={`px-4 py-2 rounded text-white
    ${disableDecrement ? "bg-gray-500 cursor-not-allowed"
    : "bg-red-500 cursor-pointer hover:opacity-90"}`}
      >
        -
      </button>
    </div>
  );
}
