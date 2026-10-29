import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ContactEnquiry } from '../../types';
import { ConfirmModal } from '../common/ConfirmModal';
import {
  Inbox,
  Search,
  Trash2,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Save,
  X,
  Send,
  MessageSquare,
} from 'lucide-react';

export const EnquiryManager: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry, updateEnquiryNotes } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState<ContactEnquiry | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [notesSavedToast, setNotesSavedToast] = useState(false);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchStatus = selectedStatus === 'All' || e.status === selectedStatus;
      const matchSearch =
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.message.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [enquiries, selectedStatus, searchQuery]);

  const handleSelectEnquiry = (e: ContactEnquiry) => {
    setSelectedEnquiry(e);
    setNotesInput(e.internalNotes || '');
    setNotesSavedToast(false);
  };

  const handleStatusChange = (id: string, newStatus: ContactEnquiry['status']) => {
    updateEnquiryStatus(id, newStatus);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleSaveNotes = () => {
    if (selectedEnquiry) {
      updateEnquiryNotes(selectedEnquiry.id, notesInput);
      setSelectedEnquiry({ ...selectedEnquiry, internalNotes: notesInput });
      setNotesSavedToast(true);
      setTimeout(() => setNotesSavedToast(false), 2000);
    }
  };

  const handleDeleteConfirm = () => {
    if (enquiryToDelete) {
      deleteEnquiry(enquiryToDelete.id);
      if (selectedEnquiry?.id === enquiryToDelete.id) {
        setSelectedEnquiry(null);
      }
      setEnquiryToDelete(null);
    }
  };

  const getStatusBadge = (status: ContactEnquiry['status']) => {
    switch (status) {
      case 'New':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'In Progress':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Contacted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Contact Enquiries Management
          </h2>
          <p className="text-xs text-slate-500">
            Review, triage, and manage inbound leads submitted through the customer contact form.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-purple-50 px-3.5 py-1.5 rounded-xl border border-purple-100 text-xs font-semibold text-purple-700">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span>{enquiries.filter((e) => e.status === 'New').length} New Unread Inquiries</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-semibold">
            {(['All', 'New', 'In Progress', 'Contacted', 'Closed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
          />
        </div>
      </div>

      {/* Main Enquiries Layout: Table & Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enquiries List */}
        <div className={`${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No contact inquiries match the current filter.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((enq) => (
                    <tr
                      key={enq.id}
                      onClick={() => handleSelectEnquiry(enq)}
                      className={`hover:bg-purple-50/40 transition-colors cursor-pointer ${
                        selectedEnquiry?.id === enq.id ? 'bg-purple-50/70' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{enq.name}</div>
                        <div className="text-[11px] text-slate-500">{enq.email}</div>
                      </td>

                      <td className="py-3 px-4 max-w-[200px]">
                        <div className="font-semibold text-slate-800 truncate">{enq.subject}</div>
                        <div className="text-[11px] text-slate-500 truncate">{enq.message}</div>
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={enq.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            handleStatusChange(enq.id, e.target.value as ContactEnquiry['status'])
                          }
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${getStatusBadge(
                            enq.status
                          )}`}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(enq.createdAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>

                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setEnquiryToDelete(enq)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Enquiry Detailed Drawer / Panel */}
        {selectedEnquiry && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-md p-6 flex flex-col justify-between animate-in fade-in duration-200">
            <div>
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2 inline-block ${getStatusBadge(selectedEnquiry.status)}`}>
                    Status: {selectedEnquiry.status}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {selectedEnquiry.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Contact meta */}
              <div className="py-4 space-y-2 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="font-bold text-slate-900 w-16">Sender:</span>
                  <span>{selectedEnquiry.name}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-purple-600" />
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-purple-600 hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{selectedEnquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Message Body */}
              <div className="py-4 border-b border-slate-100">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Client Message
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Internal CRM Notes</span>
                  </h4>
                  {notesSavedToast && (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Saved
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Add private team notes, next steps, follow-up timeline..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-purple-600 resize-none"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Save className="w-3 h-3" />
                  <span>Save Internal Note</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-bold text-slate-600">Quick Status:</label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedEnquiry.id, e.target.value as ContactEnquiry['status'])
                  }
                  className="text-xs font-bold border border-slate-200 rounded-lg p-1 bg-white"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                onClick={() => setEnquiryToDelete(selectedEnquiry)}
                className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!enquiryToDelete}
        title="Delete Enquiry Record?"
        message={`Are you sure you want to delete the inquiry from ${enquiryToDelete?.name} (${enquiryToDelete?.subject})? This action cannot be undone.`}
        confirmLabel="Delete Record"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setEnquiryToDelete(null)}
      />
    </div>
  );
};
