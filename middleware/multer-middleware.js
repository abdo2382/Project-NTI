const multer = require("multer");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "uploads/tasks";

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const filename = `task-${Date.now()}.${extension}`;

    cb(null, filename);
  },
});

// Only allow image files as task attachments
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];

  if (fileType === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

module.exports = upload;
