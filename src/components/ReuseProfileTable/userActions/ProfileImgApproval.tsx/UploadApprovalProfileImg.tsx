import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import profileImg from "../../../../assets/images/defaultprofileImg.jpg"
import { fetchPhotoProofDetails, getPhotoProofDetails, getProfileDetails } from '../../../../api/apiConfig';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NotifyError, NotifySuccess } from '../../../../common/Toast/ToastMessage';
import { IoEye, IoEyeOff } from "react-icons/io5";

interface ProfileImage {
    id: number;
    image_url: string;
    image_approved: boolean;
    uploaded_at: string;
    is_deleted: boolean;
}

interface PhotoProofDetails {
    photo_password: string;
    id_proof: string;
    divorce_certificate: string | null;
    horoscope_file: string;
    profile_images: ProfileImage[];
}

const CombinedPhotoProofDetailsSchema = z.object({
    photo_password: z.string().optional(),
    permission: z.string().optional(),
    id_proof: z.string().optional(),
    divorce_certificate: z.string().nullable().optional(),
    horoscope_file: z.string().optional(),
    image_url: z.string().optional(),
    image_approved: z.boolean().optional(),
    lad: z.string().optional(),
    is_deleted: z.boolean().optional(),
});
type PhotoProofDetailsFormData = z.infer<typeof CombinedPhotoProofDetailsSchema>;

