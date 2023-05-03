const { userData } = require("./userData");

const RARITY = {
  Common:"Common",
  Uncommon:"Uncommon",
  Rare:"Rare",
  Epic:"Epic",
  Legendary:"Legendary",
  Exotic:"Exotic",
  Event:"Event",
};

const LOOTTABLE = {
  Common:[
    {item: "bait.basic", amount: [2,5], multiplier: 5},
    {item: "bait.gummy", amount: [1,3], multiplier: 5},
    {item: "lure.basic", amount: [1,3], multiplier: 5},
    {item: "Currency.primary", amount: [3,10], multiplier: 50},
  ],
  Uncommon:[
    {item: "rod.basic", amount: [1,3]},
    
  ],
  Rare:[
    {item: "Currency.primary", amount: [5,25], multiplier: 100},
    
  ],
  Epic:[
    {item: "Currency.Gem", amount: [2,10]},
    /** @todo Pull any of the epic-tier crew from either the DB or a file. */
    /** @note minReqBoxLvl is based off of the box being opened (eg: standard = 0, epic = 3, ect.) */
    {item: "crew", amount: [1,1], minReqBoxLvl: 3, specificBox: null, rarity: ["Rare", "Epic"]},
  ],
  Legendary:[
    {item: "rod", amount: [1,3], rarity: ["Epic","Legendary"]},
    {item: "crew", amount: [1,1], minReqBoxLvl: 2, specificBox: null, rarity: ["Epic", "Legendary"]},
    
  ],
  Exotic:[
    {item: "boat.sailShips.frigate", amount: [1,1]},

  ],
  Event:[]
};


const LOOTBOXES = {
  /** @note The `Event` is the chance any item could be an event item */
  standard: {
    // colour: "",
    // Have % categories (like common = 25%, epic=7.5%, ect) then put items into them
    chances: { Common:0,
    Uncommon:25,
    Rare:15,
    Epic:7.5,
    Legendary:2.25,
    Exotic:0.25,
    Event:0},
    items:[3,4],
  },
  large: {
    // colour: "",
    // Have % categories (like common = 25%, epic=7.5%, ect) then put items into them
    chances: { Common:0,
    Uncommon:35,
    Rare:20,
    Epic:7.5,
    Legendary:2.25,
    Exotic:0.25,
    Event:0},
    items:[3,4],
  },
  boatSpecific_Rare: {
    // Have % categories (like common = 25%, epic=7.5%, ect) then put items into them
    chances: { Common:0,
    Uncommon:25,
    Rare:15,
    Epic:7.5,
    Legendary:2.25,
    Exotic:0.25,
    Event:0},
    items:[3,5],
    type:"boatSpecific"
  }
};

const pityCount = 10; // Replace a `Common` with a `Legendary`

