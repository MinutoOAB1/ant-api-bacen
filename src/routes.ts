import { Router } from 'express';
import { BacenService } from './services/bacen';

const router = Router();

router.get('/bacen/selic', async (req, res) => {
    try {
        const data = await BacenService.getSelic();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Selic' });
    }
});

router.get('/bacen/ipca', async (req, res) => {
    try {
        const data = await BacenService.getIpca();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch IPCA' });
    }
});

router.get('/bacen/cdi', async (req, res) => {
    try {
        const data = await BacenService.getCdi();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch CDI' });
    }
});

export default router;
