const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Ket noi MongoDB thanh cong'))
  .catch(err => console.error('Loi ket noi DB:', err));

const Device = require('./models/Device');

// GET /health - Kiểm tra trạng thái backend
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running' });
});

// GET /api/devices - Lấy danh sách và tìm kiếm
app.get('/api/devices', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { deviceId: new RegExp(search, 'i') },
          { name: new RegExp(search, 'i') },
          { deviceType: new RegExp(search, 'i') },
          { room: new RegExp(search, 'i') }
        ]
      };
    }
    const devices = await Device.find(query);
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// GET /api/devices/:id - Xem chi tiết một thiết bị
app.get('/api/devices/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    res.json(device);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

// POST /api/devices - Thêm thiết bị mới
app.post('/api/devices', async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Lỗi: Mã thiết bị đã tồn tại' });
    res.status(400).json({ message: 'Dữ liệu không hợp lệ', error });
  }
});

// PUT /api/devices/:id - Cập nhật thông tin thiết bị
app.put('/api/devices/:id', async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedDevice) return res.status(404).json({ message: 'Không tìm thấy thiết bị để cập nhật' });
    res.json(updatedDevice);
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Lỗi: Mã thiết bị đã tồn tại' });
    res.status(400).json({ message: 'Lỗi cập nhật', error });
  }
});

// DELETE /api/devices/:id - Xóa thiết bị
app.delete('/api/devices/:id', async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    if (!deletedDevice) return res.status(404).json({ message: 'Không tìm thấy thiết bị để xóa' });
    res.json({ message: 'Đã xóa thiết bị thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server backend dang chay tai port ${PORT}`);
});