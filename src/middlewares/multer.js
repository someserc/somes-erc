import multer from "multer";
import nextConnect from "next-connect";

// Configure multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // Directory to save files
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  },
});

// Add multer middleware to the route
apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  res.status(200).json({ file: req.file });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to use multer
  },
};
