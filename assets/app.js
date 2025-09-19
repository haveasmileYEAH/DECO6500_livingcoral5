/* Lightweight mock data + small interactions (EN) */

window.DemoData = {
  alerts: [
    { id: 'A-1021', type: 'Accident',     level: 'High',   road: 'M3 Pacific',     time: '14:22', status: 'Unprocessed' },
    { id: 'A-1022', type: 'Congestion',   level: 'Medium', road: 'Gympie Rd',      time: '14:20', status: 'In Progress' },
    { id: 'A-1023', type: 'Construction', level: 'Low',    road: 'Coronation Dr',  time: '13:58', status: 'Cleared' }
  ],
  tickets: [
    { id:'T-0001', title:'Traffic light long-term malfunction', area:'CBD',        type:'Equipment',    status:'Pending' },
    { id:'T-0002', title:'Severe rush-hour congestion',         area:'Toowong',    type:'Traffic Flow', status:'In Progress' },
    { id:'T-0003', title:'Camera false positives',              area:'South Bank', type:'Algorithm',    status:'Resolved' },
    { id:'T-0004', title:'Road closure due to flooding',        area:'Moorooka',   type:'Weather',      status:'Rejected' }
  ]
};

/* Dashboard: render alert list */
function renderAlerts(){
  const el = document.querySelector('#alert-list');
  if(!el) return;
  el.innerHTML = '';
  DemoData.alerts.forEach(a=>{
    const li = document.createElement('div');
    li.className = 'item';
    const levelClass = a.level==='High' ? 'danger' : (a.level==='Medium' ? 'warn' : 'ok');
    li.innerHTML = `
      <div>
        <div><b>${a.id}</b> · ${a.type} · <span class="badge ${levelClass}">Level: ${a.level}</span></div>
        <div class="muted">Road: ${a.road} &emsp; Time: ${a.time}</div>
      </div>
      <div class="badge">${a.status}</div>`;
    el.appendChild(li);
  });
}

/* Feedback page: filter + render */
function renderTickets(){
  const wrap = document.querySelector('#ticket-body');
  if(!wrap) return;
  const kw = (document.querySelector('#kw')?.value || '').trim().toLowerCase();
  const st = document.querySelector('input[name="statusTab"]:checked')?.value || 'All';
  let rows = DemoData.tickets;
  if(st!=='All') rows = rows.filter(t=>t.status===st);
  if(kw) rows = rows.filter(t=> (t.id+t.title+t.area+t.type).toLowerCase().includes(kw));
  wrap.innerHTML = rows.map(t=>`
    <tr>
      <td>${t.id}</td>
      <td>${t.title}</td>
      <td>${t.area}</td>
      <td>${t.type}</td>
      <td><span class="badge ${t.status==='Resolved'?'ok':t.status==='Pending'?'warn':t.status==='Rejected'?'danger':''}">${t.status}</span></td>
      <td><button class="btn" onclick="alert('Open ticket ${t.id} details (demo)')">Details</button></td>
    </tr>`).join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderAlerts();
  renderTickets();
  // Fake bar/line chart placeholders
  document.querySelectorAll('[data-mini-chart]').forEach(el=>{
    el.textContent = el.getAttribute('data-mini-chart') + ' (placeholder)';
  });
});
