
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removePaste } from '../redux/pasteSlice';
import { deletePasteAPI } from '../utils/pasteApi';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchItem, setSearchItem] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  async function handleDelete(pasteId) {
    if (deletingId) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this paste?'
    );

    if (!confirmed) return;

    setDeletingId(pasteId);

    try {
      await deletePasteAPI(pasteId);
      dispatch(removePaste(pasteId));
    } catch (error) {
      toast.error(error.message || 'Could not delete paste');
    } finally {
      setDeletingId(null);
    }
  }

  async function copyText(text, successMessage) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch {
      toast.error('Could not copy. Check clipboard permissions.');
    }
  }

  function handleShare(paste) {
    const shareUrl = `${window.location.origin}/?pasteId=${encodeURIComponent(paste._id)}`;
    copyText(shareUrl, 'Link copied!');
  }

  return (
    <main className="pastes-container">
      <div className="pastes-header">
        <div>
          <span className="eyebrow">✦ YOUR COLLECTION</span>
          <h1>Your Pastes</h1>
          <p>Manage, edit and share your saved snippets.</p>
        </div>
      </div>

      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          className="paste-search"
          type="search"
          placeholder="Search your pastes..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>

      <div className="pastes-list">
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <article className="paste-item" key={paste._id}>
              <div className="paste-info">
                <div className="paste-title-row">
                  <span className="paste-dot"></span>
                  <h2>{paste.title}</h2>
                </div>

                <span className="paste-date">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="paste-actions">
                <Link
                  className="action-btn edit-btn"
                  to={`/?pasteId=${encodeURIComponent(paste._id)}`}
                >
                  Edit
                </Link>

                <Link
                  className="action-btn view-btn"
                  to={`/pastes/${encodeURIComponent(paste._id)}`}
                >
                  View
                </Link>

                <button
                  className="action-btn delete-btn"
                  disabled={deletingId === paste._id}
                  onClick={() => handleDelete(paste._id)}
                >
                  {deletingId === paste._id ? 'Deleting...' : 'Delete'}
                </button>

                <button
                  className="action-btn copy-btn"
                  onClick={() => copyText(paste.content, 'Copied')}
                >
                  Copy
                </button>

                <button
                  className="action-btn share-btn"
                  onClick={() => handleShare(paste)}
                >
                  Share
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">✦</div>
            <h2>No pastes found</h2>
            <p>Try a different search or create a new paste.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Paste;