const rarityPercentsForBox = (box, res) => {
  // 0 > res > 100
  // console.log(box, res);
  // TEMP_STATISTICAL(box);
  // //exotic all the way to common
  // let r = undefined;
  // const _rar = Object.entries(RARITY).splice(1);
  // let start = 0; let end = 100;
  // _rar.reverse().forEach(([pct]) => {
  //   if(r===undefined) {
  //     // console.log("> ", start + (box.chances[pct]/2)," >= ",res," || ",res," >= ",end - (box.chances[pct]/2));
  //     // console.log(res <= start || res >= end);
  //     // if(start >= res || res >= end) {
  //     // if(start >= res || res >= end) {
  //     // if(start + box.chances[pct] >= res || res >= end - box.chances[pct] ) {
  //     if(start + (box.chances[pct]/2) >= res || res >= end - (box.chances[pct]/2) ) {
  //       console.log("Fell in category ",pct);
  //       r = pct;
  //       return pct;
  //     }
  //     start+=box.chances[pct]/2; end-=box.chances[pct]/2;
  //   }
  // });

  // if(r===undefined) {
  //   console.log("It shall be COMMON");
  //   r = RARITY.Common;
  // }


  let a = {
    Common: 0, 
    Uncommon:0,
    Rare:0,
    Epic:0,
    Legendary:0,
    Exotic:0,
    Event:0
  };
  let rarities  = [];
  let r = undefined;
  Object.entries(box.chances).forEach(([t,c]) => {
    if(t!=='Event') {rarities.push({ type: t, chance:c });}
  });
  let lowestNum = 101;

  // rarities.forEach(([_,pct]) => {
  //   if(pct !== 0) {
  //     lowestNum = pct < lowestNum ? pct : lowestNum;
  //   }
  // });
  rarities.forEach(pct => {
    if(pct.chance !== 0) {
      lowestNum = pct.chance < lowestNum ? pct.chance : lowestNum;
    }
  });

  // console.log("lowest > ",Math.min(Array(rarities.length).fill(rarities.map(r => r.chance))[0]));

  const fractionMultiplier = lowestNum <= 1 ? 1 / lowestNum : 4;//4; // lowestNum / 1 /** % 1 */

  for (let i = 0; i < 100; i++) {
    // var filler = 100 - chances.map(([_,r]) => r).reduce((sum, current) => sum + current);
    const filler = (100 * fractionMultiplier) - rarities.map(r => r.chance * fractionMultiplier).reduce((sum, current) => sum + current);

    if (filler <= 0) {
      console.log("chances sum is higher than 100!");
      return;
    }

    // Create an array of 100 elements, based on the chances field
    const probability = rarities.map((r, i) => Array(r.chance === 0 ? filler : r.chance * fractionMultiplier).fill(i)).reduce((c, v) => c.concat(v), []);

    // Pick one
    const pIndex = Math.floor(Math.random() * (100 * fractionMultiplier));
    r = rarities[probability[pIndex]];

    a[r.type]+=1;
  };

  // console.log("a > ",a);
  
  return r;
};

const TEMP_STATISTICAL = (box) => {
  let a = {
    Common: 0, 
    Uncommon:0,
    Rare:0,
    Epic:0,
    Legendary:0,
    Exotic:0,
    Event:0
  };
  let rarities  = box;
  // [
  //   { type: "Common", chance:0 },
  //   { type: "Uncommon", chance:25 },
  //   { type: "Rare", chance:15 },
  //   { type: "Epic", chance:7.5 },
  //   { type: "Legendary", chance:2.25 },
  //   { type: "Exotic", chance:0.25 },
  //   // { type: "Event", chance:0 },
  // ];
  let lowestNum = 101;

  rarities.forEach(pct => {
    if(pct.chance !== 0) {
      lowestNum = pct.chance < lowestNum ? pct.chance : lowestNum;
    }
  });

  // console.log("lowest > ",Math.min(Array(rarities.length).fill(rarities.map(r => r.chance))[0]));

  const fractionMultiplier = 1 / lowestNum;//4; // lowestNum / 1 /** % 1 */

  for (let i = 0; i < 100; i++) {
    // var filler = 100 - chances.map(([_,r]) => r).reduce((sum, current) => sum + current);
    var filler = (100 * fractionMultiplier) - rarities.map(r => r.chance * fractionMultiplier).reduce((sum, current) => sum + current);

    if (filler <= 0) {
      console.log("chances sum is higher than 100!");
      return;
    }

    // Create an array of 100 elements, based on the chances field
    var probability = rarities.map((r, i) => Array(r.chance === 0 ? filler : r.chance * fractionMultiplier).fill(i)).reduce((c, v) => c.concat(v), []);

    // Pick one
    var pIndex = Math.floor(Math.random() * (100 * fractionMultiplier));
    var rarity = rarities[probability[pIndex]];

    a[rarity.type]+=1;
  };

  console.log("a > ",a);
  
};

