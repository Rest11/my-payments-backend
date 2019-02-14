import { DonationInstance } from '../../../database/models/donation/donation.instance';

export interface GetTransactions {
    count: number;
    rows: DonationInstance[];
}
