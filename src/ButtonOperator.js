export default function ButtonOperator({ operator, handleOperator }) {
  return (
    <button
      onClick={handleOperator}
      operator={operator}
      className="w-full bg-red-500 hover:bg-red-600 text-3xl text-white rounded shadow-lg"
    >
      {operator}
    </button>
  );
}
