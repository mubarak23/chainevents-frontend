function ErrorMessage({ message }) {
  return (
    <div
      className=" bg-[#0D0C0C]  border-l-4  text-white p-4 my-4 rounded"
      role="alert"
    >
      <div className="flex items-center">
        <p className="font-bold">Error</p>
      </div>
      <p className="mt-2">{message}</p>
      <p className="mt-3 text-sm">
        Please try refreshing the page or contact support if the problem
        persists.
      </p>
    </div>
  );
}

export default ErrorMessage;
