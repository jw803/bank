import Koa from "koa";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import bodyParser from 'koa-bodyparser';

// init
import './ioc/index.js'
import './models/otp.js'
import './models/user.js'

import router from './routes/index.js'
import errorHandler from './middleware/errorHandler.js'

import moment from 'moment-timezone';
moment.tz.setDefault("America/Chicago");

const app = new Koa()

app.use(errorHandler)

app.use(helmet())
app.use(cors())
app.use(bodyParser())

// API
app.use(router.routes());
app.use(router.allowedMethods())

app.on('error', async (e, ctx) => {
  console.log(`${ctx.method} ${ctx.path} Error: ${e.message}`);
});

export default app;
