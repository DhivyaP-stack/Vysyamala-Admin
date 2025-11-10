
import { Dispatch, SetStateAction, useEffect, useState, } from 'react';


import axios from 'axios';
import { useFormContext } from 'react-hook-form';


import { useQuery } from '@tanstack/react-query';
import { fetchFamilyStatuses, getFamilyStatus, getStatus } from '../../../action';
import { profileView } from '../../../types/EditProfilrSchema';


interface pageProps {
  error: any;
  EditData: any;
  isViewDetais: boolean;
  setViewDetail: Dispatch<SetStateAction<boolean>>;
}




export interface AddOnPackage {
  package_id: number,
  name: string,
  description: string,
  amount: number
}


interface Alert {
  id: number;
  alert_name: string;
}

interface AlertSettingsResponse {
  status: string;
  message: string;
  data: {
    'Email Alerts': Alert[];
    'SMS Alerts': Alert[];
  };
}






const ProfileView: React.FC<pageProps> = ({ isViewDetais, setViewDetail, EditData }) => {

  // const methods = useFormContext();

  // if (!methods) {
  //   console.error("useFormContext() returned null. Ensure ProfileView is inside a FormProvider.");
  //   return null; // Prevents rendering if not wrapped properly
  // }



  // const{setValue,watch,register,  getValues,formState: { errors }}=methods

  const { setValue, watch, register, getValues, formState: { errors } } = useFormContext<profileView>()

  const [addonPackage, setAddonPackage] = useState<AddOnPackage[]>([])
  const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
  const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
  const [checkedAddOnPackage, setCheckedAddOnPackage] = useState('')
  const [, setCheckedEmailAlert] = useState('')
  const [, setCheckSmsAlert] = useState('')

  // const { data: AddOnPackage= [] } = useQuery({
  //   queryKey: ['AddOnPackage'],
  //   queryFn: fetchAddOnPackage,
  // });

  const profileName = watch('profileView.Profile_name')
  const profileId = watch('profileView.ProfileId')
  const Mobile_no = watch('profileView.Mobile_no')
  const suya_gothram = watch('profileView.suya_gothram')
  const profile_completion = watch('profileView.profile_completion')
  const Registration_Date = watch('profileView.DateOfJoin')
  useEffect(() => {
    if (EditData) {
      setValue('profileView.Profile_name', EditData[6].Profile_name || '')
      setValue('profileView.ProfileId', EditData[6].ProfileId || '')
      setValue('profileView.Mobile_no', EditData[6].Mobile_no || '')
      setValue('profileView.suya_gothram', EditData[6].suya_gothram || '')
      setValue('profileView.profile_completion', EditData[6].profile_completion || '')
      setValue('profileView.status', EditData[6].status || '')
      setValue('profileView.family_status', EditData[6].family_status || '')
      setValue('profileView.calc_chevvai_dhosham', EditData[6].calc_chevvai_dhosham || '')
      setValue('profileView.calc_raguketu_dhosham', EditData[6].calc_raguketu_dhosham || '')
      setValue('profileView.horoscope_hints', EditData[6].horoscope_hints || '')
      setValue('profileView.Admin_comments', EditData[6].Admin_comments || '')

      if (EditData[6]?.DateOfJoin) {
        // Assuming EditData[6].DateOfJoin is like "2023-05-07T00:00:00"
        const dateOfJoin = new Date(EditData[6].DateOfJoin);
        const formattedDate = dateOfJoin.toISOString().split('T')[0]; // '2023-05-07'
        console.log(formattedDate)
        // Set the value for the date input
        setValue('profileView.DateOfJoin', formattedDate);
      }

      setValue('profileView.Addon_package', EditData[6].Addon_package)
      setValue('profileView.Notifcation_enabled', EditData[6].Notifcation_enabled)
      setCheckedAddOnPackage(EditData[6].Addon_package)
      setCheckSmsAlert(EditData[6].Notifcation_enabled)
      setCheckedEmailAlert(EditData[6].Notifcation_enabled)

    }
  }, [EditData, setValue])

  // const handleEmailAlert = (id: number) => {
  //   let currentMarriedStatus = checkEmailAlert
  //     ? checkEmailAlert.split(',')
  //     : [];

  //   const index = currentMarriedStatus.indexOf(`${id}`);

  //   if (index === -1) {
  //     // Add the status to the list
  //     currentMarriedStatus.push(`${id}`);
  //   } else {
  //     // Remove the status from the list
  //     currentMarriedStatus.splice(index, 1);
  //   }

  //   // Filter out any empty values and join them without extra commas
  //   const updatedValue=currentMarriedStatus.filter(Boolean).join(',')
  //   setCheckedEmailAlert(updatedValue);
  // };
  // Handle checkbox selection and update form state
  const handleEmailAlert = (id: number) => {
    let currentAlerts = getValues("profileView.Notifcation_enabled") || "";

    // Ensure it's a string before splitting
    let alertArray = typeof currentAlerts === "string" ? currentAlerts.split(",") : [];

    if (alertArray.includes(`${id}`)) {
      // Remove the alert if already selected
      alertArray = alertArray.filter(alertId => alertId !== `${id}`);
    } else {
      // Add the alert if not selected
      alertArray.push(`${id}`);
    }

    // Convert back to a comma-separated string
    const updatedValue = alertArray.filter(Boolean).join(",");

    setValue("profileView.Notifcation_enabled", updatedValue, {
      shouldValidate: true,
    });
  };


  const handleSmsAlert = (id: number) => {
    let currentAlerts = getValues("profileView.Notifcation_enabled") || "";

    // Ensure it's a string before splitting
    let alertArray = typeof currentAlerts === "string" ? currentAlerts.split(",") : [];

    if (alertArray.includes(`${id}`)) {
      // Remove the alert if already selected
      alertArray = alertArray.filter(alertId => alertId !== `${id}`);
    } else {
      // Add the alert if not selected
      alertArray.push(`${id}`);
    }

    // Convert back to a comma-separated string
    const updatedValue = alertArray.filter(Boolean).join(",");

    setValue("profileView.Notifcation_enabled", updatedValue, {
      shouldValidate: true,
    });
  };



  const handlePackageChange = (id: number) => {
    let currentMarriedStatus = checkedAddOnPackage ? checkedAddOnPackage.split(',') : [];
    console.log('Before update:', currentMarriedStatus);

    const index = currentMarriedStatus.indexOf(`${id}`);

    if (index === -1) {
      // Add the status to the list
      currentMarriedStatus.push(`${id}`);
    } else {
      // Remove the status from the list
      currentMarriedStatus.splice(index, 1);
    }

    // Filter out any empty values and join them without extra commas
    const updatedValue = currentMarriedStatus.filter(Boolean).join(',');

    setCheckedAddOnPackage(updatedValue);
    console.log('Updated value to be set:', updatedValue);
  };

  // Optionally, you can also use `useEffect` to log the state after it updates:
  // useEffect(() => {
  //   console.log('checkedAddOnPackage updated:', checkedAddOnPackage);
  // }, [checkedAddOnPackage]);

  useEffect(() => {
    // Fetch alert settings from the API
    axios.post<AlertSettingsResponse>('https://app.vysyamala.com/auth/Get_alert_settings/')
      .then(response => {
        if (response.data.status === '1') {
          setEmailAlerts(response.data.data['Email Alerts']);
          setSmsAlerts(response.data.data['SMS Alerts']);
        } else {
          console.error('Failed to fetch alert settings.');
        }
      })
      .catch(error => {
        console.error('Error fetching alert settings:', error);
      });
  }, []);


  const fetchAddOnPackages = async () => {
    try {
      const response = await axios.post('https://app.vysyamala.com/auth/Get_addon_packages/');
      if (response.data.status === 'success') {
        setAddonPackage(response.data.data)
      }
      else {
        console.log(response.data.message || 'Failed to fetch packages');
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchAddOnPackages()
  }, [])

  const toggleSection1 = () => {
    setViewDetail(!isViewDetais);
    console.log(isViewDetais, "isViewDetais")
  };

  const { data: Status } = useQuery({
    queryKey: ['Status'],
    queryFn: getStatus,
  });

  const { data: family_status } = useQuery<getFamilyStatus[]>({
    queryKey: ['family_status'],
    queryFn: fetchFamilyStatuses,
  });

  const BooleanType = [
    { Value: "True", label: "Yes" },
    { Value: "False", label: "No" }
  ]

  return (
    <div>
      <div>
        <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            onClick={toggleSection1}
            className="text-red-600 flex items-center justify-between text-xl cursor-pointer font-semibold dark:text-white"
          >
            <span>Profile View</span> {/* Add a title or any text here */}
            <svg
              className={`fill-current transform ${isViewDetais ? 'rotate-180' : ''
                }`}
              width="20"
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

          {isViewDetais && (<div>
            <div>
              <div className="flex justify-between">
                <div className="flex">
                  <p className="text-green-600 ">Profile ID:</p>
                  <p className="text-red-500">{profileId || 'No ProfileId Available'}</p>
                </div>
                <div className="flex">

                  <p className="text-green-600 ">Age:</p>
                  <p className="text-red-500">26</p>{' '}
                </div>
                <div>

                  <div className="flex">
                    <p className="text-green-600 "> Name: </p>
                    <p className="text-red-500">{profileName || 'No Name Available'}</p>
                  </div>
                </div>
              </div>
              <hr />

            </div>
            <div className='flex flex-row gap-3'>
              <div>
                <div className="flex mt-3 gap-2 ">
                  <label className="text-black ">Profile Status: </label>
                  <select
                    {...register('profileView.status', {
                      setValueAs: (value) => Number(value),
                    })}
                    className=" px-2 py-1 border border-black rounded" defaultValue="">
                    <option value="" disabled>Select your Status</option>
                    {Status?.map((option: any) => (
                      <option key={option.status_code} value={Number(option.status_code)} >
                        {option.status_name}
                      </option>
                    ))}
                  </select>



                  <p className="text-blue-300">{profileId || 'Unknown ID'}{profileName || 'Unknown Name'}</p>

                </div>
                {errors?.profileView?.status && (
                  <p className="text-red-600">
                    {errors.profileView.status.message}
                  </p>
                )}
                <div
                  className="flex gap-6 bg-#DDDFFF mt-2"
                  style={{ backgroundColor: '#DDDFFF' }}
                >
                  <div
                    className="
            flex"
                  >
                    <p className="text-black ">Registration Date:</p>
                    <p className="text-red-500"> {Registration_Date} </p>
                  </div>
                  <div
                    className="
            flex"
                  >
                    <p className="text-black ">Suya Gothram:</p>
                    <p className="text-red-500">{suya_gothram || 'No suya Gothram Available'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-black ">Payment Info: / / / </p>
                </div>
                <div
                  className="flex gap-6 bg-#DDDFFF mt-2"
                  style={{ backgroundColor: '#DDDFFF' }}
                >
                  <div
                    className="
            flex"
                  >
                    <p className="text-black ">Mobile Number:</p>
                    <p className="text-red-500">{Mobile_no || 'No Mobile Number'}</p>
                  </div>
                  <div
                    className="
            flex"
                  >
                    <p className="text-black ">Verification:</p>
                    <input type="radio" className="ml-2" /> <label>Yes</label>
                    <input type="radio" className="ml-2" />
                    <label>No</label>
                  </div>
                </div>
          
                <div className="flex mt-3 gap-2">
                  <h2 className="flex text-black font-semibold">Email Alerts:</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {emailAlerts.map(alert => (
                      <label key={alert.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={alert.id}
                          checked={(getValues("profileView.Notifcation_enabled") || "").split(",").includes(`${alert.id}`)}
                          onChange={() => handleEmailAlert(alert.id)}
                          className="form-checkbox"
                        />
                        <span className="text-black">{alert.alert_name}</span>
                      </label>
                    ))}
                    {errors?.profileView?.Notifcation_enabled && (
                      <p className="text-red-600">{errors.profileView.Notifcation_enabled.message}</p>
                    )}
                  </div>
                </div>


                {/* 
    <div className='flex  mt-2 gap-2 '  style={{ backgroundColor: '#DDDFFF' }}>
      <h2 className='mt-4 text-black'>Sms Alerts:</h2>
      <div className="flex gap-1 ">
        {smsAlerts.map(alert => (
          <label key={alert.id} className="flex  items-center space-x-2">
            <input
              type="checkbox"
              value={alert.id}
              {...register('profileView.Notifcation_enabled')}
              checked={checkSmsAlert.split(",").includes(`${alert.id}`)}
             onChange={() => handleSmsAlert(alert.id)}
              className="form-checkbox"
            />
            <span className='text-black'>{alert.alert_name}</span>
          </label>
        ))}
        {errors?.profileView?.Notifcation_enabled && (
                  <p className="text-red-600">
                    {errors.profileView.Notifcation_enabled.message}
                  </p>
                )}
      </div>
    </div> */}

                <div className="flex mt-3 gap-2">
                  <h2 className="flex text-black font-semibold">SMS Alerts:</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {smsAlerts.map(alert => (
                      <label key={alert.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={alert.id}
                          checked={(getValues("profileView.Notifcation_enabled") || "").split(",").includes(`${alert.id}`)}
                          onChange={() => handleSmsAlert(alert.id)}
                          className="form-checkbox"
                        />
                        <span className="text-black">{alert.alert_name}</span>
                      </label>
                    ))}
                    {errors?.profileView?.Notifcation_enabled && (
                      <p className="text-red-600">{errors.profileView.Notifcation_enabled.message}</p>
                    )}
                  </div>
                </div>




                <div className="flex gap-2 mt-2">
                  <label className="font-semibold text-black">
                    Membership Date:
                  </label>

                  <div className="flex gap-2">
                    <label className="text-black ">From:</label>
                    <input type="Date" />
                  </div>
                  <div className="flex gap-2">
                    <label className="text-black ">To:</label>
                    <input type="Date"
                      {...register("profileView.DateOfJoin")}
                    />
                  </div>
                </div>

                {/*             
            <div className="w-full">
                          <h5 className="text-[18px] text-black font-semibold mb-3">
                          AddOn Packages
                          </h5>
                          <div >
                            {addonPackage.map((Package:AddOnPackage) => (
                              <div key={Package.package_id}  className='flex items-center mb-3'>
                                <input
                                  type="checkbox"
                                  id={`package-${Package.package_id}`}
                                   className='mr-2'
                                  value={Package.package_id}
                                  {...register('profileView.Addon_package')}
                                  checked={checkedAddOnPackage.split(',').includes(
                                    `${Package.package_id}`
                                  )}
                                  onChange={() =>
                                    handlePackageChange(Package.package_id)
                                  }
                                />
                                <label
                                  htmlFor={`package-${Package.package_id}`}
                                  className="curser-pointer"
                                >
                                 {Package.name}-{Package.amount}
                                </label>
                              </div>
                            ))}
            
            {errors?.profileView?.Addon_package && (
                  <p className="text-red-600">
                    {errors.profileView.Addon_package.message}
                  </p>
                )}
                          </div>
                        </div> */}

                <div className="w-full">
                  <h5 className="text-[18px] text-black font-semibold mb-3">AddOn Packages</h5>
                  <div>
                    {addonPackage.map((Package: AddOnPackage) => (
                      <div key={Package.package_id} className="flex items-center mb-3">
                        <input
                          type="checkbox"
                          id={`package-${Package.package_id}`}
                          className="mr-2"
                          value={Package.package_id}
                          checked={getValues('profileView.Addon_package')
                            ?.split(',')
                            .includes(`${Package.package_id}`)} // Ensure checked state aligns with form value
                          onChange={() => {
                            const currentValues = getValues('profileView.Addon_package')
                              ? getValues('profileView.Addon_package').split(',')
                              : [];

                            const index = currentValues.indexOf(`${Package.package_id}`);
                            if (index === -1) {
                              currentValues.push(`${Package.package_id}`);
                            } else {
                              currentValues.splice(index, 1);
                            }

                            // Update the value in React Hook Form
                            setValue(
                              'profileView.Addon_package',
                              currentValues.filter(Boolean).join(','),
                              { shouldValidate: true } // Ensure validation is triggered
                            );
                          }}
                        />
                        <label htmlFor={`package-${Package.package_id}`} className="cursor-pointer">
                          {Package.name} - {Package.amount}
                        </label>
                      </div>
                    ))}

                    {errors?.profileView?.Addon_package && (
                      <p className="text-red-600">{errors.profileView.Addon_package.message}</p>
                    )}
                  </div>
                </div>

              </div>

              <div className='p-10 mt-0 justify-center align-middle items-center ml-10'>
                <div>

                  <div className="flex flex-col mb-2">
                    <label className="block font-semibold text-black">
                      Admin Comments:
                    </label>
                    <textarea
                      {...register("profileView.Admin_comments")}
                      className="border-2" />
                  </div>
                  {errors?.profileView?.Admin_comments && (
                    <p className="text-red-600">
                      {errors.profileView.Admin_comments.message}
                    </p>
                  )}
                  <button
                    // onClick={formHandleSubmit}
                    type="submit"
                    className="bg-blue-500 text-white px-15 py-2 rounded"
                  >
                    Save Admin comments
                  </button>
                  {/* <form  onSubmit={handleSubmit(onSubmit)} >
               <div className="flex flex-col mb-2">
                <label className="block font-semibold text-black">
                  Admin Comments:
                </label>
                <textarea 
                {...register("profileView.Admin_comments")}
                className="border-2"/>
              </div>
              <Button variant="contained" sx={{ textTransform: 'none' }} type='submit'>
                Save Admin comments
              </Button>
 </form>   */}

                  {/* <AdminCommentsForm 
 EditData={EditData}
 />   */}
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex gap-1">
                      <label className="text-black ">Admin Chevvai Dhosam:</label>
                      <select
                        {...register('profileView.calc_chevvai_dhosham')}
                        className="px-2 py-1 border border-black rounded">
                        {BooleanType.map((option) => (
                          <option key={option.Value} value={option.Value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    {errors?.profileView?.calc_chevvai_dhosham && (
                      <p className="text-red-600">
                        {errors.profileView.calc_chevvai_dhosham.message}
                      </p>
                    )}
                    <div className="flex gap-1">
                      <label className="text-black ">
                        Admin Rahu/Kethu Dhosam:
                      </label>
                      <select
                        {...register('profileView.calc_raguketu_dhosham')}
                        className=" px-2 py-1 border border-black rounded">
                        {BooleanType.map((option) => (
                          <option key={option.Value} value={option.Value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    {errors?.profileView?.calc_raguketu_dhosham && (
                      <p className="text-red-600">
                        {errors.profileView.calc_raguketu_dhosham.message}
                      </p>
                    )}
                    <div className="flex gap-1">
                      {' '}
                      <label className="text-black ">
                        Pitched by Various Source:
                      </label>{' '}
                      <input type="checkbox" />
                    </div>
                    <div className="flex gap-1">
                      <label className="text-black ">Admin Family Status:</label>
                      <select
                        {...register('profileView.family_status')}
                        className=" px-2 py-1 border border-black rounded"
                        defaultValue=""
                      >
                        <option value="" disabled>Select Family Status</option>
                        {family_status?.map((option: getFamilyStatus) => (
                          <option key={option.id} value={option.id}>{option.status}</option>
                        ))}

                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black ">Horo Hint</label>
                    <textarea
                      {...register("profileView.horoscope_hints")}
                      className="border-2"></textarea>
                    {errors?.profileView?.horoscope_hints && (
                      <p className="text-red-600">
                        {errors.profileView.horoscope_hints.message}
                      </p>
                    )}
                    <label className="text-black ">
                      Profile Completion{' '}
                      <span className="text-red-600 font-medium">{profile_completion}%</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-end mt-10 '>
              <button
                // onClick={formHandleSubmit}
                type="submit"
                className="bg-blue-500 text-white px-15 py-2 rounded"
              >
                Save Profile View
              </button>
            </div>
          </div>)}
        </div>

      </div>

    </div>
  );
};

export default ProfileView;

