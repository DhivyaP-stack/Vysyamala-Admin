import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';


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

interface propType {
  setAlretSetting: Dispatch<SetStateAction<string>>;
}

export const AlertSettings: React.FC<propType> = ({ setAlretSetting }) => {
  const [emailAlerts, setEmailAlerts] = useState<Alert[]>([]);
  const [smsAlerts, setSmsAlerts] = useState<Alert[]>([]);
  const [selectedAlerts, setSelectedAlerts] = useState<{
    [key: string]: boolean;
  }>({});
  const response = sessionStorage.getItem('responseStatus');

  useEffect(() => {
    // Fetch all available alerts
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
  }, []);

  const handleCheckboxChange = (alertName: string) => {
    setSelectedAlerts((prev) => ({
      ...prev,
      [alertName]: !prev[alertName],
    }));
  };
  useEffect(() => {
    const enabledAlertIds = [
      ...emailAlerts
        .filter((alert) => selectedAlerts[alert.alert_name])
        .map((alert) => alert.id),
      ...smsAlerts
        .filter((alert) => selectedAlerts[alert.alert_name])
        .map((alert) => alert.id),
    ].join(',');

    setAlretSetting(enabledAlertIds);
  }, [selectedAlerts]);

  useEffect(() => {
    if (response === '201') {
      setSelectedAlerts({});
      setSmsAlerts([]);
      setEmailAlerts([]);
      setAlretSetting('');
      setTimeout(() => {
        sessionStorage.removeItem('responseStatus');
      }, 3000);
    }
  }, [response]);
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

                <div className="w-full flex justify-start gap-x-5 items-start max-md:w-full max-md:flex-col">
                  <div>
                    {emailAlerts.slice(0, 3).map((alert) => (
                      <div className="mb-2" key={alert.id}>
                        <input
                          type="checkbox"
                          name={alert.alert_name}
                          id={alert.alert_name}
                          className="mr-2"
                          checked={selectedAlerts[alert.alert_name] || false}
                          onChange={() =>
                            handleCheckboxChange(alert.alert_name)
                          }
                        />
                        <label htmlFor={alert.alert_name} className=" text-ash">
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
                          className="mr-2"
                          checked={selectedAlerts[alert.alert_name] || false}
                          onChange={() =>
                            handleCheckboxChange(alert.alert_name)
                          }
                        />
                        <label htmlFor={alert.alert_name} className=" text-ash">
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

                <div className="w-full flex justify-start gap-x-5  mb-5 max-md:w-full max-md:flex-col">
                  {smsAlerts.map((alert) => (
                    <div key={alert.id}>
                      <input
                        type="checkbox"
                        name={alert.alert_name}
                        id={alert.alert_name}
                        className="mr-2"
                        checked={selectedAlerts[alert.alert_name] || false}
                        onChange={() => handleCheckboxChange(alert.alert_name)}
                      />
                      <label htmlFor={alert.alert_name} className=" text-ash">
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
