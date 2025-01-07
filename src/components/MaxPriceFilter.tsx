type Props = {
  selectedPrice?: number;
  onChange: (price: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(event.target.value ? parseInt(event.target.value) : 0)
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 110, 120, 200, 300, 500, 2000, 2500].map((price) => (
          <option value={price} key={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};
export default PriceFilter;
