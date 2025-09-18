import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminPanel(){
  const [users,setUsers] = useState([]);
  const [notes,setNotes] = useState([]);

  useEffect(()=>{
    const fetch = async () => {
      try {
        const usersRes = await api.get('/notes/admin/users');
        console.log("users",usersRes);
        const notesRes = await api.get('/notes?all=true');
        setUsers(usersRes.data);
        setNotes(notesRes.data);
      } catch(e) {
        console.error(e);
      }
    };
    fetch();
  }, []);

  const deleteNote = async (id) => {
    if(!window.confirm('Delete note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) { console.error(err) }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <section className="card">
        <h3>Users</h3>
        {users.map(u => <div key={u._id}>{u.name} — {u.email}</div>)}
      </section>
      <section className="card">
        <h3>All Notes</h3>
        {notes.map(n => (
          <div key={n._id} className="note-admin">
            <strong>{n.title}</strong> by {n.user?.email || n.user}
            <button onClick={()=>deleteNote(n._id)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}
