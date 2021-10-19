const redis = require("redis");
const logger = require("../Utility/logger");
const client = redis.createClient(process.env.REDIS_PORT);

class RedisClass {
  /**
   * redis
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  redis(req, res, next) {
    client.get("getAllNotes", (error, data) => {
      if (error) {
        throw error;
      } else if (data) {
        logger.info("Get RedisNotes successfully !");
        res.status(200).send({
          message: "Get RedisNotes successfully !",
          success: true,
          data: JSON.parse(data),
        });
      } else {
        next();
      }
    });
  }

  redisGetById(req, res, next) {
    client.get("getById", (error, data) => {
      if (error) {
        throw error;
      } else if (data) {
        logger.info("GetById RedisNotes successfully !");
        res.status(200).send({
          message: "GetById RedisNotes successfully !",
          success: true,
          data: JSON.parse(data),
        });
      } else {
        next();
      }
    });
  }

  /**
   * redisGetLabels
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  redisGetLabels(req, res, next) {
    client.get("getAllLabels", (error, data) => {
      if (error) {
        throw error;
      } else if (data) {
        logger.info("Get RedisLabels successfully !");
        res.status(200).send({
          message: "Get RedisLabels successfully !",
          success: true,
          data: JSON.parse(data),
        });
      } else {
        next();
      }
    });
  }

  /**
   * redisGetLabelById
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  redisGetLabelById(req, res, next) {
    client.get("getLabelById", (error, data) => {
      if (error) {
        throw error;
      } else if (data) {
        logger.info("GetLabelById RedisGet successfully !");
        res.status(200).send({
          message: "GetLabelById RedisGet successfully !",
          success: true,
          data: JSON.parse(data),
        });
      } else {
        next();
      }
    });
  }

  /**
   * setData
   * @param {*} key
   * @param {*} time
   * @param {*} data
   */
  setData(key, time, data) {
    client.setex(key, time, data);
  }

  /**
   * clearCache (delete)
   * @param {*} Key
   */

  clearCache() {
    client.flushall();
    logger.info("Cache is cleared");
    console.log("Cache is cleared");
  }
}
module.exports = new RedisClass();
