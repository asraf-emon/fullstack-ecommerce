import { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { deleteUser, fetchAllUsers } from "../store/slices/adminSlice";

const Users = () => {
  const [page, setPage] = useState(1);
  const { loading, users, totalUsers } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [maxPage, setMaxPage] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (totalUsers !== undefined) {
      const newMax = Math.ceil(totalUsers / 10);
      setMaxPage(newMax || 1);
    }
  }, [totalUsers]);

  // পেজ লিমিট ক্রস করলে কারেকশন
  useEffect(() => {
    if (maxPage && page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id, page));
    }
  };

  return (
    <>
      <main className="p-2.5 pl-2.5 md:pl-68 w-full min-h-screen bg-slate-50/50">
        <div className="flex-1 md:p-6 pb-0">
          <Header />
          <h1 className="text-2xl font-bold text-slate-800">All Users</h1>
          <p className="text-sm text-gray-500 mb-6">
            Manage and monitor all registered accounts.
          </p>
        </div>

        <div className="max-w-7xl md:px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
                  <p className="text-teal-600 font-medium animate-pulse">
                    Loading users...
                  </p>
                </div>
              ) : users && users.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-gray-100">
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Joined Date
                      </th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-teal-50/30 transition-colors group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={user?.avatar?.url || avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <span className="font-semibold text-slate-700">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-sm">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 text-slate-500 text-sm">
                          {new Date(user.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-20">
                  <div className="text-4xl mb-2">👥</div>
                  <h3 className="text-xl font-bold text-slate-700">
                    No Users Found!
                  </h3>
                  <p className="text-gray-500">
                    There are no users registered in this criteria.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination Section */}
          {!loading && users.length > 0 && (
            <div className="flex items-center justify-between mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-sm text-gray-500 font-medium">
                Page <span className="text-teal-600">{page}</span> of {maxPage}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-bold rounded-lg border border-gray-200 text-slate-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={maxPage === page}
                  className="px-6 py-2 text-sm font-bold rounded-lg bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-100 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Users;
