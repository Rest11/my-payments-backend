import { DonationInstance } from '../../../database/models/donation/donation.instance';

export interface PaymentStatistic {
    sum: DonationInstance[];
    amount: DonationInstance[];
    usersAmount: DonationInstance[];
}
