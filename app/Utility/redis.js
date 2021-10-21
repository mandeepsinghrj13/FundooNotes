const redis = require("redis");
// const { error } = require("winston");
const logger = require("../Utility/logger");
const client = redis.createClient(process.env.REDIS_PORT);

class RedisClass {
  redisGetById(req, res, next) {
    client.get("getNotesById", (error, data) => {
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

  clearCache = (key) => {
    client.del(key, (err, res) => {
      if (err) {
        logger.error("cache not cleared");
      } else {
        console.log("Cache cleared");
        logger.info("Cache cleared");
      }
    });
  };
}
module.exports = new RedisClass();
