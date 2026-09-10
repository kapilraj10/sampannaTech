'use client';

import { useState, type ChangeEvent } from 'react';
import { ImagePlus, UploadCloud } from 'lucide-react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/admin/Toast';
import { adminApi } from '@/lib/admin';

export default function AdminMediaPage() {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = '';
  };

  const uploadAll = async () => {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const results = await adminApi.uploadMultiple(files);
      setFiles([]);
      toast(`${results.length} file${results.length === 1 ? '' : 's'} uploaded.`);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Upload failed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Media Library"
        description="Upload images to use across your site."
      />

      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <input
          id="media-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          multiple
          className="hidden"
          onChange={onSelect}
        />
        <label
          htmlFor="media-upload"
          className="mx-auto flex max-w-sm cursor-pointer flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-8 py-10 transition-colors hover:border-brand-300"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <ImagePlus className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium text-slate-900">Choose files to upload</span>
          <span className="text-xs text-slate-500">JPG, PNG, WebP or SVG · up to 5MB each</span>
        </label>

        {files.length > 0 && (
          <div className="mx-auto mt-6 max-w-2xl">
            <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white text-left">
              {files.map((file, i) => (
                <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
                  <span className="truncate text-slate-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-slate-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <Button onClick={uploadAll} disabled={uploading} className="mt-4">
              <UploadCloud className="h-4 w-4" aria-hidden="true" />
              {uploading ? 'Uploading…' : `Upload ${files.length} file${files.length === 1 ? '' : 's'}`}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}