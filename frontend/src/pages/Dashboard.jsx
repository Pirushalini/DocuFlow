function Dashboard() {
  const stats = [
    {
      title: "Total Documents",
      value: "24",
      description: "All documents",
      icon: "▤",
    },
    {
      title: "Pending Review",
      value: "6",
      description: "Waiting for review",
      icon: "◷",
    },
    {
      title: "Approved",
      value: "14",
      description: "Approved documents",
      icon: "✓",
    },
    {
      title: "Rejected",
      value: "4",
      description: "Requires attention",
      icon: "×",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-[#123B5D]">
          Welcome back 👋
        </h1>

        <p className="mt-1 text-sm text-[#263238]">
          Here's what's happening with your documents today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-[#D9E2E8] bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-[#263238]">
                  {stat.title}
                </p>

                <p className="mt-3 text-3xl font-bold text-[#123B5D]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-[#263238]">
                  {stat.description}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F4F7F9] text-xl text-[#00A6A6]">
                {stat.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Recent Documents */}
        <div className="xl:col-span-2 rounded-xl border border-[#D9E2E8] bg-white shadow-sm">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D9E2E8] px-6 py-5">

            <div>
              <h2 className="font-semibold text-[#123B5D]">
                Recent Documents
              </h2>

              <p className="mt-1 text-xs text-[#263238]">
                Your recently uploaded documents
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-[#1677B8] transition hover:text-[#3FA9D9]"
            >
              View all
            </button>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full text-left text-sm">

              <thead className="bg-[#F4F7F9] text-xs uppercase text-[#263238]">
                <tr>

                  <th className="px-6 py-4 font-medium">
                    Document
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-[#D9E2E8]">

                {/* Document 1 */}
                <tr className="transition hover:bg-[#F4F7F9]">

                  <td className="px-6 py-4">
                    <p className="font-medium text-[#263238]">
                      Project Report.pdf
                    </p>

                    <p className="text-xs text-[#263238]">
                      PDF Document
                    </p>
                  </td>

                  <td className="px-6 py-4 text-[#263238]">
                    Finance
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-medium text-[#047857]">
                      Approved
                    </span>
                  </td>

                  <td className="px-6 py-4 text-[#263238]">
                    Today
                  </td>

                </tr>

                {/* Document 2 */}
                <tr className="transition hover:bg-[#F4F7F9]">

                  <td className="px-6 py-4">
                    <p className="font-medium text-[#263238]">
                      Employee Contract.pdf
                    </p>

                    <p className="text-xs text-[#263238]">
                      PDF Document
                    </p>
                  </td>

                  <td className="px-6 py-4 text-[#263238]">
                    Human Resources
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#FFFBEB] px-3 py-1 text-xs font-medium text-[#B45309]">
                      Pending
                    </span>
                  </td>

                  <td className="px-6 py-4 text-[#263238]">
                    Yesterday
                  </td>

                </tr>

                {/* Document 3 */}
                <tr className="transition hover:bg-[#F4F7F9]">

                  <td className="px-6 py-4">
                    <p className="font-medium text-[#263238]">
                      Company Policy.pdf
                    </p>

                    <p className="text-xs text-[#263238]">
                      PDF Document
                    </p>
                  </td>

                  <td className="px-6 py-4 text-[#263238]">
                    Legal
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#FEF2F2] px-3 py-1 text-xs font-medium text-[#B91C1C]">
                      Rejected
                    </span>
                  </td>

                  <td className="px-6 py-4 text-[#263238]">
                    2 days ago
                  </td>

                </tr>

              </tbody>

            </table>

          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-[#D9E2E8] bg-white p-6 shadow-sm">

          <h2 className="font-semibold text-[#123B5D]">
            Quick Actions
          </h2>

          <p className="mt-1 text-xs text-[#263238]">
            Common document actions
          </p>

          <div className="mt-6 space-y-3">

            {/* Upload */}
            <button
              type="button"
              className="w-full rounded-lg border border-[#D9E2E8]
              px-4 py-3 text-left text-sm font-medium
              text-[#263238] transition
              hover:border-[#3FA9D9]
              hover:bg-[#F4F7F9]
              hover:text-[#1677B8]"
            >
              <span className="mr-2 text-[#00A6A6]">
                ↑
              </span>

              Upload Document
            </button>

            {/* Search */}
            <button
              type="button"
              className="w-full rounded-lg border border-[#D9E2E8]
              px-4 py-3 text-left text-sm font-medium
              text-[#263238] transition
              hover:border-[#3FA9D9]
              hover:bg-[#F4F7F9]
              hover:text-[#1677B8]"
            >
              <span className="mr-2 text-[#00A6A6]">
                ⌕
              </span>

              Search Documents
            </button>

            {/* View All */}
            <button
              type="button"
              className="w-full rounded-lg border border-[#D9E2E8]
              px-4 py-3 text-left text-sm font-medium
              text-[#263238] transition
              hover:border-[#3FA9D9]
              hover:bg-[#F4F7F9]
              hover:text-[#1677B8]"
            >
              <span className="mr-2 text-[#00A6A6]">
                ▤
              </span>

              View All Documents
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;