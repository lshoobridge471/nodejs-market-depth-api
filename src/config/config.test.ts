import { Environment } from '../types/interfaces';

const testConfig: Environment = {
    NODE_ENV: 'development_test',
    SERVER_HOST: 'localhost_test',
    SERVER_PORT: '8081',
    BITFINEX_API: 'api.test.wstest',
    VALID_PAIRS: 'validpairs_test',
};

process.env = {
    ...process.env,
    ...testConfig,
};

// Import config after set the environment config.
import CONFIG from './config';

describe('config test suite', () => {

    it('check config with custom data', () => {
        expect(CONFIG).toEqual(testConfig);
    });
});