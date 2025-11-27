import { useState } from 'react';
import { FcDeleteDatabase } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewUpLoadImages: React.FC = () => {
const navigate =useNavigate()
const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const profileId = searchParams.get('profileId')
  console.log(profileId)
  const [isUploadImagesOpen, setIsUploadImagesOpen] = useState(true);
  const sections = [
    { label: 'Family Image', sectionIndex: 0, isMultiple: true },
    { label: 'Horoscope Image', sectionIndex: 1, isMultiple: false },
    { label: 'ID Proof', sectionIndex: 2, isMultiple: false },
  ];
  const [selectedFiles, setSelectedFiles] = useState<string[][]>([
    Array(10).fill(''), // Family Image: 10 buttons, each holding one file
    [''], // Horoscope Image: Single file
    [''], // ID Proof: Single file
  ]);
  console.log(selectedFiles, 'selectedFiles');
  const toggleSection7 = () => {
    setIsUploadImagesOpen(!isUploadImagesOpen);
  };

  const triggerFileInput = (inputId: string) => {
    const fileInput = document.getElementById(
      inputId,
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };
 
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number,
    buttonIndex?: number,
  ) => {
    const files = Array.from(event.target.files || []);
    const newSelectedFiles = [...selectedFiles] as string[][];

    if (buttonIndex !== undefined) {
      // For Family Image: Only one file per button, so we replace the existing one
      newSelectedFiles[sectionIndex][buttonIndex] = files[0]?.name || '';
    } else {
      // For Horoscope Image and : Only one file, so we replace the existing one
      newSelectedFiles[sectionIndex][0] = files[0]?.name || '';
    }

    setSelectedFiles(newSelectedFiles);
  };

  const handleRemoveFile = (
    sectionIndex: number,
    buttonIndex: number | undefined,
    fileIndex: number,
  ) => {
    const newSelectedFiles = [...selectedFiles] as string[][];

    if (buttonIndex !== undefined) {
      // For Family Image: Remove a file from the specified button
      newSelectedFiles[sectionIndex][buttonIndex] = '';
    } else {
      // For Horoscope Image and ID Proof: Clear the single file
      newSelectedFiles[sectionIndex][0] = '';
    }

    setSelectedFiles(newSelectedFiles);
  };

  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl font-semibold text-black dark:text-white"
          onClick={toggleSection7}
        >
          Upload Imagess
          <svg
            className={`fill-current transform ${
              isUploadImagesOpen ? 'rotate-180' : ''
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
            ></path>
          </svg>
        </h4>

        {isUploadImagesOpen && (
          <div className="w-full py-2">
            {sections.map(({ label, sectionIndex, isMultiple }) => (
              <div
                key={sectionIndex}
                className={`mb-8 ${
                  sectionIndex > 0 ? 'inline-block w-48 mr-4' : ''
                }`}
              >
                <h2 className="text-lg font-semibold mb-4">{label}</h2>
                <div
                  className={` ${sectionIndex > 0 ? '' : 'flex-col space-y-4'}`}
                >
                  {isMultiple ? (
                    <div className="grid grid-cols-5 gap-4">
                      {Array.from({ length: 10 }).map((_, buttonIndex) => (
                        <div
                          key={buttonIndex}
                          className="flex flex-col space-y-2"
                        >
                          <button
                            type="button"
                            className="px-4 py-2 bg-gray-200 text-sm font-medium border rounded"
                            onClick={() =>
                              triggerFileInput(
                                `fileInput${sectionIndex}-${buttonIndex}`,
                              )
                            }
                          >
                            Image {buttonIndex + 1}
                          </button>

                          <input
                         
                            type="file"
                            id={`fileInput${sectionIndex}-${buttonIndex}`}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, sectionIndex, buttonIndex)
                            }
                          />
                          <div className="flex flex-col space-y-1 mt-2">
                            {selectedFiles[sectionIndex][buttonIndex] && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm">
                                  {selectedFiles[sectionIndex][buttonIndex]}
                                </span>
                                <button
                                  onClick={() =>
                                    handleRemoveFile(
                                      sectionIndex,
                                      buttonIndex,
                                      0,
                                    )
                                  }
                                  className="text-red-500 text-xs"
                                >
                                  <FcDeleteDatabase className="h-6 w-6" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <button
                        type="button"
                        className="w-full px-4 py-2 bg-gray-200 text-sm font-medium border rounded"
                        onClick={() =>
                          triggerFileInput(`fileInput${sectionIndex}-0`)
                        }
                      >
                        Select File
                      </button>
                      <input
                     
                        type="file"
                        id={`fileInput${sectionIndex}-0`}
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, sectionIndex)}
                      />
                      <div className="flex flex-col space-y-1 mt-2">
                        {selectedFiles[sectionIndex][0] && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              {selectedFiles[sectionIndex][0]}
                            </span>
                            <button
                              onClick={() =>
                                handleRemoveFile(sectionIndex, undefined, 0)
                              }
                              className="text-red-500 text-xs"
                            >
                              <FcDeleteDatabase className="h-6 w-6" />
                            </button>
                          </div>
                        )}
                      </div>
                     
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='flex justify-end'>
      <button   className={`bg-blue-500 text-white px-4 py-2 rounded al `} onClick={() =>
                            navigate(`/editProfile?profileId=${profileId}`)
                          }>To edit this form </button>
      </div>
      </div>
      
    </div>
  );
};

export default ViewUpLoadImages;
