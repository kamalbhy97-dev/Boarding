const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();


// =====================================================
// CONFIGURATION
// =====================================================

const PORT = 5000;

const MONGO_URI =
    "mongodb+srv://kamalbhy97_db_user:RXkZIbCSuHinZNBl@cluster0.bijeqli.mongodb.net/?appName=Cluster0";


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
    cors({
        origin: "mongodb+srv://kamalbhy97_db_user:RXkZIbCSuHinZNBl@cluster0.bijeqli.mongodb.net/?appName=Cluster0",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// =====================================================
// REQUEST LOGGER
// =====================================================

app.use((req, res, next) => {
    console.log("");
    console.log("========================================");
    console.log("REQUEST RECEIVED");
    console.log("Method :", req.method);
    console.log("URL    :", req.originalUrl);
    console.log("========================================");

    next();
});


// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("");
        console.log("========================================");
        console.log("MongoDB connected successfully");
        console.log("Database: boardingfind");
        console.log("========================================");
        console.log("");
    })
    .catch((error) => {
        console.error("");
        console.error("========================================");
        console.error("MongoDB CONNECTION FAILED");
        console.error("========================================");
        console.error(error.message);
        console.error("");
    });


// =====================================================
// SCHOOL SCHEMA
// =====================================================

const schoolSchema = new mongoose.Schema(
    {
        schoolName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 150,
        },

        schoolType: {
            type: String,
            required: true,
            trim: true,
        },

        board: {
            type: String,
            required: true,
            trim: true,
        },

        establishedYear: {
            type: Number,
        },

        website: {
            type: String,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        pincode: {
            type: String,
            required: true,
            trim: true,
        },

        contactPerson: {
            type: String,
            required: true,
            trim: true,
        },

        designation: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        studentCount: {
            type: String,
            trim: true,
        },

        classes: {
            type: String,
            trim: true,
        },

        admissionStatus: {
            type: String,
            trim: true,
        },

        hostel: {
            type: String,
            trim: true,
        },

        transportation: {
            type: String,
            trim: true,
        },

        sports: {
            type: String,
            trim: true,
        },

        laboratories: {
            type: String,
            trim: true,
        },

        library: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            maxlength: 2000,
            trim: true,
        },

        status: {
            type: String,
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);


// =====================================================
// SCHOOL MODEL
// =====================================================

const School = mongoose.model("School", schoolSchema);


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
    console.log("Backend test route called.");

    res.status(200).json({
        success: true,
        message: "BoardingFind backend is running",
    });
});


// =====================================================
// REGISTER SCHOOL
// =====================================================

