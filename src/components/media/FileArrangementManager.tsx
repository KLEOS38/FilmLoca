import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GripVertical, Eye, Trash2, Star, StarOff } from 'lucide-react';
import { toast } from 'sonner';

interface MediaFile {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video';
  size: number;
  isPrimary?: boolean;
}

interface FileArrangementManagerProps {
  files: MediaFile[];
  onFilesUpdate: (files: MediaFile[]) => void;
  onSetPrimary: (fileId: string) => void;
  onRemoveFile: (fileId: string) => void;
  maxFiles?: number;
}

const FileArrangementManager: React.FC<FileArrangementManagerProps> = ({
  files,
  onFilesUpdate,
  onSetPrimary,
  onRemoveFile,
  maxFiles = 999
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newFiles = [...files];
    const draggedFile = newFiles[draggedIndex];
    
    // Remove the dragged file from its original position
    newFiles.splice(draggedIndex, 1);
    
    // Insert it at the new position
    newFiles.splice(dropIndex, 0, draggedFile);
    
    onFilesUpdate(newFiles);
    setDraggedIndex(null);
    toast.success('File order updated!');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (type: string) => {
    return type === 'video' ? '🎥' : '🖼️';
  };

  if (files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📁 File Arrangement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No files uploaded yet. Upload some files to arrange them.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📁 File Arrangement ({files.length} files)
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Drag and drop to reorder files. Use the star button to set primary image.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {files.map((file, index) => (
            <div
              key={file.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-move transition-all hover:shadow-md ${
                draggedIndex === index ? 'opacity-50' : ''
              } ${file.isPrimary ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">
                  #{index + 1}
                </span>
              </div>

              <div className="flex-1 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-2xl">🎥</div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{getFileTypeIcon(file.type)}</span>
                    <span>{formatFileSize(file.size)}</span>
                    {file.isPrimary && (
                      <Badge variant="secondary" className="text-xs">
                        Primary
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(file.url, '_blank')}
                  title="Preview file"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                {!file.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSetPrimary(file.id)}
                    title="Set as primary image"
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                )}

                {file.isPrimary && (
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled
                    title="This is the primary image"
                  >
                    <StarOff className="h-4 w-4 text-blue-500" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(file.id)}
                  title="Remove file"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> The first file in the list will be used as the primary image for your property listing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export { FileArrangementManager };
export default FileArrangementManager;
