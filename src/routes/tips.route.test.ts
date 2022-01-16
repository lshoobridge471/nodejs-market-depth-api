import { json } from 'express';
import cors from 'cors';
import { addAppRoute, createExpressApp } from '../utils/express';
import moxios from 'moxios';
import request, { Response as SuperTestResponse, } from 'supertest';

import router from '../router';
import CONFIG from '../config/config';
import orderBookMock from '../mocks/orderbook.json';
import { parseBookData } from '../utils/utils';

const { BITFINEX_API } = CONFIG;

describe('tips route test suite', () => {

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    const makeExpressApp = () => {
      const app = createExpressApp(router);
      app.use(json);
      app.use(cors());
      // Add app route.
      addAppRoute(app, '/', router);
      return app;
    };

    it('tips route test get with mocked data', async () => {
      // Parse data
      const pair = 'BTCUSD';
      const len = '25';
      const precision = 'P0';

      // Parse URL
      const bitFinexURL = `${BITFINEX_API}/book/t${pair}/${precision}?len=${len}`;
      const tipsUrl = `/tips/${pair}?precision=${precision}&len=${len}`;
      
      // Mocked data
      const mockedResponse = {
        pair,
        data: parseBookData(orderBookMock),
      };
      
      // Mocked responses
      moxios.stubRequest(bitFinexURL, {
          status: 200,
          response: orderBookMock,
      });
      
      // Create express App.
      const app = makeExpressApp();
      // Get response.
      const response: SuperTestResponse = await request(app).get(tipsUrl);
      const data = JSON.parse(response.text);
      // Check reponse data
      expect(data).toEqual(mockedResponse);
      // Check url's called
      expect(moxios.requests.mostRecent().url).toBe(bitFinexURL);
    });
});