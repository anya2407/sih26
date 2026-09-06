import React, { useState } from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { X, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CreateStoryModal = ({ isOpen, onClose, onStoryCreated }) => {
  const { currentCity, showToast } = useHeritage();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('Local Knowledge');
  const [location, setLocation] = useState(`${currentCity.name}, ${currentCity.state}`);

  if (!isOpen) return null;

  const storyTypes = [
    { label: 'Local Knowledge', icon: '🏛️', desc: 'Craft secrets, street histories, artisan lineages' },
    { label: 'Folklore / Oral Tradition', icon: '📜', desc: 'Mythos, legends & oral stories (not verified fact)' },
    { label: 'Verified Historical Record', icon: '🟢', desc: 'Corroborated by archaeological or state archives' },
    { label: 'Personal Story', icon: '📖', desc: 'Family memories, nostalgic childhood travels' },
    { label: 'Historical Photograph', icon: '📷', desc: 'Archival images and visual documentation' },
    { label: 'Oral Audio Recording', icon: '🎙️', desc: 'Audio recording of local dialects or music' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newStory = {
      id: `story-${Date.now()}`,
      cityId: currentCity.id,
      title: title.trim(),
      contributor: {
        name: 'Yashasvi Ranjan',
        handle: '@yashasvi_explorer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        badge: 'Cultural Contributor'
      },
      location: location,
      date: 'Just now',
      type: type,
      typeColor: type === 'Verified Historical Record' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-heritage-beige text-heritage-textDark border-heritage-border',
      typeIcon: storyTypes.find(t => t.label === type)?.icon || '📜',
      typeDescription: storyTypes.find(t => t.label === type)?.desc || 'Community contribution',
      content: content.trim(),
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      upvotes: 1,
      savedCount: 1
    };

    onStoryCreated(newStory);
    onClose();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#9E1B32', '#C5A059', '#232323']
    });

    showToast('Your story has been preserved in the community heritage archive!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-modal border border-heritage-border overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-heritage-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-heritage-red flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial-heading font-bold text-lg text-heritage-textDark">
                Contribute to the Heritage Archive
              </h3>
              <p className="text-xs text-heritage-textMuted">
                Preserve community memories, oral traditions, and local knowledge
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-heritage-textMuted hover:text-heritage-textDark rounded-lg hover:bg-heritage-bg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisory Box */}
        <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Archival Credibility Advisory:</strong> Please classify folklore and personal oral memories accurately so they are not represented as verified historical facts.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-heritage-textMuted mb-1.5">
              Story Title / Oral Tradition Heading
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Untold Story of the Artisan Quarter at Chandpole..."
              className="w-full px-4 py-2.5 bg-heritage-bg border border-heritage-border rounded-xl text-xs font-medium text-heritage-textDark placeholder-heritage-textMuted focus:outline-none focus:border-heritage-red"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-heritage-textMuted mb-1.5">
              Credibility / Contribution Classification
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {storyTypes.map((st) => (
                <div
                  key={st.label}
                  onClick={() => setType(st.label)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                    type === st.label
                      ? 'bg-red-50/70 border-heritage-red shadow-subtle'
                      : 'bg-heritage-bg hover:bg-heritage-beige border-heritage-border'
                  }`}
                >
                  <span className="text-sm">{st.icon}</span>
                  <div>
                    <p className="font-bold text-xs text-heritage-textDark">{st.label}</p>
                    <p className="text-[10px] text-heritage-textMuted mt-0.5">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-heritage-textMuted mb-1.5">
              Location / Landmark
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Johari Bazaar, Jaipur, Rajasthan"
              className="w-full px-4 py-2.5 bg-heritage-bg border border-heritage-border rounded-xl text-xs font-medium text-heritage-textDark placeholder-heritage-textMuted focus:outline-none focus:border-heritage-red"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-heritage-textMuted mb-1.5">
              Story Content & Cultural Nuances
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Narrate the story, craft technique, or historical memory with as much local context as possible..."
              className="w-full px-4 py-2.5 bg-heritage-bg border border-heritage-border rounded-xl text-xs font-medium text-heritage-textDark placeholder-heritage-textMuted focus:outline-none focus:border-heritage-red"
              required
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-3 border-t border-heritage-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-heritage-textMuted hover:text-heritage-textDark"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 bg-heritage-red hover:bg-heritage-deepRed text-white text-xs font-semibold rounded-xl shadow-card transition-all"
            >
              Publish to Archive
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