export const UploadApprovalProfileImg = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const profileId = queryParams.get('profileId');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [photoProofDetails, setPhotoProofDetails] = useState<PhotoProofDetails | null>(null);
    const [password, setPassword] = useState<string>('');
    console.log("password", password)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<any | null>(null);
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PhotoProofDetailsFormData>({
        resolver: zodResolver(CombinedPhotoProofDetailsSchema),
    });

    const fetchPhotoProof = async () => {
        if (!profileId) return;
        try {
            setLoading(true);
            const data = await fetchPhotoProofDetails(profileId);
            console.log("fetchPhotoProof", data)
            setValue("photo_password", data.photo_password); // ✅ Correct position
            setPhotoProofDetails(data);
            setPassword(data.photo_password);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setLoading(false);
        }
    };

    //fetch ProfileDetails
    const fetchDetails = async () => {
        try {
            const profileData = await getProfileDetails(String(profileId));
            setProfileData(profileData); // ✅ Store in state
            console.log("profileData", profileData)
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        fetchDetails();
        fetchPhotoProof();
    }, [profileId, setValue]);
    // //Update Uploaded Images
    const ImageStatusSubmit = async () => {
        try {
            if (!profileId || !photoProofDetails) return;
            const passwordValue = watch("photo_password"); // ✅ Get current value
            console.log("passwordValue", passwordValue)

            // Collect all image IDs and their approval status (1 = approved/checked, 0 = unapproved/unchecked)
            const imageIds = photoProofDetails.profile_images
                .map(image => image.id)
                .join(",");

            const imageApprovedStatuses = photoProofDetails.profile_images
                .map(image => (image.image_approved ? "1" : "0"))
                .join(",");

            const isDeleted = photoProofDetails.profile_images
                .map(image => (image.is_deleted ? "1" : "0"))
                .join(",");

            // Submit all images with their status in one call
            const response = await getPhotoProofDetails(
                profileId,
                imageIds,
                isDeleted, // optional: you can make this a comma-separated list too
                imageApprovedStatuses,
                passwordValue || ""
            );

            console.log("Approval Images updated successfully", response);
            NotifySuccess("Approval Images updated successfully")
            fetchPhotoProof()
            // console.log("Image status updated successfully", response);
            // return response;
        } catch (error) {
            NotifyError("Error updating image status")
            console.error("Error updating image status", error);
            throw error;
        }
    };

    //Image Approval
    const handleImageApprovalChange = (imageId: number) => {
        if (!photoProofDetails) return; // Prevents running when null
        const updatedImages = photoProofDetails.profile_images.map(img =>
            img.id === imageId
                ? { ...img, image_approved: !img.image_approved }
                : img
        );
        setPhotoProofDetails({
            ...photoProofDetails,
            profile_images: updatedImages
        });
    };

    //handle Delete
    const handleDelete = (imageId: number) => {
        if (!photoProofDetails) return; // Prevents running when null
        const updatedImages = photoProofDetails.profile_images.map(img =>
            img.id === imageId
                ? { ...img, is_deleted: !img.is_deleted }
                : img
        );
        setPhotoProofDetails({
            ...photoProofDetails,
            profile_images: updatedImages
        });
    };
    //download horoscope file
    const handleDownloadHoroscopeFile = (fileUrl: string | null) => {
        if (!fileUrl) return;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'file'); // optional: set file name
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    //Download ID proof
    const handleDownloadIDProof = (fileUrl: string | null) => {
        if (!fileUrl) return;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'file'); // optional: set file name
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    //Download divorce proof
    const handleDownloadDivorceProof = (fileUrl: string | null) => {
        if (!fileUrl) return;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'file'); // optional: set file name
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    // if (loading) {
    //     return (
    //         <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
    //             <CircularProgress />
    //         </Box>
    //     );
    // }

    if (loading) {
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // optional: light overlay
                    zIndex: 9999,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }


    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!photoProofDetails) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography>No data found for profile {profileId}</Typography>
            </Box>
        );
    }



    return (
        <Box sx={{ p: 4 }}>
            <Typography sx={{
                marginBottom: '20px',
                color: 'black',
                fontSize: '1.5rem',
                fontWeight: 'bold',
            }}>
                Upload Profile Images: {profileId}
            </Typography>

            {/* User Info */}
            <div className="flex items-start gap-2">
                <div>
                    {/* <div className="flex">
                        <span className="w-100 font-semibold text-black">ContentId</span>
                        <span className='text-center'>9842</span>
                    </div> */}
                    <div className="flex">
                        <span className="w-100 font-semibold text-black">Profile ID</span>
                        <span>{profileId}</span>
                    </div>
                    <div className="flex">
                        <span className="w-100 font-semibold text-black">Name</span>
                        <span>{profileData?.login_details?.Profile_name || 'Loading name...'}</span>
                    </div>
                </div>
            </div>


            {/* Upload Images */}
            <div className="mt-4 ml-100">
                {/* {[1, 2, 3].map((num) => ( */}
                {photoProofDetails.profile_images.map((image, index) => (
                    <div key={image.id} className="flex items-center gap-2 mb-4">
                        <img
                            // src={profileImg}
                            src={image.image_url || profileImg}
                            alt={`profileImg-${index}`}
                            className="w-30 h-30 object-cover rounded-md"
                            onError={(e) => {
                                e.currentTarget.src = profileImg;
                            }}
                        />

                        <div className="flex items-center space-x-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2p "
                                    checked={!image.image_approved} // Inverted logic
                                    onChange={() => handleImageApprovalChange(image.id)}

                                    style={{
                                        accentColor: !image.image_approved ? 'green' : undefined,
                                        width: '18px',
                                        height: '18px'
                                    }}
                                />
                            </label>
                            <span>Approved Image{index + 1}</span>
                        </div>
                        {/* <input
                            type="file"
                            accept="image/*"
                        /> */}
                        <div className="flex items-center space-x-2 ml-40">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2p"
                                    checked={image.is_deleted}
                                    onChange={() => handleDelete(image.id)} // <-- toggle handler
                                    style={{
                                        accentColor: image.is_deleted ? 'red' : undefined, // red when checked
                                        width: '18px',
                                        height: '18px',
                                    }}
                                />
                            </label>
                            <button className="border border-red-500 text-red-500 px-3 py-1.5 text-sm rounded-md ml-2">
                                Delete Photo{index + 1}
                            </button>
                        </div>
                    </div>
                ))}
            </div>



            {/* Password */}
            <div className="flex items-start gap-2">
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center relative">
                        <span className="w-100 font-semibold text-black">Password</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            // type="password"
                            id="password"
                            {...register("photo_password")}
                            // name="password"
                            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                            placeholder="Enter password"
                        />
                        <span
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-3 cursor-pointer text-gray-600"
                        >
                            {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                        </span>
                        {errors.photo_password && (
                            <span className="text-red-500 text-sm">{errors.photo_password.message}</span>
                        )}
                        {/* <span
                            className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span> */}
                    </div>
                    {/* Permission */}
                    <div className="flex">
                        <span className="w-100 font-semibold text-black">Permission</span>
                        <input type="checkbox" className="mr-2p "
                            {...register("permission")} />
                    </div>

                    <div className="flex">
                        <span className="w-100 font-semibold text-black">LAD</span>
                        <span>04/04/25 11:56:25 AM</span>
                    </div>
                    {/* Horoscope upload */}
                    <div className="flex">
                        <span className="w-100 font-semibold text-black">Horoscope File</span>
                        {/* <input
                            type="file"
                            accept="image/*"
                        /> */}
                        <button
                            onClick={() => handleDownloadHoroscopeFile(photoProofDetails.id_proof)}
                            className={`bg-blue-500 text-white rounded-md px-3 py-0.5 `}
                        >
                            View File
                        </button>
                    </div>
                    {/* Horoscope (Original) with Address */}
                    {/* <div className="flex">
                        <span className="w-100 font-semibold text-black">Horoscope (Original) with Address</span>
                        <input
                            type="file"
                            accept="image/*"
                        />
                    </div> */}
                    <div className="flex">
                        <span className="w-100 font-semibold text-black">ID Proof</span>
                        {/* <input
                            type="file"
                            accept="image/*"
                        /> */}
                        <button
                            onClick={() => handleDownloadIDProof(photoProofDetails.id_proof)}
                            className={`bg-blue-500 text-white rounded-md px-3 py-0.5 `}
                        >
                            View File
                        </button>
                    </div>
                    <div className="flex">
                        <span className="w-100 font-semibold text-black">Divorce Proof</span>
                        {/* <input
                            type="file"
                            accept="image/*"
                        /> */}
                        <button
                            onClick={() => handleDownloadDivorceProof(photoProofDetails.divorce_certificate)}
                            className={`bg-blue-500 text-white rounded-md px-3 py-0.5 `}
                        >
                            View File
                        </button>
                    </div>

                </div>

            </div>
            {/* ✅ Submit Button */}
            <div className="w-full flex justify-center mt-6 ml-60">
                <button
                    onClick={ImageStatusSubmit} // ✅ no need for handleSubmit

                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Submit
                </button>
            </div>

        </Box>
    );
};
