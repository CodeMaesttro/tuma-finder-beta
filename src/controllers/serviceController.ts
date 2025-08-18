import { Request, Response } from 'express';
import Service, { IService } from '../models/Service';

// CREATE a new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price } = req.body;

    if (!name || !description || !category || price === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newService: Partial<IService> = { name, description, category, price };
    const service = new Service(newService);
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// GET all services
export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// GET service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// UPDATE service by ID
export const updateService = async (req: Request, res: Response) => {
  try {
    const { name, description, category, price } = req.body;
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Service not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// DELETE service by ID
export const deleteService = async (req: Request, res: Response) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
