export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['bytes', 'kb', 'mb'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  };
  
export const tenMbs = 10 * 1024 * 1024;
  
export const checkFileSize = filesize => filesize <= tenMbs;
  
export const checkFilePath = filename => filename.indexOf('/') === -1;