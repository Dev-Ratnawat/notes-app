import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import NoteCard from '../components/NoteCard';

export default function NotesDashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editing, setEditing] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      setNotes([]);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const createNote = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const res = await api.put(`/notes/${editing._id}`, form);
        setNotes(notes.map(n => n._id === res.data._id ? res.data : n));
        setEditing(null);
      } else {
        const res = await api.post('/notes', form);
        setNotes([res.data, ...notes]);
      }
      setForm({ title:'', description:'' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving note');
    }
  };

  const startEdit = (note) => {
    setEditing(note);
    setForm({ title: note.title, description: note.description });
  };

  const deleteNote = async (id) => {
    if (!window.confirm('Delete note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <form onSubmit={createNote} className="card">
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={()=>{setEditing(null); setForm({title:'',description:''})}}>Cancel</button>}
      </form>

      <div className="notes-grid">
        {notes.length ? notes.map(n => (
          <NoteCard key={n._id} note={n} onEdit={startEdit} onDelete={deleteNote} />
        )) : <p>No notes yet.</p>}
      </div>
    </div>
  );
}
