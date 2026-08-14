import cloudinary from '../config/cloudinary.js';

export function uploadBufferToCloudinary(buffer, folder = 'visiondeck') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'auto' }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}
