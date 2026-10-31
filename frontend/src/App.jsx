import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/devices`;

function App() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ deviceId: '', name: '', deviceType: '', room: '', quantity: 1, status: 'Đang sử dụng' });

  useEffect(() => { fetchDevices(); }, []);

  const fetchDevices = async (q = '') => {
    try {
      const res = await axios.get(q ? `${API_URL}?search=${q}` : API_URL);
      setDevices(res.data);
      setMsg('');
    } catch (err) { setMsg('Lỗi tải dữ liệu'); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setMsg('Thêm thành công!');
      fetchDevices();
    } catch (err) { setMsg('Lỗi: Kiểm tra lại mã TB (có thể trùng)'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchDevices();
    } catch (err) { setMsg('Lỗi xóa thiết bị'); }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Quản lý Thiết bị Phòng học</h2>
      <p style={{ color: 'red', fontWeight: 'bold' }}>{msg}</p>
      
      <input placeholder="Nhập từ khóa tìm kiếm..." value={search} onChange={e => setSearch(e.target.value)} style={{marginRight: '10px'}}/>
      <button onClick={() => fetchDevices(search)}>Tìm kiếm</button>

      <form onSubmit={handleAdd} style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <input placeholder="Mã TB" required onChange={e => setForm({...form, deviceId: e.target.value})} />
        <input placeholder="Tên" required onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Loại" required onChange={e => setForm({...form, deviceType: e.target.value})} />
        <input placeholder="Phòng" required onChange={e => setForm({...form, room: e.target.value})} />
        <button type="submit">Thêm Thiết Bị</button>
      </form>

      <table border="1" width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr><th>Mã TB</th><th>Tên</th><th>Loại</th><th>Phòng</th><th>Trạng thái</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {devices.map(d => (
            <tr key={d._id}>
              <td>{d.deviceId}</td><td>{d.name}</td><td>{d.deviceType}</td><td>{d.room}</td><td>{d.status}</td>
              <td><button onClick={() => handleDelete(d._id)}>Xóa</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;