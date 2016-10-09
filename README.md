# S3 Multipart Upload #

> Testing AWS Multipart file upload with Hapi.

### Setup ###
* Create a .env file with the following variables:
```javascript
/* Remove comments before using */
AWS_ACCESS_KEY_ID     = ''  // AWS access key
AWS_SECRET_ACCESS_KEY = ''  // AWS secret
S3_BUCKET             = ''  // S3 bucket name
/* optional */
S3_FOLDER             = ''  // path/to/folder
AWS_REGION            = ''  // defaults to us-east-1
```
* npm install
* npm start

### Tech Stack ###
* Node / Hapi
* AWS SDK
