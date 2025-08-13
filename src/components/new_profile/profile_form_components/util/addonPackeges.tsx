import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { AddOns } from './Addons';

interface pageProps {
  setAddOnOpen: Dispatch<SetStateAction<boolean>>;
  addonOpen: boolean;

  setAdditionalAddOn: Dispatch<SetStateAction<string>>;
}

const AddonPackeges: React.FC<pageProps> = ({
  addonOpen,
  setAddOnOpen,

  setAdditionalAddOn,
}) => {
  const toggleSection5 = () => {
    setAddOnOpen(!addonOpen);
  };
  const API_URL = ' https://vsysmalamat-ejh3ftcdbnezhhfv.westus2-01.azurewebsites.net/auth';
  const [data, setPlane] = useState<any[]>([]);
  const [addOnPackages, setAddonPackages] = useState<any[]>([]);

  const getAddonPackages = async () => {
    try {
      const response = await axios.post(`${API_URL}/Get_addon_packages/`);

      const data = Object.values(response.data.data);
      setAddonPackages(data);
    } catch (error) {
      throw error;
    }
  };

  const getPlaneDetais = async () => {
    try {
      const response = await axios.post(`${API_URL}/Get_palns/
  `);
      const data = Object.values(response.data.data);
      setPlane(data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getPlaneDetais();
    getAddonPackages();
  }, []);
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [selectedPackageIds, setSelectedPackageIds] = useState<number[]>([]);

  console.log(selectedPackageIds);
  useEffect(() => {
    setAdditionalAddOn(selectedPackageIds.join(','));
  }, [selectedPackageIds]);

  const handleAddOnChange = (
    rate: number,
    checked: boolean,
    packageId: number,
  ) => {
    if (checked) {
      setSelectedValues([...selectedValues, rate]);
      setSelectedPackageIds([...selectedPackageIds, packageId]);
    } else {
      // Remove rate and package ID from the respective arrays
      const updatedValues = selectedValues.filter((val) => val !== rate);
      const updatedPackageIds = selectedPackageIds.filter(
        (id) => id !== packageId,
      );

      setSelectedValues(updatedValues);
      setSelectedPackageIds(updatedPackageIds);
    }
  };
  console.log(selectedValues, 'selectedAddOns');

  const ResponseStatus = sessionStorage.getItem('responseStatus');
  useEffect(() => {
    if (ResponseStatus == '201') {
      setAddonPackageDetails('');
      setSelectedPackageIds([]);
      setSelectedValues([]);
      setAdditionalAddOn('');
    }
  }, [ResponseStatus]);

  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl cursor-pointer font-semibold dark:text-white "
          onClick={toggleSection5}
        >
          {' '}
          Addon Package
          <svg
            className={`fill-current transform ${
              addonOpen ? 'rotate-180' : ''
            }`}
            width={'20'}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
              fill=""
            ></path>
          </svg>
        </h4>
        {addonOpen && (
          <div>
            <div className="flex w-full flex-row gap-4"></div>
            <div className="flex gap-10">
              <div>
                {addOnPackages.map((packageItem) => (
                  <div className="flex gap-2">
                    <AddOns
                      key={packageItem.package_id}
                      label={packageItem.name}
                      desc={packageItem.description}
                      name={packageItem.name}
                      rate={packageItem.amount}
                      onChange={(rate, checked) =>
                        handleAddOnChange(rate, checked, packageItem.package_id)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddonPackeges;
