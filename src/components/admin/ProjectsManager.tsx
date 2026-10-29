import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { ConfirmModal } from '../common/ConfirmModal';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Briefcase,
  X,
  CheckCircle2,
  Clock,
  Activity,
} from 'lucide-react';

interface ProjectsManagerProps {
  isCreateModalOpen?: boolean;
  onCloseCreateModal?: () => void;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({
  isCreateModalOpen = false,
  onCloseCreateModal,
}) => {
  const { projects, addProject, updateProject, deleteProject, togglePublishProject } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Published' | 'Draft'>('All');

  // Modal states
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(isCreateModalOpen);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cloud Solutions',
    client: '',
    description: '',
    fullDetails: '',
    completionStatus: 'Completed' as Project['completionStatus'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    tagsInput: 'Kubernetes, Cloud, Terraform',
    completionYear: '2026',
    isPublished: true,
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchStatus =
        filterStatus === 'All'
          ? true
          : filterStatus === 'Published'
          ? p.isPublished
          : !p.isPublished;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [projects, searchQuery, selectedCategory, filterStatus]);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Cloud Solutions',
      client: '',
      description: '',
      fullDetails: '',
      completionStatus: 'Completed',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      tagsInput: 'Cloud, React, Microservices',
      completionYear: '2026',
      isPublished: true,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category,
      client: p.client,
      description: p.description,
      fullDetails: p.fullDetails || '',
      completionStatus: p.completionStatus,
      imageUrl: p.imageUrl,
      tagsInput: p.tags ? p.tags.join(', ') : '',
      completionYear: p.completionYear || '2026',
      isPublished: p.isPublished,
    });
    setIsFormModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const parsedTags = formData.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectPayload = {
      title: formData.title,
      category: formData.category,
      client: formData.client || 'Enterprise Partner',
      description: formData.description,
      fullDetails: formData.fullDetails,
      completionStatus: formData.completionStatus,
      imageUrl: formData.imageUrl,
      tags: parsedTags,
      completionYear: formData.completionYear,
      isPublished: formData.isPublished,
    };

    if (editingProject) {
      updateProject({
        ...editingProject,
        ...projectPayload,
      });
    } else {
      addProject(projectPayload);
    }

    setIsFormModalOpen(false);
    if (onCloseCreateModal) onCloseCreateModal();
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            Projects & Case Studies Management
          </h2>
          <p className="text-xs text-slate-500">
            Publish flagship projects and case studies for prospective clients.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 text-xs font-semibold">
            {(['All', 'Published', 'Draft'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 font-medium focus:outline-hidden focus:border-purple-600"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-purple-600"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Case Study</th>
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Visibility</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No projects found matching the current filters.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-10 rounded-lg object-cover flex-shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0 max-w-xs">
                          <div className="font-bold text-slate-900 truncate">{p.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{p.description}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {p.client}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {p.category}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.completionStatus === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : p.completionStatus === 'In Progress'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        {p.completionStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => togglePublishProject(p.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          p.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {p.isPublished ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Public</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-slate-400" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProjectToDelete(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {editingProject ? 'Edit Project Details' : 'Add New Case Study'}
              </h3>
              <button
                onClick={() => {
                  setIsFormModalOpen(false);
                  if (onCloseCreateModal) onCloseCreateModal();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Aetheria Cloud Infrastructure Core"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Aetheria Financial Group"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Cloud Solutions, AI..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Status *
                  </label>
                  <select
                    value={formData.completionStatus}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        completionStatus: e.target.value as Project['completionStatus'],
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Active">Active Lifecycle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Year Delivered
                  </label>
                  <input
                    type="text"
                    value={formData.completionYear}
                    onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Summary Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key metrics and objective..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Technical Architecture Details
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDetails}
                  onChange={(e) => setFormData({ ...formData, fullDetails: e.target.value })}
                  placeholder="Detailed architecture writeup for modal preview..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Tech Stack Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  placeholder="Kubernetes, React, Python, Kafka"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-purple-600"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="prj-published"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded border-slate-300"
                />
                <label htmlFor="prj-published" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Publish to Portfolio Website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormModalOpen(false);
                    if (onCloseCreateModal) onCloseCreateModal();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Create Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!projectToDelete}
        title="Delete Project Case Study?"
        message={`Are you sure you want to permanently delete "${projectToDelete?.title}"? This case study will be removed from customer view immediately.`}
        confirmLabel="Delete Case Study"
        cancelLabel="Keep Project"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setProjectToDelete(null)}
      />
    </div>
  );
};
