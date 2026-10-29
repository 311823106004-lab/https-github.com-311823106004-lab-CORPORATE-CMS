import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember } from '../../types';
import { ConfirmModal } from '../common/ConfirmModal';
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Users, X } from 'lucide-react';

export const TeamManager: React.FC = () => {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember, togglePublishTeamMember } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: 'Engineering',
    bio: '',
    profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    email: '',
    linkedinUrl: '',
    isPublished: true,
  });

  const filteredTeam = team.filter((m) => {
    return (
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      designation: '',
      department: 'Engineering',
      bio: '',
      profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      email: '',
      linkedinUrl: '',
      isPublished: true,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (m: TeamMember) => {
    setEditingMember(m);
    setFormData({
      name: m.name,
      designation: m.designation,
      department: m.department || 'Leadership',
      bio: m.bio,
      profileImageUrl: m.profileImageUrl,
      email: m.email || '',
      linkedinUrl: m.linkedinUrl || '',
      isPublished: m.isPublished,
    });
    setIsFormModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) return;

    if (editingMember) {
      updateTeamMember({
        ...editingMember,
        ...formData,
      });
    } else {
      addTeamMember(formData);
    }

    setIsFormModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteTeamMember(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Our Team Profiles
          </h2>
          <p className="text-xs text-slate-500">
            Manage executive leadership and engineering profiles shown to prospective clients.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search team members by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 hidden sm:block">
          {team.length} Team Profiles Registered
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={m.profileImageUrl}
                    alt={m.name}
                    className="w-14 h-14 rounded-2xl object-cover object-top border border-slate-200 shadow-xs"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm font-display">{m.name}</h3>
                    <p className="text-xs text-purple-600 font-semibold">{m.designation}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{m.department}</span>
                  </div>
                </div>

                <button
                  onClick={() => togglePublishTeamMember(m.id)}
                  title={m.isPublished ? 'Live on Website' : 'Hidden from Website'}
                  className={`p-1.5 rounded-lg text-xs font-bold ${
                    m.isPublished ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-100'
                  }`}
                >
                  {m.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {m.bio}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                m.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {m.isPublished ? 'Visible on Site' : 'Draft / Hidden'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(m)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50"
                  title="Edit Profile"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMemberToDelete(m)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete Profile"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {editingMember ? 'Edit Team Member Profile' : 'Add Team Member Profile'}
              </h3>
              <button onClick={() => setIsFormModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Elena Rostova"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="Chief Technology Officer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="AI & Architecture"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Professional Bio *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Experience, focus areas, and leadership background..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  value={formData.profileImageUrl}
                  onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@nexoratech.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    LinkedIn Link
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="team-published"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded border-slate-300"
                />
                <label htmlFor="team-published" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Display on Public Team Page
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editingMember ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!memberToDelete}
        title="Delete Team Profile?"
        message={`Are you sure you want to remove the profile for ${memberToDelete?.name}? It will immediately disappear from the public team showcase.`}
        confirmLabel="Delete Profile"
        cancelLabel="Keep Profile"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setMemberToDelete(null)}
      />
    </div>
  );
};
