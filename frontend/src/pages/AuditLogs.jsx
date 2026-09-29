import { useState } from "react";
import {
  Search,
  ClipboardList,
  FileText,
  User,
  CheckCircle,
  XCircle,
  Upload,
  Edit,
  Trash2,
  Eye,
  ShieldCheck,
} from "lucide-react";

function AuditLogs() {
  const [logs] = useState([
    {
      id: 1,
      user: "Pavee Piru",
      email: "test@example.com",
      action: "Document Uploaded",
      document: "Project Report.pdf",
      date: "29 Sep 2026",
      time: "10:42 AM",
      type: "upload",
    },
    {
      id: 2,
      user: "Manager User",
      email: "manager@example.com",
      action: "Document Approved",
      document: "Project Report.pdf",
      date: "29 Sep 2026",
      time: "10:25 AM",
      type: "approved",
    },
    {
      id: 3,
      user: "Manager User",
      email: "manager@example.com",
      action: "Document Rejected",
      document: "Research Paper.pdf",
      date: "29 Sep 2026",
      time: "09:48 AM",
      type: "rejected",
    },
    {
      id: 4,
      user: "Pavee Piru",
      email: "test@example.com",
      action: "Document Viewed",
      document: "Resume.pdf",
      date: "28 Sep 2026",
      time: "04:15 PM",
      type: "view",
    },
    {
      id: 5,
      user: "System Administrator",
      email: "admin@example.com",
      action: "User Updated",
      document: "Employee Two",
      date: "28 Sep 2026",
      time: "02:31 PM",
      type: "edit",
    },
    {
      id: 6,
      user: "System Administrator",
      email: "admin@example.com",
      action: "Category Created",
      document: "Operations",
      date: "28 Sep 2026",
      time: "01:12 PM",
      type: "create",
    },
    {
      id: 7,
      user: "Pavee Piru",
      email: "test@example.com",
      action: "Document Updated",
      document: "DT Notes.pdf",
      date: "27 Sep 2026",
      time: "11:06 AM",
      type: "edit",
    },
    {
      id: 8,
      user: "System Administrator",
      email: "admin@example.com",
      action: "Document Deleted",
      document: "Old Document.pdf",
      date: "26 Sep 2026",
      time: "03:40 PM",
      type: "delete",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");

  const filteredLogs = logs.filter((log) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      log.user.toLowerCase().includes(search) ||
      log.email.toLowerCase().includes(search) ||
      log.action.toLowerCase().includes(search) ||
      log.document.toLowerCase().includes(search);

    const matchesAction =
      actionFilter === "All" ||
      log.action === actionFilter;

    const matchesUser =
      userFilter === "All" ||
      log.user === userFilter;

    return matchesSearch && matchesAction && matchesUser;
  });

  const getLogIcon = (type) => {
    switch (type) {
      case "upload":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FB] text-[#1677B8]">
            <Upload size={19} strokeWidth={1.8} />
          </div>
        );

      case "approved":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#15803D]">
            <CheckCircle size={19} strokeWidth={1.8} />
          </div>
        );

      case "rejected":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#DC2626]">
            <XCircle size={19} strokeWidth={1.8} />
          </div>
        );

      case "view":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F7F9] text-[#52616B]">
            <Eye size={19} strokeWidth={1.8} />
          </div>
        );

      case "edit":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#EA580C]">
            <Edit size={19} strokeWidth={1.8} />
          </div>
        );

      case "create":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7E22CE]">
            <FileText size={19} strokeWidth={1.8} />
          </div>
        );

      case "delete":
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#B91C1C]">
            <Trash2 size={19} strokeWidth={1.8} />
          </div>
        );

      default:
        return (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6FB] text-[#1677B8]">
            <ClipboardList size={19} strokeWidth={1.8} />
          </div>
        );
    }
  };

  const getActionBadge = (type, action) => {
    if (type === "approved") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F7EF] px-3 py-1 text-xs font-semibold text-[#15803D]">
          <CheckCircle size={13} />
          {action}
        </span>
      );
    }

    if (type === "rejected" || type === "delete") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF2F2] px-3 py-1 text-xs font-semibold text-[#B91C1C]">
          <XCircle size={13} />
          {action}
        </span>
      );
    }

    if (type === "upload") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#1677B8]">
          <Upload size={13} />
          {action}
        </span>
      );
    }

    if (type === "edit") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7ED] px-3 py-1 text-xs font-semibold text-[#C2410C]">
          <Edit size={13} />
          {action}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7F9] px-3 py-1 text-xs font-semibold text-[#52616B]">
        <ClipboardList size={13} />
        {action}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#123B5D]">
          Audit Logs
        </h1>

        <p className="mt-1 text-sm text-[#6B7280]">
          Track important user and document activities across
          DocuFlow.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FB] text-[#1677B8]">
              <ClipboardList size={21} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Total Activities
              </p>

              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                {logs.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#15803D]">
              <ShieldCheck size={21} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Successful Actions
              </p>

              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                {logs.filter(
                  (log) => log.type === "approved"
                ).length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4F7F9] text-[#52616B]">
              <User size={21} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Active Users
              </p>

              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                3
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="overflow-hidden rounded-2xl border border-[#D9E2E8] bg-white shadow-sm">
        {/* Filters */}
        <div className="border-b border-[#D9E2E8] p-5">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search audit logs..."
                className="w-full rounded-lg border border-[#D9E2E8] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263238] outline-none transition focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
              />
            </div>

            <select
              value={actionFilter}
              onChange={(e) =>
                setActionFilter(e.target.value)
              }
              className="rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none focus:border-[#1677B8]"
            >
              <option value="All">All Actions</option>
              <option value="Document Uploaded">
                Document Uploaded
              </option>
              <option value="Document Approved">
                Document Approved
              </option>
              <option value="Document Rejected">
                Document Rejected
              </option>
              <option value="Document Viewed">
                Document Viewed
              </option>
              <option value="Document Updated">
                Document Updated
              </option>
              <option value="Document Deleted">
                Document Deleted
              </option>
              <option value="User Updated">
                User Updated
              </option>
              <option value="Category Created">
                Category Created
              </option>
            </select>

            <select
              value={userFilter}
              onChange={(e) =>
                setUserFilter(e.target.value)
              }
              className="rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none focus:border-[#1677B8]"
            >
              <option value="All">All Users</option>
              <option value="Pavee Piru">
                Pavee Piru
              </option>
              <option value="Manager User">
                Manager User
              </option>
              <option value="System Administrator">
                System Administrator
              </option>
            </select>
          </div>
        </div>

        {/* Table */}
        {filteredLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="bg-[#F8FAFB]">
                <tr className="border-b border-[#D9E2E8]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Action
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Resource
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Date & Time
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#D9E2E8]">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="transition hover:bg-[#F8FAFB]"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getLogIcon(log.type)}

                        <div>
                          <p className="text-sm font-semibold text-[#123B5D]">
                            {log.user}
                          </p>

                          <p className="mt-0.5 text-xs text-[#6B7280]">
                            {log.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      {getActionBadge(
                        log.type,
                        log.action
                      )}
                    </td>

                    {/* Resource */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText
                          size={16}
                          className="text-[#6B7280]"
                        />

                        <span className="text-sm font-medium text-[#263238]">
                          {log.document}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#263238]">
                        {log.date}
                      </p>

                      <p className="mt-0.5 text-xs text-[#6B7280]">
                        {log.time}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF6FB] text-[#1677B8]">
              <ClipboardList size={26} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-[#123B5D]">
              No audit logs found
            </h3>

            <p className="mt-1 text-sm text-[#6B7280]">
              Try changing your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuditLogs;