
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { scheduleReminders } from '../utils/reminders';
import { fetchPasteByIdAPI } from '../utils/pasteApi';
import toast from 'react-hot-toast';
import { Bell, Copy } from 'lucide-react';

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const storedPaste = allPastes.find((p) => p._id === id);

  const [fetchedPaste, setFetchedPaste] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    const loadPaste = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const paste = await fetchPasteByIdAPI(id);

        if (active) {
          setFetchedPaste(paste);
        }
      } catch (error) {
        if (active) {
          setFetchedPaste(null);
          setNotFound(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (id) {
      loadPaste();
    } else {
      setLoading(false);
      setNotFound(true);
    }

    return () => {
      active = false;
    };
  }, [id]);

  const paste = storedPaste || fetchedPaste;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paste.content);
      toast.success('Copied!');
    } catch {
      toast.error('Could not copy. Check clipboard permissions.');
    }
  };

  const handleReminders = async () => {
    if (!('Notification' in window)) {
      toast.error('Notifications are not supported in this browser.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        scheduleReminders(paste.content);
        toast.success('Reminders enabled!');
      } else {
        toast.error('Notification permission denied');
      }
    } catch {
      toast.error('Could not enable reminders.');
    }
  };

  if (loading) {
    return (
      <div className="paste-not-found">
        <h2>Loading paste...</h2>
      </div>
    );
  }

  if (!paste || notFound) {
    return (
      <div className="paste-not-found">
        <div className="not-found-icon">✦</div>
        <h2>Paste not found</h2>
        <p>This paste may have been deleted or you may not have access to it.</p>
      </div>
    );
  }

  return (
    <main className="view-paste-container">
      <section className="view-paste-card">
        <div className="view-paste-header">
          <div>
            <span className="eyebrow">✦ VIEW PASTE</span>
            <h1>{paste.title}</h1>
            <p>Your saved content</p>
          </div>

          <button
            className="copy-main-btn"
            onClick={handleCopy}
            title="Copy content"
          >
            <Copy size={17} />
            <span>Copy</span>
          </button>
        </div>

        <div className="view-editor">
          <div className="view-editor-top">
            <div className="window-dots">
              <span className="dot pink"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>

            <span className="editor-label">CONTENT</span>
          </div>

          <textarea
            className="view-content"
            value={paste.content}
            readOnly
            rows={20}
          />
        </div>

        <button
          style={{ display: 'flex', gap: '10px' }}
          className="reminder-btn"
          onClick={handleReminders}
        >
          <Bell size={20} />
          Remind Me
        </button>

        <div className="paste-footer">
          <span>Created</span>
          <span className="footer-date">
            {new Date(paste.createdAt).toLocaleString()}
          </span>
        </div>
      </section>
    </main>
  );
};

export default ViewPaste;
