import { useEffect, useState } from 'react';
import api from '../api';

const COLLEGE = 'BIET';

const msg = {
  Pending: 'Waiting for review',
  Approved: 'Approved - being prepared',
  Rejected: 'Rejected',
  Ready: 'Ready - collect from the office',
  Collected: 'Collected'
};

function printCertificate(r) {
  const s = r.student || {};
  const today = new Date().toLocaleDateString();
  const body = r.type === 'Bonafide'
    ? `This is to certify that <b>${s.name}</b>, Roll No. <b>${s.rollNo}</b>, is a bonafide student of the Department of <b>${s.department}</b> of this institution. This certificate is issued for the purpose of <b>${r.purpose}</b>.`
    : `This is to certify that <b>${s.name}</b>, Roll No. <b>${s.rollNo}</b>, is currently studying in the Department of <b>${s.department}</b> of this institution. This certificate is issued for the purpose of <b>${r.purpose}</b>.`;

  const w = window.open('', '_blank');
  w.document.write(`
    <html><head><title>${r.type} Certificate</title>
    <style>
      body { font-family: Georgia, serif; padding: 40px; }
      .box { border: 6px double #1e3a8a; padding: 50px; min-height: 600px; }
      h1 { text-align: center; color: #1e3a8a; margin: 0; }
      h2 { text-align: center; text-decoration: underline; margin: 30px 0; }
      p { font-size: 20px; line-height: 2; text-align: justify; }
      .foot { display: flex; justify-content: space-between; margin-top: 120px; font-size: 18px; }
    </style></head>
    <body>
      <div class="box">
        <h1>${COLLEGE}</h1>
        <h2>${r.type.toUpperCase()} CERTIFICATE</h2>
        <p>${body}</p>
        <div class="foot">
          <span>Date: ${today}</span>
          <span>Principal / Office Seal</span>
        </div>
      </div>
      <script>window.onload = () => window.print();<\/script>
    </body></html>
  `);
  w.document.close();
}

export default function StudentDashboard() {
  const [list, setList] = useState([]);
  const [f, setF] = useState({ type: 'Bonafide', purpose: '', copies: 1 });

  const load = async () => setList((await api.get('/requests/mine')).data);
  useEffect(() => { load(); }, []);

  const submit = async e => {
    e.preventDefault();
    await api.post('/requests', f);
    setF({ type: 'Bonafide', purpose: '', copies: 1 });
    load();
  };

  return (
    <>
      <form className="card" onSubmit={submit}>
        <h2>New Request</h2>
        <select value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>
          <option>Bonafide</option>
          <option>Study</option>
        </select>
        <input
          placeholder="Purpose (e.g. Passport, Scholarship)"
          value={f.purpose}
          onChange={e => setF({ ...f, purpose: e.target.value })}
          required
        />
        <input
          type="number"
          min="1"
          max="5"
          value={f.copies}
          onChange={e => setF({ ...f, copies: +e.target.value })}
        />
        <button>Submit Request</button>
      </form>

      <h2>My Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th><th>Purpose</th><th>Copies</th>
            <th>Status</th><th>Remarks</th><th>Date</th><th>Certificate</th>
          </tr>
        </thead>
        <tbody>
          {list.map(r => (
            <tr key={r._id}>
              <td>{r.type}</td>
              <td>{r.purpose}</td>
              <td>{r.copies}</td>
              <td>
                <span className={'badge ' + r.status}>{r.status}</span>
                <br />
                <small>{msg[r.status]}</small>
              </td>
              <td>{r.remarks || '-'}</td>
              <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              <td>
                {['Approved', 'Ready', 'Collected'].includes(r.status) && (
                  <button onClick={() => printCertificate(r)}>Print</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}