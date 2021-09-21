import { diskStorage, Options } from "multer";
import { extname, resolve } from "path";
import { randomBytes } from "crypto"

export const multerconfig = {
    dest: resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: diskStorage({
      destination: (req, file, callback) => {
        callback(null, resolve(__dirname, "..", "..", "tmp", "uploads"))
       },
       filename: (req, file, callback) => {
        randomBytes(16, (error, hash) => {
          if (error) {
            callback(error, file.originalname)
          }

           const originalname = callback(null, hash.toString("hex") + extname(file.originalname));
        })
     },
   }),
    
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, callback, res) => {
    const formats = [
      '/mp4',
    ];

    if (!formats.includes(file.mimetype)) {
      callback(null, true)
    }  else {
      callback(new Error('Format not suported!'))
    }
  }
} as Options



