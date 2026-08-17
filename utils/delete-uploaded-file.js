const fs = require("fs");
const path = require("path");

// Deletes a previously uploaded file, e.g. deleteUploadedFile("tasks", "task-123.png")
function deleteUploadedFile(foldername, filename) {
  if (!filename) return;

  const filePath = path.join(__dirname, "..", "uploads", foldername, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error deleting file:", err.message);
    }
  });
}

module.exports = deleteUploadedFile;
