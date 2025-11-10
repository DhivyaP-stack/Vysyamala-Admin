// import { useState, useEffect, SetStateAction, Dispatch } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';

// type Alert = {
//   id: number;
//   alert_name: string;
// };

// type AlertSettingsResponse = {
//   status: string;
//   message: string;
//   data: {
//     'Email Alerts': Alert[];
//     'SMS Alerts': Alert[];
//   };
// };

// type EnabledNotificationsResponse = {
//   status: string;
//   message: string;
//   data: Alert[];
// };
// interface pageProps {
//   EditData: any;
//   setAlretSetting: Dispatch<SetStateAction<string>>;
// }
// export const EditAlertSettings: React.FC<pageProps> = ({
//   EditData,
//   setAlretSetting,
// }) => {
//   const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
//   const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
//   const [selectedAlerts, setSelectedAlerts] = useState<{
//     [key: string]: boolean;
//   }>({});
//   console.log(selectedAlerts, 'v');

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const profileId = queryParams.get('profileId');

//   useEffect(() => {
//     // Fetch all available alerts
//     if (profileId) {
//       axios
//         .post<AlertSettingsResponse>(
//           'https://app.vysyamala.com/auth/Get_alert_settings/',
//         )
//         .then((response) => {
//           const { data } = response.data;
          
//           setEmailAlerts(data['Email Alerts']);
//           setSmsAlerts(data['SMS Alerts']);

//           // Initialize selectedAlerts state
//           const initialAlerts: { [key: string]: boolean } = {};
//           data['Email Alerts'].forEach((alert) => {
//             initialAlerts[alert.alert_name] = false;
//           });
//           data['SMS Alerts'].forEach((alert) => {
//             initialAlerts[alert.alert_name] = false;
//           });
//           setSelectedAlerts(initialAlerts);
//         })
//         .catch((error) => {
//           console.error('Error fetching alert settings:', error);
//         });

//       // Fetch enabled notifications for the profile
//       axios
//         .post<EnabledNotificationsResponse>(
//           'https://app.vysyamala.com/auth/Get_enabled_notifications/',
//           { profile_id: profileId },
//         )
//         .then((response) => {
//           const enabledAlerts = response.data.data;
//           const updatedSelectedAlerts = { ...selectedAlerts };
//           console.log(response.data.data, 'response.data.data');
//           enabledAlerts.forEach((alert) => {
//             updatedSelectedAlerts[alert.alert_name] = true;
//           });

//           setSelectedAlerts(updatedSelectedAlerts);
//         })
//         .catch((error) => {
//           console.error('Error fetching enabled notifications:', error);
//         });
//     }
//   }, [profileId]);
//   useEffect(() => {
//     axios
//       .post<EnabledNotificationsResponse>(
//         'https://app.vysyamala.com/auth/Get_enabled_notifications/',
//         { profile_id: profileId },
//       )
//       .then((response) => {
//         const enabledAlerts = response.data.data;
//         const updatedSelectedAlerts = { ...selectedAlerts };

//         enabledAlerts.forEach((alert) => {
//           updatedSelectedAlerts[alert.alert_name] = true;
//         });

//         setSelectedAlerts(updatedSelectedAlerts);
//       })
//       .catch((error) => {
//         console.error('Error fetching enabled notifications:', error);
//       });
//   }, []);
//   const handleCheckboxChange = (alertName: string) => {
//     setSelectedAlerts((prev) => ({
//       ...prev,
//       [alertName]: !prev[alertName],
//     }));
//   };

//   useEffect(() => {
//     axios
//       .post<EnabledNotificationsResponse>(
//         'https://app.vysyamala.com/auth/Get_enabled_notifications/',
//         { profile_id: profileId },
//       )
//       .then((response) => {
//         const enabledAlerts = response.data.data;
//         const updatedSelectedAlerts = { ...selectedAlerts };
//         console.log(response.data.data, 'response.data.data');
//         enabledAlerts.forEach((alert) => {
//           updatedSelectedAlerts[alert.alert_name] = true;
//         });

//         setSelectedAlerts(updatedSelectedAlerts);
//       })
//       .catch((error) => {
//         console.error('Error fetching enabled notifications:', error);
//       });
//   }, [EditData]);

//   useEffect(() => {
//     const enabledAlertIds = [
//       ...emailAlerts
//         .filter((alert) => selectedAlerts[alert.alert_name])
//         .map((alert) => alert.id),
//       ...smsAlerts
//         .filter((alert) => selectedAlerts[alert.alert_name])
//         .map((alert) => alert.id),
//     ].join(',');

//     setAlretSetting(enabledAlertIds);
//   }, [selectedAlerts]);
//   return (
//     <div>
//       <div>
//         <div>
//           <div className="">
//             <div>
//               <div className="mb-5">
//                 <h4 className="text-[20px] text-black font-semibold mb-3">
//                   Email Alert
//                 </h4>

//                 <div className="w-6/12 flex justify-between items-start">
//                   <div>
//                     {emailAlerts.slice(0,3).map((alert) => (
//                       <div className="mb-2" key={alert.id}>
//                         <input
//                           type="checkbox"
//                           name={alert.alert_name}
//                           id={String(alert.id)}
//                           className="mr-2"
//                           checked={selectedAlerts[alert.id] || false}
//                           onChange={() =>
//                             handleCheckboxChange(String(alert.id))
//                           }
//                         />
//                         <label htmlFor={alert.alert_name} className=" text-ash">
//                           {alert.id}
//                         </label>
//                       </div>
//                     ))}
//                   </div>

