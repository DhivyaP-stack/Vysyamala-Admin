import React from 'react';
import Checkbox from '../../PartnerPreference/CheckBox';
import { SelectedStarIdItem } from '../profile_form_components/Partner_preference';

interface MatchingStarsProps {
  initialPoruthas: string;
  starAndRasi: {
    id: string;
    matching_starname: string;
    matching_rasiname: string;
    matching_starId: string;
    matching_rasiId: string;
  }[];
  selectedStarIds: SelectedStarIdItem[];
 
}

const ViewMatchingStars: React.FC<MatchingStarsProps> = ({
  initialPoruthas,
  starAndRasi,
  selectedStarIds,
 
}) => {
  return (
    <div>
      <div className="mb-5">
        <h5 className="text-[18px] text-[#5a5959e6] font-semibold mb-2">
          {initialPoruthas}
        </h5>
        <div className="grid grid-cols-5 grid-rows-1 justify-between text-[#5a5959e6] font-medium items-center gap-x-3 gap-y-2">
          {starAndRasi.map((item, index) => (
            <div key={item.id}>
              <Checkbox
                id={item.id}
                name={`star-${index}`}
                value={`${item.matching_starId} - ${item.matching_rasiId}`}
                label={`${item.matching_starname} - ${item.matching_rasiname}`}
                checked={selectedStarIds.some(
                  (selectedItem) => selectedItem.id === item.id,
                )} // Adjust to check based on object structure
                onChange={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMatchingStars;
