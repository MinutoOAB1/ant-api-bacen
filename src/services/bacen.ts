import axios from 'axios';

// BACEN API Base URLs
const SGS_API_BASE = 'https://api.bcb.gov.br/dados/serie';

export class BacenService {
    /**
     * Fetches the latest Selic rate.
     * Series 11: Selic interest rate (daily)
     */
    static async getSelic() {
        try {
            const response = await axios.get(`${SGS_API_BASE}/bcdata.sgs.11/dados/ultimos/1?formato=json`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Selic:', error);
            throw new Error('Failed to fetch Selic rate');
        }
    }

    /**
     * Fetches the latest IPCA (Inflation) data.
     * Series 433: IPCA (monthly)
     */
    static async getIpca() {
        try {
            const response = await axios.get(`${SGS_API_BASE}/bcdata.sgs.433/dados/ultimos/1?formato=json`);
            return response.data;
        } catch (error) {
            console.error('Error fetching IPCA:', error);
            throw new Error('Failed to fetch IPCA data');
        }
    }

    /**
     * Fetches the latest CDI rate.
     * Series 12: CDI interest rate (daily)
     */
    static async getCdi() {
        try {
            const response = await axios.get(`${SGS_API_BASE}/bcdata.sgs.12/dados/ultimos/1?formato=json`);
            return response.data;
        } catch (error) {
            console.error('Error fetching CDI:', error);
            throw new Error('Failed to fetch CDI rate');
        }
    }
}
