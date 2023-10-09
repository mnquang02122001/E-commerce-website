import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import {getServerSession} from 'next-auth/next';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userSession = await getServerSession(req, res, authOptions);
    if(!userSession?.user) {
        res.status(403).json({message: "Not logged in"});
        return;
    }

    const {items, payment_intent_id} = req.body;

    res.status(200).json({userSession});
    return;
}