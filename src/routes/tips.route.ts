import { Request, Response } from 'express';
import CONFIG from '../config/config';
import CONSTANTS from '../utils/constants';
import Axios from 'axios';
import { getAvailablePairs, parseBookData, validatePair, validatePrecision, validateLenght } from '../utils/utils';
const { BITFINEX_API } = CONFIG;
const { PRECISION_TYPES, LEN_VALUES } = CONSTANTS;

const TipsRoute = async (req: Request, res: Response): Promise<void> => {
    try {
        // Get the specified pair
        const pair: string = req.params?.pair && req.params.pair;
        const len: string = req.query?.len && req.query.len as string || '25';
        const precision: string = req.query?.precision && req.query.precision as string || 'P0';
        
        if(!validatePair(pair)) {
            const availablePairs = getAvailablePairs();
            throw `Please, specify an available pair. Valid values: ${availablePairs.join(', ')}`;
        }

        if(!validatePrecision(precision)) {
            throw `Please, specify a valid precision type. Valid values: ${PRECISION_TYPES.join(', ')}`;
        }

        if(!validateLenght(len)) {
            throw `Please, specify a valid length quantity. Valid values: ${LEN_VALUES.join(', ')}`;
        }

        try {
            const url = (len) ? `${BITFINEX_API}/book/t${pair}/${precision}?len=${len}` : `${BITFINEX_API}/book/t${pair}/${precision}`;
            // Call to the url
            const { data } = await Axios.get(url);
            // Parse data
            const tips = parseBookData(data);
            // Send responde
            res.send({ pair, data: tips });
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