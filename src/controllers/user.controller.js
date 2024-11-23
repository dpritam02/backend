import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadonCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({mesaage : "Pritam its working fine!"})
    const { fullName, email, username, password } = req.body
    // console.log("email:", email); 

    //validation
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "") //vvip
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //check for existing email and username
    const existedUser = await User.findOne({
        $or: [{ email }, { username }] //using operator notation
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    //check for profile and avatar images , here multer give the files 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.profile[0]?.path; //this is modified in the original github file, check once

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    //upload them to cloudinary server
    const avatar = await uploadonCloudinary(avatarLocalPath)
    const coverImage = await uploadonCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    //create object and database entry
    const user = await User.create({ //object created
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //this step is taken to remove the field mentioned in the stirng
    )
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    //if user is successfully registered
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

export { registerUser }