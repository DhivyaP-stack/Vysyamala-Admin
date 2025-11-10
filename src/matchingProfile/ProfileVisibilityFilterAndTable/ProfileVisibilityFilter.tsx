import { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { userAnnualIncome, userCity, userComplexion, userEducation, userFamilyStatus, userMaritalStatus, userProfession, userState, userMembership, userFieldOfStudy, userDegrees, getProfileDetails } from '../../api/apiConfig';
import { useQuery } from '@tanstack/react-query';
import { fetchEditProfileDetails, fetchMatchPreferences } from '../../action';
import MatchingStars from '../../components/PartnerPreference/MatchingStars';
import Select from 'react-select';
import { useSearchParams } from 'react-router-dom';
// Type definitions (same as before)
interface AnnualIncome {
    income_id: number;
    income_description: string;
}

interface Profession {
    Profes_Pref_id: number;
    Profes_name: string;
}

interface MaritalStatus {
    marital_sts_id: number;
    marital_sts_name: string;
}

interface HighestEducation {
    education_id: number;
    education_description: string;
}

interface State {
    State_Pref_id: number;
    State_name: string;
}

interface City {
    id: number;
    district: string;
}

interface Complexion {
    complexion_id: number;
    complexion_description: string;
}

interface Membership {
    id: number;
    plan_name: string;
    plan_price: string;
}

interface FamilyStatus {
    family_status_id: number;
    family_status_name: string;
    family_status_description: string;
}

interface HoroscopeDetails {
    birth_rasi_name: string;
    birthstar_name: string
}

interface gender {
    "Gender": string,
}

export interface SelectedStarIdItem {
    id: string;
    rasi: string;
    star: string;
    label: string;
}

interface FieldOfStudy {
    study_id: number;
    study_description: string;
}

interface Degree {
    degeree_id: number;
    degeree_description: string;
}

export const UserProfileVisibilityFilter = () => {
    const [searchParams] = useSearchParams();
    const profileID = searchParams.get('profileId');
    const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
    const [profession, setProfession] = useState<Profession[]>([]);
    const [highestEducation, setHighestEducation] = useState<HighestEducation[]>([]);
    const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
    const [selectedEducation, setSelectedEducation] = useState<String[]>([]);
    const [selectedProfessions, setSelectedProfessions] = useState<String[]>([]);
    const [heightFrom, setHeightFrom] = useState<string>('');
    const [heightTo, setHeightTo] = useState<string>('');
    const [minAnnualIncome, setMinAnnualIncome] = useState<string>('');
    const [maxAnnualIncome, setMaxAnnualIncome] = useState<string>('');
    const [foreignInterest, setForeignInterest] = useState<string>('');
    const [ageDifference, setAgeDifference] = useState<string>('')
    const [chevvaiDhosam, setChevvaiDhosam] = useState<string>('');
    const [ragukethu, setRagukethu] = useState<string>('');
    const [edit3, setEdit3] = useState<HoroscopeDetails>()
    const [edit0, setEdit0] = useState<gender>();
    const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
    const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState<String[]>([]);
    const [degrees, setDegrees] = useState<Degree[]>([]);
    const [selectedDegrees, setSelectedDegrees] = useState<String[]>([]);
    const [loading, setLoading] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState<any>(null);
    const [loadingVisibility, setLoadingVisibility] = useState(false);
    const [ageFrom, setAgeFrom] = useState<string>('');
    const [ageTo, setAgeTo] = useState<string>('');
    const [familyStatus, setFamilyStatus] = useState<FamilyStatus[]>([]);
    const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<String[]>([]);

    // Add this query to fetch profile details
    const { data: profileDetails } = useQuery({
        queryKey: ['profileDetails', profileID],
        queryFn: () => getProfileDetails(profileID as string),
        enabled: !!profileID,
    });

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const annualIncomeData = await userAnnualIncome();
                const professionData = await userProfession();
                const educationData = await userEducation();
                const stateData = await userState();
                const cityData = await userCity();
                const complexionData = await userComplexion();
                const membershipData = await userMembership();
                const familyStatusData = await userFamilyStatus();
                const fieldOfStudyData = await userFieldOfStudy(); // Add this
                const degreesData = await userDegrees(); // Add this

                setAnnualIncome(Object.values(annualIncomeData));
                setProfession(Object.values(professionData));
                setFamilyStatus(Object.values(familyStatusData));
                setHighestEducation(Object.values(educationData));
                setFieldOfStudyOptions(Object.values(fieldOfStudyData)); // Add this
                setDegrees(Object.values(degreesData)); // Add this
            } catch (error: any) {
                console.error("Failed to fetch filter data:", error);
            }
        };
        fetchFilterData();
    }, []);



    const { data: EditData } = useQuery({
        queryKey: [profileID, 'editData'],
        queryFn: () => fetchEditProfileDetails(profileID),
        enabled: !!profileID,
    });

    useEffect(() => {
        if (EditData && EditData.length > 0) {
            setEdit3(EditData[3] as HoroscopeDetails);
            setEdit0(EditData[0] as gender);
        }
    }, [EditData]);

    const rasiId: string = edit3?.birth_rasi_name as string;
    const starId: string = edit3?.birthstar_name as string;
    const genderValue: string = edit0?.Gender as string;

    const { data: matchStars } = useQuery({
        queryKey: ['matchStars'],
        queryFn: () => fetchMatchPreferences(rasiId, starId, genderValue),
        enabled: !!rasiId && !!genderValue && !!starId,
    });


    const handleEducationChange = (EducationID: String) => {
        setSelectedEducation(prev =>
            prev.includes(EducationID)
                ? prev.filter(id => id !== EducationID)
                : [...prev, EducationID]
        );
    };

    const handleProfessionChange = (ProfessionID: String) => {
        setSelectedProfessions(prev =>
            prev.includes(ProfessionID)
                ? prev.filter(id => id !== ProfessionID)
                : [...prev, ProfessionID]
        );
    };

    // Field of Study handler
    const handleFieldOfStudyChange = (studyId: String) => {
        setSelectedFieldsOfStudy(prev =>
            prev.includes(studyId)
                ? prev.filter(id => id !== studyId)
                : [...prev, studyId]
        );
    };

    // Then update the star details when matchStars data arrives
    useEffect(() => {
        if (matchStars && matchStars.length > 0 && selectedStarIds.length > 0) {
            // Create a mapping of all available stars from matchStars
            const allStarsMap: { [key: string]: any } = {};
            matchStars.forEach(matchCountArray => {
                matchCountArray.forEach(star => {
                    allStarsMap[star.dest_star_id.toString()] = star;
                });
            });

            // Update selectedStarIds with correct details
            const updatedSelectedStars = selectedStarIds.map(starItem => {
                const starDetails = allStarsMap[starItem.star];
                if (starDetails) {
                    return {
                        id: starItem.id,
                        star: starDetails.dest_star_id.toString(),
                        rasi: starDetails.dest_rasi_id.toString(),
                        label: `${starDetails.matching_starname} (${starDetails.matching_rasiname})`
                    };
                }
                return starItem;
            });

            setSelectedStarIds(updatedSelectedStars);
        }
    }, [matchStars, selectedStarIds]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Construct query parameters
        const params = new URLSearchParams();

        // Add all filter parameters
        if (selectedEducation.length > 0) {
            params.append('selectedEducation', selectedEducation.join(','));
        }
        if (selectedFieldsOfStudy.length > 0) {
            params.append('selectedFieldsOfStudy', selectedFieldsOfStudy.join(','));
        }
        if (selectedProfessions.length > 0) {
            params.append('selectedProfessions', selectedProfessions.join(','));
        }
        if (selectedDegrees.length > 0) {
            params.append('selectedDegrees', selectedDegrees.join(','));
        }

        if (selectedFamilyStatus.length > 0) {
            params.append('selectedFamilyStatus', selectedFamilyStatus.join(','));
        }

        // Add other single value parameters
        if (heightFrom) params.append('heightFrom', heightFrom);
        if (heightTo) params.append('heightTo', heightTo);
        if (minAnnualIncome) params.append('minAnnualIncome', minAnnualIncome);
        if (maxAnnualIncome) params.append('maxAnnualIncome', maxAnnualIncome);
        if (foreignInterest) params.append('foreignInterest', foreignInterest);
        if (chevvaiDhosam) params.append('chevvaiDhosam', chevvaiDhosam);
        if (ageDifference) params.append('ageDifference', ageDifference);
        if (ageFrom) params.append('ageFrom', ageFrom);
        if (ageTo) params.append('ageTo', ageTo);
        if (ragukethu) params.append('ragukethu', ragukethu);


        // Add profile ID and type
        params.append('profileId', profileID || '');
        params.append('profileType', 'visibility');

        // Construct the URL
        const resultsUrl = `/ProfileVisibilityTable?${params.toString()}`;

        // Open in new tab
        window.open(resultsUrl, '_blank');

        setLoading(false);
    };

    const fetchProfileVisibility = async () => {
        if (!profileID) return;

        setLoadingVisibility(true);
        try {
            const response = await fetch(
                'https://app.vysyamala.com/auth/Get_profile_visibility/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ profile_id: profileID }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch profile visibility');
            }

            const data = await response.json();
            setProfileVisibility(data.data[0]); // Assuming we want the first item
        } catch (error) {
            console.error('Error fetching profile visibility:', error);
        } finally {
            setLoadingVisibility(false);
        }
    };

    // Call the API when component mounts or profileID changes
    useEffect(() => {
        fetchProfileVisibility();
    }, [profileID]);

    const handleFamilyStatusChange = (FamilyStatusID: String) => {
        setSelectedFamilyStatus(prev =>
            prev.includes(FamilyStatusID)
                ? prev.filter(id => id !== FamilyStatusID)
                : [...prev, FamilyStatusID]
        );
    };
    // Set values from API response when profileVisibility changes
    useEffect(() => {
        if (profileVisibility) {
            // Set age difference if available
            if (profileVisibility.visibility_age_from && profileVisibility.visibility_age_to) {
                // You might need to calculate the difference or set individual values
                const ageDiff = parseInt(profileVisibility.visibility_age_to) - parseInt(profileVisibility.visibility_age_from);
                setAgeDifference(ageDiff.toString());
            }

            // Set height range
            setHeightFrom(profileVisibility.visibility_height_from || '');
            setHeightTo(profileVisibility.visibility_height_to || '');

            // Set professions (comma-separated string to array)
            if (profileVisibility.visibility_profession) {
                const professionIds = profileVisibility.visibility_profession.split(',');
                setSelectedProfessions(professionIds);
            }

            // Set education (comma-separated string to array)
            if (profileVisibility.visibility_education) {
                const educationIds = profileVisibility.visibility_education.split(',');
                setSelectedEducation(educationIds);
            }

            // Set annual income range
            setMinAnnualIncome(profileVisibility.visibility_anual_income || '');
            setMaxAnnualIncome(profileVisibility.visibility_anual_income_max || '');

            // Set chevvai dhosham
            setChevvaiDhosam(profileVisibility.visibility_chevvai || '');

            // Set foreign interest
            setForeignInterest(profileVisibility.visibility_foreign_interest || '');

            // Set degrees
            if (profileVisibility.degree) {
                const degreeIds = profileVisibility.degree.split(',');
                setSelectedDegrees(degreeIds);
            }

            // Set field of study
            if (profileVisibility.visibility_field_of_study) {
                const fieldOfStudyIds = profileVisibility.visibility_field_of_study.split(',');
                setSelectedFieldsOfStudy(fieldOfStudyIds);
            }

            if (profileVisibility.visibility_family_status) {
                const familystatusIds = profileVisibility.visibility_family_status.split(',');
                setSelectedFamilyStatus(familystatusIds);
            }

            if (profileVisibility.visibility_age_from) {
                setAgeFrom(profileVisibility.visibility_age_from);
            }
            if (profileVisibility.visibility_age_to) {
                setAgeTo(profileVisibility.visibility_age_to);
            }

        }
    }, [profileVisibility]);

    return (
        <form id="filter-form" onSubmit={handleSubmit}>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <Typography
                        sx={{
                            marginBottom: '20px',
                            color: 'black',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                        }}
                    >
                        Profile Visibility Lists For Profile ID: {profileID}
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        // disabled={loading}
                        form="filter-form" // Add this to associate with the form
                        sx={{
                            minWidth: '200px',
                            height: '40px'
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : ' Filter Visibility Records'}

                    </Button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/* Age Difference */}
                    {/* <div className="flex flex-col">
                        <label className="text-[18px] text-black font-semibold mb-2">
                            Age Difference
                        </label>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            defaultValue="5"
                            onChange={(e) => setAgeDifference(e.target.value)}
                        >
                            <option value="">-- Select Age difference--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div> */}
                    {/* Age From and To */}
                    <div className="flex items-center space-x-5">
                        <div className="flex flex-col">
                            <label className="text-[18px] text-black font-semibold mb-2">
                                Age From
                            </label>
                            <input
                                type="number"
                                value={ageFrom}
                                onChange={(e) => setAgeFrom(e.target.value)}
                                className="w-full px-4 py-2 border border-black rounded"
                                placeholder="From"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[18px] text-black font-semibold mb-2">
                                Age To
                            </label>
                            <input
                                type="number"
                                value={ageTo}
                                onChange={(e) => setAgeTo(e.target.value)}
                                className="w-full px-4 py-2 border border-black rounded"
                                placeholder="To"
                            />
                        </div>
                    </div>


                    {/* Height from and to */}
                    <div className="flex items-center space-x-5">
                        <div className="flex flex-col">
                            <label className="text-[18px] text-black font-semibold mb-2">
                                Height from
                            </label>
                            <input
                                value={heightFrom}
                                onChange={(e) => setHeightFrom(e.target.value)}
                                className="w-full px-4 py-2 border border-black rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                className="text-[18px] text-black font-semibold mb-2">
                                Height To
                            </label>
                            <input
                                value={heightTo}
                                onChange={(e) => setHeightTo(e.target.value)}
                                className="w-full px-4 py-2 border border-black rounded" />
                        </div>
                    </div>

                    {/* Chevvai Dhosam */}
                    <div className="flex flex-col">
                        <label className="text-[18px] text-black font-semibold mb-2">
                            Chevvai Dhosam
                        </label>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            value={chevvaiDhosam}
                            onChange={(e) => setChevvaiDhosam(e.target.value)}
                        >
                            <option value="">-- Select Chevvai Dhosam --</option>
                            {/* <option value="Unknown">Unknown</option> */}
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[18px] text-black font-semibold mb-2">
                            Ragu/Kethu
                        </label>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            value={ragukethu}
                            onChange={(e) => setRagukethu(e.target.value)}
                        >
                            <option value="">-- Select Ragu/Kethu--</option>
                            {/* <option value="Unknown">Unknown</option> */}
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>

                    {/* Highest Education */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Education</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {highestEducation.map((education) => (
                                <div key={education.education_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`highestEducation-${education.education_id}`}
                                        value={education.education_id.toString()}
                                        className="mr-2"
                                        checked={selectedEducation.includes(education.education_id.toString())}
                                        onChange={() => handleEducationChange(education.education_id.toString())}
                                    />
                                    <label htmlFor={`highestEducation-${education.education_id}`} className="text-sm">
                                        {education.education_description}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Field of Study Checkboxes */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Field of Study</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {fieldOfStudyOptions.map((study) => (
                                <div key={study.study_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`fieldOfStudy-${study.study_id}`}
                                        value={study.study_id.toString()}
                                        className="mr-2"
                                        checked={selectedFieldsOfStudy.includes(study.study_id.toString())}
                                        onChange={() => handleFieldOfStudyChange(study.study_id.toString())}
                                    />
                                    <label htmlFor={`fieldOfStudy-${study.study_id}`} className="text-sm">
                                        {study.study_description}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Degree Checkboxes */}
                    {/* Degree Checkboxes - Replaced with Multi-Select */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Degree</h2>
                        </div>
                        <Select
                            isMulti
                            options={degrees.map((degree) => ({
                                value: degree.degeree_id.toString(),
                                label: degree.degeree_description,
                            }))}
                            value={selectedDegrees.map(degreeId => ({
                                value: degreeId.toString(),
                                label: degrees.find(d => d.degeree_id.toString() === degreeId.toString())?.degeree_description || ''
                            }))}
                            onChange={(selectedOptions) => {
                                const selectedIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                setSelectedDegrees(selectedIds);
                            }}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select Degrees"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    border: '1px solid black',
                                    borderRadius: '4px',
                                    minHeight: '44px'
                                })
                            }}
                        />
                    </div>


                    {/* Profession */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Profession</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {profession.map((prof) => (
                                <div key={prof.Profes_Pref_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`profession-${prof.Profes_Pref_id}`}
                                        value={prof.Profes_Pref_id.toString()}
                                        className="mr-2"
                                        checked={selectedProfessions.includes(prof.Profes_Pref_id.toString())}
                                        onChange={() => handleProfessionChange(prof.Profes_Pref_id.toString())}
                                    />
                                    <label htmlFor={`profession-${prof.Profes_Pref_id}`} className="text-sm">
                                        {prof.Profes_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Annual Income */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Annual Income</h2>
                        </div>
                        <div className="flex items-center space-x-5">
                            <div>
                                <select
                                    name="minAnnualIncome"
                                    id="minAnnualIncome"
                                    value={minAnnualIncome}
                                    onChange={(e) => setMinAnnualIncome(e.target.value)}
                                    className="w-72 outline-none px-4 py-2.5 border border-black rounded"
                                >
                                    <option value="">Select Min Annual Income</option>
                                    {annualIncome.map((option) => (
                                        <option key={option.income_id} value={option.income_id}>
                                            {option.income_description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select
                                    name="maxAnnualIncome"
                                    id="maxAnnualIncome"
                                    value={maxAnnualIncome}
                                    onChange={(e) => setMaxAnnualIncome(e.target.value)}
                                    className="w-72 outline-none px-4 py-2.5 border border-black rounded"
                                >
                                    <option value="">Select Max Annual Income</option>
                                    {annualIncome.map((option) => (
                                        <option key={option.income_id} value={option.income_id}>
                                            {option.income_description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Family Status</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {familyStatus.map((fStatus) => (
                                <div key={fStatus.family_status_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`familyStatus-${fStatus.family_status_id}`}
                                        value={fStatus.family_status_id.toString()}
                                        className="mr-2"
                                        checked={selectedFamilyStatus.includes(fStatus.family_status_id.toString())}
                                        onChange={() => handleFamilyStatusChange(fStatus.family_status_id.toString())}
                                    />
                                    <label htmlFor={`familyStatus-${fStatus.family_status_id}`} className="text-sm">
                                        {fStatus.family_status_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Foreign Interest */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Foreign Interest</h2>
                        </div>
                        <select
                            name="foreignInterest"
                            id="foreignInterest"
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            value={foreignInterest}
                            onChange={(e) => setForeignInterest(e.target.value)}
                        >
                            <option value="">Select Option</option>
                            <option value="Both">Both</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                {/* <div className="mt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Filter Matching Records'}
                    </Button>
                </div> */}

            </div >
        </form>
    );
};