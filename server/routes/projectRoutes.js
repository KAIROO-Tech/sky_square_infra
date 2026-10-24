import express from 'express';
import {
  getAllProjects,
  getProjectById,
  saveProject,
  reorderStack,
  deleteProject,
} from '../storage/projectStore.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/projects - Public: list all projects
router.get('/', async (req, res) => {
  try {
    const list = await getAllProjects();
    res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/projects/reorder-stack - Protected: batch update stack order and pinned status
router.put('/reorder-stack', requireAdminAuth, async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, error: 'Expected items array for stack reordering.' });
    }
    const updated = await reorderStack(items);
    res.json({
      success: true,
      message: 'Pinned Dossier Stack reordered successfully.',
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/projects/:id - Public: get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project dossier not found.' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/projects - Protected: create a new project
router.post('/', requireAdminAuth, async (req, res) => {
  try {
    const saved = await saveProject(req.body);
    res.status(201).json({
      success: true,
      message: 'Project dossier created successfully.',
      data: saved,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT /api/projects/:id - Protected: update an existing project
router.put('/:id', requireAdminAuth, async (req, res) => {
  try {
    const updatePayload = {
      ...req.body,
      id: req.params.id,
    };
    const saved = await saveProject(updatePayload);
    res.json({
      success: true,
      message: 'Project dossier updated successfully.',
      data: saved,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE /api/projects/:id - Protected: delete project
router.delete('/:id', requireAdminAuth, async (req, res) => {
  try {
    const ok = await deleteProject(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, error: 'Project not found or already removed.' });
    }
    res.json({ success: true, message: 'Project dossier deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
