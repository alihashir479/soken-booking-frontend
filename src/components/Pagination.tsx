type Props = {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
};
const Pagination = ({ currentPage, pages, onPageChange }: Props) => {
  return (
    <div className="flex gap-2 justify-center">
        <ul className="flex border border-slate-300">
      {Array.from({ length: pages }).map((_, idx) => (
        <li
          className={`py-2 px-4 cursor-pointer ${
            currentPage === idx + 1 ? "pointer-events-none bg-gray-200" : ""
          }`}
          key={idx}
          onClick={() => {
            onPageChange(idx + 1);
          }}
        >
          {idx + 1}
        </li>
      ))}
      </ul>
    </div>
  );
};
export default Pagination;
