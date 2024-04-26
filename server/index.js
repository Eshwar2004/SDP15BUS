import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import busesRoutes from './routes/busesRoutes.js';
import contactRoutes from './routes/contactroutes.js';
import bookRoutes from './routes/bookRoute.js';
import multer from 'multer'; // Import multer here
import sendotp from './utils/sendotp.js';
import userotp from './models/userotp.js';
import genotp from './utils/generateotp.js';

dotenv.config();

// Set JWT secret in environment variable
process.env.JWT_SECRET = 'Eshwarramsaigowtham';

mongoose.connect(process.env.MONGODB_URI, { // Use environment variable for MongoDB connection URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log(err);
});

const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'http://sdp15-frontend.vercel.app', // Adjust the origin to match your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());

// Define multer storage and upload middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
});

// Define route for uploading CSV file
app.post('/uploadcsv', upload.single("csvFile"), async (req, res) => {
  try {
    const up = await csv().fromFile(req.file.path);
    await studentmodel.insertMany(up);
    console.log("Added to Database");
    return res.send("Added to Database Successfully");
  } catch (error) {
    console.error("Error adding data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/sendotp', async (req, res) => {
  const { semail } = req.body
  const aotp = genotp()
  await userotp.create({ email: semail, otp: aotp, createdAt: Date.now() })
    .then(response => console.log(response))
    .catch(err => console.log(err))

  try {
    const sent_to = semail
    const sent_from = process.env.EMAIL_USER
    const reply_to = semail
    const rotp = aotp
    await sendotp(rotp, sent_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "OTP Email sent successfully" })
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

app.post('/api/verifyotp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userotp.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const storedOtp = user.otp;

    if (otp === storedOtp) {
      // OTP is correct
      await userotp.deleteOne({ email });
      return res.status(200).json({ success: true, message: "OTP verification successful" });
    } else {
      // Incorrect OTP
      return res.status(400).json({ error: "Incorrect OTP" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Use routes
app.use('/server/auth/', authRouter);
app.use('/buses', busesRoutes);
app.use('/contactus', contactRoutes);
app.use('/book', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