const tackleBoxCmds = {
  checkSeeIfValid: async (args) => {
    let r = {};
    if(args.tacklebox===undefined) {
      console.log("UNDEF");
      return {valid: false};
    }
    if(LOOTBOXES[args.tacklebox]===undefined) {
      return {valid: false};
    };
    try {
      console.log("@note Also create a `Pity` system (like Genshin)s");
      const testCases = {
        slightlyHigherChance: {index: 10, chanceDiv: 8},
        test1: {index: 5, chanceDiv: 4.5},
      };
      let chances=0;
      for (let i = 0; i < testCases.test1.index; i++) {
        chances+=Math.random()*100;//.push(Math.random()*100);
      }
      chances/=testCases.test1.chanceDiv;
      r.chance = chances;
      r.valid = true;
    } catch (e) {
      console.log("    e (tb.js) > ",e);
      r.valid = false;
    }
    // Check with the db / userData.js to see if valid when called (not called when shouldnt have/ invalid)
    return r;//{valid: false, chance: chances};
  },

  generate: async (args) => {
    let res = tackleBoxCmds.checkSeeIfValid(args);
    let retRes = {};
    res.then(r => {
      console.log("r > ",r);
      if(res?.valid===false/* || res?.valid===undefined*/) {
        return {msg:"Invalid"};
      }

      console.log("Chosen TB > ",args.tacklebox);
      //const pcnt = rarityPercentsForBox(LOOTBOXES[args.tacklebox], r.chance);

      function giveItems(...externalArgs) {
        try{
          let reward = [];
          const LB = LOOTBOXES[args.tacklebox];
          let rewAmt = 0;
          for (let i = 0; i < args.amount; i++) {
            rewAmt += LB.items[0] + Math.ceil(Math.random() * (LB.items[1] - LB.items[0]));
          }
          for (let i = 0; i < rewAmt; i++) {
            let c = rarityPercentsForBox(LB);
            let itemChoice = Math.floor(Math.random() * Object.entries(LOOTTABLE[c.type]).length);
            let item = LOOTTABLE[c.type][itemChoice];
            // let amount = (item.amount[0] + Math.ceil(Math.random() * (item.amount[1] - item.amount[0]))) * item?.multiplier?? 1;
            let _a = (item.amount[0] + Math.ceil(Math.random() * (item.amount[1] - item.amount[0])));
            let _m = item.multiplier!== undefined ? item.multiplier : 1;
            // console.log("_a > \t",_a,"\t_m > ",_m);
            let amount = _a * _m;
            // console.log("amt > \t",(item.amount[0] + Math.ceil(Math.random() * (item.amount[1] - item.amount[0]))),"\tmulti > ",item?.multiplier?? 1);
            reward.push({rarity: c.type/** @note for the colour */, item: item.item, amount: amount});
            
          }
          console.log("Congrats! You've got these items from the ",args.tacklebox, " tacklebox:");
          reward.forEach(e => {
            console.log("\t> [",e.rarity,"]\titm: ",e.item,"\tamt: ",e.amount);
          });
          return reward;
        } catch (e) {
          return {msg:"Error"};
        }
      };

      switch (args.tacklebox) {
        case "large":
        case "standard":
          // tackleBoxCmds.standardLootbox(args, pcnt);
          retRes.result = giveItems(/*args, pcnt*/);
          break;
      
        default:
          args.tacklebox = "standard";
          retRes.result = giveItems(/*args, pcnt*/);
          break;
      }
      retRes.success=true;
    })
    .catch(e => {
      console.log("e (tb.js) > ",e);
      retRes.success=false;
      retRes.result=[];
    }).finally(() => {
      console.log("RetRes > ",retRes);
      // applyItemsToInventory(retRes);
      retRes.result.forEach(e => {
        /*args.data = */userData.increase({data: args.data, item: e/*.item.toLowerCase()*/, amount: parseInt(e.amount), from:"lootbox", itemData: e})
      });
      retRes.tempData = args.data;
      args.conn.socket.send(JSON.stringify(retRes)); 
      return retRes;
    });

    // return false;
  },

  standardLootbox: async (args) => {
        
    
    // Only send data that is visible to the client.
    return {
      
    };  
  },

  
};

module.exports = { tackleBoxCmds };
