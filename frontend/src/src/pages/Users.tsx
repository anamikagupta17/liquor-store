import { useState, useMemo, useEffect } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { User, UsersApiResponse, CreateUserForm, Partner } from "../types";

import { AddUserModal } from "../components/modals/AddUserModal";
import { EditUserModal } from "../components/modals/EditUserModal";
import { DeleteUserModal } from "../components/modals/DeleteUserModal";
import usersSvgPaths from "../../imports/svg-zv9k55a1nr";
import tableSvgPaths from "../../imports/svg-fk2ya2t9gw";
import { api } from "../lib/api";
import { toast } from "react-toastify";
import { formatDateTime, capitalizeWords } from "../utils/stringUtils";

type SortField = "name" | "email" | "createdDate" | "roleList";
type SortDirection = "asc" | "desc";

export function Users() {
  const [users, setUsers] = useState<UsersApiResponse | null>(null);
  const [partnerList, setPartnerList] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addUserFiledReset, setAddUserFiledReset] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const raw = localStorage.getItem("userData");
  const userData = JSON.parse(raw !== null ? raw : "null");
  async function fetchUserData() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users?.userList) return [];
    if (!searchQuery.trim()) return users?.userList;

    const query = searchQuery.toLowerCase();
    return users?.userList.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.roleList.some((r) => r.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    sorted.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortField === "roleList") {
        aValue = a.roleList.join(",");
        bValue = b.roleList.join(",");
      } else if (sortField === "createdDate") {
        aValue = a.createdDate || "";
        bValue = b.createdDate || "";
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredUsers, sortField, sortDirection]);

  const stats = useMemo(() => {
    const totalUsers = users?.userList?.length;
    const adminCount = users?.userList?.filter((u) =>
      u.roleList.includes("admin")
    ).length;
    const userCount = users?.userList?.filter((u) =>
      u.roleList.includes("user")
    ).length;
    return { totalUsers, adminCount, userCount };
  }, [users]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAddUser = async (userData: CreateUserForm) => {
    const { role, ...rest } = userData;

    const apiPayload = {
      ...rest,
      roleList: role
    };
    try {
      const dataCreated = await api.createUser(apiPayload);
      if (dataCreated) {
        setIsAddModalOpen(false);
        setAddUserFiledReset(true);
        fetchUserData();
      }
    } catch (err: any) {
      toast.error(err.message || "Error");
    }
  };

  const handleEditUser = async (userData: CreateUserForm) => {
    if (!selectedUser) return;
    const { role, ...rest } = userData;

    const apiPayload = {
      ...rest,
      roleList: role
    };
    try {
      const dataUpdated = await api.updateUser(
        selectedUser?.userId,
        apiPayload
      );
      if (dataUpdated) {
        setIsEditModalOpen(false);
        setSelectedUser(null);
        toast.success(dataUpdated.message);
        fetchUserData();
      }
    } catch (err: any) {
      toast.error(err.message || "Error");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const dataDeleted = await api.deleteUser(selectedUser?.userId);
      if (dataDeleted) {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
        toast.success(dataDeleted.message);
        fetchUserData();
      }
    } catch (err: any) {
      toast.error(err.message || "Error");
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const SortIcon = () => (
    <svg
      className="block size-[20px] cursor-pointer"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 20 20"
    >
      <g>
        <path d={tableSvgPaths.p10c30f00} stroke="#33363F" strokeWidth="2" />
        <path d={tableSvgPaths.p31cda100} stroke="#33363F" strokeWidth="2" />
      </g>
    </svg>
  );

  async function fetchPartner() {
    try {
      const data = await api.getPartners(0, 100);
      setPartnerList(data);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users) return <div>No Data found</div>;

  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start w-full max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="content-stretch flex gap-[24px] items-start w-full">
        <div className="basis-0 box-border content-stretch flex gap-[8px] grow h-[42px] items-center min-h-px min-w-px px-0 py-[8px]">
          <div className="size-[24px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 32 32"
            >
              <g>
                <circle
                  cx="16"
                  cy="10.6667"
                  r="3.25"
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
                <path
                  d={usersSvgPaths.p229c4880}
                  stroke="#2A4157"
                  strokeOpacity="0.24"
                  strokeWidth="1.5"
                />
                <path
                  d={usersSvgPaths.p7838760}
                  stroke="#2A4157"
                  strokeOpacity="0.24"
                  strokeWidth="1.5"
                />
                <path
                  d={usersSvgPaths.p1bc73300}
                  fill="#2A4157"
                  fillOpacity="0.24"
                />
                <path
                  d={usersSvgPaths.p3bbd6580}
                  fill="#2A4157"
                  fillOpacity="0.24"
                />
                <path
                  d={usersSvgPaths.p242a3f80}
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </div>
          <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
            Users
          </p>
        </div>
      </div>

      <div className="bg-white relative rounded-[8px] shrink-0 w-full p-[16px]">
        <div className="content-stretch flex flex-col gap-[24px] items-start w-full">
          <div className="content-stretch flex gap-[24px] items-center justify-between w-full flex-wrap">
            <div className="flex items-center gap-[12px]">
              <div className="size-[24px]">
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 32 32"
                >
                  <g>
                    <circle
                      cx="16"
                      cy="10.6667"
                      r="3.25"
                      stroke="#222222"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    />
                    <path
                      d={usersSvgPaths.p229c4880}
                      stroke="#2A4157"
                      strokeOpacity="0.24"
                      strokeWidth="1.5"
                    />
                    <path
                      d={usersSvgPaths.p7838760}
                      stroke="#2A4157"
                      strokeOpacity="0.24"
                      strokeWidth="1.5"
                    />
                    <path
                      d={usersSvgPaths.p1bc73300}
                      fill="#2A4157"
                      fillOpacity="0.24"
                    />
                    <path
                      d={usersSvgPaths.p3bbd6580}
                      fill="#2A4157"
                      fillOpacity="0.24"
                    />
                    <path
                      d={usersSvgPaths.p242a3f80}
                      stroke="#222222"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>
              </div>
              <h2 className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[17px]">
                All Users
              </h2>
            </div>

            <div className="flex items-center gap-[16px] flex-wrap">
              <div className="relative">
                <Search className="absolute left-[12px] top-1/2 transform -translate-y-1/2 size-[20px] text-[#636363]" />
                <input
                  type="text"
                  placeholder="Search Users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[48px] pl-[40px] pr-[16px] rounded-[8px] border border-[#e6e6e6] font-['Poppins:Regular',sans-serif] text-[14px] text-[#333333] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#6e55fb]"
                />
              </div>
              {userData?.role.includes("admin") && (
                <button
                  onClick={async () => {
                    await fetchPartner();
                    setIsAddModalOpen(true);
                  }}
                  className="bg-[#6e55fb]  cursor-pointer content-stretch flex gap-[8px] h-[48px] items-center px-[16px] py-[8px] rounded-[8px] hover:bg-[#5d45ea] transition-colors"
                >
                  <Plus className="size-[24px] text-white" />
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-white text-[16px]">
                    Add User
                  </p>
                </button>
              )}
            </div>
          </div>

          <div className="gap-[16px] flex w-full">
            <div className="bg-white relative rounded-[8px] border border-[#e6e6e6] w-full">
              <div className="size-full">
                <div className="content-stretch flex items-start p-[16px] w-full justify-center">
                  <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                      TOTAL USERS
                    </p>
                    <div className="content-stretch flex flex-col items-start justify-center px-0 py-[6px] w-full">
                      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold">
                        {users?.totalUsers || stats.totalUsers}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(19,132,237,0.1)] relative rounded-[8px] border border-[#e6e6e6] w-full">
              <div className="size-full">
                <div className="content-stretch flex items-start p-[16px] w-full">
                  <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                      ADMIN
                    </p>
                    <div className="content-stretch flex flex-col items-start justify-center px-0 py-[6px] w-full">
                      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold">
                        {users?.noOfAdmin || stats.adminCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(110,85,251,0.1)] relative rounded-[8px] border border-[#e6e6e6] w-full">
              <div className="size-full">
                <div className="content-stretch flex items-start p-[16px] w-full">
                  <div className="basis-0 content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px">
                    <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#636363] text-[14px] w-full">
                      USERS
                    </p>
                    <div className="content-stretch flex flex-col items-start justify-center px-0 py-[6px] w-full">
                      <p className="font-['Poppins:Bold',sans-serif] leading-[normal] not-italic text-[#333333] text-[24px] font-bold">
                        {users?.noOfUsers || stats.userCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white relative rounded-[8px] w-full border border-[#e6e6e6] overflow-hidden">
            <div className="overflow-scroll overflow-x-auto">
              <table className="w-full table-mobile">
                <thead>
                  <tr>
                    <th className="bg-[#f3f2f6] text-left">
                      <button
                        onClick={() => handleSort("name")}
                        className="w-full content-stretch flex gap-[8px] items-center table-header p-[8px] hover:bg-[#e9e8f0] transition-colors"
                      >
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
                          Name
                        </p>
                        <SortIcon />
                      </button>
                    </th>
                    <th className="bg-[#f3f2f6] text-left">
                      <button
                        onClick={() => handleSort("email")}
                        className="w-full content-stretch flex gap-[8px] items-center table-header p-[8px] hover:bg-[#e9e8f0] transition-colors"
                      >
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
                          Email
                        </p>
                        <SortIcon />
                      </button>
                    </th>
                    <th className="bg-[#f3f2f6] text-left">
                      <button
                        onClick={() => handleSort("createdDate")}
                        className="w-full content-stretch flex gap-[8px] items-center table-header p-[8px] hover:bg-[#e9e8f0] transition-colors"
                      >
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
                          Created
                        </p>
                        <SortIcon />
                      </button>
                    </th>
                    <th className="bg-[#f3f2f6] text-left">
                      <button
                        onClick={() => handleSort("partner")}
                        className="w-full content-stretch flex gap-[8px] items-center table-header p-[8px] hover:bg-[#e9e8f0] transition-colors"
                      >
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
                          Partner
                        </p>
                        <SortIcon />
                      </button>
                    </th>
                    <th className="bg-[#f3f2f6] text-left">
                      <button
                        onClick={() => handleSort("roleList")}
                        className="w-full content-stretch flex gap-[8px] items-center table-header p-[8px] hover:bg-[#e9e8f0] transition-colors"
                      >
                        <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
                          Role
                        </p>
                        <SortIcon />
                      </button>
                    </th>
                    {userData?.role.includes("admin") && (
                      <th className="bg-[#f3f2f6] text-right">
                        <div className="content-stretch flex items-center justify-end px-[16px] py-[8px]">
                          <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#262d33] text-[14px]">
                            Actions
                          </p>
                        </div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-[24px] py-[48px] text-center border-b border-[#f3f2f6]"
                      >
                        <p className="font-['Poppins:Regular',sans-serif] text-[14px] text-[#636363]">
                          {searchQuery
                            ? "No users found matching your search."
                            : "No users yet."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    sortedUsers.map((user) => (
                      <tr
                        key={user.userId}
                        className="hover:bg-[#fafafa] transition-colors"
                      >
                        <td className="border-b border-[#f3f2f6]">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px]">
                            <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
                              {user.name}
                            </p>
                          </div>
                        </td>
                        <td className="border-b border-[#f3f2f6]">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px]">
                            <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="border-b border-[#f3f2f6]">
                          <div className="content-stretch flex items-center justify-center px-[8px] py-[16px]">
                            <p className="basis-0 font-['Poppins:Regular',sans-serif] grow leading-[normal] min-h-px min-w-px not-italic text-[#262d33] text-[17px]">
                              {formatDateTime(user.createdDate) || "-"}
                            </p>
                          </div>
                        </td>
                        <td className="border-b border-[#f3f2f6]">
                          <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[14px]">
                            {user?.partnerUsers.map((r) => (
                              <div
                                key={r}
                                className={`content-stretch flex items-center justify-center px-[12px] py-[6px] rounded-[4px]  bg-[rgba(110,85,251,0.1)]`}
                              >
                                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#333333] text-[12px]">
                                  {capitalizeWords(r.partnerName)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="border-b border-[#f3f2f6]">
                          <div className="content-stretch flex gap-[8px] items-center px-[8px] py-[14px]">
                            {user.roleList.map((r) => (
                              <div
                                key={r}
                                className={`content-stretch flex items-center justify-center px-[12px] py-[6px] rounded-[4px] ${
                                  r === "admin"
                                    ? "bg-[rgba(19,132,237,0.1)]"
                                    : "bg-[rgba(110,85,251,0.1)]"
                                }`}
                              >
                                <p className="font-['Poppins:Regular',sans-serif] leading-[normal] not-italic text-[#333333] text-[12px]">
                                  {r.toUpperCase()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </td>
                        {userData?.role.includes("admin") && (
                          <td className="border-b border-[#f3f2f6]">
                            <div className="content-stretch flex gap-[8px] items-center justify-end px-[8px] py-[14px]">
                              <button
                                onClick={async () => {
                                  openEditModal(user);
                                  await fetchPartner();
                                }}
                                className="bg-white content-stretch flex items-center p-[8px] rounded-[8px] hover:bg-[#e6f4ff] transition-colors"
                                aria-label={`Edit ${user.name}`}
                              >
                                <Pencil className="size-[20px] text-[#1384ed] cursor-pointer" />
                              </button>
                              <button
                                onClick={() => openDeleteModal(user)}
                                className="bg-white content-stretch flex items-center p-[8px] rounded-[8px] hover:bg-[#ffe6e6] transition-colors"
                                aria-label={`Delete ${user.name}`}
                              >
                                <Trash2 className="size-[20px] text-[#f35858] cursor-pointer" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        resetFields={addUserFiledReset}
        partnerList={partnerList?.partnerListResponseDto}
      />

      {selectedUser && (
        <>
          <EditUserModal
            isOpen={isEditModalOpen}
            user={selectedUser}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            onSubmit={handleEditUser}
            partnerList={partnerList?.partnerListResponseDto}
          />

          <DeleteUserModal
            isOpen={isDeleteModalOpen}
            user={selectedUser}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedUser(null);
            }}
            onConfirm={handleDeleteUser}
          />
        </>
      )}
    </div>
  );
}
