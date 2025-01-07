import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5 bg-white">
      <h5 className="text-md font-semibold pb-2">Facilities</h5>
      {hotelFacilities.map((hotelFacility) => (
        <label className="flex items-center space-x-2" key={hotelFacility}>
          <input
            type="checkbox"
            className="rounded"
            value={hotelFacility}
            checked={selectedFacilities.includes(hotelFacility)}
            onChange={onChange}
          />
          <span>{hotelFacility} stars</span>
        </label>
      ))}
    </div>
  );
};
export default FacilitiesFilter;
