export default function ButtonNumber({ number, handleNumber }) {
  return (
    <button
      number={number}
      onClick={handleNumber}
      className="flex justify-center items-center w-full bg-blue-500 hover:bg-blue-600 text-3xl text-white rounded shadow-lg transition-all"
    >
      {number}
    </button>
  );
}
