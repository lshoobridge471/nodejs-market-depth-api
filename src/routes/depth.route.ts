import Axios from 'axios';
import { Request, Response } from 'express';
import CONFIG from '../config/config';
import CONSTANTS from '../utils/constants';
import { Tip } from '../types/interfaces';
import { getAvailablePairs, validatePair, validateOperationType, validateOrderSize, parseBookData, average } from '../utils/utils';

const { BITFINEX_API } = CONFIG;
const { OPERATION_TYPES } = CONSTANTS;

const TipsRoute = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the specified pair
        const pair: string = req.params?.pair && req.params.pair;
        const type: string = req.query?.type && req.query.type as string;
        const size: string = req.query?.size && req.query.size as string;
        
        if(!validatePair(pair)) {
            const availablePairs = getAvailablePairs();
            throw `Please, specify an available pair. Valid values: ${availablePairs.join(', ')}`;
        }

        if(!validateOperationType(type)) {
            throw `Please, specify a valid operation type. Valid values: ${OPERATION_TYPES.join(', ')}`;
        }

        if(!validateOrderSize(parseFloat(size))) {
            throw `Please, specify a valid operation size.`;
        }

        try {
            const url = `${BITFINEX_API}/book/t${pair}/P0?len=100`;
            // Call to the url
            const { data } = await Axios.get(url);
            // Parse data
            const tips: Tip[] = parseBookData(data);
            const filtered: Tip[] = tips.filter((item: Tip) => item.type === type);
            const filtered_prices: number[] = filtered.map((item: Tip) => item.price);
            const price = average(filtered_prices);

            res.send({ pair, price, size, type });
        } catch (err) {
            throw 'Error on get data. Please, retry again.';
        }
    } catch(error) {
        res.status(500).send({
            error,
        });
    }
};

export default TipsRoute;