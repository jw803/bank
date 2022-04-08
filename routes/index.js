import Router from "koa-router";
// import config from '../lib/config.js'

const router = new Router();

import * as authController from "../controllers/auth.js";
import * as mutualFundController from "../controllers/mutual_fund.js";

import authMiddleware from '../middleware/authHandler.js'

// API
router.get("/", async ctx => {
    ctx.body = `APIServer v${config.version}`;
});

// health check end point
router.get("/healthz", async ctx => {
  ctx.body = "Ok"
});

router.post("/user/login", authController.login)
router.patch("/user/:id/agreement", authMiddleware, authController.signAgreement)

router.get("/mutual_fund", authMiddleware, mutualFundController.get_mutual_list)
router.post("/order", authMiddleware, mutualFundController.buyMutualFund)


export default router;
