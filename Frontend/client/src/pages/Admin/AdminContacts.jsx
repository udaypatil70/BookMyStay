import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminContacts = () => {
  const { axios, getToken } = useAppContext();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [expandedId, setExpandedId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchContacts = async (page = 1, unread = "") => {
    try {
      setLoading(true);
      const token = await getToken();
      const params = { page, limit: 20 };
      if (unread) params.unread = unread;
      const { data } = await axios.get("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      if (data.success) {
        setContacts(data.contacts);
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unread = activeTab === "unread" ? "true" : activeTab === "read" ? "false" : "";
    fetchContacts(1, unread);
  }, [activeTab]);

  const handleMarkRead = async (contactId) => {
    try {
      setActionLoading(contactId);
      const token = await getToken();
      const { data } = await axios.post(
        "/api/admin/contacts/read",
        { contactId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("Marked as read");
        setContacts((prev) =>
          prev.map((c) => (c._id === contactId ? { ...c, isRead: true } : c))
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      setActionLoading(contactId);
      const token = await getToken();
      const { data } = await axios.delete("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` },
        data: { contactId },
      });
      if (data.success) {
        toast.success("Contact deleted");
        setContacts((prev) => prev.filter((c) => c._id !== contactId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "read", label: "Read" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Contact Messages</h1>
        <p className="text-sm text-slate-500 mt-1">View and manage user inquiries and messages.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-slate-900 text-white"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 py-16 text-center">
          <p className="text-sm font-medium text-slate-600">No messages found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`bg-white rounded-2xl shadow-sm border transition-all ${
                contact.isRead ? "border-slate-100" : "border-blue-200 bg-blue-50/30"
              } ${expandedId === contact._id ? "ring-2 ring-blue-100" : ""}`}
            >
              <div
                className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors rounded-2xl"
                onClick={() => setExpandedId(expandedId === contact._id ? null : contact._id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {!contact.isRead && (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800 truncate">{contact.name}</p>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 truncate">{contact.email}</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5 truncate">{contact.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-xs text-slate-400 hidden md:block">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      expandedId === contact._id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedId === contact._id && (
                <div className="px-6 pb-5 border-t border-slate-100 pt-4">
                  <div className="grid gap-4 sm:grid-cols-2 mb-4">
                    {contact.phone && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">Phone</p>
                        <p className="text-sm text-slate-700">{contact.phone}</p>
                      </div>
                    )}
                    {contact.guests > 0 && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">Guests</p>
                        <p className="text-sm text-slate-700">{contact.guests}</p>
                      </div>
                    )}
                    {contact.checkInDate && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">Check-in</p>
                        <p className="text-sm text-slate-700">{contact.checkInDate}</p>
                      </div>
                    )}
                    {contact.checkOutDate && (
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">Check-out</p>
                        <p className="text-sm text-slate-700">{contact.checkOutDate}</p>
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">Message</p>
                    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!contact.isRead && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMarkRead(contact._id); }}
                        disabled={actionLoading === contact._id}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(contact._id); }}
                      disabled={actionLoading === contact._id}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {pagination.pages > 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-6 py-4 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const unread = activeTab === "unread" ? "true" : activeTab === "read" ? "false" : "";
                    fetchContacts(pagination.page - 1, unread);
                  }}
                  disabled={pagination.page <= 1}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const unread = activeTab === "unread" ? "true" : activeTab === "read" ? "false" : "";
                    fetchContacts(pagination.page + 1, unread);
                  }}
                  disabled={pagination.page >= pagination.pages}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
