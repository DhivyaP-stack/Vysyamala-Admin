import { useState, useEffect, Dispatch, SetStateAction } from 'react';
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

export const ViewAlertSettings: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
  const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
  const [selectedAlerts, setSelectedAlerts] = useState<{
    [key: string]: boolean;
  }>({});
  const response = sessionStorage.getItem('responseStatus');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const profileId = queryParams.get('profileId');

  useEffect(() => {
    // Fetch all available alerts
    if (profileId) {
      axios
        .post<AlertSettingsResponse>(
          'https://app.vysyamala.com/auth/Get_alert_settings/',
        )
        .then((response) => {
          const { data } = response.data;
          setEmailAlerts(data['Email Alerts']);
          setSmsAlerts(data['SMS Alerts']);

          // Initialize selectedAlerts state
          const initialAlerts: { [key: string]: boolean } = {};
          data['Email Alerts'].forEach((alert) => {
            initialAlerts[alert.alert_name] = false;
          });
          data['SMS Alerts'].forEach((alert) => {
            initialAlerts[alert.alert_name] = false;
          });
          setSelectedAlerts(initialAlerts);
        })
        .catch((error) => {
          console.error('Error fetching alert settings:', error);
        });

      // Fetch enabled notifications for the profile
      axios
        .post<EnabledNotificationsResponse>(
          'https://app.vysyamala.com/auth/Get_enabled_notifications/',
          { profile_id: profileId },
        )
        .then((response) => {
          const enabledAlerts = response.data.data;
          const updatedSelectedAlerts = { ...selectedAlerts };
          console.log(response.data.data, 'response.data.data');
          enabledAlerts.forEach((alert) => {
            updatedSelectedAlerts[alert.alert_name] = true;
          });

          setSelectedAlerts(updatedSelectedAlerts);
        })
        .catch((error) => {
          console.error('Error fetching enabled notifications:', error);
        });
    }
  }, [profileId]);
  const handleCheckboxChange = (alertName: string) => {
    setSelectedAlerts((prev) => ({
      ...prev,
      [alertName]: !prev[alertName],
    }));
  };

  return (
    <div>
      <div>
        <div>
          <div className="">
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
                          name={alert.alert_name}
                          id={alert.alert_name}
                          value={alert.alert_name}
                          className="mr-2"
                          checked={selectedAlerts[alert.alert_name] || false}
                        />
                        <label htmlFor={alert.alert_name} className="text-[#000000e6] font-medium">
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
                          name={alert.alert_name}
                          id={alert.alert_name}
                          value={alert.alert_name}
                          className="mr-2"
                          checked={selectedAlerts[alert.alert_name] || false}
                        />
                        <label htmlFor={alert.alert_name} className="text-[#000000e6] font-medium">
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
                        name={alert.alert_name}
                        id={alert.alert_name}
                        value={alert.alert_name}
                        className="mr-2"
                        checked={selectedAlerts[alert.alert_name] || false}
                      />
                      <label htmlFor={alert.alert_name} className="text-[#000000e6] font-medium">
                        {alert.alert_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
