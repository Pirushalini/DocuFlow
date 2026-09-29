import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  Upload,
  Folder,
  Bell,
  UserCircle,
  Users,
  ClipboardList,
} from "lucide-react";

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Documents",
      path: "/documents",
      icon: FileText,
    },
    {
      name: "Upload Document",
      path: "/upload",
      icon: Upload,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: Folder,
    },
    {
      name: "User Management",
      path: "/users",
      icon: Users,
    },
    {
      name: "Audit Logs",
      path: "/audit-logs",
      icon: ClipboardList,
    },
    {
      name: "Profile & Settings",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/documents") return "My Documents";
    if (location.pathname === "/upload") return "Upload Document";
    if (location.pathname === "/categories")
      return "Category Management";
    if (location.pathname === "/users")
      return "User Management";
    if (location.pathname === "/audit-logs")
      return "Audit Logs";
    if (location.pathname === "/profile")
      return "Profile & Settings";
    if (location.pathname === "/notifications")
      return "Notifications";
    if (location.pathname.startsWith("/documents/"))
      return "Document Details";

    return "DocuFlow";
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F9]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-[#0B253A] text-white">
        <div className="flex h-20 items-center border-b border-[#123B5D] px-6">
          <div>
            <h1 className="text-xl font-bold">DocuFlow</h1>

            <p className="mt-1 text-xs text-[#D9E2E8]">
              Document Management
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#1677B8] text-white"
                    : "text-[#D9E2E8] hover:bg-[#123B5D] hover:text-white"
                }`}
              >
                <Icon size={19} strokeWidth={1.8} />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#123B5D] p-4">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00A6A6] font-semibold">
              P
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                User
              </p>

              <p className="truncate text-xs text-[#D9E2E8]">
                Employee
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-lg px-4 py-2 text-left text-sm text-[#D9E2E8] transition hover:bg-[#123B5D] hover:text-white"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-64 flex min-h-screen flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b border-[#D9E2E8] bg-white px-8">
          <div>
            <h2 className="text-lg font-semibold text-[#123B5D]">
              {getPageTitle()}
            </h2>

            <p className="text-sm text-[#263238]">
              Manage your documents and workflows
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${
                location.pathname === "/notifications"
                  ? "bg-[#EAF6FB] text-[#1677B8]"
                  : "bg-[#F4F7F9] text-[#123B5D] hover:bg-[#D8F0FA]"
              }`}
              aria-label="Notifications"
            >
              <Bell size={19} strokeWidth={1.8} />

              <span className="absolute right-1 top-1 flex h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00A6A6] text-white transition hover:bg-[#087F8C]"
              aria-label="Profile"
            >
              <UserCircle size={20} strokeWidth={1.8} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;