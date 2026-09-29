import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Download,
  MoreVertical,
  FileText,
  Upload,
  Trash2,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Project Report.pdf",
    type: "PDF Document",
    category: "Finance",
    status: "Approved",
    size: "2.4 MB",
    date: "Today",
  },
  {
    id: 2,
    name: "Employee Contract.pdf",
    type: "PDF Document",
    category: "Human Resources",
    status: "Pending",
    size: "1.8 MB",
    date: "Yesterday",
  },
  {
    id: 3,
    name: "Company Policy.pdf",
    type: "PDF Document",
    category: "Legal",
    status: "Rejected",
    size: "3.2 MB",
    date: "2 days ago",
  },
  {
    id: 4,
    name: "Budget 2026.xlsx",
    type: "Excel Spreadsheet",
    category: "Finance",
    status: "Approved",
    size: "856 KB",
    date: "3 days ago",
  },
  {
    id: 5,
    name: "Meeting Notes.docx",
    type: "Word Document",
    category: "General",
    status: "Uploaded",
    size: "524 KB",
    date: "4 days ago",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Approved":
      return "bg-[#ECFDF5] text-[#047857]";

    case "Pending":
      return "bg-[#FFFBEB] text-[#B45309]";

    case "Rejected":
      return "bg-[#FEF2F2] text-[#B91C1C]";

    case "Uploaded":
      return "bg-[#F4F7F9] text-[#1677B8]";

    default:
      return "bg-[#F4F7F9] text-[#263238]";
  }
};

function Documents() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#123B5D]">
            My Documents
          </h1>

          <p className="mt-1 text-sm text-[#263238]">
            Manage, review and access your documents.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/upload")}
          className="rounded-lg bg-[#1677B8] px-4 py-2.5
          text-sm font-semibold text-white shadow-sm
          transition hover:bg-[#3FA9D9]"
        >
          <span className="flex items-center gap-2">
            <Upload size={17} strokeWidth={2} />
            Upload Document
          </span>
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#D9E2E8] bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">

          <input
            type="text"
            placeholder="Search documents..."
            className="rounded-lg border border-[#D9E2E8] px-4 py-2.5
            text-sm outline-none
            focus:border-[#1677B8]
            focus:ring-4 focus:ring-[#3FA9D9]"
          />

          <select
            className="rounded-lg border border-[#D9E2E8] px-4 py-2.5
            text-sm text-[#263238] outline-none
            focus:border-[#1677B8]"
          >
            <option>All Categories</option>
            <option>Finance</option>
            <option>Human Resources</option>
            <option>Legal</option>
            <option>General</option>
          </select>

          <select
            className="rounded-lg border border-[#D9E2E8] px-4 py-2.5
            text-sm text-[#263238] outline-none
            focus:border-[#1677B8]"
          >
            <option>All Statuses</option>
            <option>Uploaded</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <select
            className="rounded-lg border border-[#D9E2E8] px-4 py-2.5
            text-sm text-[#263238] outline-none
            focus:border-[#1677B8]"
          >
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Name A-Z</option>
            <option>Name Z-A</option>
          </select>

        </div>
      </div>

      {/* Documents Table */}
      <div className="overflow-hidden rounded-2xl border border-[#D9E2E8] bg-white shadow-sm">

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">

            <thead className="border-b border-[#D9E2E8] bg-[#F4F7F9]">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#263238]">
                  Document
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#263238]">
                  Category
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#263238]">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#263238]">
                  Size
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#263238]">
                  Date
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#263238]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#D9E2E8]">

              {documents.map((document) => (
                <tr
                  key={document.id}
                  className="transition hover:bg-[#F4F7F9]"
                >

                  {/* Document */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F4F7F9] text-lg">
                        <fileText size={20} strokeWidth={1.8} className="text-[#00A6A6]" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#263238]">
                          {document.name}
                        </p>

                        <p className="mt-0.5 text-xs text-[#263238]">
                          {document.type}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-[#263238]">
                    {document.category}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        document.status
                      )}`}
                    >
                      {document.status}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="px-6 py-4 text-sm text-[#263238]">
                    {document.size}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-[#263238]">
                    {document.date}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      {/* View */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/documents/${document.id}`)
                        }
                        title="View document"
                        className="rounded-lg p-2 text-[#263238]
                        transition hover:bg-[#F4F7F9]
                        hover:text-[#1677B8]"
                      >
                        <Eye size={18} strokeWidth={1.8} />
                      </button>

                      {/* Download */}
                      <button
                        type="button"
                        title="Download document"
                        className="rounded-lg p-2 text-[#263238]
                        transition hover:bg-[#F4F7F9]
                        hover:text-[#263238]"
                      >
                        <Download size={18} strokeWidth={1.8} />
                      </button>

                      {/* More */}
                      <div className="relative">

                        <button
                            type="button"
                            onClick={() =>
                            setOpenMenu(
                                openMenu === document.id ? null : document.id
                            )
                            }
                            title="More actions"
                            className="rounded-lg p-2 text-[#263238]
                            transition hover:bg-[#F4F7F9]
                            hover:text-[#263238]"
                        >
                            <MoreVertical size={18} strokeWidth={1.8} />
                        </button>

                        {openMenu === document.id && (
                            <div className="absolute right-0 top-10 z-20 w-36
                            rounded-xl border border-[#D9E2E8]
                            bg-white p-1.5 shadow-lg">

                            <button
                                type="button"
                                className="flex w-full items-center gap-3
                                rounded-lg px-3 py-2.5 text-sm
                                text-[#B91C1C] transition
                                hover:bg-[#FEF2F2]"
                            >
                                <Trash2 size={16} strokeWidth={1.8} />
                                Delete
                            </button>

                            </div>
                        )}

                        </div>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

        {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#D9E2E8] px-6 py-4">

          <p className="text-sm text-[#263238]">
            Showing <span className="font-medium text-[#263238]">1–5</span>{" "}
            of <span className="font-medium text-[#263238]">5</span> documents
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled
              className="rounded-lg border border-[#D9E2E8] px-3 py-2
              text-sm text-[#263238]"
            >
              Previous
            </button>

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1677B8] text-sm font-semibold text-white">
              1
            </span>

            <button
              type="button"
              disabled
              className="rounded-lg border border-[#D9E2E8] px-3 py-2
              text-sm text-[#263238]"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Documents;