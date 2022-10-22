const multer = require('multer');

const excelFilter = (req, file, cb) => {
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
        cb(null, true);
    } else {
        cb('Please upload only excel file.', false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resources/static/assets/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

var uploadExcel = multer({ storage: storage, fileFilter: excelFilter });

module.exports = uploadExcel;
