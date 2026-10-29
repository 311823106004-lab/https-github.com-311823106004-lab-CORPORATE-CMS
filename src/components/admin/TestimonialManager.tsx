import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Testimonial } from '../../types';
import { ConfirmModal } from '../common/ConfirmModal';
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Star, ShieldAlert, X } from 'lucide-react';

export const TestimonialManager: React.FC = () => {
  const {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    togglePublishTestimonial,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    feedback: '',
    rating: 5,
    projectCategory: 'Enterprise Scale',
    isPublished: true,
  });

  const filteredTestimonials = testimonials.filter((t) => {
    return (
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.clientCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.feedback.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenAdd = () => {
    setEditingTestimonial(null);
    setFormData({
      clientName: '',
      clientRole: 'Executive Sponsor',
      clientCompany: '',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      feedback: '',
      rating: 5,
      projectCategory: 'Cloud Transformation',
      isPublished: true,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFormData({
      clientName: t.clientName,
      clientRole: t.clientRole,
      clientCompany: t.clientCompany,
      avatarUrl: t.avatarUrl,
      feedback: t.feedback,
      rating: t.rating,
      projectCategory: t.projectCategory || 'Enterprise Scale',
      isPublished: t.isPublished,
    });
    setIsFormModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.feedback.trim()) return;

    if (editingTestimonial) {
      updateTestimonial({
        ...editingTestimonial,
        ...formData,
      });
    } else {
      addTestimonial(formData);
    }

    setIsFormModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (testimonialToDelete) {
      deleteTestimonial(testimonialToDelete.id);
      setTestimonialToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Testimonials & Client Feedback
          </h2>
          <p className="text-xs text-slate-500">
            Simulated client feedback management. Clearly identified as demo content.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Fictional Testimonial</span>
        </button>
      </div>

      {/* Demonstration compliance notice */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-3 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <div>
          <span className="font-bold">Compliance Directive:</span> All testimonials on this site are fictional demo artifacts created for demonstration purposes to prospective clients.
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search testimonials by client or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 hidden sm:block">
          {testimonials.length} Testimonials in Database
        </div>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs font-bold text-slate-600">({t.rating}.0)</span>
                </div>

                <button
                  onClick={() => togglePublishTestimonial(t.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    t.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {t.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{t.isPublished ? 'Published' : 'Draft'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed italic mb-6">
                "{t.feedback}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.clientName}</h4>
                  <p className="text-[11px] text-slate-500">
                    {t.clientRole}, <span className="font-semibold text-purple-700">{t.clientCompany}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50"
                  title="Edit Testimonial"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTestimonialToDelete(t)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete Testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Testimonial Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Fictional Testimonial'}
              </h3>
              <button onClick={() => setIsFormModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Robert Hastings"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientCompany}
                    onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                    placeholder="e.g. Helix FinCorp Systems"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Client Role / Title
                  </label>
                  <input
                    type="text"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="Chief Technology Officer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Strong)</option>
                    <option value={3}>3 Stars (Average)</option>
                    <option value={2}>2 Stars (Below Standard)</option>
                    <option value={1}>1 Star (Poor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Testimonial Feedback Review *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  placeholder="Enter positive customer experience details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Avatar Photo URL
                </label>
                <input
                  type="url"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="tst-published"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded border-slate-300"
                />
                <label htmlFor="tst-published" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Publish to Public Reviews Showcase
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
                  {editingTestimonial ? 'Save Changes' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!testimonialToDelete}
        title="Delete Testimonial?"
        message={`Are you sure you want to remove the testimonial from ${testimonialToDelete?.clientName}?`}
        confirmLabel="Delete Review"
        cancelLabel="Keep Review"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTestimonialToDelete(null)}
      />
    </div>
  );
};
