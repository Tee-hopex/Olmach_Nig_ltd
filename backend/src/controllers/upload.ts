import { Request, Response } from 'express';
import cloudinary from '../lib/cloudinary';

export async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const b64 = Buffer.from(req.file.buffer).toString('base64');
  const dataUri = `data:${req.file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: 'sewing-hub',
    resource_type: 'image',
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }],
  });

  res.json({ url: result.secure_url, publicId: result.public_id });
}

export async function deleteImage(req: Request, res: Response): Promise<void> {
  const { publicId } = req.body;
  if (!publicId) {
    res.status(400).json({ error: 'publicId is required' });
    return;
  }
  await cloudinary.uploader.destroy(publicId);
  res.json({ message: 'Image deleted' });
}
