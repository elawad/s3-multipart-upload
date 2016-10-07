module.exports = {
  port: process.env.PORT || 8000,

  maxFileSize: 1024 * 1024 * 700, // Mb

  aws: {
    region: 'us-east-1',

    s3: {
      partSize: 1024 * 1024 * 20, // 5Mb min
      queueSize: 20,
    }
  }
};
