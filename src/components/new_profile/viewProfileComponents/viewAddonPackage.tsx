import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddOnView } from './AddOnView';

interface pageProps {
  profile:any
}
const ViewAddonPackage: React.FC<pageProps> = ({profile}) => {

  const API_URL = ' https://app.vysyamala.com/auth';
  const [data, setPlane] = useState<any[]>([]);
  const [addOnPackages, setAddonPackages] = useState<any[]>([]);
const [addOnDetails,setAddonDetails]=useState([])

console.log(profile);

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
  const [selectedPlane, setSelectedPlane] = useState({
    plan_id: '',
    plan_price: '',
  });
  console.log(
    selectedPackageIds,
    selectedPlane,
    'selectedPlaneselectedPlaneselectedPlaneselectedPlane',
  );
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [plan_id, plan_price] = e.target.value.split('|');
    setSelectedPlane({
      plan_id,
      plan_price,
    });
  };
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
  const totalAmount = selectedValues.reduce(
    (acc, val) => acc + val,
    Number(selectedPlane.plan_price),
  );

  console.log(selectedPlane, 'selectedPlaneselectedPlane');
  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl cursor-pointer font-semibold dark:text-white "
         
        >
          {' '}
          Addon Package
          <svg
           
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
       
          <div>
            <div className="flex w-full flex-row gap-4">
              <div className="w-1/2">
                <label className="block text-black font-medium mb-1">
                  Gold <span className="text-red-500">*</span>
                </label>
                <select
                  onChange={handleChange}
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                >
                  <option value="" disabled>
                    Select your plane Detail
                  </option>
                  {data[0]?.map((option: any) => (
                    <option
                      key={option.feature_id}
                      value={`${option.plan_id}|${option.plan_price}`}
                    >
                      {option.feature_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-black font-medium mb-1">
                  Platinum
                  <span className="text-red-500">*</span>
                </label>
                <select
                  onChange={handleChange}
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                >
                  <option value="" disabled>
                    Select your plane Detail
                  </option>
                  {data[1]?.map((option: any) => (
                    <option
                      key={option.feature_id}
                      value={`${option.plan_id}|${option.plan_price}`}
                    >
                      {option.feature_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full flex-row gap-4">
                  <div className="w-1/2">
                    <label className="block text-black font-medium mb-1">
                      Platinum Private
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      onChange={handleChange}
                      className="outline-none w-full px-4 py-2 border border-black rounded"
                    >
                      <option value="" disabled>
                        Select your plane Detail
                      </option>
                      {data[2]?.map((option: any) => (
                        <option
                          value={`${option.plan_id}|${option.plan_price}`}
                          key={option.feature_id}
                        >
                          {option.feature_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="block text-black font-medium mb-1">
                      Diamond
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      onChange={handleChange}
                      className="outline-none w-full px-4 py-2 border border-black rounded"
                    >
                      <option value="" disabled>
                        Select your plane Detail
                      </option>
                      {data[3]?.map((option: any) => (
                        <option
                          key={option.feature_id}
                          value={`${option.plan_id}|${option.plan_price}`}
                        >
                          {option.feature_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-10">
              <div >
                {addOnPackages.map((packageItem) => (
                  <div  key={packageItem.package_id} className="flex gap-2">
                    <AddOnView
                      key={packageItem.package_id}
                      label={packageItem.name}
                      desc={packageItem.description}
                      name={packageItem.name}
                      rate={packageItem.amount}
                     
                    />
                  </div>
                ))}
              </div>
              <div>
                <h4>total amount:{totalAmount}</h4>
              </div>
            </div>
          </div>
       
      </div>
    </div>
  );
};

export default ViewAddonPackage;
