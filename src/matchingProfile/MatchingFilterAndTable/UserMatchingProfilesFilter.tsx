import { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { userAnnualIncome, userCity, userComplexion, userEducation, userFamilyStatus, userMaritalStatus, userProfession, userState, userMembership, userFieldOfStudy, userDegrees, getProfileDetails } from '../../api/apiConfig';
//import MatchingStars from '../components/PartnerPreference/MatchingStars';
import { useQuery } from '@tanstack/react-query';
import { fetchEditProfileDetails, fetchMatchPreferences } from '../../action';
import MatchingStars from '../../components/PartnerPreference/MatchingStars';
import Select from 'react-select';
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

interface UserMatchingProfilesFilterProps {
    profileID: string | null;
    onFilterSubmit: (filters: any) => void;
    loading: boolean;
    profileType: 'matching' | 'suggested';
    Name: string
}
interface FieldOfStudy {
    study_id: number;
    study_description: string;
}

interface Degree {
    degeree_id: number;
    degeree_description: string;
}

export const UserMatchingProfilesFilter = ({ profileID, onFilterSubmit, loading, Name }: UserMatchingProfilesFilterProps) => {
    const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
    const [profession, setProfession] = useState<Profession[]>([]);
    const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
    const [highestEducation, setHighestEducation] = useState<HighestEducation[]>([]);
    const [state, setState] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    // const [selectedState, setSelectedState] = useState<string>('');
    const [selectedStates, setSelectedStates] = useState<String[]>([]);
    const [complexion, setComplexion] = useState<Complexion[]>([]);
    const [membership, setMembership] = useState<Membership[]>([]);
    const [familyStatus, setFamilyStatus] = useState<FamilyStatus[]>([]);
    const [selectedStarIds, setSelectedStarIds] = useState<SelectedStarIdItem[]>([]);
    const [selectedComplexions, setSelectedComplexions] = useState<String[]>([]);
    const [selectedEducation, setSelectedEducation] = useState<String[]>([]);
    const [selectedProfessions, setSelectedProfessions] = useState<String[]>([]);
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<String[]>([]);
    const [selectedFamilyStatus, setSelectedFamilyStatus] = useState<String[]>([]);
    const [heightFrom, setHeightFrom] = useState<string>('');
    const [heightTo, setHeightTo] = useState<string>('');
    const [minAnnualIncome, setMinAnnualIncome] = useState<string>('');
    const [maxAnnualIncome, setMaxAnnualIncome] = useState<string>('');
    const [foreignInterest, setForeignInterest] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('')
    const [selectedMembership, setSelectedMenbership] = useState<String[]>([]);
    const [hasphotos, setHasPhotos] = useState<string>('');
    const [fatherLive, setFatherLive] = useState<string>('');
    const [motherLive, setMotherLive] = useState<string>('');
    const [exceptViewed, setExceptViewed] = useState<boolean>(false);
    const [exceptVisitor, setExceptVisitor] = useState<boolean>(false);
    const [sentInWhatsapp, setSentInWhatsapp] = useState<string>('');
    const [sarpaDhosham, setSarpaDhosham] = useState<string>('');
    const [ageDifference, setAgeDifference] = useState<string>('')
    const [chevvaiDhosam, setChevvaiDhosam] = useState<string>('');
    const [edit3, setEdit3] = useState<HoroscopeDetails>()
    const [edit0, setEdit0] = useState<gender>();
    const [fieldOfStudyOptions, setFieldOfStudyOptions] = useState<FieldOfStudy[]>([]);
    const [selectedFieldsOfStudy, setSelectedFieldsOfStudy] = useState<String[]>([]);
    const [degrees, setDegrees] = useState<Degree[]>([]);
    const [selectedDegrees, setSelectedDegrees] = useState<String[]>([]);
    const [fromDateOfJoin, setFromDateOfJoin] = useState<string>('');
    const [toDateOfJoin, setToDateOfJoin] = useState<string>('');
    // const date = new Date("2025-02-26T18:36:47");

    // console.log("local system",date.toLocaleDateString());       // depends on system
    // console.log("en-GB format",date.toLocaleDateString("en-GB")) // always DD/MM/YYYY

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
                const maritalStatusData = await userMaritalStatus();
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
                setMaritalStatus(Object.values(maritalStatusData));
                setHighestEducation(Object.values(educationData));
                setState(Object.values(stateData));
                setCities(Object.values(cityData));
                setComplexion(Object.values(complexionData));
                setMembership(membershipData.data);
                setFamilyStatus(Object.values(familyStatusData));
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

    const handleCheckboxMatchingStars = (updatedIds: SelectedStarIdItem[]) => {
        setSelectedStarIds(updatedIds);
    };

    const handleComplexionChange = (complexionId: String) => {
        setSelectedComplexions(prev =>
            prev.includes(complexionId)
                ? prev.filter(id => id !== complexionId)
                : [...prev, complexionId]
        );
    };

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

    const handleMaritalStatusChange = (MaritalStatusID: String) => {
        setSelectedMaritalStatus(prev =>
            prev.includes(MaritalStatusID)
                ? prev.filter(id => id !== MaritalStatusID)
                : [...prev, MaritalStatusID]
        );
    };

    const handleFamilyStatusChange = (FamilyStatusID: String) => {
        setSelectedFamilyStatus(prev =>
            prev.includes(FamilyStatusID)
                ? prev.filter(id => id !== FamilyStatusID)
                : [...prev, FamilyStatusID]
        );
    };

    const handleMembershipChange = (MembershipID: String) => {
        setSelectedMenbership(prev =>
            prev.includes(MembershipID)
                ? prev.filter(id => id !== MembershipID)
                : [...prev, MembershipID]
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

    const handleStateChange = (stateId: String) => {
        setSelectedStates(prev =>
            prev.includes(stateId)
                ? prev.filter(id => id !== stateId)
                : [...prev, stateId]
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Extract dest_rasi_id from selectedStarIds
        // const prefPoruthamStar = selectedStarIds.map((item) => item.star);
        const prefPoruthamStarRasi = selectedStarIds.map((item) =>
            `${item.star}-${item.rasi}`
        ).join(",");

        const filters = {
            selectedComplexions: String(selectedComplexions),
            selectedEducation: String(selectedEducation),
            selectedFieldsOfStudy: String(selectedFieldsOfStudy), // Add this
            // selectedDegrees: String(selectedDegrees), // Add this
            selectedDegrees: selectedDegrees.join(","),
            selectedProfessions: String(selectedProfessions),
            selectedMaritalStatus: String(selectedMaritalStatus),
            selectedFamilyStatus: String(selectedFamilyStatus),
            heightFrom,
            heightTo,
            minAnnualIncome,
            maxAnnualIncome,
            foreignInterest,
            selectedState: selectedStates.join(","), // Updated this line
            selectedCity,
            selectedMembership: String(selectedMembership),
            hasphotos,
            fatherLive,
            motherLive,
            sentInWhatsapp,
            sarpaDhosham,
            chevvaiDhosam,
            destRasiIds: prefPoruthamStarRasi,
            ageDifference,
            //prefPoruthamStarRasi,
            fromDateOfJoin,
            toDateOfJoin,
            except_viewed: exceptViewed,
            except_visitor: exceptVisitor,
        };

        onFilterSubmit(filters);
    };

    useEffect(() => {
        // Set filter values from profile details when they are available
        if (profileDetails) {
            const { partner_pref_details } = profileDetails;

            // Set values from partner preferences
            if (partner_pref_details) {
                setAgeDifference(partner_pref_details.pref_age_differences || '');
                setHeightFrom(partner_pref_details.pref_height_from || '');
                setHeightTo(partner_pref_details.pref_height_to || '');
                setForeignInterest(partner_pref_details.pref_foreign_intrest || '');

                // Set checkbox arrays from comma-separated strings
                if (partner_pref_details.pref_education) {
                    setSelectedEducation(partner_pref_details.pref_education.split(','));
                }
                if (partner_pref_details.pref_profession) {
                    setSelectedProfessions(partner_pref_details.pref_profession.split(','));
                }
                if (partner_pref_details.pref_marital_status) {
                    setSelectedMaritalStatus(partner_pref_details.pref_marital_status.split(','));
                }
                if (partner_pref_details.pref_family_status) {
                    setSelectedFamilyStatus(partner_pref_details.pref_family_status.split(','));
                }
                if (partner_pref_details.pref_fieldof_study) {
                    setSelectedFieldsOfStudy(partner_pref_details.pref_fieldof_study.split(','));
                }
                if (partner_pref_details.degree) {
                    setSelectedDegrees(partner_pref_details.degree.split(','));
                }
                if (partner_pref_details.pref_anual_income) {
                    setMinAnnualIncome(partner_pref_details.pref_anual_income || '');
                }
                if (partner_pref_details.pref_anual_income_max) {
                    setMaxAnnualIncome(partner_pref_details.pref_anual_income_max || '');
                }

                // Set state preference
                //setSelectedState(partner_pref_details.pref_state || '');
                if (partner_pref_details.pref_state) {
                    setSelectedStates(partner_pref_details.pref_state.split(','));
                }

                // Set dosham preferences
                setChevvaiDhosam(partner_pref_details.pref_chevvai || '');
                setSarpaDhosham(partner_pref_details.pref_ragukethu || '');
            }
        }
    }, [profileDetails]);

    useEffect(() => {
        if (profileDetails && matchStars && matchStars.length > 0) {
            const { partner_pref_details } = profileDetails;

            if (partner_pref_details && partner_pref_details.pref_porutham_star_rasi) {
                const savedPairs = new Set(partner_pref_details.pref_porutham_star_rasi.split(','));
                const initialSelectedStars: SelectedStarIdItem[] = [];

                matchStars.flat().forEach(starOption => {
                    const currentPair = `${starOption.dest_star_id}-${starOption.dest_rasi_id}`;

                    if (savedPairs.has(currentPair)) {
                        initialSelectedStars.push({
                            id: starOption.id.toString(),
                            star: starOption.dest_star_id.toString(),
                            rasi: starOption.dest_rasi_id.toString(),
                            label: `${starOption.matching_starname} (${starOption.matching_rasiname})`
                        });
                    }
                });

                setSelectedStarIds(initialSelectedStars);
            }
        }
    }, [profileDetails, matchStars]);


    // Then update the star details when matchStars data arrives
    // useEffect(() => {
    //     if (matchStars && matchStars.length > 0 && selectedStarIds.length > 0) {
    //         // Create a mapping of all available stars from matchStars
    //         const allStarsMap: { [key: string]: any } = {};
    //         matchStars.forEach(matchCountArray => {
    //             matchCountArray.forEach(star => {
    //                 allStarsMap[star.dest_star_id.toString()] = star;
    //             });
    //         });

    //         // Update selectedStarIds with correct details
    //         const updatedSelectedStars = selectedStarIds.map(starItem => {
    //             const starDetails = allStarsMap[starItem.star];
    //             if (starDetails) {
    //                 return {
    //                     id: starItem.id,
    //                     star: starDetails.dest_star_id.toString(),
    //                     rasi: starDetails.dest_rasi_id.toString(),
    //                     label: `${starDetails.matching_starname} (${starDetails.matching_rasiname})`
    //                 };
    //             }
    //             return starItem;
    //         });

    //         setSelectedStarIds(updatedSelectedStars);
    //     }
    // }, [matchStars, selectedStarIds]);

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
                        {Name} Profile Lists For Profile ID: {profileID}
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        form="filter-form" // Add this to associate with the form
                        sx={{
                            minWidth: '200px',
                            height: '40px'
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Filter Matching Records'}
                    </Button>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/* Age Difference */}
                    <div className="flex flex-col">
                        <label className="text-[18px] text-black font-semibold mb-2">
                            Age Difference
                        </label>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            defaultValue="5"
                            //value={ageDifference}
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

                    {/* Sarpa Dhosham */}
                    <div className="flex flex-col">
                        <label className="text-[18px] text-black font-semibold mb-2">
                            Sarpa Dhosham
                        </label>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            value={sarpaDhosham}
                            onChange={(e) => setSarpaDhosham(e.target.value)}
                        >
                            <option value="">-- Select Sarpa Dhosham --</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Both">Both</option>
                        </select>
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

                    {/* Matching stars */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Matching Stars</h2>
                        </div>
                        <div className="justify-start items-center gap-x-5 text-black">
                            {matchStars && matchStars?.length > 0 ? (
                                matchStars
                                    .sort((a, b) => b[0].match_count - a[0].match_count)
                                    .map((matchCountArray, index) => {
                                        const starAndRasi = matchCountArray.map((star) => ({
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
                                                onCheckboxChange={handleCheckboxMatchingStars}
                                                unique={''}
                                            />
                                        );
                                    })
                            ) : (
                                <p>No match stars available</p>
                            )}
                        </div>
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
                    <div className="flex gap-6 py-4">
                        {/* From Date */}
                        <div>
                            <h2 className="text-lg text-black text-left font-semibold mb-2">Registration From Date</h2>
                            <input
                                type="date"
                                value={fromDateOfJoin}
                                onChange={(e) => setFromDateOfJoin(e.target.value)}
                                max={new Date().toISOString().split("T")[0]} // ⛔ disables future dates
                                className="border border-black rounded px-3 py-2 w-72 outline-none"
                            />
                        </div>

                        {/* To Date */}
                        <div>
                            <h2 className="text-lg text-left text-black font-semibold mb-2">Registration To Date</h2>
                            <input
                                type="date"
                                value={toDateOfJoin}
                                onChange={(e) => setToDateOfJoin(e.target.value)}
                                max={new Date().toISOString().split("T")[0]} // ⛔ disables future dates F
                                className="border border-black rounded px-3 py-2 w-72 outline-none"
                            />
                        </div>
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

                    {/* Mother Live */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Father live</h2>
                        </div>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            value={motherLive}
                            onChange={(e) => setMotherLive(e.target.value)}
                        >
                            <option value="">Select Option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Father Live */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Mother Live</h2>
                        </div>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            value={fatherLive}
                            onChange={(e) => setFatherLive(e.target.value)}
                        >
                            <option value="">Select Option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="py-4 flex items-end mb-4">
                        <div className="flex items-center whitespace-nowrap">
                            <input
                                type="checkbox"
                                id="exceptViewed"
                                className="mr-2"
                                checked={exceptViewed}
                                onChange={(e) => setExceptViewed(e.target.checked)}
                            />
                            <label htmlFor="exceptViewed" className="text-sm font-medium">
                                Except Viewed
                            </label>
                        </div>
                    </div>

                    <div className="py-4 flex items-end mb-4">
                        <div className="flex items-center whitespace-nowrap">
                            <input
                                type="checkbox"
                                id="exceptVisitor"
                                className="mr-2"
                                checked={exceptVisitor}
                                onChange={(e) => setExceptVisitor(e.target.checked)}
                            />
                            <label htmlFor="exceptVisitor" className="text-sm font-medium">
                                Except Visitor
                            </label>
                        </div>
                    </div>


                    {/* Marital Status */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Marital Status</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {maritalStatus.map((marital) => (
                                <div key={marital.marital_sts_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`maritalStatus-${marital.marital_sts_id}`}
                                        value={marital.marital_sts_id.toString()}
                                        className="mr-2"
                                        checked={selectedMaritalStatus.includes(marital.marital_sts_id.toString())}
                                        onChange={() => handleMaritalStatusChange(marital.marital_sts_id.toString())}
                                    />
                                    <label htmlFor={`maritalStatus-${marital.marital_sts_id}`} className="text-sm">
                                        {marital.marital_sts_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Complexion */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Complexion</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {complexion.map((complex) => (
                                <div key={complex.complexion_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`complexion-${complex.complexion_id}`}
                                        value={complex.complexion_id.toString()}
                                        className="mr-2"
                                        checked={selectedComplexions.includes(complex.complexion_id.toString())}
                                        onChange={() => handleComplexionChange(complex.complexion_id.toString())}
                                    />
                                    <label htmlFor={`complexion-${complex.complexion_id}`} className="text-sm">
                                        {complex.complexion_description}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Family Status */}
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

                    {/* State & City */}
                    {/* <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">state and city</h2>
                        </div>
                        <div className="flex items-center space-x-5">
                            <div>
                                <select
                                    name="selectedState"
                                    id="selectedState"
                                    className="w-72 outline-none px-4 py-2.5 border border-black rounded"
                                    value={selectedState || ""}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                >
                                    <option value="">Select State</option>
                                    {state.map((option) => (
                                        <option key={option.State_Pref_id} value={option.State_Pref_id}>
                                            {option.State_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select
                                    name="selectedCity"
                                    id="selectedCity"
                                    value={selectedCity || ""}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-72 outline-none px-4 py-2.5 border border-black rounded"
                                >
                                    <option value="">Select City</option>
                                    {cities.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.district}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div> */}
                    {/* Preferred State - Replace the dropdown with this */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Preferred State</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                            {state.map((stateOption) => (
                                <div key={stateOption.State_Pref_id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`state-${stateOption.State_Pref_id}`}
                                        value={stateOption.State_Pref_id.toString()}
                                        className="mr-2"
                                        checked={selectedStates.includes(stateOption.State_Pref_id.toString())}
                                        onChange={() => handleStateChange(stateOption.State_Pref_id.toString())}
                                    />
                                    <label htmlFor={`state-${stateOption.State_Pref_id}`} className="text-sm">
                                        {stateOption.State_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Membership */}
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Membership</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {membership.map((plan) => (
                                <div key={plan.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`plan-${plan.id}`}
                                        value={plan.id.toString()}
                                        className="mr-2"
                                        checked={selectedMembership.includes(plan.id.toString())}
                                        onChange={() => handleMembershipChange(plan.id.toString())}
                                    />
                                    <label htmlFor={`plan-${plan.id}`} className="text-sm">
                                        {plan.plan_name}
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

                    {/* Sent in Whatsapp */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Sent in Whatsapp</h2>
                        </div>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            value={sentInWhatsapp}
                            onChange={(e) => setSentInWhatsapp(e.target.value)}
                        >
                            <option value="">Select Option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Has Photo */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Has Photo</h2>
                        </div>
                        <select
                            name="hasphotos"
                            id="hasphotos"
                            value={hasphotos}
                            onChange={(e) => setHasPhotos(e.target.value)}
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                        >
                            <option value="">Select Option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
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