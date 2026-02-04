import axios from 'axios';

// BACEN API Base URLs
const SGS_API_BASE = 'https://api.bcb.gov.br/dados/serie';

export class BacenService {
    /**
     * Helper to construct the API URL.
     * If dates are provided, uses the range endpoint.
     * Otherwise, defaults to the last 1 record.
     */
    private static getUrl(seriesCode: number, initialDate?: string, finalDate?: string) {
        if (initialDate && finalDate) {
            return `${SGS_API_BASE}/bcdata.sgs.${seriesCode}/dados?formato=json&dataInicial=${initialDate}&dataFinal=${finalDate}`;
        }
        return `${SGS_API_BASE}/bcdata.sgs.${seriesCode}/dados/ultimos/1?formato=json`;
    }

    /**
     * Fetches Selic rate.
     * Series 11: Selic interest rate (daily)
     */
    static async getSelic(initialDate?: string, finalDate?: string) {
        try {
            const url = this.getUrl(11, initialDate, finalDate);
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching Selic:', error);
            throw new Error('Failed to fetch Selic rate');
        }
    }

    /**
     * Fetches IPCA (Inflation) data.
     * Series 433: IPCA (monthly)
     */
    static async getIpca(initialDate?: string, finalDate?: string) {
        try {
            const url = this.getUrl(433, initialDate, finalDate);
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching IPCA:', error);
            throw new Error('Failed to fetch IPCA data');
        }
    }

    /**
     * Fetches CDI rate.
     * Series 12: CDI interest rate (daily)
     */
    static async getCdi(initialDate?: string, finalDate?: string) {
        try {
            const url = this.getUrl(12, initialDate, finalDate);
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching CDI:', error);
            throw new Error('Failed to fetch CDI rate');
        }
    }

    /**
     * Fetches Average Interest Rates.
     * Series 20716: PF - Total
     * Series 20715: PJ - Total
     */
    static async getTaxasMedias(initialDate?: string, finalDate?: string) {
        try {
            const [pfResponse, pjResponse] = await Promise.all([
                axios.get(this.getUrl(20716, initialDate, finalDate)),
                axios.get(this.getUrl(20715, initialDate, finalDate))
            ]);

            return {
                pessoa_fisica: pfResponse.data,
                pessoa_juridica: pjResponse.data
            };
        } catch (error) {
            console.error('Error fetching Taxas Medias:', error);
            throw new Error('Failed to fetch Taxas Medias');
        }
    }
}
