

import { useState, useEffect } from 'react';
import { Box, Button, Checkbox, CircularProgress, Typography } from '@mui/material';
import { userAnnualIncome, userCity, userComplexion, userEducation, userFamilyStatus, userMaritalStatus, userProfession, userState, userMembership } from '../../api/apiConfig';
//import MatchingStars from '../components/PartnerPreference/MatchingStars';
import { useQuery } from '@tanstack/react-query';
import { fetchEditProfileDetails, fetchMatchPreferences } from '../../action';
import MatchingStars from '../../components/PartnerPreference/MatchingStars';
//import { fetchEditProfileDetails, fetchMatchPreferences } from '../action';

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
}

export const UserMatchingProfilesFilter = ({ profileID, onFilterSubmit, loading }: UserMatchingProfilesFilterProps) => {
    const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
    const [profession, setProfession] = useState<Profession[]>([]);
    const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
    const [highestEducation, setHighestEducation] = useState<HighestEducation[]>([]);
    const [state, setState] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedState, setSelectedState] = useState<string>('');
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
    const [sentInWhatsapp, setSentInWhatsapp] = useState<string>('');
    const [sarpaDhosham, setSarpaDhosham] = useState<string>('');
    const[ageDifference,setAgeDifference]=useState<string>('')
    const [chevvaiDhosam, setChevvaiDhosam] = useState<string>('');
    const [edit3, setEdit3] = useState<HoroscopeDetails>()
    const [edit0, setEdit0] = useState<gender>()

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

                setAnnualIncome(Object.values(annualIncomeData));
                setProfession(Object.values(professionData));
                setMaritalStatus(Object.values(maritalStatusData));
                setHighestEducation(Object.values(educationData));
                setState(Object.values(stateData));
                setCities(Object.values(cityData));
                setComplexion(Object.values(complexionData));
                setMembership(membershipData.data);
                setFamilyStatus(Object.values(familyStatusData));
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Extract dest_rasi_id from selectedStarIds
        const destRasiIds = selectedStarIds.map((item) => item.star);
        
        const filters = {
            selectedComplexions: String(selectedComplexions),
            selectedEducation: String(selectedEducation),
            selectedProfessions: String(selectedProfessions),
            selectedMaritalStatus: String(selectedMaritalStatus),
            selectedFamilyStatus: String(selectedFamilyStatus),
            heightFrom,
            heightTo,
            minAnnualIncome,
            maxAnnualIncome,
            foreignInterest,
            selectedState,
            selectedCity,
            selectedMembership: String(selectedMembership),
            hasphotos,
            fatherLive,
            motherLive,
            sentInWhatsapp,
            sarpaDhosham,
            chevvaiDhosam,
            destRasiIds: destRasiIds.join(","),
            ageDifference
        };
        
        onFilterSubmit(filters);
    };

    return (
        <div className="container mx-auto p-4">
            <div>
                <Typography
                    sx={{
                        marginBottom: '20px',
                        color: 'black',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                    }}
                >
                    Matching Profile Lists For Profile ID : {profileID}
                </Typography>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {/* Age Difference */}
                    <div className="flex flex-col">
                        <label className="text-[18px] text-black font-semibold mb-2">
                            Age Difference
                        </label>
                        <select
                            className="w-full outline-none px-4 py-2.5 border border-black rounded"
                            defaultValue="5"
                            onChange={(e)=>setAgeDifference(e.target.value)}
                        >
                            <option value="" disabled>-- Select Age difference--</option>
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
                            <option value="" disabled>-- Select Sarpa Dhosham --</option>
                            <option value="unknown">Unknown</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
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
                            <option value="" disabled>-- Select Chevvai Dhosam --</option>
                            <option value="unknown">Unknown</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
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
                    
                    {/* Father Live */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Father Live</h2>
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
                    
                    {/* Mother Live */}
                    <div className="py-4">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">Mother Live</h2>
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
                    <div className="py-4 col-span-full">
                        <div className="w-fit text-start">
                            <h2 className="text-lg text-black font-semibold mb-2">State and City</h2>
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
                            <option value="both">Both</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
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

                <div className="mt-4">
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Filter Matching Records'}
                    </Button>
                </div>
            </form>
        </div>
    );
};