//                   <div>
//                     {emailAlerts.slice(3).map((alert) => (
//                       <div className="mb-2" key={alert.id}>
//                         <input
//                           type="checkbox"
//                           name={alert.alert_name}
//                           id={String(alert.id)}
//                           className="mr-2"
//                           checked={selectedAlerts[alert.id] || false}
//                           onChange={() =>
//                             handleCheckboxChange(String(alert.id))
//                           }
//                         />
//                         <label htmlFor={alert.alert_name} className=" text-ash">
//                           {alert.id}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* SMS Alert */}
//               <div>
//                 <h4 className="text-[20px] text-black font-semibold mb-2">
//                   SMS Alert
//                 </h4>

//                 <div className="w-6/12 flex justify-between items-center mb-5">
//                   {smsAlerts.map((alert) => (
//                     <div key={alert.id}>
//                       <input
//                         type="checkbox"
//                         name={alert.alert_name}
//                         id={alert.alert_name}
//                         className="mr-2"
//                         checked={selectedAlerts[alert.alert_name] || false}
//                         onChange={() => handleCheckboxChange(alert.alert_name)}
//                       />
//                       <label htmlFor={alert.alert_name} className=" text-ash">
//                         {alert.id}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

type Alert = {
  id: number;
  alert_name: string;
};

type AlertSettingsResponse = {
  status: string;
  message: string;
  data: {
    'Email Alerts': Alert[];
    'SMS Alerts': Alert[];
  };
};

type EnabledNotificationsResponse = {
  status: string;
  message: string;
  data: Alert[];
};

interface PageProps {
  EditData: any;
  setAlretSetting: Dispatch<SetStateAction<string>>;
}

export const EditAlertSettings: React.FC<PageProps> = ({
  EditData,
  setAlretSetting,
}) => {
  const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
  const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
  const [selectedAlerts, setSelectedAlerts] = useState<{
    [key: string]: number[];
  }>({}); // Stores alert_name -> [selected IDs]

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');

  useEffect(() => {
    if (profileId) {
      // Fetch all alerts
      axios
        .post<AlertSettingsResponse>(
          'https://app.vysyamala.com/auth/Get_alert_settings/',
        )
        .then((response) => {
          const { data } = response.data;
          setEmailAlerts(data['Email Alerts']);
          setSmsAlerts(data['SMS Alerts']);
        })
        .catch((error) => console.error('Error fetching alert settings:', error));

      // Fetch enabled alerts
      axios
        .post<EnabledNotificationsResponse>(
          'https://app.vysyamala.com/auth/Get_enabled_notifications/',
          { profile_id: profileId },
        )
        .then((response) => {
          const enabledAlerts = response.data.data;
          const updatedSelectedAlerts: { [key: string]: number[] } = {};

          enabledAlerts.forEach((alert) => {
            if (!updatedSelectedAlerts[alert.alert_name]) {
              updatedSelectedAlerts[alert.alert_name] = [];
            }
            updatedSelectedAlerts[alert.alert_name].push(alert.id);
          });

          setSelectedAlerts(updatedSelectedAlerts);
        })
        .catch((error) =>
          console.error('Error fetching enabled notifications:', error),
        );
    }
  }, [profileId]);

  const handleCheckboxChange = (alertName: string, alertId: number) => {
    setSelectedAlerts((prev) => {
      const currentIds = prev[alertName] || [];

      return {
        ...prev,
        [alertName]: currentIds.includes(alertId)
          ? currentIds.filter((id) => id !== alertId) // Remove ID if already selected
          : [...currentIds, alertId], // Add ID if not selected
      };
    });
  };

  useEffect(() => {
    const enabledAlertIds = Object.values(selectedAlerts)
      .flat() // Flatten array of arrays into a single array of IDs
      .join(',');

    setAlretSetting(enabledAlertIds);
  }, [selectedAlerts]);

  return (
    <div>
      <div className="mb-5">
        <h4 className="text-[20px] text-black font-semibold mb-3">
          Email Alert
        </h4>

        <div className="w-6/12 flex justify-between items-start">
          <div>
            {emailAlerts.slice(0, 3).map((alert) => (
              <div className="mb-2" key={alert.id}>
                <input
                  type="checkbox"
                  id={`email-${alert.id}`}
                  className="mr-2 text-[#000000e6] font-medium"
                  checked={selectedAlerts[alert.alert_name]?.includes(alert.id) || false}
                  onChange={() => handleCheckboxChange(alert.alert_name, alert.id)}
                />
                <label htmlFor={`email-${alert.id}`} className="text-ash text-[#000000e6] font-medium">
                  {alert.alert_name} 
                </label>
              </div>
            ))}
          </div>

          <div>
            {emailAlerts.slice(3).map((alert) => (
              <div className="mb-2" key={alert.id}>
                <input
                  type="checkbox"
                  id={`email-${alert.id}`}
                  className="mr-2"
                  checked={selectedAlerts[alert.alert_name]?.includes(alert.id) || false}
                  onChange={() => handleCheckboxChange(alert.alert_name, alert.id)}
                />
                <label htmlFor={`email-${alert.id}`} className="text-ash text-[#000000e6] font-medium">
                  {alert.alert_name} 
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SMS Alert */}
      <div>
        <h4 className="text-[20px] text-black font-semibold mb-2">
          SMS Alert
        </h4>

        <div className="w-6/12 flex justify-between items-center mb-5">
          {smsAlerts.map((alert) => (
            <div key={alert.id}>
              <input
                type="checkbox"
                id={`sms-${alert.id}`}
                className="mr-2"
                checked={selectedAlerts[alert.alert_name]?.includes(alert.id) || false}
                onChange={() => handleCheckboxChange(alert.alert_name, alert.id)}
              />
              <label htmlFor={`sms-${alert.id}`} className="text-ash text-[#000000e6] font-medium">
                {alert.alert_name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
