/* 轻量假数据 + 小交互 */

window.DemoData = {
  alerts: [
    { id: 'A-1021', type: '事故', level: '高', road: 'M3 Pacific', time: '14:22', status:'未处理'},
    { id: 'A-1022', type: '拥堵', level: '中', road: 'Gympie Rd', time: '14:20', status:'处理中'},
    { id: 'A-1023', type: '施工', level: '低', road: 'Coronation Dr', time: '13:58', status:'已解除'}
  ],
  tickets:[
    { id:'T-0001', title:'红绿灯长期故障', area:'CBD', type:'设备', status:'待处理' },
    { id:'T-0002', title:'早高峰严重拥堵', area:'Toowong', type:'交通流', status:'处理中' },
    { id:'T-0003', title:'摄像头误报车辆', area:'South Bank', type:'算法', status:'已解决' },
    { id:'T-0004', title:'积水导致封路', area:'Moorooka', type:'天气', status:'驳回' }
  ]
};

/* 仪表盘：渲染告警列表 */
function renderAlerts(){
  const el = document.querySelector('#alert-list');
  if(!el) return;
  el.innerHTML = '';
  DemoData.alerts.forEach(a=>{
    const li = document.createElement('div');
    li.className = 'item';
    li.innerHTML = `
      <div>
        <div><b>${a.id}</b> · ${a.type} · <span class="badge ${a.level==='高'?'danger':a.level==='中'?'warn':'ok'}">等级：${a.level}</span></div>
        <div class="muted">道路：${a.road}　时间：${a.time}</div>
      </div>
      <div class="badge">${a.status}</div>`;
    el.appendChild(li);
  });
}

/* 反馈页：筛选 + 渲染 */
function renderTickets(){
  const wrap = document.querySelector('#ticket-body');
  if(!wrap) return;
  const kw = (document.querySelector('#kw')?.value || '').trim();
  const st = document.querySelector('input[name="statusTab"]:checked')?.value || '全部';
  let rows = DemoData.tickets;
  if(st!=='全部') rows = rows.filter(t=>t.status===st);
  if(kw) rows = rows.filter(t=> (t.id+t.title+t.area+t.type).includes(kw));
  wrap.innerHTML = rows.map(t=>`
    <tr>
      <td>${t.id}</td>
      <td>${t.title}</td>
      <td>${t.area}</td>
      <td>${t.type}</td>
      <td><span class="badge ${t.status==='已解决'?'ok':t.status==='待处理'?'warn':t.status==='驳回'?'danger':''}">${t.status}</span></td>
      <td><button class="btn" onclick="alert('打开工单 ${t.id} 详情（可接入后端）')">详情</button></td>
    </tr>`).join('');
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderAlerts();
  renderTickets();
  // 假的“柱状图/折线图”占位
  document.querySelectorAll('[data-mini-chart]').forEach(el=>{
    el.textContent = el.getAttribute('data-mini-chart') + '（占位图）';
  });
});