app.post("/api/schools/register", async (req, res) => {

    console.log("");
    console.log("========================================");
    console.log("REGISTER SCHOOL REQUEST RECEIVED");
    console.log("========================================");

    console.log("Frontend data:");
    console.log(req.body);

    console.log("========================================");
    console.log("");


    try {

        // =================================================
        // GET DATA FROM FRONTEND
        // =================================================

        const {
            schoolName,
            schoolType,
            board,
            establishedYear,
            website,
            address,
            city,
            state,
            pincode,
            contactPerson,
            designation,
            email,
            phone,
            studentCount,
            classes,
            admissionStatus,
            hostel,
            transportation,
            sports,
            laboratories,
            library,
            description,
        } = req.body;


        // =================================================
        // CHECK BODY
        // =================================================

        if (!req.body || Object.keys(req.body).length === 0) {

            console.log("ERROR: Empty request body.");

            return res.status(400).json({
                success: false,
                message: "No registration data was received.",
            });
        }


        // =================================================
        // SCHOOL NAME
        // =================================================

        if (
            !schoolName ||
            typeof schoolName !== "string" ||
            schoolName.trim().length < 3
        ) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid school name.",
            });
        }


        // =================================================
        // SCHOOL TYPE
        // =================================================

        if (!schoolType || !String(schoolType).trim()) {

            return res.status(400).json({
                success: false,
                message: "Please select the school type.",
            });
        }


        // =================================================
        // BOARD
        // =================================================

        if (!board || !String(board).trim()) {

            return res.status(400).json({
                success: false,
                message: "Please select the board / curriculum.",
            });
        }


        // =================================================
        // ADDRESS
        // =================================================

        if (
            !address ||
            typeof address !== "string" ||
            address.trim().length < 10
        ) {

            return res.status(400).json({
                success: false,
                message: "Please enter the complete school address.",
            });
        }


        // =================================================
        // CITY
        // =================================================

        if (!city || !String(city).trim()) {

            return res.status(400).json({
                success: false,
                message: "Please enter the city.",
            });
        }


        // =================================================
        // STATE
        // =================================================

        if (!state || !String(state).trim()) {

            return res.status(400).json({
                success: false,
                message: "Please enter the state.",
            });
        }


        // =================================================
        // PINCODE
        // =================================================

        if (
            !pincode ||
            !/^[1-9][0-9]{5}$/.test(String(pincode).trim())
        ) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid 6-digit PIN code.",
            });
        }


        // =================================================
        // CONTACT PERSON
        // =================================================

        if (
            !contactPerson ||
            typeof contactPerson !== "string" ||
            contactPerson.trim().length < 2
        ) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid contact person name.",
            });
        }


        // =================================================
        // DESIGNATION
        // =================================================

        if (
            !designation ||
            typeof designation !== "string" ||
            !designation.trim()
        ) {

            return res.status(400).json({
                success: false,
                message: "Please enter the designation.",
            });
        }


        // =================================================
        // EMAIL
        // =================================================

        const cleanEmail =
            email ? String(email).trim().toLowerCase() : "";

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }


        // =================================================
        // PHONE
        // =================================================

        const cleanPhone =
            phone ? String(phone).trim() : "";

        const phoneRegex =
            /^(?:\+91[\s-]?)?[6-9][0-9]{9}$/;

        if (!phoneRegex.test(cleanPhone)) {

            return res.status(400).json({
                success: false,
                message: "Please enter a valid Indian mobile number.",
            });
        }


        // =================================================
        // ESTABLISHED YEAR
        // =================================================

        let cleanEstablishedYear;

        if (
            establishedYear !== undefined &&
            establishedYear !== null &&
            String(establishedYear).trim() !== ""
        ) {

            cleanEstablishedYear =
                Number(establishedYear);

            const currentYear =
                new Date().getFullYear();

            if (
                Number.isNaN(cleanEstablishedYear) ||
                cleanEstablishedYear < 1800 ||
                cleanEstablishedYear > currentYear
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid established year.",
                });
            }
        }


        // =================================================
        // WEBSITE
        // =================================================

        const cleanWebsite =
            website ? String(website).trim() : "";

        if (cleanWebsite) {

            try {

                new URL(cleanWebsite);

            } catch (error) {

                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid website URL.",
                });
            }
        }


        // =================================================
        // CHECK DUPLICATE EMAIL
        // =================================================

        console.log("Checking duplicate email...");

        const existingSchool =
            await School.findOne({
                email: cleanEmail,
            });

        if (existingSchool) {

            console.log(
                "Duplicate school email:",
                cleanEmail
            );

            return res.status(409).json({
                success: false,
                message:
                    "A school is already registered with this email address.",
            });
        }


        // =================================================
        // CREATE SCHOOL DOCUMENT
        // =================================================

        const school =
            new School({

                schoolName:
                    schoolName.trim(),

                schoolType:
                    String(schoolType).trim(),

                board:
                    String(board).trim(),

                establishedYear:
                    cleanEstablishedYear,

                website:
                    cleanWebsite,

                address:
                    address.trim(),

                city:
                    String(city).trim(),

                state:
                    String(state).trim(),

                pincode:
                    String(pincode).trim(),

                contactPerson:
                    contactPerson.trim(),

                designation:
                    designation.trim(),

                email:
                    cleanEmail,

                phone:
                    cleanPhone,

                studentCount:
                    studentCount
                        ? String(studentCount).trim()
                        : "",

                classes:
                    classes
                        ? String(classes).trim()
                        : "",

                admissionStatus:
                    admissionStatus
                        ? String(admissionStatus).trim()
                        : "",

                hostel:
                    hostel
                        ? String(hostel).trim()
                        : "",

                transportation:
                    transportation
                        ? String(transportation).trim()
                        : "",

                sports:
                    sports
                        ? String(sports).trim()
                        : "",

                laboratories:
                    laboratories
                        ? String(laboratories).trim()
                        : "",

                library:
                    library
                        ? String(library).trim()
                        : "",

                description:
                    description
                        ? String(description).trim()
                        : "",

                status: "pending",
            });


        // =================================================
        // SAVE TO MONGODB
        // =================================================

        console.log("Saving school to MongoDB...");

        const savedSchool =
            await school.save();


        // =================================================
        // SUCCESS
        // =================================================

        console.log("");
        console.log("========================================");
        console.log("SCHOOL SAVED SUCCESSFULLY");
        console.log("MongoDB ID:", savedSchool._id);
        console.log("School:", savedSchool.schoolName);
        console.log("Email:", savedSchool.email);
        console.log("========================================");
        console.log("");


        return res.status(201).json({

            success: true,

            message:
                "School registration submitted successfully.",

            school: savedSchool,

        });

    } catch (error) {

        console.error("");
        console.error("========================================");
        console.error("SCHOOL REGISTRATION ERROR");
        console.error("========================================");
        console.error(error);
        console.error("========================================");
        console.error("");


        // =================================================
        // MONGOOSE VALIDATION ERROR
        // =================================================

        if (
            error.name ===
            "ValidationError"
        ) {

            const validationMessages =
                Object.values(error.errors)
                    .map(
                        (item) =>
                            item.message
                    );

            return res.status(400).json({

                success: false,

                message:
                    validationMessages.join(", "),

            });
        }


        // =================================================
        // DUPLICATE KEY ERROR
        // =================================================

        if (error.code === 11000) {

            return res.status(409).json({

                success: false,

                message:
                    "A school with this information already exists.",

            });
        }


        // =================================================
        // GENERAL ERROR
        // =================================================

        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while registering the school.",

            error:
                error.message,

        });
    }
});


// =====================================================
// GET ALL SCHOOLS
// =====================================================

app.get("/api/schools", async (req, res) => {

    try {

        const schools =
            await School.find()
                .sort({
                    createdAt: -1,
                });

        return res.status(200).json({

            success: true,

            count:
                schools.length,

            schools,

        });

    } catch (error) {

        console.error(
            "Unable to fetch schools:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch schools.",

        });
    }
});


// =====================================================
// GET SINGLE SCHOOL
// =====================================================

app.get(
    "/api/schools/:id",
    async (req, res) => {

        try {

            const school =
                await School.findById(
                    req.params.id
                );

            if (!school) {

                return res.status(404).json({

                    success: false,

                    message:
                        "School not found.",

                });
            }

            return res.status(200).json({

                success: true,

                school,

            });

        } catch (error) {

            console.error(
                "Unable to fetch school:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to fetch school.",

            });
        }
    }
);


// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {

    console.log("");
    console.log("========================================");
    console.log(
        `Server running on http://localhost:${PORT}`
    );
    console.log("========================================");
    console.log("");

});
