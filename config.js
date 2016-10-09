module.exports = {
  host: (process.env.NODE_ENV === 'production') ? '0.0.0.0' : 'localhost',
  port: process.env.PORT || 8000,

  maxFileSize: 1024 * 1024 * 700, // Mb

  aws: {
    region: process.env.AWS_REGION || 'us-east-1',

    s3: {
      partSize: 1024 * 1024 * 20, // 5Mb min
      queueSize: 20,
    }
  }
};
