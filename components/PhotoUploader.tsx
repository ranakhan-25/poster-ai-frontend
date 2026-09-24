"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoUploaderProps {
  maxFiles?: number;
  value: string[]; // array of data URLs
  onChange: (files: string[]) => void;
  onError?: (message: string) => void;
}

export function PhotoUploader({
  maxFiles = 3,
  value,
  onChange,
  onError,
}: PhotoUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: File[]) => {
      const remaining = maxFiles - value.length;
      if (remaining <= 0) {
        onError?.(`Maximum ${maxFiles} photos allowed`);
        return;
      }

      const toProcess = files.slice(0, remaining);
      const validFiles = toProcess.filter((file) => {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          onError?.("Only JPG, PNG or WEBP images are allowed");
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          onError?.("Each photo must be 5MB or smaller");
          return false;
        }
        return true;
      });

      const readers: Promise<string>[] = validFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readers).then((dataUrls) => {
        onChange([...value, ...dataUrls]);
      });
    },
    [maxFiles, value, onChange, onError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files?.length) {
        handleFiles(Array.from(e.dataTransfer.files));
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const removePhoto = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-muted-foreground/30 hover:border-muted-foreground/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          max={maxFiles}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              handleFiles(Array.from(e.target.files));
            }
          }}
        />
        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Drag & drop photos here or click to browse
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          JPG, PNG, WEBP up to 5MB each (max {maxFiles})
        </p>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, idx) => (
            <div key={idx} className="relative aspect-square">
              <img
                src={url}
                alt={`Photo ${idx + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(idx);
                }}
                className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
