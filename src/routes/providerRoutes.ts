import { Router } from 'express';
import { 
  createProvider, 
  getProviders, 
  getProviderById, 
  updateProvider, 
  deleteProvider,
  listProviders
} from '../controllers/providerController';

const router = Router();

// ------------------- WEEK 1: BASIC CRUD -------------------
router.post('/', createProvider);      // Create new provider (with Week 2 email check)
router.get('/', getProviders);         // Get all providers
router.put('/:id', updateProvider);    // Update provider by ID
router.delete('/:id', deleteProvider); // Delete provider by ID

// ------------------- WEEK 2: LISTING -------------------
router.get('/list', listProviders);    // List providers with optional filters
router.get('/:id', getProviderById);   // Get provider by ID (must come last)

export default router;
