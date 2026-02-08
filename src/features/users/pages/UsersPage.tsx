import { useEffect, useState } from "react";
import { Search, Loader2, AlertCircle, RefreshCw, Eye } from "lucide-react";
import { Office365UsersService } from "@/generated/services/Office365UsersService";
import type { User } from "@/generated/models/Office365UsersModel";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageTokens, setPageTokens] = useState<string[]>([]);
  const [nextLink, setNextLink] = useState<string | null>(null);
  const [jobTitleFilter, setJobTitleFilter] = useState<string[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const [detailOpen, setDetailOpen] = useState(false);

  async function fetchUsers(
    search?: string,
    top: number = pageSize,
    skipToken?: string
  ) {
    setLoading(true);
    setError(null);
    try {
      const result = await Office365UsersService.SearchUserV2(
        search || undefined,
        top,
        undefined,
        skipToken
      );
      setUsers(result.data?.value ?? []);
      setNextLink(result.data?.["@odata.nextLink"] ?? null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setPageIndex(0);
    setPageTokens([]);
    fetchUsers(searchTerm, pageSize);
  }, [searchTerm, pageSize]);

  const jobTitleOptions = getUniqueOptions(users, (u) => u.JobTitle);
  const departmentOptions = getUniqueOptions(users, (u) => u.Department);
  const filteredUsers = users.filter((user) => {
    const jobTitle = normalizeValue(user.JobTitle);
    const department = normalizeValue(user.Department);
    const jobOk =
      jobTitleFilter.length === 0 ||
      (jobTitle && jobTitleFilter.includes(jobTitle));
    const deptOk =
      departmentFilter.length === 0 ||
      (department && departmentFilter.includes(department));
    return jobOk && deptOk;
  });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchTerm(searchInput);
  }

  function handleRefresh() {
    const token = pageTokens[pageIndex];
    fetchUsers(searchTerm, pageSize, token);
  }

  function handleNextPage() {
    if (!nextLink) return;
    const token = extractSkipToken(nextLink);
    if (!token) return;
    setPageTokens((prev) => {
      const next = [...prev];
      next[pageIndex + 1] = token;
      return next;
    });
    setPageIndex((prev) => prev + 1);
    fetchUsers(searchTerm, pageSize, token);
  }

  function handlePrevPage() {
    if (pageIndex === 0) return;
    const prevToken = pageTokens[pageIndex - 1];
    setPageIndex((prev) => Math.max(0, prev - 1));
    fetchUsers(searchTerm, pageSize, prevToken);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Users
          </h2>
          <p className="text-sm text-gray-600">
            Office 365 Users directory (showing {filteredUsers.length} users)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label htmlFor="pageSize" className="whitespace-nowrap">
              Users per page
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-sm text-gray-700 outline-none transition-colors focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
            >
              {[10, 20, 50, 100, 1000].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-9 w-64 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
            />
          </form>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Error loading users</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    <FilterDropdown
                      label="Job Title"
                      options={jobTitleOptions}
                      selected={jobTitleFilter}
                      onChange={setJobTitleFilter}
                      trigger={
                        <span className="inline-flex items-center gap-2">
                          Job Title
                          {jobTitleFilter.length > 0 && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                              {jobTitleFilter.length}
                            </span>
                          )}
                        </span>
                      }
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    <FilterDropdown
                      label="Department"
                      options={departmentOptions}
                      selected={departmentFilter}
                      onChange={setDepartmentFilter}
                      trigger={
                        <span className="inline-flex items-center gap-2">
                          Department
                          {departmentFilter.length > 0 && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                              {departmentFilter.length}
                            </span>
                          )}
                        </span>
                      }
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Office
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const isSelected = user.Id === selectedUserId;
                    return (
                    <tr
                      key={user.Id}
                      onClick={() => setSelectedUserId(user.Id)}
                      className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${
                        isSelected ? "bg-blue-50/70" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                            {getInitials(user.DisplayName)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900">
                              {user.DisplayName ?? "—"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user.UserPrincipalName ?? ""}
                            </p>
                          </div>
                          {isSelected && (
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedUserId(user.Id);
                                setDetailOpen(true);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {user.Mail ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {user.JobTitle ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {user.Department ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {user.OfficeLocation ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {user.TelephoneNumber ?? user.mobilePhone ?? "—"}
                      </td>
                    </tr>
                  );
                })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 border-t border-gray-100 px-4 py-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Page {pageIndex + 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={pageIndex === 0 || loading}
                className="h-8 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={!nextLink || loading}
                className="h-8 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      <UserDetailModal
        open={detailOpen}
        user={users.find((user) => user.Id === selectedUserId)}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type FilterDropdownProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  trigger?: React.ReactNode;
};

function FilterDropdown({
  label,
  options,
  selected,
  onChange,
  trigger,
}: FilterDropdownProps) {
  function toggleValue(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  }

  return (
    <details className="group relative inline-block">
      <summary className="flex cursor-pointer list-none select-none items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800">
        {trigger ?? <span>{label}</span>}
      </summary>
      <div className="absolute left-0 z-20 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="pb-2 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            Clear
          </button>
        )}
        <div className="max-h-56 space-y-2 overflow-auto">
          {options.length === 0 ? (
            <div className="text-xs text-gray-400">No data</div>
          ) : (
            options.map((value) => {
              const id = `${label}-${value}`;
              const checked = selected.includes(value);
              return (
                <label
                  key={value}
                  htmlFor={id}
                  className="flex cursor-pointer items-center gap-2 text-xs text-gray-700"
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleValue(value)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="truncate">{value}</span>
                </label>
              );
            })
          )}
        </div>
      </div>
    </details>
  );
}

function normalizeValue(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function getUniqueOptions(
  users: User[],
  selector: (user: User) => string | undefined
): string[] {
  const values = new Set<string>();
  for (const user of users) {
    const value = normalizeValue(selector(user));
    if (value) values.add(value);
  }
  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

function extractSkipToken(nextLink: string): string | undefined {
  try {
    const url = new URL(nextLink);
    return (
      url.searchParams.get("$skiptoken") ??
      url.searchParams.get("skiptoken") ??
      undefined
    );
  } catch {
    const match = nextLink.match(/[$]?skiptoken=([^&]+)/i);
    return match ? decodeURIComponent(match[1]) : undefined;
  }
}

type UserDetailModalProps = {
  open: boolean;
  user?: User;
  onClose: () => void;
};

function UserDetailModal({ open, user, onClose }: UserDetailModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !user) return null;

  const detailItems: Array<[string, string]> = [
    ["Name", user.DisplayName ?? "—"],
    ["Email", user.Mail ?? "—"],
    ["User Principal Name", user.UserPrincipalName ?? "—"],
    ["Job Title", user.JobTitle ?? "—"],
    ["Department", user.Department ?? "—"],
    ["Office", user.OfficeLocation ?? "—"],
    ["Phone", user.TelephoneNumber ?? user.mobilePhone ?? "—"],
    ["City", user.City ?? "—"],
    ["State", user.State ?? "—"],
    ["Country", user.Country ?? "—"],
    ["Street Address", user.StreetAddress ?? "—"],
    ["Postal Code", user.PostalCode ?? "—"],
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.DisplayName ?? "User details"}
            </h3>
            <p className="text-sm text-gray-500">
              {user.UserPrincipalName ?? ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {detailItems.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <p className="text-xs font-medium text-gray-500">{label}</p>
              <p className="mt-1 text-sm text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
