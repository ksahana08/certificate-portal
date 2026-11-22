import { useEffect, useState } from 'react';
import api from '../api';

const next = {
  Pending: [['Approved', 'Approve'], ['Rejected', 'Reject']],
  Approved: [['Ready', 'Mark Ready']],
  Ready: [['Collected', 'Mark Collected']],
  Rejected: [],
  Collected: []
};

export default function AdminDashboard() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');

  const load = async () =>
    setList((await api.get('/requests', { params: filter ? { status: filter } : {} })).data);
  useEffect(() => { load(); }, [filter]);

  const update = async (id, status) => {
    let remarks;
    if (status === 'Rejected') {
      remarks = prompt('Reason for rejection?');
      if (!remarks) return;
    }
    try {
      await api.patch(`/requests/${id}/status`, { status, remarks });
      load();
    } catch (e) {
      alert(e.response?.data?.message);
    }
  };

  return (
    <>
      <h2>All Requests</h2>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="">All</option>
        {['Pending', 'Approved', 'Ready', 'Collected', 'Rejected'].map(s => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Student</th><th>Roll</th><th>Type</th><th>Purpose</th>
            <th>Copies</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(r => (
            <tr key={r._id}>
              <td>
                {r.student?.name}
                <br />
                <small>{r.student?.department}</small>
              </td>
              <td>{r.student?.rollNo}</td>
              <td>{r.type}</td>
              <td>{r.purpose}</td>
              <td>{r.copies}</td>
              <td><span className={'badge ' + r.status}>{r.status}</span></td>
              <td>
                {next[r.status].map(([s, label]) => (
                  <button key={s} onClick={() => update(r._id, s)}>{label}</button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}