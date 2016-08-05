"use strict";

const cache = {};

const gnasher = {


  "get": function get (globalCacheKey, localCacheKey, dFunction, callback) {
    if (!(cache.hasOwnProperty(globalCacheKey))) cache[globalCacheKey] = {};
    if (cache[globalCacheKey].hasOwnProperty(localCacheKey)) {
      console.log(" -> gnasherTheCacher (get): " + globalCacheKey + "/" + localCacheKey + " IN cache!");
      return callback(false, cache[globalCacheKey][localCacheKey]);
    } else {
      console.log(" -> gnasherTheCacher (get): " + globalCacheKey + "/" + localCacheKey + " NOT IN cache!");
      return dFunction(function (err, result) {
        if (err) return callback(err);
        console.log(" -> gnasherTheCacher (get): no err for dFunction; caching...");
        cache[globalCacheKey][localCacheKey] = result;
        return callback(err, result);
      });
    }
  },


  "debug": function debug () {
    let r = "";
    r += " -> gnasherTheCacher global cache keys:";
    r += Object.keys(cache).map((globalCacheKey) => {
      return "\n     -> " + globalCacheKey + " (" + Object.keys(cache[globalCacheKey]).length.toString() + ")";
    });
    return r;
  },


  "clear": function clear (globalCacheKey) {
    delete cache[globalCacheKey];
  }


};

module.exports = gnasher;