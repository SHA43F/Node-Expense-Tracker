const AWS = require("aws-sdk");

exports.uploadToS3 = (data, filename) => {
  const BUCKET_NAME = "expensetracker98";
  const IAM_USER_KEY = "AKIAUAEFAKMYEYYY52H4";
  const ACCESS_SECRET_KEY = "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";

  const s3Bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: ACCESS_SECRET_KEY
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read"
  };
  return new Promise((resolve, reject) => {
    s3Bucket.upload(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.Location);
      }
    });
  });
};
