import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import profileImg from "../../../../assets/images/defaultprofileImg.jpg"
import { fetchPhotoProofDetails, getPhotoProofDetails, getProfileDetails, uploadNewProfileImages, uploadProofFiles } from '../../../../api/apiConfig';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NotifyError, NotifySuccess } from '../../../../common/Toast/ToastMessage';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FileInput } from '../../../ReusableFile/FileInput';

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
    profile_martial_status: string;
    horoscope_file_admin: string;
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
    const [newProfileImages, setNewProfileImages] = useState<File[]>([]);
    const [horoscopeFiles, setHoroscopeFiles] = useState<File[]>([]);
    const [idProofFiles, setIdProofFiles] = useState<File[]>([]);
    const [divorceProofFiles, setDivorceProofFiles] = useState<File[]>([]);
    const [horoscopeAdminFiles, setHoroscopeAdminFiles] = useState<File[]>([]);
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


   const ImageStatusSubmit = async () => {
    if (!profileId || !photoProofDetails) {
        NotifyError("Profile ID not found.");
        return;
    }

    setLoading(true);

    try {
        const apiTasks = [];

        // ✅ START: New Block for Profile Image Upload
        // Check if there are new profile images to upload
        if (newProfileImages.length > 0) {
            // Add the new profile image upload task to our list
            apiTasks.push(
                uploadNewProfileImages(profileId, newProfileImages)
            );
        }
        // ✅ END: New Block for Profile Image Upload

        // Task for other proof file uploads (ID, Horoscope, etc.)
        const hasProofFilesToUpload =
            horoscopeFiles.length > 0 ||
            idProofFiles.length > 0 ||
            divorceProofFiles.length > 0 ||
            horoscopeAdminFiles.length > 0; // ✅ Corrected this line

        if (hasProofFilesToUpload) {
            apiTasks.push(
                uploadProofFiles(
                    profileId,
                    horoscopeFiles[0] || null,
                    idProofFiles[0] || null,
                    divorceProofFiles[0] || null,
                    horoscopeAdminFiles[0] || null
                )
            );
        }

        // Task for updating image status and password
        const passwordValue = watch("photo_password");
        const imageIds = photoProofDetails.profile_images.map(img => img.id).join(",");
        const imageApprovedStatuses = photoProofDetails.profile_images.map(img => (img.image_approved ? "1" : "0")).join(",");
        const isDeleted = photoProofDetails.profile_images.map(img => (img.is_deleted ? "1" : "0")).join(",");

        apiTasks.push(
            getPhotoProofDetails(
                profileId,
                imageIds,
                isDeleted,
                imageApprovedStatuses,
                passwordValue || "",
            )
        );

        // --- Run all tasks concurrently ---
        await Promise.all(apiTasks);

        NotifySuccess("Profile updated successfully!");

        // ✅ Clear the file input states on success
        setNewProfileImages([]);
        setHoroscopeFiles([]);
        setIdProofFiles([]);
        setDivorceProofFiles([]);
        setHoroscopeAdminFiles([]);
        // Refresh all data from the server to show new images
        fetchPhotoProof();

    } catch (error) {
        NotifyError("An error occurred while updating the profile.");
        console.error("Update Error:", error);
    } finally {
        setLoading(false);
    }
};
    //Image Approval
    //Image Approval
    const handleImageApprovalChange = (imageId: number) => {
        if (!photoProofDetails) return;

        const updatedImages = photoProofDetails.profile_images.map(img => {
            if (img.id === imageId) {
                const newApprovalState = !img.image_approved; // Toggle approval
                return {
                    ...img,
                    image_approved: newApprovalState,
                    // If we are approving the image, automatically un-delete it.
                    is_deleted: newApprovalState ? false : img.is_deleted,
                };
            }
            return img;
        });

        setPhotoProofDetails({
            ...photoProofDetails,
            profile_images: updatedImages,
        });
    };

    //handle Delete
    const handleDelete = (imageId: number) => {
        if (!photoProofDetails) return;

        const updatedImages = photoProofDetails.profile_images.map(img => {
            if (img.id === imageId) {
                const newDeletedState = !img.is_deleted; // Toggle deletion
                return {
                    ...img,
                    is_deleted: newDeletedState,
                    // If we are deleting the image, automatically un-approve it.
                    image_approved: newDeletedState ? false : img.image_approved,
                };
            }
            return img;
        });

        setPhotoProofDetails({
            ...photoProofDetails,
            profile_images: updatedImages,
        });
    };
    //download horoscope file
    const handleDownloadHoroscopeFile = (fileUrl: string | null) => {
        if (!fileUrl) return;
        window.open(fileUrl, '_blank');
    };
    //Download ID proof
    const handleDownloadIDProof = (fileUrl: string | null) => {
        if (!fileUrl) return;
        window.open(fileUrl, '_blank');
    };
    //Download divorce proof
    const handleDownloadDivorceProof = (fileUrl: string | null) => {
        if (!fileUrl) return;
        window.open(fileUrl, '_blank');
    };

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
                    <div className="flex">
                        <span className="w-50 font-semibold text-black">Profile ID</span>
                        <span>{profileId}</span>
                    </div>
                    <div className="flex">
                        <span className="w-50 font-semibold text-black">Name</span>
                        <span>{profileData?.login_details?.Profile_name || 'Loading name...'}</span>
                    </div>
                </div>
            </div>


            {/* Upload Images */}
            <div className="mt-4 ml-50">
                {photoProofDetails.profile_images.map((image, index) => (
                    // Changed flex to flex-col to stack items vertically
                    <div key={image.id} className="flex flex-col gap-2 mb-4">
                        <img
                            // src={profileImg}
                            src={image.image_url || profileImg}
                            alt={`profileImg-${index}`}
                            className="w-30 h-30 object-cover rounded-md"
                            onError={(e) => {
                                e.currentTarget.src = profileImg;
                            }}
                        />

                        {/* Added a new wrapper div to hold the controls in a row */}
                        <div className="flex items-center gap-4 mt-2">
                            {/* Approve Controls */}
                            <div className="flex items-left space-x-2">
                                <label className="flex items-left">
                                    <input
                                        type="checkbox"
                                        checked={image.image_approved}
                                        onChange={() => handleImageApprovalChange(image.id)}
                                        style={{
                                            accentColor: image.image_approved ? 'green' : undefined,
                                            width: '18px',
                                            height: '18px',
                                        }}
                                    />
                                </label>
                                <span>Approve Image</span>
                            </div>

                            {/* Delete Controls - removed ml-40 for better alignment */}
                            <div className="flex items-center space-x-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2p"
                                        checked={image.is_deleted}
                                        onChange={() => handleDelete(image.id)}
                                        style={{
                                            accentColor: image.is_deleted ? 'red' : undefined,
                                            width: '18px',
                                            height: '18px',
                                        }}
                                    />
                                </label>
                                <button className=" text-red-500 px-3 py-1.5 text-sm rounded-md ml-2">
                                    Delete Photo
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Password */}
            <div className="flex items-start gap-2">
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center relative">
                        <span className="w-50 font-semibold text-black">Password</span>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                {...register("photo_password")}
                                className="mt-1 px-2 py-1 pr-10 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="Enter password"
                            />
                            <span
                                onClick={() => setShowPassword(prev => !prev)}
                                // Position the icon absolutely within the new relative container
                                className="absolute right-3 cursor-pointer text-gray-600"
                            >
                                {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                            </span>
                        </div>

                        {errors.photo_password && (
                            <span className="text-red-500 text-sm">{errors.photo_password.message}</span>
                        )}
                    </div>
                    {/* Permission */}
                    <div className="flex">
                        <span className="w-50 font-semibold text-black">Permission</span>
                        <input type="checkbox" className="mr-2p "
                            {...register("permission")} />
                    </div>

                    <div className="flex">
                        <span className="w-50 font-semibold text-black">LAD</span>
                        <span>04/04/25 11:56:25 AM</span>
                    </div>


                    <div className="flex">
                        {/* <span className="w-100 font-semibold text-black">Upload Profile Images</span> */}
                        <FileInput
                            label="Profile Images"
                            files={newProfileImages}
                            onFilesChange={setNewProfileImages}
                            accept="image/*"
                            multiple={true}
                        />
                    </div>

                    {/* ✅ Step 4: Add this block to display selected file names */}

                    <div className="flex">
                        {/* <span className="w-100 font-semibold text-black">Upload Horoscope</span> */}
                        <FileInput
                            label="Horoscope Original"
                            files={horoscopeFiles}
                            onFilesChange={setHoroscopeFiles}
                            accept="image/*,.pdf,.doc,.docx"
                            multiple={false}
                        />
                    </div>
                    {/* Horoscope upload */}
                    <div className="flex">
                        <span className="w-50 font-semibold text-black">Original Horoscope File</span>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDownloadHoroscopeFile(photoProofDetails.horoscope_file);
                            }}
                            className="text-blue-500 underline ml-2"
                        >
                            View File
                        </a>
                    </div>

                    <div className="flex">
                        <FileInput
                            label="Horoscope Admin"
                            // ▼ USE THE NEW STATE HERE ▼
                            files={horoscopeAdminFiles}
                            onFilesChange={setHoroscopeAdminFiles}
                            accept="image/*,.pdf,.doc,.docx"
                            multiple={false}
                        />
                    </div>
                    {/* Horoscope upload */}
                    {photoProofDetails?.horoscope_file_admin && (
                        <div className="flex">
                            <span className="w-50 font-semibold text-black">Horoscope Admin File</span>
                            {/* <input
                            type="file"
                            accept="image/*"
                        /> */}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDownloadHoroscopeFile(photoProofDetails.horoscope_file_admin);
                                }}
                                className="text-blue-500 underline ml-2"
                            >
                                View File
                            </a>
                        </div>
                    )}


                    <div className="flex">
                        {/* <span className="w-100 font-semibold text-black">Upload ID Proof</span> */}
                        <FileInput
                            label="ID Proof"
                            files={idProofFiles}
                            onFilesChange={setIdProofFiles}
                            accept="image/*,.pdf,.doc,.docx"
                            multiple={false}
                        />
                    </div>
                    {photoProofDetails?.id_proof && (
                        <div className="flex">
                            <span className="w-50 font-semibold text-black">ID Proof</span>
                            {/* <input
                            type="file"
                            accept="image/*"
                        /> */}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDownloadIDProof(photoProofDetails.id_proof);
                                }}
                                className="text-blue-500 underline ml-2"
                            >
                                View File
                            </a>
                        </div>
                    )}
                    {['2', '4', '5'].includes(photoProofDetails?.profile_martial_status) && (
                        <>
                            <div className="flex">
                                <FileInput
                                    label="Upload Divorce Proof"
                                    files={divorceProofFiles}
                                    onFilesChange={setDivorceProofFiles}
                                    accept="image/*,.pdf,.doc,.docx"
                                    multiple={false}
                                />
                            </div>
                        </>
                    )}
                    {photoProofDetails?.divorce_certificate && (
                        <div className="flex">
                            <span className="w-50 font-semibold text-black">Divorce Proof</span>
                            {/* <input
                            type="file"
                            accept="image/*"
                        /> */}
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDownloadDivorceProof(photoProofDetails.divorce_certificate);
                                }}
                                className="text-blue-500 underline ml-2"
                            >
                                View File
                            </a>
                        </div>
                    )}
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
