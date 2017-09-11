import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendfile('../../template/login_signup.html');
});

export default router;
