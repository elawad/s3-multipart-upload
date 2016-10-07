const path = require('path');

module.exports = {
  buildPath: (pathsArray) => {
    const joinedPath = path.join
      .apply(null, pathsArray);

    const folderPath = joinedPath
      .replace(/\\/g, '/')      // Replace \ with / for S3
      .replace(/^\/|\/$/g, ''); // Remove leading or trailing /

    return folderPath;
  },
};
