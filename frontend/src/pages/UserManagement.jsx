import { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Users,
  Shield,
  UserCheck,
  UserX,
} from "lucide-react";

function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Pavee Piru",
      email: "test@example.com",
      role: "Employee",
      status: "Active",
    },
    {
      id: 2,
      name: "System Administrator",
      email: "admin@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 3,
      name: "Manager User",
      email: "manager@example.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 4,
      name: "Employee Two",
      email: "employee2@example.com",
      role: "Employee",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");
  const [status, setStatus] = useState("Active");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const handleAddUser = () => {
    setEditingUserId(null);
    setName("");
    setEmail("");
    setRole("Employee");
    setStatus("Active");
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUserId(null);
    setName("");
    setEmail("");
    setRole("Employee");
    setStatus("Active");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter the user's name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter the user's email.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (editingUserId) {
      setUsers(
        users.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                name: name.trim(),
                email: email.trim(),
                role,
                status,
              }
            : user
        )
      );

      alert("User updated successfully.");
    } else {
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role,
        status,
      };

      setUsers([...users, newUser]);

      alert("User added successfully.");
    }

    handleCancel();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    setUsers(
      users.filter((user) => user.id !== id)
    );
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const getRoleBadge = (userRole) => {
    if (userRole === "Admin") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3E8FF] px-3 py-1 text-xs font-semibold text-[#7E22CE]">
          <Shield size={13} />
          Admin
        </span>
      );
    }

    if (userRole === "Manager") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#1677B8]">
          <UserCheck size={13} />
          Manager
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7F9] px-3 py-1 text-xs font-semibold text-[#52616B]">
        <Users size={13} />
        Employee
      </span>
    );
  };

  const getStatusBadge = (userStatus) => {
    if (userStatus === "Active") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F7EF] px-3 py-1 text-xs font-semibold text-[#15803D]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
          Active
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF2F2] px-3 py-1 text-xs font-semibold text-[#B91C1C]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#DC2626]" />
        Inactive
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#123B5D]">
            User Management
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            Manage system users, roles, and account status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddUser}
          className="inline-flex items-center justify-center gap-2
          rounded-lg bg-[#1677B8] px-4 py-2.5
          text-sm font-semibold text-white
          transition hover:bg-[#3FA9D9]"
        >
          <Plus size={17} strokeWidth={2} />
          Add User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FB] text-[#1677B8]">
              <Users size={21} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Total Users
              </p>

              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                {users.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#15803D]">
              <UserCheck size={21} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Active Users
              </p>

              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                {activeUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#DC2626]">
              <UserX size={21} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">
                Inactive Users
              </p>

              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                {inactiveUsers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#123B5D]">
                {editingUserId ? "Edit User" : "Add New User"}
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                {editingUserId
                  ? "Update the user's account information."
                  : "Create a new user account."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F4F7F9] hover:text-[#263238]"
            >
              <X size={18} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="user-name"
                className="text-sm font-medium text-[#263238]"
              >
                Full Name
              </label>

              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="mt-2 w-full rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none transition focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
              />
            </div>

            <div>
              <label
                htmlFor="user-email"
                className="text-sm font-medium text-[#263238]"
              >
                Email Address
              </label>

              <input
                id="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="mt-2 w-full rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none transition focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
              />
            </div>

            <div>
              <label
                htmlFor="user-role"
                className="text-sm font-medium text-[#263238]"
              >
                Role
              </label>

              <select
                id="user-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none transition focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="user-status"
                className="text-sm font-medium text-[#263238]"
              >
                Status
              </label>

              <select
                id="user-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none transition focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-[#00A6A6] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#087F8C]"
              >
                {editingUserId ? "Update User" : "Create User"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-[#D9E2E8] bg-white px-4 py-2.5 text-sm font-medium text-[#263238] transition hover:bg-[#F4F7F9]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-hidden rounded-2xl border border-[#D9E2E8] bg-white shadow-sm">
        {/* Search & Filters */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full rounded-lg border border-[#D9E2E8] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263238] outline-none transition focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none focus:border-[#1677B8]"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-[#D9E2E8] bg-white px-3 py-2.5 text-sm text-[#263238] outline-none focus:border-[#1677B8]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-[#F8FAFB]">
                <tr className="border-b border-[#D9E2E8]">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#D9E2E8]">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-[#F8FAFB]"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF6FB] text-sm font-semibold text-[#1677B8]">
                          {getInitials(user.name)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#123B5D]">
                            {user.name}
                          </p>

                          <p className="mt-0.5 text-xs text-[#6B7280]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditUser(user)}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#D9E2E8] bg-white px-3 py-2 text-sm font-medium text-[#263238] transition hover:bg-[#F4F7F9]"
                        >
                          <Edit size={16} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(user.id)}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#FECACA] bg-white px-3 py-2 text-sm font-medium text-[#B91C1C] transition hover:bg-[#FEF2F2]"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EAF6FB] text-[#1677B8]">
              <Users size={26} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-[#123B5D]">
              No users found
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

export default UserManagement;