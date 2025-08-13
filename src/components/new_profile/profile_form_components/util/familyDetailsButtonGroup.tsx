import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../Fromfield/Inputfield';

// Define the types for family data
export type FamilyType = {
  family_id: string;
  family_description: string;
};

export type FamilyValue = {
  family_value_id: string;
  family_value_name: string;
};

export type FamilyStatus = {
  family_status_id: string;
  family_status_name: string;
};

type FamilyFormProps = {
  familyTypes: FamilyType[];
  familyValues: FamilyValue[];
  familyStatus: FamilyStatus[];
  selectedFamilyType: string;
  setSelectedFamilyType: Dispatch<SetStateAction<string>>;
  selectedFamilyValues: string;
  setSelectedFamilyValues: Dispatch<SetStateAction<string>>;
  selectedFamilyStatus: string;
  setSelectedFamilyStatus: Dispatch<SetStateAction<string>>;
  selectedBrother: number | null;
  setSelectedBrother: Dispatch<SetStateAction<number>>;
  selectedMarriedBrother: number;
  setSelectedMarriedBrother: Dispatch<SetStateAction<number>>;
  selectedSister: number | null;
  setSelectedSister: Dispatch<SetStateAction<number>>;
  selectedMarriedSister: number;
  setSelectedMarriedSister: Dispatch<SetStateAction<number>>;
  setphysicallyChalanged: Dispatch<SetStateAction<string>>;
  physicallyChalanged: string;
  setPropertyDetail: Dispatch<SetStateAction<string>>;
};
type FormValues = {
  physicallyChallenged: string;
  FamilyType: string;
  FamilyValues: string;
  FamilyStatus: string;
  selectedBrother: string;
  selectedSister: string;
  MarriedBrother: number;
  MarriedSister: number;
};
const FamilyForm: React.FC<FamilyFormProps> = ({
  familyTypes,
  familyValues,
  familyStatus,
  selectedFamilyType,
  setSelectedFamilyType,
  selectedFamilyValues,
  setSelectedFamilyValues,
  selectedFamilyStatus,
  setSelectedFamilyStatus,
  selectedBrother,
  setSelectedBrother,
  selectedMarriedBrother,
  setSelectedMarriedBrother,
  selectedSister,
  setSelectedSister,
  selectedMarriedSister,
  setSelectedMarriedSister,
  setphysicallyChalanged,
  physicallyChalanged,
  setPropertyDetail,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const [familType, setFamilyType] = useState<string>('');
  const handleBrotherChange = (num: number) => {
    setSelectedBrother(num);
    // setSelectedMarriedBrother(0); // Reset married brother count when changing brother count
  };

  const handleMarriedBrotherChange = (num: number) =>
    setSelectedMarriedBrother(num);

  const handleSisterChange = (num: number) => {
    setSelectedSister(num);
    // setSelectedMarriedSister(0); // Reset married sister count when changing sister count
  };

  const handleMarriedSisterChange = (num: number) =>
    setSelectedMarriedSister(num);

  const buttonClass = (isSelected: boolean) =>
    isSelected ? 'bg-blue-500 text-white' : '';
  const handleValueSelection = (id: string) => {
    setSelectedFamilyValues(id);
  };

  const handleStatusSelection = (id: string) => {
    setSelectedFamilyStatus(id);
  };
  const handleTypeSelection = (id: string) => {
    setSelectedFamilyType(id);
  };

  useEffect(() => {
    if (physicallyChalanged === '') {
      setError('physicallyChallenged', {
        type: 'manual',
        message: 'This field is required',
      });
    }
    if (selectedFamilyType === '') {
      setError('FamilyType', {
        type: 'manual',
        message: 'This field is required',
      });
    }
    if (selectedFamilyValues === '') {
      setError('FamilyValues', {
        type: 'manual',
        message: 'This field is required',
      });
    }

    if (selectedFamilyStatus === '') {
      setError('FamilyStatus', {
        type: 'manual',
        message: 'This field is required',
      });
    }
    if (selectedBrother === null) {
      setError('selectedBrother', {
        type: 'manual',
        message: 'This field is required',
      });
    }
    if (selectedSister === null) {
      setError('selectedSister', {
        type: 'manual',
        message: 'This field is required',
      });
    }
    if (selectedMarriedBrother === null) {
      setError('MarriedBrother', {
        type: 'manual',
        message: 'This field is required',
      });
    }
    if (selectedMarriedSister === null) {
      setError('MarriedSister', {
        type: 'manual',
        message: 'This field is required',
      });
    }
  }, [
    physicallyChalanged,
    selectedFamilyStatus,
    selectedFamilyValues,
    selectedFamilyType,
    selectedBrother,
    selectedSister,
    setError,
    selectedMarriedBrother,
    selectedMarriedSister,
  ]);
  console.log(selectedMarriedSister, 'selectedMarriedSister');
  useEffect(() => {
    if (physicallyChalanged) {
      clearErrors('physicallyChallenged');
    }
    if (selectedFamilyType) {
      clearErrors('FamilyType');
    }
    if (selectedFamilyValues) {
      clearErrors('FamilyValues');
    }
    if (selectedFamilyStatus) {
      clearErrors('FamilyStatus');
    }
    if (selectedBrother) {
      clearErrors('selectedBrother');
    }
    if (selectedSister) {
      clearErrors('selectedSister');
    }
    if (
      typeof selectedMarriedBrother !== 'undefined' &&
      selectedMarriedBrother !== null
    ) {
      clearErrors('MarriedBrother');
    }

    if (
      typeof selectedMarriedSister !== 'undefined' &&
      selectedMarriedSister !== null
    ) {
      clearErrors('MarriedSister');
    }
    console.log(selectedMarriedSister, 'selectedMarriedSister');
  }, [
    physicallyChalanged,
    selectedFamilyValues,
    selectedFamilyType,
    clearErrors,
    selectedBrother,
    selectedFamilyStatus,
    selectedSister,
    selectedMarriedBrother,
    selectedMarriedSister,
  ]);

  return (
    <div>
      <div className="flex w-full flex-row gap-4">
        <div className="w-full py-1">
          <label className="block text-black font-medium mb-1">
            Family Type
          </label>
          <div className="w-full inline-flex rounded">
            {familyTypes.map((type) => (
              <button
                key={type.family_id}
                type="button"
                className={`w-full px-5 py-3 text-sm font-medium border ${
                  selectedFamilyType === type.family_id
                    ? 'bg-blue-500 text-white'
                    : ''
                }`}
                onClick={() => handleTypeSelection(type.family_id)}
              >
                {type.family_description}
              </button>
            ))}
          </div>
          {errors.FamilyType && (
            <p className="text-red-600">{errors.FamilyType.message}</p>
          )}
        </div>

        <div className="w-full py-1">
          <label className="block text-black font-medium mb-1">
            Family Value
          </label>
          <div className="w-full inline-flex rounded">
            {familyValues.map((value) => (
              <button
                key={value.family_value_id}
                type="button"
                className={`w-full px-5 py-3 text-sm font-medium border ${
                  selectedFamilyValues === value.family_value_id
                    ? 'bg-blue-500 text-white'
                    : ''
                }`}
                onClick={() => handleValueSelection(value.family_value_id)}
              >
                {value.family_value_name}
              </button>
            ))}
          </div>
          {errors.FamilyValues && (
            <p className="text-red-600">{errors.FamilyValues.message}</p>
          )}
        </div>
      </div>

      <div className="w-full py-1">
        <label className="block text-black font-medium mb-1">
          Family Status
        </label>
        <div className="w-full inline-flex rounded">
          {familyStatus.map((status) => (
            <button
              key={status.family_status_id}
              type="button"
              className={`w-full px-5 py-3 text-sm font-medium border ${
                selectedFamilyStatus === status.family_status_id
                  ? 'bg-blue-500 text-white'
                  : ''
              }`}
              onClick={() => handleStatusSelection(status.family_status_id)}
            >
              {status.family_status_name}
            </button>
          ))}
        </div>
        {errors.FamilyStatus && (
          <p className="text-red-600">{errors.FamilyStatus.message}</p>
        )}
      </div>

      <div className="mt-3 flex items-center space-x-48">
        <div>
          <h1 className="block text-black font-medium mb-1">Brother</h1>
          <div className="flex flex-col">
            <div className="inline-flex rounded">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`px-5 py-3 text-sm font-medium border ${buttonClass(
                    selectedBrother === num,
                  )}`}
                  onClick={() => handleBrotherChange(num)}
                >
                  {num === 5 ? '5+' : num}
                </button>
              ))}
            </div>
          </div>
          {errors.selectedBrother && (
            <p className="text-red-600">{errors.selectedBrother.message}</p>
          )}
        </div>

        {selectedBrother !== null && selectedBrother > 0 && (
          <div>
            <h1 className="mb-3">Married</h1>
            <div className="flex flex-col">
              <div className="inline-flex rounded">
                {[...Array(Math.min(selectedBrother + 1, 6)).keys()].map(
                  (num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-10 py-3 text-sm font-medium border ${buttonClass(
                        selectedMarriedBrother === num,
                      )}`}
                      onClick={() => handleMarriedBrotherChange(num)}
                    >
                      {num === 5 ? '5+' : num}
                    </button>
                  ),
                )}
              </div>
            </div>
            {errors.MarriedBrother && (
              <p className="text-red-600">{errors.MarriedBrother.message}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center space-x-48">
        <div>
          <h1 className="block text-black font-medium mb-1">Sister</h1>
          <div className="flex flex-col">
            <div className="inline-flex rounded">
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={`px-5 py-3 text-sm font-medium border ${buttonClass(
                    selectedSister === num,
                  )}`}
                  onClick={() => handleSisterChange(num)}
                >
                  {num === 5 ? '5+' : num}
                </button>
              ))}
            </div>
          </div>
          {errors.selectedSister && (
            <p className="text-red-600">{errors.selectedSister.message}</p>
          )}
        </div>

        {selectedSister !== null && selectedSister > 0 && (
          <div>
            <h1 className="mb-3">Married</h1>
            <div className="flex flex-col">
              <div className="inline-flex rounded">
                {[...Array(Math.min(selectedSister + 1, 6)).keys()].map(
                  (num) => (
                    <button
                      key={num}
                      type="button"
                      className={`px-10 py-3 text-sm font-medium border ${buttonClass(
                        selectedMarriedSister === num,
                      )}`}
                      onClick={() => handleMarriedSisterChange(num)}
                    >
                      {num === 5 ? '5+' : num}
                    </button>
                  ),
                )}
              </div>
            </div>
            {errors.MarriedSister && (
              <p className="text-red-600">{errors.MarriedSister.message}</p>
            )}
          </div>
        )}
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className="w-full py-1">
          <label className="block text-black font-medium mb-1">
            Physically Challenged
          </label>

          <input
            type="radio"
            value="Yes"
            onChange={(e) => setphysicallyChalanged(e.target.value)}
            name="physicallyChalanged"
          />

          <label className="text-black px-4">Yes</label>

          <input
            type="radio"
            value="No"
            onChange={(e) => setphysicallyChalanged(e.target.value)}
            name="physicallyChalanged"
          />
          <label className="text-black px-4">No</label>

          {/* Error Message */}
          {errors.physicallyChallenged && (
            <p className="text-red-600">
              {errors.physicallyChallenged.message}
            </p>
          )}
        </div>

        {physicallyChalanged === 'Yes' ? (
          <div className="w-full">
            <Input label={'challenged detail'} type={'text'} />
          </div>
        ) : (
          ''
        )}
        <div className="w-full">
          <Input
            onChange={(e) => setPropertyDetail(e.target.value)}
            label={'Property Details'}
            type={'text'}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;
