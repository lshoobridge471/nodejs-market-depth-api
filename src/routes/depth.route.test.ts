import { json } from 'express';
import cors from 'cors';
import { addAppRoute, createExpressApp } from '../utils/express';
import moxios from 'moxios';
import request, { Response as SuperTestResponse, } from 'supertest';

import router from '../router';
import CONFIG from '../config/config';
import orderBookMock from '../mocks/orderbook.json';
import { average, parseBookData } from '../utils/utils';
import { Tip } from '../types/interfaces';

const { BITFINEX_API } = CONFIG;

describe('depths route test suite', () => {

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
      const len = '100';
      const precision = 'P0';
      const size = '100';
      const type = 'bid';

      // Parse URL
      const bitFinexURL = `${BITFINEX_API}/book/t${pair}/${precision}?len=${len}`;
      const depthUrl = `/depth/${pair}?size=${size}&type=${type}`;
      
      // Parse and filter price data
      const tips: Tip[] = parseBookData(orderBookMock);
      const filtered: Tip[] = tips.filter((item: Tip) => item.type === type);
      const filtered_prices: number[] = filtered.map((item: Tip) => item.price);
      const price = average(filtered_prices);
      
      // Mocked data
      const mockedResponse = {
        pair,
        size,
        type,
        price,
      };
      
      // Mocked responses
      moxios.stubRequest(bitFinexURL, {
          status: 200,
          response: orderBookMock,
      });
      
      // Create express App.
      const app = makeExpressApp();
      // Get response.
      const response: SuperTestResponse = await request(app).get(depthUrl);
      const data = JSON.parse(response.text);
      // Check reponse data
      expect(data).toEqual(mockedResponse);
      // Check url's called
      expect(moxios.requests.mostRecent().url).toBe(bitFinexURL);
    });
});