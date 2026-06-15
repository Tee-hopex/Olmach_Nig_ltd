import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { useUploadImage } from '../../hooks/admin/useAdminProducts';

interface ImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ value, onChange, maxImages = 5 }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const { mutateAsync: uploadImage, isPending } = useUploadImage();

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const remaining = maxImages - value.length;
    const toUpload = Array.from(files).slice(0, remaining);
    for (const file of toUpload) {
      try {
        const result = await uploadImage(file);
        onChange([...value, result.url]);
      } catch {}
    }
  }, [value, onChange, maxImages, uploadImage]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  function removeImage(url: string) {
    onChange(value.filter(u => u !== url));
  }

  return (
    <div className="space-y-3">
      {/* Existing images */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {value.map((url, i) => (
            <div key={url} className="relative group aspect-square">
              <img
                src={url}
                alt={`Product image ${i + 1}`}
                className="w-full h-full object-cover rounded-xl border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <X className="w-3 h-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-xs bg-navy-900/70 text-white px-1.5 py-0.5 rounded-md">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {value.length < maxImages && (
        <label
          className={`relative flex flex-col items-center justify-center w-full py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            dragging ? 'border-gold-500 bg-red-50' : 'border-gray-200 hover:border-gold-400 hover:bg-gray-50'
          } ${isPending ? 'pointer-events-none opacity-60' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {isPending ? (
            <Loader className="w-8 h-8 text-gold-500 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
          <p className="mt-2 text-sm text-gray-500">
            {isPending ? 'Uploading...' : 'Drop images here or click to upload'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {value.length}/{maxImages} images • PNG, JPG, WEBP up to 10MB
          </p>
        </label>
      )}
    </div>
  );
}
