
import React from 'react';
import Checkbox from './CheckBox';
import { SelectedStarIdItem } from '../new_profile/profile_form_components/Partner_preference';

interface MatchingStarsProps {
   unique:string;
  initialPoruthas: string;
  starAndRasi: {
    id: string;
    matching_starname: string;
    matching_rasiname: string;
    matching_starId: string;
    matching_rasiId: string;
  }[];
  selectedStarIds: SelectedStarIdItem[];
  onCheckboxChange: (
    updatedIds: SelectedStarIdItem[],
    rasi: string,
    star: string,
  ) => void;
}

const MatchingStars: React.FC<MatchingStarsProps> = ({
   unique,
  initialPoruthas,
  starAndRasi,
  selectedStarIds,
  onCheckboxChange,
}) => {
  const handleCheckboxChange = (
    id: string,
    rasi: string,
    star: string,
    checked: boolean,
  ) => {
    const updatedIds = checked
      ? [...selectedStarIds, { id, rasi, star, label: `${star} - ${rasi}` }]
      : selectedStarIds.filter((item) => item.id !== id);

    onCheckboxChange(updatedIds, rasi, star);
  };

  const handleSelectAll = () => {
    // Get all IDs in this group
    const currentGroupIds = starAndRasi.map(item => item.id);
    
    // Check if all items in this group are already selected
    const allSelectedInGroup = currentGroupIds.every(id => 
      selectedStarIds.some(selected => selected.id === id)
    );

    let updatedIds: SelectedStarIdItem[];
    
    if (allSelectedInGroup) {
      // Deselect only items in this group
      updatedIds = selectedStarIds.filter(
        item => !currentGroupIds.includes(item.id)
      );
    } else {
      // Select all items in this group, while preserving other selections
      const newSelections = starAndRasi
        .filter(item => !selectedStarIds.some(selected => selected.id === item.id))
        .map(item => ({
          id: item.id,
          rasi: item.matching_rasiId,
          star: item.matching_starId,
          label: `${item.matching_starId} - ${item.matching_rasiId}`
        }));
      
      updatedIds = [...selectedStarIds, ...newSelections];
    }

    onCheckboxChange(updatedIds, '', '');
  };

  // Check if all items in this group are selected (for visual feedback)
  const allSelectedInGroup = starAndRasi.every(item => 
    selectedStarIds.some(selected => selected.id === item.id)
  );

  return (
    <div>
      <div className="mb-5">
        <h5 
          className="text-[18px] text-black font-semibold mb-2 cursor-pointer"  
          onClick={handleSelectAll}
        >
          {initialPoruthas} {allSelectedInGroup ? '✓' : ''}
        </h5>
        <div className="grid grid-cols-5 grid-rows-1 justify-between items-center gap-x-3 gap-y-2">
          {starAndRasi.map((item, index) => (
            <div key={item.id}>
              <Checkbox
               id={`${unique}-${item.id}`}
                name={`star-${index}`}
                value={`${item.matching_starId} - ${item.matching_rasiId}`}
                label={`${item.matching_starname} - ${item.matching_rasiname}`}
                checked={selectedStarIds.some(
                  (selectedItem) => selectedItem.id === item.id,
                )}
                onChange={(e) =>
                  handleCheckboxChange(
                    item.id,
                    item.matching_rasiId,
                    item.matching_starId,
                    e.target.checked,
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingStars;
