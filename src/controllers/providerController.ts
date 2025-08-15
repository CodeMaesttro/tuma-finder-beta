
// CREATE a new provider (with email uniqueness check)
export const createProvider = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, location, bio, portfolio } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Email uniqueness check
    const existing = await Provider.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered', provider: existing });
    }

    const newProvider: Partial<IProvider> = { name, email, phone, service, location, bio, portfolio };
    const provider = new Provider(newProvider);
    const savedProvider = await provider.save();

    res.status(201).json(savedProvider);
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
};

// GET all providers
export const getProviders = async (_req: Request, res: Response) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
};

// GET provider by ID
export const getProviderById = async (req: Request, res: Response) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json(provider);
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
};

// UPDATE provider by ID (with email uniqueness check)
export const updateProvider = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, location, bio, portfolio } = req.body;

    // Check email uniqueness if updating
    if (email) {
      const existing = await Provider.findOne({ email, _id: { $ne: req.params.id } });
      if (existing) {
        return res.status(409).json({ message: 'Email already registered to another provider', provider: existing });
      }
    }

    const updated = await Provider.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, service, location, bio, portfolio },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Provider not found' });

    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || err });
  }
};

// DELETE provider by ID
export const deleteProvider = async (req: Request, res: Response) => {
  try {
    const deleted = await Provider.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Provider not found' });

    res.json({ message: 'Provider deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
};

// ------------------- WEEK 2: SERVICE PROVIDER LISTING -------------------

// LIST providers with optional filters (case-insensitive, trimmed)
export const listProviders = async (req: Request, res: Response) => {
  try {
    let { service, location } = req.query;

    const filter: any = {};

    if (service) {
      service = (service as string).trim();
      filter.service = { $regex: new RegExp(service, 'i') };
    }

    if (location) {
      location = (location as string).trim();
      filter.location = { $regex: new RegExp(location, 'i') };
    }

    const providers = await Provider.find(filter);
    res.status(200).json(providers);
  } catch (err: any) {
    res.status(500).json({ error: err.message || err });
  }
};
