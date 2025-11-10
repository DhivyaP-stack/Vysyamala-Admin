import { Button } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState, } from 'react';


import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getStatus } from '../../../action';



import { useForm } from 'react-hook-form';
import { Watch } from '@mui/icons-material';

interface pageProps{
    profile:any;
    isViewDetais: boolean;
    setViewDetail: Dispatch<SetStateAction<boolean>>;
}





export interface AddOnPackage{
  package_id: number,
  name:string ,
  description: string,
  amount:number
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


interface FamilyStatus {
  id: number;
  status: string;
  is_deleted: boolean;
}
const ViewProfileView: React.FC<pageProps> = ({profile ,isViewDetais, setViewDetail}) => {
    const{register,setValue,watch}=useForm()
    const [profileView,setProfileView]=useState<any>({});
    
  const [addonPackage,setAddonPackage]=useState<AddOnPackage[]>([])
  const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
  const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
  const [familyStatuses, setFamilyStatuses] = useState<FamilyStatus[]>([]);
const[formattedDate,setFormattedDate]=useState<string>('')
const [checkEmailAlert, setCheckEmailAlert]=useState<string|undefined>()
const [smsAlert,setSmsAlert]=useState<string|undefined>()
const [checkAddOn,setCheckAddOn]=useState<string|undefined>()
console.log('bnt',checkAddOn)
//   import moment from "moment";
//   npm install moment
//   npm install @types/moment --save-dev


const add = watch("profileView.Addon_package");
console.log("add")

 useEffect(()=>{
if(profile){
    // const apiDate =profile[5].DateOfJoin;
    // const formattedDate=apiDate ? moment(apiDate).format("DD MMM YYYY") : "N/A";
    // setFormattedDate(formattedDate)
    // setValue('profileView.DateOfJoin',formattedDate)
    if (profile[5]?.DateOfJoin) {
        // Assuming EditData[5].DateOfJoin is like "2023-05-07T00:00:00"
        const dateOfJoin = new Date(profile[5].DateOfJoin);
        const formattedDate = dateOfJoin.toISOString().split('T')[0]; // '2023-05-07'
      console.log("formattedDate",formattedDate)
        // Set the value for the date input
        setFormattedDate(formattedDate)
        setValue('profileView.DateOfJoin', formattedDate);
      }
     
    const checkEmailAlert=profile[5].Notifcation_enabled
    setCheckEmailAlert(checkEmailAlert)
   const SmsAlert = profile[5].Notifcation_enabled
   setSmsAlert(SmsAlert)
   console.log(SmsAlert)
const AddOnPackages = profile[5].Addon_package  
setValue("profileView.Addon_package",AddOnPackages)
setCheckAddOn(AddOnPackages)
console.log("lp0",AddOnPackages)
}
 },[])

 const email= profileView.Notifcation_enabled?.split(',');
 const sms= profileView.Notifcation_enabled?.split(',');
const addOn=profileView.Addon_package?.split(',');
 console.log("jj5",addOn)
  const { data: Status } = useQuery({
    queryKey: ['Status'],
    queryFn: getStatus,
  });
console.log(Status)
  useEffect(() => {
    axios
      .get<FamilyStatus[]>('https://app.vysyamala.com/api/family-statuses/')
      .then(response => {
        const filteredStatuses = response.data.filter(status => !status.is_deleted);
        setFamilyStatuses(filteredStatuses);
      })
      .catch(error => {
        console.error('Error fetching family statuses:', error);
      });
  }, []);
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

  
  const fetchAddOnPackages = async ()=>{
    try{
    const response = await axios.post('https://app.vysyamala.com/auth/Get_addon_packages/');
    if(response.data.status === 'success'){
      console.log(response.data.data)
setAddonPackage(response.data.data)
    }
    else{
      console.log(response.data.message||'Failed to fetch packages');
    }
    }catch(err){
   console.error(err);
    }
  }


  useEffect(()=>{
    fetchAddOnPackages()
  },[])

  
  const toggleSection1 = () => {
    setViewDetail(!isViewDetais);
console.log(isViewDetais,"isViewDetais")
  };
console.log('nn12',profile)
    useLayoutEffect(() => {
      if (profile && profile.length > 0) {
        setProfileView(profile[6]);
        console.log(profile[6])
      }
    }, [profile]);
 

    const BooleanType = [
        {Value:"True",label:"Yes"},
        {Value:"False",label:"No"}
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
    className={`fill-current transform ${
      isViewDetais ? 'rotate-180' : ''
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
          { isViewDetais &&( <div>
            <div>
              <div className="flex justify-between">
                <div className="flex">
                  <p className="text-green-600 ">Profile ID:</p>
                  <p className="text-red-500">{profileView.ProfileId}</p>
                </div>
                <div className="flex">
                 
                  <p className="text-green-600 ">Age:</p>
                  <p className="text-red-500">26</p>{' '}
                </div>
                <div>
                  
                  <div className="flex">
                    <p className="text-green-600 "> Name: </p>
                    <p className="text-red-500">{profileView.Profile_name}</p>
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
                value={profileView.status}
                disabled
                className=" px-2 py-1 border border-black rounded" defaultValue="">
<option value=""disabled>Select your Status</option>
                {Status?.map((option: any) => (
                  <option key={option.status_code} value={Number(option.status_code)} >
                    {option.status_name}
                  </option>
                ))}
                </select>
          
                
               
                <p className="text-blue-300">{profileView.ProfileId || 'Unknown ID'}{profileView.Profile_name || 'Unknown Name'}</p>
              
              </div>
            
              <div
                className="flex gap-6 bg-#DDDFFF mt-2"
                style={{ backgroundColor: '#DDDFFF' }}
              >
                <div
                  className="
            flex"
                >
                  <p className="text-black ">Registration Date:</p>
                  <p className="text-red-500">{formattedDate}</p>
                </div>
                <div
                  className="
            flex"
                >
                  <p className="text-black ">Suya Gothram:</p>
                  <p className="text-red-500">{profileView.suya_gothram}</p>
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
                  <p className="text-red-500">{profileView.Mobile_no}</p>
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
            value={profileView.Notifcation_enabled}
            
           checked={email?.includes(`${alert.id}`)}
           onClick={(e) => e.preventDefault()}
           // checked={(getValues("profileView.Notifcation_enabled") || "").split(",").includes(`${alert.id}`)}
           // onChange={() => handleEmailAlert(alert.id)}
             className="form-checkbox"
             
          />
          <span className="text-black">{alert.alert_name}</span>
        </label>
      ))}
      
    </div>
  </div>
  

  <div className="flex mt-3 gap-2">
  <h2 className="flex text-black font-semibold">SMS Alerts:</h2>
  <div className="grid grid-cols-2 gap-2">
    {smsAlerts.map(alert => (
      <label key={alert.id} className="flex items-center space-x-2">
        <input
          type="checkbox"
          
          value={profileView.Notifcation_enabled}
        checked={sms?.includes(`${alert.id}`)}
          className="form-checkbox"
          onClick={(e) => e.preventDefault()}
        />
        <span className="text-black">{alert.alert_name}</span>
      </label>
    ))}
 
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
                  <input {...register("profileView.DateOfJoin")} type="Date" />
                </div>
              </div>
             

            
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
                             checked={addOn?.includes(`${Package.package_id}`)}
                             onClick={(e) => e.preventDefault()}
                                />
                                <label
                                  htmlFor={`package-${Package.package_id}`}
                                  className="curser-pointer"
                                >
                                 {Package.name}-{Package.amount}
                                </label>
                              </div>
                            ))}
            
            
                          </div>
                        </div>
            </div>
           
            <div className='p-10 mt-0 justify-center align-middle items-center ml-10'>
             <div>
               <div className="flex flex-col mb-2">
                <label className="block font-semibold text-black">
                  Admin Comments:
                </label>
                <textarea value={profileView.Admin_comments} className="border-2"></textarea>
              </div>
              <Button variant="contained" sx={{ textTransform: 'none' }}>
                Save Admin comments
              </Button>

              <div className="flex flex-col gap-2 mt-1">
              <div className="flex gap-1">
                  <label className="text-black ">Admin Chevvai Dhosam:</label>
                  <select 
                  disabled
                  {...register('profileView.calc_chevvai_dhosham')}
                  className="px-2 py-1 border border-black rounded">
                  {BooleanType.map((option)=>(
                    <option key={option.Value}  value={option.Value}>{option.label}</option>
                  ))}
                  </select>
                </div>
                
                <div className="flex gap-1">
                  <label className="text-black ">
                    Admin Rahu/Kethu Dhosam:
                  </label>
                  <select 
                  disabled
                  {...register('profileView.calc_raguketu_dhosham')}
                  className=" px-2 py-1 border border-black rounded">
                  {BooleanType.map((option)=>(
                    <option key={option.Value} value={option.Value}>{option.label}</option>
                  ))}
                  </select>
                </div> 
                
                <div className="flex gap-1">
                  {' '}
                  <label className="text-black ">
                    Pitched by Various Source:
                  </label>{' '}
                  <input type="checkbox" />
                </div>
                <div className="flex gap-1">
                  <label className="text-black ">Admin Family Status:</label>
                  <select className=" px-2 py-1 border border-black rounded"
                  value={profileView.family_status}
                  disabled
                  >
                    {familyStatuses.map((option)=>(
                      <option value={option.id} key={option.id}>{option.status}</option>
                    ))}
              
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-black ">Horo Hint</label>
                <textarea 
                // value={ProfileView.horoscope_hints}
                value={profileView.horoscope_hints}
                 className="border-2"
                 ></textarea>
                <label className="text-black ">
                  Profile Completion{' '}
                  <span className="text-red-600 font-medium">{profileView.profile_completion}%</span>
                </label>
              </div>
             </div>
            </div>
           </div>
            
          </div>)}
        </div>
        
      </div>
      
    </div>
  );
};

export default ViewProfileView;
