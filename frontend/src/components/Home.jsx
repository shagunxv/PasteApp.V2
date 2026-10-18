
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  addToPaste,
  updateToPaste,
  setPastes,
} from '../redux/pasteSlice';
import {
  fetchPastesAPI,
  createPasteAPI,
  updatePasteAPI,
} from '../utils/pasteApi';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    let active = true;

    const loadPastes = async () => {
      try {
        const pastes = await fetchPastesAPI();

        if (active) {
          dispatch(setPastes(pastes));
        }
      } catch (error) {
        if (active) {
          toast.error(error.message || 'Could not load your pastes');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadPastes();

    return () => {
      active = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!pasteId) {
      setTitle('');
      setValue('');
      return;
    }

    const paste = allPastes.find((p) => p._id === pasteId);

    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, allPastes]);

  async function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error('Please enter both a title and content.');
      return;
    }

    setSaving(true);

    try {
      if (pasteId) {
        const updatedPaste = await updatePasteAPI(pasteId, {
          title: title.trim(),
          content: value,
        });

        dispatch(updateToPaste(updatedPaste));
      } else {
        const newPaste = await createPasteAPI({
          title: title.trim(),
          content: value,
        });

        dispatch(addToPaste(newPaste));
      }

      setTitle('');
      setValue('');
      setSearchParams({});
    } catch (error) {
      toast.error(error.message || 'Could not save your paste');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="home-container">
      <section className="paste-card">
        <div className="paste-header">
          <div>
            <span className="eyebrow">✦ PASTE & SHARE</span>
            <h1>{pasteId ? 'Edit your paste' : 'Create a new paste'}</h1>
            <p>Store your code, notes and snippets in one place.</p>
          </div>
        </div>

        <div className="paste-toolbar">
          <input
            className="title-input"
            type="text"
            placeholder="Give your paste a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className="create-btn"
            onClick={createPaste}
            disabled={saving || loading}
          >
            {saving
              ? 'Saving...'
              : pasteId
                ? 'Update Paste'
                : 'Create Paste'}
          </button>
        </div>

        <div className="editor-wrapper">
          <div className="editor-top">
            <div className="window-dots">
              <span className="dot pink"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>

            <span className="editor-label">CONTENT</span>
          </div>

          <textarea
            className="paste-editor"
            value={value}
            placeholder="Write or paste your content here..."
            onChange={(e) => setValue(e.target.value)}
            rows={20}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
