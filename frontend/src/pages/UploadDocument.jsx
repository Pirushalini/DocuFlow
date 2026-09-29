import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  X,
  AlertCircle,
} from "lucide-react";

function UploadDocument() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const maxFileSize = 10 * 1024 * 1024;

  const handleFile = (file) => {
    setError("");

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Unsupported file type. Please select a PDF, image, Word, or Excel file."
      );
      return;
    }

    if (file.size > maxFileSize) {
      setError("File size must be less than 10 MB.");
      return;
    }
    
    setErrors((prevErrors) => ({ ...prevErrors, file: "" }));
    setSelectedFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!documentTitle.trim()) {
        newErrors.title = "Document title is required.";
    }

    if (!category) {
        newErrors.category = "Please select a category.";
    }

    if (!selectedFile) {
        newErrors.file = "Please select a document to upload.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = () => {
    const newErrors = {};

    const titleInput = document.querySelector("#document-title");
    const categoryInput = document.querySelector("#document-category");

    const title = titleInput?.value.trim();
    const category = categoryInput?.value;

    if (!selectedFile) {
        newErrors.file = "Please select a document to upload.";
    }

    if (!title) {
        newErrors.title = "Document title is required.";
    }

    if (!category) {
        newErrors.category = "Please select a category.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        alert("Form is valid. Backend upload will be connected later.");
    }
    };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#123B5D]">
          Upload Document
        </h1>

        <p className="mt-1 text-sm text-[#263238]">
          Upload a document and provide the required information.
        </p>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-[#D9E2E8] bg-white p-6 shadow-sm">

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
        />

        {/* Drop Zone */}
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-xl border-2 border-dashed px-6 py-12 text-center transition ${
            isDragging
              ? "border-[#1677B8] bg-[#F4F7F9]"
              : "border-[#D9E2E8] bg-[#F4F7F9] hover:border-[#3FA9D9] hover:bg-white"
          }`}
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F7F9] text-[#00A6A6]">
            <Upload size={26} strokeWidth={1.8} />
          </div>

          <h2 className="mt-4 text-base font-semibold text-[#123B5D]">
            Upload your document
          </h2>

          <p className="mt-2 text-sm text-[#263238]">
            Drag and drop your file here, or browse from your device.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 rounded-lg border border-[#1677B8] bg-white px-4 py-2.5 text-sm font-semibold text-[#1677B8] transition hover:bg-[#F4F7F9]"
          >
            Browse Files
          </button>

          <p className="mt-3 text-xs text-[#263238]">
            PDF, JPG, PNG, Word and Excel files • Maximum 10 MB
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4">
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-[#DC2626]"
            />

            <p className="text-sm text-[#B91C1C]">
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <div className="mt-8 space-y-6">

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#263238]">
              Document Title
            </label>

            <input
              id="document-title"
              type="text"
              placeholder="Enter document title"
              className="w-full rounded-lg border border-[#D9E2E8] bg-white px-4 py-3 text-sm text-[#263238] outline-none transition placeholder:text-[#263238] focus:border-[#1677B8] focus:ring-4 focus:ring-[#3FA9D9]"
              value={documentTitle}
              onChange={(e) => {
                setDocumentTitle(e.target.value);

                if (e.target.value.trim()) {
                    setErrors((prev) => ({ ...prev, title: "" }));
                }
                }}
            />

            {errors.title && (
              <p className="mt-1 text-xs text-[#B91C1C]">
                {errors.title}
              </p>
            )}

          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#263238]">
              Category
            </label>

            <select
              id="document-category"
              className="w-full rounded-lg border border-[#D9E2E8] bg-white px-4 py-3 text-sm text-[#263238] outline-none transition focus:border-[#1677B8] focus:ring-4 focus:ring-[#3FA9D9]"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (e.target.value) {
                  setErrors((prev) => ({ ...prev, category: "" }));
                }
              }}
            >
              <option value="">Select category</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Legal">Legal</option>
              <option value="General">General</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-xs text-[#B91C1C]">
                {errors.category}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#263238]">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Enter a short description of the document"
              className="w-full resize-none rounded-lg border border-[#D9E2E8] bg-white px-4 py-3 text-sm text-[#263238] outline-none transition placeholder:text-[#263238] focus:border-[#1677B8] focus:ring-4 focus:ring-[#3FA9D9]"
              value={documentDescription}
              onChange={(e) => setDocumentDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Selected File */}
        <div className="mt-6 rounded-xl border border-[#D9E2E8] bg-[#F4F7F9] p-4">

          {selectedFile ? (
            <div className="flex items-center justify-between gap-4">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#00A6A6]">
                  <FileText size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#263238]">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#263238]">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={removeFile}
                title="Remove file"
                className="shrink-0 rounded-lg p-2 text-[#263238] transition hover:bg-white hover:text-[#1677B8]"
              >
                <X size={18} strokeWidth={1.8} />
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#263238]">
                <FileText size={20} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-sm font-medium text-[#263238]">
                  No file selected
                </p>

                <p className="mt-0.5 text-xs text-[#263238]">
                  Select a file to upload
                </p>
              </div>

            </div>
          )}

          {errors.file && (
            <p className="mt-2 text-xs text-[#B91C1C]">
              {errors.file}
            </p>
          )}

        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3 border-t border-[#D9E2E8] pt-6">

          <button
            type="button"
            onClick={() => navigate("/documents")}
            className="rounded-lg border border-[#D9E2E8] bg-white px-5 py-2.5 text-sm font-medium text-[#263238] transition hover:bg-[#F4F7F9]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="flex items-center gap-2 rounded-lg bg-[#1677B8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3FA9D9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload size={17} strokeWidth={2} />
            Upload Document
          </button>

        </div>

      </div>

    </div>
  );
}

export default UploadDocument;