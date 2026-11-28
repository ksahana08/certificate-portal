const router = require('express').Router();
const Request = require('../models/Request');
const { protect, adminOnly } = require('../middleware/auth');

// Student: create a request
router.post('/', protect, async (req, res) => {
  try {
    const { type, purpose, copies } = req.body;
    const r = await Request.create({ student: req.user._id, type, purpose, copies });
    res.status(201).json(r);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Student: see my own requests (with student details for the certificate)
router.get('/mine', protect, async (req, res) => {
  res.json(
    await Request.find({ student: req.user._id })
      .populate('student', 'name rollNo department')
      .sort('-createdAt')
  );
});

// Admin: see all requests (optional filter: ?status=Pending)
router.get('/', protect, adminOnly, async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  res.json(
    await Request.find(filter)
      .populate('student', 'name rollNo department email')
      .sort('-createdAt')
  );
});

// Which status can change to which
const allowed = {
  Pending: ['Approved', 'Rejected'],
  Approved: ['Ready'],
  Ready: ['Collected']
};

// Admin: change status
router.patch('/:id/status', protect, adminOnly, async (req, res) => {
  const { status, remarks } = req.body;
  const r = await Request.findById(req.params.id);
  if (!r) return res.status(404).json({ message: 'Not found' });

  if (!(allowed[r.status] || []).includes(status)) {
    return res.status(400).json({ message: `Cannot go from ${r.status} to ${status}` });
  }

  r.status = status;
  if (remarks) r.remarks = remarks;
  if (status === 'Ready') r.readyAt = new Date();
  if (status === 'Collected') r.collectedAt = new Date();

  await r.save();
  res.json(r);
});

module.exports = router;