module.exports = {
 "DB": {
    "Type":"postgres",
    "User":"duo",
    "Password":"DuoS123",
    "Port":5432,
    "Host":"104.236.231.11",//104.131.105.222
    "Database":"duo" //duo
  },
  "Redis":
  {
    "ip": "104.131.67.21",
    "port": 6379,
    "password":"DuoS123",
      "redisdb":8
  },

    "ArdsRedis":
    {
        "ip": "45.55.142.207",
        "port": 6389,
        "password":"DuoS123",
        "ardsData":6
    },

    "Security":
    {
        "ip": "45.55.142.207",
        "port": 6389,
        "user": "DuoS123",
        "password": "DuoS123"

    },

  "Host":
  {
    "domain": "0.0.0.0",
    "port": 8832,
    "version":"6.0",
    "hostpath":"./config",
    "logfilepath": ""
  }
};