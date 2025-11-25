// components/PastCallDataPopup.tsx
import React from 'react';
import { apiAxios } from '../api/apiUrl';

interface CallData {
  id: number;
  call_date: string;
  call_time: string;
  call_duration: string;
  call_type: string;
  call_status: string;
  call_notes: string;
  called_by: string;
  follow_up_required: boolean;
  follow_up_date?: string;
}

interface PastCallDataPopupProps {
  open: boolean;
  onClose: () => void;
  profileId: string;
}

const PastCallDataPopup: React.FC<PastCallDataPopupProps> = ({
  open,
  onClose,
  profileId
}) => {
  const [callData, setCallData] = React.useState<CallData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchCallData = async () => {
    if (!profileId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await apiAxios.get(`/api/profile-call-management/list?profile_id=${profileId}`);
      
      if (response.data.status === 'success') {
        setCallData(response.data.data || []);
      } else {
        setError(response.data.message || 'Failed to fetch call data');
      }
    } catch (err: any) {
      console.error('Error fetching call data:', err);
      setError(err.response?.data?.message || 'Failed to fetch call data');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (open && profileId) {
      fetchCallData();
    }
  }, [open, profileId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Past Call Data - {profileId}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[70vh]">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading call data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>
              <button
                onClick={fetchCallData}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && callData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No call data found for this profile.</p>
            </div>
          )}

          {!loading && !error && callData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Called By
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Follow Up
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {callData.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {call.call_date}
                        </div>
                        <div className="text-sm text-gray-500">
                          {call.call_time}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {call.call_duration}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {call.call_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          call.call_status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : call.call_status === 'Missed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {call.call_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {call.called_by}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">
                        <div className="truncate" title={call.call_notes}>
                          {call.call_notes || 'No notes'}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {call.follow_up_required ? (
                          <div>
                            <span className="text-orange-600 font-medium">Yes</span>
                            {call.follow_up_date && (
                              <div className="text-xs text-gray-500">
                                {call.follow_up_date}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastCallDataPopup;