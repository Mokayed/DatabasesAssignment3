const mongoose = require("mongoose");
const fs = require("fs");
const rl = require("readline");
const Stream = require("stream");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/tweets", { useNewUrlParser: true }, (err) => {
    if (err) return err;
    console.log("connected");
});

var TweetSchema = new Schema({
    _id: String,
    polarity: Number,
    id: Number,
    date: String,
    query: String,
    user: String,
    text: String
});

var Tweet = mongoose.model('TweetSchema', TweetSchema, "data");

//amount of users
Tweet.aggregate([
        {$group: {"_id" : "$user"}},
        {$group:{"_id" : null, "totalAmountOfUsers":{$sum: 1}}}
    
 
], (err, result)=> {
    if (err) {
        console.log(err);
    } else {
        console.log( result);
    }
});

//most active twitter users

/*async function run() {
    const agg = [
      
        {$group:{_id : "$user", number : {$sum : 1}}},
        {$sort : {number: -1}},
        {$limit: 10}
    ];
  
    const cursor = Tweet.aggregate(agg)
      .allowDiskUse(true)
      .cursor({batchSize: 10})
      .exec();
    await cursor.eachAsync(console.log);
  }
  
  run().catch(console.error);*/

//how many grumpy users (most 0 in polarity top 5)
/*async function run2() {
    const agg = [
        {$match: {polarity : 0}},
        {$group: {_id: "$user", polarity : {"$sum" : 1}}},
        {$project : {"user" : 1, "polarity" : 1}},
        {$sort : {polarity: -1}},
        {$limit: 5}
    ];
  
    const cursor = Tweet.aggregate(agg)
      .allowDiskUse(true)
      .cursor({batchSize: 10})
      .exec();
    await cursor.eachAsync(console.log);
  }
  
  run2().catch(console.error);*/

  //how many grumpy users (most 0 in polarity top 5)
/*async function run3() {
    const agg = [
        {$match: {polarity : 4}},
        {$group: {_id: "$user", polarity : {"$sum" : 1}}},
        {$project : {"user" : 1, "polarity" : 1}},
        {$sort : {polarity: -1}},
        {$limit: 5}
    ];
  
    const cursor = Tweet.aggregate(agg)
      .allowDiskUse(true)
      .cursor({batchSize: 10})
      .exec();
    await cursor.eachAsync(console.log);
  }
  */
  run3().catch(console.error);

  //which twitter users link the most to other twitter users
  async function run4() {
    const agg = [
        {$match: {text: /@\w*/}},
        {$group: {_id: "$user", number : {"$sum" : 1}}},
        {$sort : {number : -1}},
        {$limit: 10}
    ];
  
    const cursor = Tweet.aggregate(agg)
      .allowDiskUse(true)
      .cursor({batchSize: 10})
      .exec();
    await cursor.eachAsync(console.log);
  }
  
//run4().catch(console.error);

//most mentioned twitter users

async function run5() {
    const agg = [
    {$match : {regex: "$user"}},
    {$project: {user: 1}}
    ];
  
    const cursor = Tweet.aggregate(agg)
      .allowDiskUse(true)
      .cursor({batchSize: 10})
      .exec();
    await cursor.eachAsync(console.log);
  }
  
//run5().catch(console.error);

/**
 * How many Twitter users are in the database?
Which Twitter users link the most to other Twitter users? (Provide the top ten.)
Who is are the most mentioned Twitter users? (Provide the top five.)
Who are the most active Twitter users (top ten)?
Who are the five most grumpy (most negative tweets) and the most happy (most positive tweets)?
 * 
 */