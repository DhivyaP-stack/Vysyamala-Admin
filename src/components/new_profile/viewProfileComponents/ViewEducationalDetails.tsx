


import { useEffect, useState } from 'react';
import Input from '../../Fromfield/Inputfield';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAnnualIncome,
  fetchCountryStatus,
  fetchDegree,
  fetchFieldOfStudy,
  fetchGetHighestEducation,
  fetchProfessionalPrefe,
  fetchStateStatus,
  GetCity,
  GetDistrict,
} from '../../../action';
import { District } from '../EditFormComponents/EducationalDetails';
import Select from 'react-select';
interface pageProps {
  profile: any;
}
export interface getFieldOfStudy {
  study_id: string;
  study_description: string;
}
const ViewEducationalDetails: React.FC<pageProps> = ({ profile }) => {
  const [isEducationDetailsOpen, setIsEducationDetailsOpen] = useState(true);
  const [educationalDetails, setEducationalDetails] = useState<any>({});
  console.log(educationalDetails)
  const [selectedEducation, setSelectedEducation] = useState<string>('');
  const [selectedFieldOfStudy, setSelectedFieldOfStudy] = useState<string>('');
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

  const selectedUgDegree = educationalDetails.ug_degeree;
  const selectedUgDegreeMap = selectedUgDegree ? selectedUgDegree.split(',').map(Number) : [];
  console.log(selectedUgDegreeMap)
  const [formData, setFormData] = useState({
    // ... other educational fields
    profession: '',
    company: '',
    designation: '',
    professionDetails: '',
    businessName: '',
    businessAddress: '',
    natureOfBusiness: '',
    // ... other fields
  });

  // Load initial data from profile (similar to your useEffect)
  useEffect(() => {
    if (profile && profile.length > 0) {
      const educationalDetails = profile[2];
      setFormData({
        profession: educationalDetails.profession || '',
        company: educationalDetails.company || '',
        designation: educationalDetails.designation || '',
        professionDetails: educationalDetails.profession_details || '',
        businessName: educationalDetails.business_name || '',
        businessAddress: educationalDetails.business_address || '',
        natureOfBusiness: educationalDetails.nature_of_business || '',
        // ... load other fields
      });
    }
  }, [profile]);

  useEffect(() => {
    if (profile && profile.length > 0) {
      setEducationalDetails(profile[2]);
      setSelectedEducation(profile[2].highest_education);
      setSelectedFieldOfStudy(profile[2].field_ofstudy);
      // Set selected degrees from profile data
      if (profile[2].degree) {
        setSelectedDegrees(profile[2].degree.split(','));
      }
    }
  }, [profile]);

  console.log(
    educationalDetails,
    'educationalDetailseducationalDetailseducationalDetails',
  );
  const toggleSection3 = () => {
    setIsEducationDetailsOpen(!isEducationDetailsOpen);
  };

  const { data: WorkCountry } = useQuery({
    queryKey: ['WorkCountry'],
    queryFn: fetchCountryStatus,
  });
  const { data: WorkState } = useQuery({
    queryKey: [educationalDetails.work_country, 'WorkState'],
    queryFn: () => fetchStateStatus(educationalDetails.work_country),
    enabled: !!educationalDetails.work_country,
  });
  const { data: WorkDistrict } = useQuery({
    queryKey: [educationalDetails.work_state, 'District'],
    queryFn: () => GetDistrict(educationalDetails.work_state),
    enabled: !!educationalDetails.work_state,
  });
  const { data: City } = useQuery({
    queryKey: [educationalDetails.work_city, 'City'],
    queryFn: () => GetCity(educationalDetails.work_state),
    enabled: !!educationalDetails.work_state,
  });

  const { data: GetHighestEducation } = useQuery({
    queryKey: ['GetHighestEducation'],
    queryFn: fetchGetHighestEducation,
  });

  // const { data: UgDegrees } = useQuery({
  //   queryKey: ['UgDegrees'],
  //   queryFn: fetchUgDegree,
  // });

  const { data: getFieldOfStudy } = useQuery<getFieldOfStudy[]>({
    queryKey: ['getFieldOfStudy'],
    queryFn: fetchFieldOfStudy,
  });

  const { data: AnnualIncome } = useQuery({
    queryKey: ['AnnualIncome'],
    queryFn: fetchAnnualIncome,
  });

  const { data: ProfessionalPreference } = useQuery({
    queryKey: ['ProfessionalPreference'],
    queryFn: fetchProfessionalPrefe,
  });

  const { data: degreesData } = useQuery({
    queryKey: ['degrees', selectedEducation, selectedFieldOfStudy],
    queryFn: () => fetchDegree(selectedEducation, selectedFieldOfStudy),
    enabled: !!selectedEducation && !!selectedFieldOfStudy,
  });

  const selectedDegreeIds = educationalDetails.degree ? educationalDetails.degree.split(',') : [];
  const selectedDegreeDescriptions = degreesData
    ? degreesData
      .filter(degree => selectedDegreeIds.includes(degree.degeree_id))
      .map(degree => degree.degeree_description)
      .join(', ')
    : '';

  const buttonClass = (isSelected: boolean) =>
    isSelected ? 'bg-secondary text-white' : 'border-gray ';

  const getSelectedOptions = () => {
    if (!degreesData) return [];

    return selectedDegrees.map(id => {
      const degree = Array.isArray(degreesData)
        ? degreesData.find(d => d.degeree_id.toString() === id)
        : degreesData[Object.keys(degreesData).find(key =>
          degreesData[key].degeree_id.toString() === id
        ) || ''];

      return degree ? {
        value: degree.degeree_id.toString(),
        label: degree.degeree_description
      } : null;
    }).filter(Boolean);
  };


  return (
    <div className="bg-white p-5 mb-10 rounded shadow-md">
      <h4
        className="text-red-600 flex row items-center justify-between text-xl font-semibold  dark:text-white cursor-pointer  after-red-line::after"
        onClick={toggleSection3}
      >
        Education Details
        <svg
          className={`fill-current transform ${isEducationDetailsOpen ? 'rotate-180' : ''
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
      {isEducationDetailsOpen && (
        <div className="flex flex-col gap-5">
          {/* Education Details Form Fields */}
          <div className="flex w-full flex-row gap-4">
            <div className="w-full">
              <label className="block text-[#5a5959e6] font-medium mb-1">
                Highest Education Level <span className="text-red-500">*</span>
              </label>
              <select
                disabled
                value={educationalDetails.highest_education}
                className="outline-none w-full px-4 py-2 border  font-medium border-[#b5b2b2e6]  text-[#222020e6] rounded"
              >
                <option value="">Select education level</option>
                {GetHighestEducation?.map((education) => (
                  <option
                    key={education.education_id}
                    value={education.education_id}

                  >
                    {education.education_description}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-[#5a5959e6] font-medium mb-1">
                Field Of Study
                {/* <span className="text-red-500">*</span> */}
              </label>
              <select
                disabled
                value={educationalDetails.field_ofstudy}
                className="outline-none w-full font-medium px-4 py-2 border border-[#b5b2b2e6]  text-[#222020e6] rounded"
              >
                <option value="">Select education level</option>
                <option value="">Select education level</option>
                {getFieldOfStudy?.map((education) => (
                  <option key={education.study_id} value={education.study_id}>
                    {education.study_description}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <div className="w-full">
            <label className="block text-[#5a5959e6] font-medium mb-1">
              Degree
              {/* <span className="text-red-500">*</span> */}
            </label>
            <Select
              isMulti
              isDisabled={true}
              value={getSelectedOptions()}
              options={degreesData?.map((degree) => ({
                value: degree.degeree_id,
                label: degree.degeree_description
              }))}
              className="basic-multi-select text-[#5a5959e6] font-medium"
              classNamePrefix="select"
            />
            {educationalDetails.other_degree && (
              <Input
                disabled
                value={educationalDetails.other_degree}
                label={'Other Degree'}
              />
            )}
          </div>
          <div className="flex w-full flex-row gap-4">
            <div className="w-full text-[#5a5959e6] font-medium">
              <Input
                disabled
                value={educationalDetails.about_edu}
                required
                label={'About your Education'}
              />
            </div>
            <div className="w-full">
              <label className="block text-[#5a5959e6] font-medium mb-1">
                Annual Income
                {/* <span className="text-red-500">*</span> */}
              </label>
              <select
                disabled
                value={educationalDetails.anual_income}
                className="outline-none w-full px-4 py-2  font-medium border border-[#b5b2b2e6]  text-[#222020e6] rounded"
              >
                <option value="">Annual Income</option>
                {AnnualIncome?.map((education) => (
                  <option key={education.id} value={education.id}>
                    {education.income}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full text-[#5a5959e6] font-medium ">
              <Input
                disabled
                value={educationalDetails.actual_income}
                required
                label={'Actual Income'}
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="w-full">
              <label className="block text-[#5a5959e6] font-medium mb-1">
                <h1 className="mb-3 text-[#5a5959e6] font-medium">
                  Profession <span className="text-red-500">*</span>
                </h1>
              </label>

              <div className="w-full inline-flex border border-[#b5b2b2e6] rounded">
                {ProfessionalPreference?.map((Profession: any) => (
                  <label
                    key={Profession.Profes_Pref_id}
                    className={`w-full px-5 py-3 text-sm font-medium border border-[#b5b2b2e6]  text-[#222020e6]  text-center   ${buttonClass(
                      Number(educationalDetails.profession) ===
                      Number(Profession.Profes_Pref_id),
                    )}`}
                  >
                    <input
                      id="profession"
                      value={educationalDetails.profession}
                      disabled
                      type="radio"
                      className="w-0"
                    />
                    {Profession.Profes_name}
                  </label>
                ))}
              </div>
            </div>

          </div>

          {(Number(educationalDetails.profession) === 1 || Number(educationalDetails.profession) === 7) && (
            <div className="mt-4">
              <div className="mb-3 text-black">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={educationalDetails.company_name}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-3 text-black">
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  id="designation"
                  type="text"
                  value={educationalDetails.designation}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-3 text-black">
                <label htmlFor="professionDetail" className="block text-sm font-medium text-gray-700">
                  Profession Details
                </label>
                <textarea
                  id="professionDetail"
                  value={educationalDetails.profession_details}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {/* Fields for Business (Profession ID 2) */}
          {Number(educationalDetails.profession) === 2 && (
            <div className="mt-4">
              <div className="mb-3 text-black">
                <label htmlFor="BusinessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  id="BusinessName"
                  type="text"
                  value={educationalDetails.business_name}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-3 text-black">
                <label htmlFor="BusinessAdress" className="block text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <input
                  id="BusinessAdress"
                  type="text"
                  value={educationalDetails.business_address}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="mb-3 text-black">
                <label htmlFor="NatureofBusiness" className="block text-sm font-medium text-gray-700">
                  Nature of Business
                </label>
                <textarea
                  id="NatureofBusiness"
                  value={educationalDetails.nature_of_business}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {/* Fields for Salaried and Business (Profession ID 6) */}
          {Number(educationalDetails.profession) === 6 && (
            <div className="mt-4">
              {/* Salaried Details */}
              <div className="mb-3 text-black">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  value={educationalDetails.company_name}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="mb-3 text-black">
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  id="designation"
                  type="text"
                  value={educationalDetails.designation}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="mb-3 text-black">
                <label htmlFor="professionDetail" className="block text-sm font-medium text-gray-700">
                  Profession Details
                </label>
                <textarea
                  id="professionDetail"
                  value={educationalDetails.profession_details}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Business Details */}
              <div className="mb-3 text-black">
                <label htmlFor="BusinessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  id="BusinessName"
                  type="text"
                  value={educationalDetails.business_name}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="mb-3 text-black">
                <label htmlFor="BusinessAdress" className="block text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <input
                  id="BusinessAdress"
                  type="text"
                  value={educationalDetails.business_address}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="mb-3 text-black">
                <label htmlFor="NatureofBusiness" className="block text-sm font-medium text-gray-700">
                  Nature of Business
                </label>
                <textarea
                  id="NatureofBusiness"
                  value={educationalDetails.nature_of_business}
                  disabled
                  className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {!(Number(educationalDetails.profession) === 3 || Number(educationalDetails.profession) === 4) && (
            <>
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Work Location
              </h4>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-semibold mb-1">
                    Country
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <select
                    value={educationalDetails.work_country}
                    disabled
                    className="outline-none w-full px-4 py-2 border text-black font-medium border-black rounded"
                  >
                    <option value="">-- Select your Country --</option>
                    {WorkCountry?.map((option) => (
                      <option key={option.country_id} value={option.country_id}>
                        {option.country_name}
                      </option>
                    ))}
                  </select>
                </div>

                {educationalDetails.work_country === '1' ? (
                  <div className="w-full">
                    <label className="block text-black font-semibold mb-1">
                      State (Based on country selection){' '}
                      {/* <span className="text-red-500">*</span> */}
                    </label>
                    <select
                      value={educationalDetails.work_state}
                      disabled
                      className="outline-none w-full px-4 py-2 border text-black font-medium border-black rounded"
                    >
                      <option value="">
                        Select your state
                      </option>
                      {WorkState?.map((option: any) => (
                        <option key={option.state_id} value={option.state_id}>
                          {option.state_name}
                        </option>
                      ))}
                    </select>
                    {sessionStorage.getItem('stateError') && (
                      <p className="text-red-600">
                        {sessionStorage.getItem('stateError')}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full text-black font-medium flex-row gap-4">
                    <Input
                      value={educationalDetails.work_city}
                      disabled
                      label={'work place'}
                      placeholder="Work place"
                    />
                  </div>
                )}
              </div>

              <div className="flex w-full flex-row gap-4">
                {educationalDetails.work_country === '1' && (
                  // <div className="w-2/4">
                  //   <label className="block text-black font-semibold mb-1">
                  //     District
                  //     {/* <span className="text-red-500">*</span> */}
                  //   </label>

                  //   <select
                  //     value={educationalDetails.work_district}
                  //     disabled
                  //     // {...register('EducationDetails.disttemp')}
                  //     className="outline-none w-full px-4 py-2 text-black font-medium border border-black rounded"
                  //   >
                  //     <option value="">
                  //       Select your District
                  //     </option >
                  //     {WorkDistrict?.map((option: District) => (
                  //       <option key={option.disctict_id} value={option.disctict_id} >
                  //         {option.disctict_name}
                  //       </option>
                  //     ))}
                  //   </select>
                  // </div>
                  <div className="w-2/4">
                    <label className="block text-black font-semibold mb-1">
                      District
                      {/* <span className="text-red-500">*</span> */}
                    </label>

                    {/* --- MODIFIED SECTION --- */}
                    {/* Using Input to display the name instead of a select with an ID */}
                    <Input
                      readOnly
                      disabled
                      label={''}
                      value={
                        WorkDistrict?.find(
                          (d: District) => String(d.disctict_id) === String(educationalDetails.work_district)
                        )?.disctict_name ||
                        educationalDetails.work_district ||
                        ''
                      }
                      // Using styles from your other disabled inputs for consistency
                      className="outline-none w-full text-black font-medium px-4 py-[8.5px] border border-ashBorder rounded bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                )}

                {educationalDetails.work_country === '1' && (
                  <div className="w-2/4">
                    <label className="block text-black font-medium mb-1">
                      Work City
                      {/* <span className="text-red-500">*</span> */}
                    </label>
                    <Input
                      required
                      value={educationalDetails.work_city}
                      label={''}
                      type={'text'}
                      readOnly
                    />

                  </div>
                )}

                <div className="flex w-2/4 flex-row gap-4">
                  <Input
                    required
                    disabled
                    value={educationalDetails.work_pincode}
                    label={'Post code (Based on Country Selection)'}
                  />
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <label className="block text-black font-semibold mb-1">
                    Career Plans / Notes
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                  <textarea
                    disabled
                    value={educationalDetails.career_plans}
                    className="outline-none w-full px-4 py-2 text-black font-medium border border-black rounded"
                  ></textarea>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewEducationalDetails;
