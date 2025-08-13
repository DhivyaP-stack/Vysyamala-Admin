import { useState } from "react";


const FeatureProfile: React.FC = () => {
    const [isFeaturePreferenceOpen, setIsFeaturePreferenceOpen] = useState(true);
    const toggleSection6 = () => {
      setIsFeaturePreferenceOpen(!isFeaturePreferenceOpen);
    };
  return (
    <div>
         <div className="bg-white p-5 mb-10 rounded shadow-md">
          <h4
            className="text-red-600 flex row items-center justify-between text-xl font-semibold  dark:text-white"
            onClick={toggleSection6}
          >
            Feature Preference{' '}
            <svg
              className={`fill-current transform ${
                isFeaturePreferenceOpen ? 'rotate-180' : ''
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

          {isFeaturePreferenceOpen && (
            <div className="flex flex-col gap-5 pt-2">
              {/* Height Inputs */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Height from</label>
                  <input
                    // {...register('pref_height_to')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {/* {errors.pref_height_to && (
                    <span className="text-red-500">
                      {errors.pref_height_to.message}
                    </span>
                  )} */}
                </div>
                <div className="w-full">
                  <label>Height to</label>
                  <input
                    // {...register('heightTo')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {/* {errors.heightTo && (
                    <span className="text-red-500">
                      {errors.heightTo.message}
                    </span>
                  )} */}
                </div>
                <div className="w-full">
                  <label>Age Preference</label>
                  <input
                    // {...register('pref_age_differences')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {/* {errors.pref_age_differences && (
                    <span className="text-red-500">
                      {errors.pref_age_differences.message}
                    </span>
                  )} */}
                </div>
              </div>

              {/* Other Inputs */}
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Height Preference</label>
                  <input
                    // {...register('pref_height_from')}
                    className="w-full px-4 py-2 border border-black rounded"
                  />
                  {/* {errors.pref_height_from && (
                    <span className="text-red-500">
                      {errors.pref_height_from.message}
                    </span>
                  )} */}
                </div>
                <div className="w-full">
                  <label>Chevvai</label>
                  <select
                    // {...register('chevvai')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {/* {errors.chevvai && (
                    <span className="text-red-500">
                      {errors.chevvai.message}
                    </span>
                  )} */}
                </div>
                <div className="w-full">
                  <label>Rehu / Ketu</label>
                  <select
                    // {...register('rehuKetu')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {/* {errors.rehuKetu && (
                    <span className="text-red-500">
                      {errors.rehuKetu.message}
                    </span>
                  )} */}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label>Foreign Interest</label>
                  <select
                    // {...register('pref_foreign_intrest')}
                    className="w-full px-4 py-2 border border-black rounded"
                  >
                    <option value="">Select</option>
                    <option value="Both">Both</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {/* {errors.pref_foreign_intrest && (
                    <span className="text-red-500">
                      {errors.pref_foreign_intrest.message}
                    </span>
                  )} */}
                </div>
              </div>

              {/* Profession Checkboxes */}
              <div className="w-full">
                <h5 className="text-[18px] text-black font-semibold mb-2">
                  Profession
                </h5>
                <div className="flex justify-between items-center">
                  {[
                    'employed',
                    'business',
                    'student',
                    'notWorking',
                    'notMentioned',
                  ].map((profession) => (
                    <div key={profession}>
                      <input
                        type="checkbox"
                        id={`profession-${profession}`}
                        // {...register('pref_profession')}
                        value={profession}
                      />
                      <label
                        htmlFor={`profession-${profession}`}
                        className="pl-1"
                      >
                        {profession}
                      </label>
                    </div>
                  ))}
                </div>
                {/* {errors.pref_profession && (
                  <span className="text-red-500">
                    {errors.pref_profession.message}
                  </span>
                )} */}
              </div>

              {/* Marital Status */}
              <div>
                <h5 className="text-[18px] text-black font-semibold mb-2">
                  Marital Status
                </h5>
                <div className="flex justify-between items-center">
                  
                    <div>
                      <input
                        type="checkbox"
                        id={`maritalStatus-}`}
                        // {...register('pref_marital_status')}
                        // value={status.marital_sts_id.toString()}
                      />
                      <label
                        htmlFor={`pref_marital_status-}`}
                      >
                        {/* {status.marital_sts_name} */}
                      </label>
                    </div>
                  
                </div>
                {/* {errors.pref_marital_status && (
                  <span className="text-red-500">
                    {errors.pref_marital_status.message}
                  </span>
                )} */}
              </div>

              {/* Annual Income */}
              <div>
                <label className="text-[18px] text-black font-semibold mb-2">
                  Annual Income
                </label>
                <div className="grid grid-rows-1 grid-cols-4">
                 
                    <div  className="mb-2">
                      <input
                        type="checkbox"
                        id={`annualIncome-}`}
                        // {...register('pref_anual_income')}
                        // value={option.income_id.toString()}
                      />
                      <label
                        htmlFor={`pref_anual_income-}`}
                        className="pl-1"
                      >
                        
                      </label>
                    </div>
                
                </div>
                {/* {errors.pref_anual_income && (
                  <span className="text-red-500">
                    {errors.pref_anual_income.message}
                  </span>
                )} */}
              </div>

              <div>
                {/* Display Matching Stars */}
                <div className="justify-start items-center gap-x-5 text-black">
                {/* {matchStars.length > 0 ? (
                  matchStars
                    .sort((a, b) => b[0].match_count - a[0].match_count) // Sort by match_count
                    .map((matchCountArray, index) => {
                      const starAndRasi = matchCountArray.map(star => ({
                        id: star.id.toString(),
                        matching_starId: star.dest_star_id.toString(),
                        matching_starname: star.matching_starname,
                        matching_rasiId: star.dest_rasi_id.toString(),
                        matching_rasiname: star.matching_rasiname,
                      }));

                      const matchCountValue = matchCountArray[0].match_count;

                      return (
                        <MatchingStars
                          key={index}
                          initialPoruthas={`No of porutham ${matchCountValue}`}
                          starAndRasi={starAndRasi}
                          selectedStarIds={selectedStarIds}
                          onCheckboxChange={handleCheckboxChange}
                        />
                      );
                    })
                ) : (
                  <p>No match stars available</p>
                )} */}
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default FeatureProfile