import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FcDeleteDatabase } from 'react-icons/fc';

interface pageProps {
  setIsUploadImagesOpen: Dispatch<SetStateAction<boolean>>;
  isUploadImagesOpen: boolean;
  error: any;
  setMultipleImage: Dispatch<SetStateAction<(File | null)[]>>;
  setHoroImage: Dispatch<SetStateAction<(File | null)[]>>;
  setIdProof: Dispatch<SetStateAction<(File | null)[]>>;
  setDevorceProof: Dispatch<SetStateAction<(File | null)[]>>;
}

const UpLoadImages: React.FC<pageProps> = ({
  isUploadImagesOpen,
  setDevorceProof,
  setIsUploadImagesOpen,
  setMultipleImage,
  setHoroImage,
  setIdProof,
  error,
}) => {
  const sections = [
    { label: 'Family Image', sectionIndex: 0, isMultiple: true },
    { label: 'Horoscope Image', sectionIndex: 1, isMultiple: false },
    { label: 'ID Proof', sectionIndex: 2, isMultiple: false },
    { label: 'Divorce Proof', sectionIndex: 3, isMultiple: false }, // New section for Divorce Proof
  ];

  const [selectedFiles, setSelectedFiles] = useState<(File | null)[][]>([
    Array(10).fill(''), // Family Image: 10 buttons, each holding one file
    [''], // Horoscope Image: Single file
    [''], // ID Proof: Single file
    [''], // Divorce Proof: Single file
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
    const newSelectedFiles = [...selectedFiles] as File[][]; // Update type to store full files

    if (buttonIndex !== undefined) {
      // For Family Image: Only one file per button, so we replace the existing one
      newSelectedFiles[sectionIndex][buttonIndex] = files[0] || null;
    } else {
      // For Horoscope Image, ID Proof, and Divorce Proof: Only one file, so we replace the existing one
      newSelectedFiles[sectionIndex][0] = files[0] || null;
    }

    setSelectedFiles(newSelectedFiles);
  };

  const handleRemoveFile = (sectionIndex: number, buttonIndex?: number) => {
    const newSelectedFiles = [...selectedFiles] as (File | null)[][]; // Updated type

    if (buttonIndex !== undefined) {
      // For Family Image: Clear the file from the specified button
      newSelectedFiles[sectionIndex][buttonIndex] = null;
    } else {
      // For Horoscope Image, ID Proof, and Divorce Proof: Clear the single file
      newSelectedFiles[sectionIndex][0] = null;
    }

    setSelectedFiles(newSelectedFiles);
  };

  const resStatus = sessionStorage.getItem('responseStatus');
  useEffect(() => {
    if (resStatus === '201') {
      setSelectedFiles([
        Array(10).fill(''), // Family Image: 10 buttons, each holding one file
        [''], // Horoscope Image: Single file
        [''], // ID Proof: Single file
        [''], // Divorce Proof: Single file
      ]);
      setTimeout(() => {
        sessionStorage.removeItem('responseStatus');
      }, 3000);
    }
  }, [resStatus]);

  useEffect(() => {
    if (selectedFiles[0]) {
      setMultipleImage(selectedFiles[0]);
    }
    if (selectedFiles[1]) {
      setHoroImage(selectedFiles[1]);
    }
    if (selectedFiles[2]) {
      setIdProof(selectedFiles[2]);
    }
    if (selectedFiles[3]) {
      setDevorceProof(selectedFiles[3]);
    }
  }, [
    selectedFiles[0],
    selectedFiles[1],
    selectedFiles[2],
    selectedFiles[3],
    setMultipleImage,
    setIdProof,
  ]);
  const hororScope = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (error?.hororScope) {
      hororScope.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      hororScope.current?.focus();
    }
  }, [error?.hororScope]);

  return (
    <div>
      <div className="bg-white p-5 mb-10 rounded shadow-md">
        <h4
          className="text-red-600 flex row items-center justify-between text-xl font-semibold cursor-pointer dark:text-white"
          onClick={toggleSection7}
        >
          Upload Images
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
                <h2 className="text-lg text-left font-semibold mb-4">{label}</h2>
                <div
                  className={` ${sectionIndex > 0 ? '' : 'flex-col space-y-4'}`}
                >
                  {isMultiple ? (
                    <div className="grid grid-cols-5 gap-4 max-md:grid-cols-2">
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
                                  {
                                    selectedFiles[sectionIndex][buttonIndex]
                                      .name
                                  }
                                </span>
                                <button
                                  onClick={() =>
                                    handleRemoveFile(sectionIndex, buttonIndex)
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
                      <div
                        ref={hororScope}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        {selectedFiles[sectionIndex][0] && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              {selectedFiles[sectionIndex][0].name}
                            </span>
                            <button
                              onClick={() =>
                                handleRemoveFile(sectionIndex, undefined)
                              }
                              className="text-red-500 text-xs"
                            >
                              <FcDeleteDatabase className="h-6 w-6" />
                            </button>
                          </div>
                        )}
                      </div>
                      <div>
                        {error?.hororScope && (
                          <p className="text-red-600">
                            {' '}
                            The submitted Data was not a file check the encoding
                            type on the form
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpLoadImages;
