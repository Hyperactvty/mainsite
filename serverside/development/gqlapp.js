const { port } = require("./config");
const fastify = require("fastify")({ logger: true }); // FastifyLoggerOptions
const mercurius = require("mercurius");
const { resolvers } = require("./resolvers");
const { schema } = require("./schema");
const { fbCmds, fishObjects, FISHBOT_COMMANDS } = require("./projects/fishbot/commands");
const { userData } = require("./projects/fishbot/userData");
const { tackleBoxCmds } = require("./projects/fishbot/tacklebox");
let fishingUsers = []; let fishUserData = [];

/** @temp */
fishUserData.push({UUID: "df3d03b36b-9c84-ba8f-5073222795", data:{
  "UUID": "df3d03b36b-9c84-ba8f-5073222795",
  "bait": {
      "selected": "basic",
      "basic": {
          "name": "Basic",
          "amount": 9,
          "selected": true
      },
      "gummy": {
          "name": "Gummy",
          "amount": 5,
          "selected": false
      },
      "worm": {
          "name": "Worm",
          "amount": 500,
          "selected": false
      }
  },
  "lure": {
      "selected": "basic",
      "basic": {
          "name": "Basic",
          "amount": 10,
          "selected": true
      }
  },
  "line": {
      "selected": "basic",
      "basic": {
          "name": "Basic",
          "maxWeight": 20,
          "amount": 5,
          "selected": true
      }
  },
  "rod": {
      "selected": "basic",
      "basic": {
          "name": "Basic",
          "userSetName": null,
          "amount": 1,
          "multiplier": 1,
          "selected": true
      }
  },
  "backpack": {
      "selected": "basic",
      "basic": {
          "name": "Basic",
          "userSetName": null,
          "colour": "brown",
          "capacity": 20,
          "selected": true
      }
  },
  "boat": {
      "selected": "fishingBoats.rib",
      "fishStorage": [],
      "fishingBoats": {
          "centerConsole": {
              "boatID": "fb_centerconsole",
              "name": "Center Console Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Often called “open fisherman,” for its open deck layout, center console leaves ample cockpit space fore and aft. It accommodates livewells, fish boxes, T-tops, outriggers and abundant storage",
              "length": 14,
              "upgrades": {},
              "selected": false
          },
          "walkaround": {
              "boatID": "fb_walkaround",
              "name": "Walkaround Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "",
              "length": 20,
              "upgrades": {},
              "selected": false
          },
          "cuddyCabin": {
              "boatID": "fb_cuddycabin",
              "name": "Cuddy Cabin",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Has a forward cabin replacing the open bow area",
              "length": 22,
              "upgrades": {},
              "selected": false
          },
          "powerCatamaran": {
              "boatID": "fb_powercatamaran",
              "name": "Power Catamaran",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Twin deep-V hull sponsons connected by a wide deck differentiate this design from a mono-hull. Desirable for its soft ride. Includes a cockpit and a console or cabin, often configured much like a center-console",
              "length": 25,
              "upgrades": {},
              "selected": false
          },
          "dualConsole": {
              "boatID": "fb_dualconsole",
              "name": "Dual-Console Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Dual side consoles with passage between them to the bow. Controls usually on starboard console, opposite console contains space for step-down head, galley, berths or storage",
              "length": 16,
              "upgrades": {},
              "selected": false
          },
          "express": {
              "boatID": "fb_express",
              "name": "Express Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Step-up or level helm area, open to the cockpit. Proximity of helm to cockpit reduces need for additional crew",
              "length": 28,
              "upgrades": {},
              "selected": false
          },
          "bay": {
              "boatID": "fb_bay",
              "name": "Bay Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Beamy center console with low freeboard, extensive storage, sizable livewells, fish boxes and fishing features, seating for 4 or more",
              "length": 20,
              "upgrades": {},
              "selected": false
          },
          "flatsSkiff": {
              "boatID": "fb_flatsskiff",
              "name": "Flats Skiff",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Center or side console, low freeboard, fore and aft casting decks, and usually has a platform over the engine to stand atop when propelling with a push pole, for stealth",
              "length": 16,
              "upgrades": {},
              "attributes": {
                  "stealth": 30
              },
              "selected": false
          },
          "flatsScooter": {
              "boatID": "fb_flatsscooter",
              "name": "Flats Scooter",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Center console, low freeboard, lacks gunwales for wading anglers’ ease in getting on and off, often extensively customized with towers and fishing amenities",
              "length": 16,
              "upgrades": {},
              "selected": false
          },
          "convertible": {
              "boatID": "fb_convertible",
              "name": "Convertible Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Often referred to as “sportfisherman” or “sport-fisher,” the classic offshore fishing boat, with fly bridge controls, cabin with all live-aboard amenities (galley, berths, head), and often a tower",
              "lore": "Not advised during mid-life crisis",
              "length": 31,
              "upgrades": {},
              "selected": false
          },
          "runabout": {
              "boatID": "fb_runabout",
              "name": "Runabout",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Most include an open bow, ample seating, a swim platform and various frills",
              "length": 14,
              "upgrades": {},
              "selected": false
          },
          "rib": {
              "boatID": "fb_RIB",
              "name": "Rigid Inflatable Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Modular design enables addition of seating, various console styles and even T-tops",
              "length": 10,
              "upgrades": {},
              "selected": false
          },
          "jon": {
              "boatID": "fb_jon",
              "name": "Jon Boat",
              "userSetName": null,
              "colour": "#ffffff",
              "description": "Primarily aluminum. Flat-bottomed, square bow and stern, one or more bench seats",
              "length": 8,
              "upgrades": {},
              "selected": true
          },
          "kayak": {
              "boatID": "fb_kayak",
              "name": "Kayak",
              "userSetName": null,
              "colour": "#FFFF00",
              "description": "Narrow and usually pointed at bow and stern. May be covered deck or sit-on-top design",
              "length": 8,
              "upgrades": {},
              "selected": false
          },
          "canoe": {
              "boatID": "fb_canoe",
              "name": "Canoe",
              "userSetName": null,
              "colour": "#ff0000",
              "description": "Lightweight, narrow and usually pointed at bow and stern. May have blunt stern to accommodate a small motor",
              "length": 12,
              "upgrades": {},
              "selected": false
          }
      },
      "sailShips": {
          "schooner": {
              "boatID": "ss_schooner",
              "name": "Schooner",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "selected": false
          },
          "clipper": {
              "boatID": "ss_clipper",
              "name": "Clipper",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "selected": false
          },
          "barquentine": {
              "boatID": "ss_barquentine",
              "name": "Barquentine",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "frigate": {
              "boatID": "ss_frigate",
              "name": "Frigate (Fully-Rigged Ship)",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "brig": {
              "boatID": "ss_brig",
              "name": "Brig",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "brigantine": {
              "boatID": "ss_brigantine",
              "name": "Brigantine",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "barque": {
              "boatID": "ss_barque",
              "name": "Barque",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "xebec": {
              "boatID": "ss_xebec",
              "name": "Xebec",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "fluyt": {
              "boatID": "ss_fluyt",
              "name": "Fluyt",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": 8
              },
              "selected": false
          },
          "cutter": {
              "boatID": "ss_cutter",
              "name": "Cutter",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "yawl": {
              "boatID": "ss_yawl",
              "name": "Yawl",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          },
          "windjammer": {
              "boatID": "ss_windjammer",
              "name": "Windjammer",
              "userSetName": null,
              "colour": {
                  "hull": "#ffffff",
                  "canvas": "#ffffff",
                  "flag": "#ffffff"
              },
              "description": "",
              "length": -1,
              "upgrades": {},
              "restrictions": {
                  "waterOpen": "Open Area, like oceans (have waterOpen for `regions` )",
                  "requiredCrewSize": -1
              },
              "selected": false
          }
      }
  },
  "location": {
      "region": {
          "selected": "sunnyLake",
          "sunnyLake": {
              "regionID": "sunnyLake",
              "name": "Sunny Lake",
              "type": "lake",
              "waterType": "saltwater",
              "unlocked": true,
              "selected": true
          }
      }
  },
  "crew": {
      "guide": {
          "terrence": {
              "name": "Terrence Waters",
              "type": "Human",
              "unlocked": true
          }
      },
      "crew": {
          "scott": {
              "name": "Scott Birmingham",
              "type": "Skeleton",
              "unlocked": true
          }
      }
  },
  "currentHaul": [
      {
          "FISH_ID": "19",
          "Regions": "6",
          "Type": "Fish",
          "Name": "Cod",
          "Description": "",
          "Rarity": "Common",
          "Set": "",
          "MIN_WEIGHT": 2,
          "MAX_WEIGHT": 30,
          "MIN_LENGTH": 2.5,
          "MAX_LENGTH": 10,
          "MIN_WIDTH": 0.1,
          "MAX_WIDTH": 0.7,
          "TROPHY_BRONZE": "60.00",
          "TROPHY_SILVER": "75.00",
          "TROPHY_GOLD": "82.50",
          "TROPHY_PLATINUM": "90.00",
          "TROPHY_RUBY": "95.00",
          "weight": 27.957858813468373,
          "length": 2.978394481146469,
          "width": 0.5537601878692484,
          "points": 129.38088429738343,
          "rarityColour": "#6f7291"
      },
      {
          "FISH_ID": "12",
          "Regions": "2",
          "Type": "Fish",
          "Name": "Sturgeon",
          "Description": "",
          "Rarity": "Common",
          "Set": "",
          "MIN_WEIGHT": 1,
          "MAX_WEIGHT": 153,
          "MIN_LENGTH": 1,
          "MAX_LENGTH": 20,
          "MIN_WIDTH": 0.1,
          "MAX_WIDTH": 0.7,
          "TROPHY_BRONZE": "60.00",
          "TROPHY_SILVER": "75.00",
          "TROPHY_GOLD": "82.50",
          "TROPHY_PLATINUM": "90.00",
          "TROPHY_RUBY": "95.00",
          "weight": 104.5807302716364,
          "length": 12.572097516771967,
          "width": 0.1998555746887285,
          "points": 1577.5690769453265,
          "rarityColour": "#6f7291"
      }
  ],
  "points": 129.38088429738343
}});
fishingUsers.push(fishUserData[0]);

const WEATHERLEVEL = {
  Update: { // Gold-Orange
    Sunny: {
      name: "Sunny",
      //icon: Weather_SunnyIcon
    },
    Calm: {
      name: "Calm",
      //icon: Weather_CalmIcon
    },
    Cloudy: {
      name: "Cloudy",
      //icon: Weather_CloudyIcon
    },
  },
  Extreme: { // Red
    ExtremeWaves: {
      name: "Extreme Waves",
      //icon: Weather_ExtremeWavesIcon
    },
    SevereCold: {
      name: "Severe Cold",
      //icon: Weather_SevereColdIcon
    },
    Cyclone: {
      name: "Cyclone",
      //icon: Weather_CycloneIcon
    },
    Thunderstorm: {
      name: "Thunderstorm",
      //icon: Weather_ThunderstormIcon
    },
  }
}
let weatherAlert = WEATHERLEVEL["Extreme"]["Thunderstorm"];
let ct = new Date(Date.now());

const updateWeather = async () => {
  let _ct = new Date(Date.now());
  if(ct.getMinutes() !== _ct.getMinutes()) {
    //update here
    const idx = Math.random()*WEATHERLEVEL.length();
    weatherAlert = WEATHERLEVEL[idx][WEATHERLEVEL[idx].length()];
    console.log("New Weather > ",weatherAlert);
  }
  //wait for time to update (check every 5 seconds)
  await new Promise(r => setTimeout(r, 5000));
};



fastify.register(require("fastify-cors"), {});

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true, // web page for to test queries
});

fastify.register(require('fastify-websocket'));
// fastify.addHook('onRequest', (request, reply, done) => {
//   console.log("HOOKED, ME BOY!");
//   done()
// })

// Attempt to get fishbot middleware working
fastify.route({
  method: 'GET',
  url: '/fishbot',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      cmd: { type: 'string' }
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          msg: { type: 'string' }
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
    //return jwtVerifier( request, reply );
  },
  handler: async (request, reply) => {
    return { msg: 'go for `fishbot`' }
  }
});

fastify.get('/fb-fish', { websocket: true }, (connection, req) => {
  connection.socket.on('message', message => {
      connection.socket.send('Hello Fastify WebSockets');
  });
});

function waitForBite(waitTime, conn, user, biteTimerWaitTime, fishData) {
	// State for managing cleanup and cancelling
	let finished = false;
	let cancel = () => finished = true;

	const promise = new Promise((resolve, reject) => {
		//
		// Custom Promise Logic
		//
		// NOTE: This countdown not finish in exactly 10 seconds, don't build timers this way!
		// (this is as reliable as a child counting during hide-and-seek... :) )
		// Good explanation can be found here: https://medium.com/javascript-in-plain-english/usetime-react-hook-f57979338de
		let counts = 0;
		const id = setInterval(() => {
			counts += 1;
			console.log(counts);
			if (counts > 8) {
				// Happy-path scenario
				console.log('Bite!');
				clearInterval(id);

        conn.socket.send(JSON.stringify({hooked: true}));
        
        conn.socket.send(JSON.stringify({state: 2})); // 2 is Hooked

				resolve();
			}
		}, waitTime/10);


		// When consumer calls `cancel`:
		cancel = () => {
			// In case the promise has already resolved/rejected, don't run cancel behavior!
			if (finished) {
				return;
			}

			// Cancel-path scenario
			console.log('Reeled in early');
			clearInterval(id);
      
      conn.socket.send(JSON.stringify({hooked: false, escaped: false, done: true}));

      conn.socket.send(JSON.stringify({state: 0})); // 0 is Main Menu Area
			reject();
		};

		// If was cancelled before promise was launched, trigger cancel logic
		if (finished) {
			// (to avoid duplication, just calling `cancel`)
			cancel();
		}

	})
		// After any scenario, set `finished = true` so cancelling has no effect
		.then((resolvedValue) => {
			finished = true;
      fishingUsers.find(_u => _u.UUID === user).process = biteTimer(biteTimerWaitTime, conn, user, fishData);
			return resolvedValue;
		})
		.catch((err) => {
			finished = true;
      /** @disreguard Have this send the conn `Cancel` stuff instead */
			return err;
		});

	// ES6 Promises do not have a built-in mechanism for cancelling promises.
	// To support that feature, you need to provide the cancel callback
	// and consider the possible timings:
	// - cancelled before promise execution
	// - cancelled during promise execution
	// - cancelled after promise execution
	// - cancel requested multiple times
	return { promise, cancel };
}

function biteTimer(waitTime=4000, conn, user, fishData) {
	// State for managing cleanup and cancelling
	let finished = false;
	let cancel = () => finished = true;

	const promise = new Promise((resolve, reject) => {
		//
		// Custom Promise Logic
		//
		// NOTE: This countdown not finish in exactly 10 seconds, don't build timers this way!
		// (this is as reliable as a child counting during hide-and-seek... :) )
		// Good explanation can be found here: https://medium.com/javascript-in-plain-english/usetime-react-hook-f57979338de
		let counts = 0;
		const id = setInterval(() => {
			counts += 1;
			console.log(counts);
			if (counts > 8) {
				// Happy-path scenario
				console.log('Escaped');
				clearInterval(id);
        userData.increase({data: fishUserData.find(_u => _u.UUID === user).data.user, item: "bait", amount: -1})
        .then(r=> {
          console.log("r > ",r);
          
          conn.socket.send(JSON.stringify({hooked: false, escaped: true, caught:false, done: true, tempData: r}));//fishingUsers.find(_u => _u.UUID === user).data
          
          conn.socket.send(JSON.stringify({state: -1, tempData: r})); // -1 is Miss; bring back to main area
          
				  // reject();
        });
				reject();
			}
		}, waitTime/10);


		// When consumer calls `cancel`:
		cancel = () => {
			// In case the promise has already resolved/rejected, don't run cancel behavior!
			if (finished) {
				return;
			}

			// Cancel-path scenario
			console.log('Reeling...');
			clearInterval(id);
      userData.increase({data: fishUserData.find(_u => _u.UUID === user).data.user, item: "bait", amount: -1})
      .then(r=> {
        let temp_FishData = fishData;
        temp_FishData.MIN_WEIGHT= parseFloat(temp_FishData.MIN_WEIGHT);//.replace(".00","");
        temp_FishData.MAX_WEIGHT = parseFloat(temp_FishData.MAX_WEIGHT);//.replace(".00","");
        temp_FishData.MIN_LENGTH= parseFloat(temp_FishData.MIN_LENGTH);//.replace(".00","");
        temp_FishData.MAX_LENGTH = parseFloat(temp_FishData.MAX_LENGTH);//.replace(".00","");
        temp_FishData.MIN_WIDTH= parseFloat(temp_FishData.MIN_WIDTH);//.replace(".00","");
        temp_FishData.MAX_WIDTH = parseFloat(temp_FishData.MAX_WIDTH);//.replace(".00","");
        let weq = Math.random();
        let leq = Math.random();
        let wiq = Math.random();
        temp_FishData.weight = (weq * (temp_FishData.MAX_WEIGHT - temp_FishData.MIN_WEIGHT))+temp_FishData.MIN_WEIGHT;
        temp_FishData.length = (leq * (temp_FishData.MAX_LENGTH - temp_FishData.MIN_LENGTH))+temp_FishData.MIN_LENGTH;
        temp_FishData.width = (wiq * (temp_FishData.MAX_WIDTH - temp_FishData.MIN_WIDTH))+temp_FishData.MIN_WIDTH;
        /** @note Temporary */
        temp_FishData.points = 
          (temp_FishData.weight > 1 ? temp_FishData.weight : temp_FishData.weight+1) * 
          (temp_FishData.length > 1 ? temp_FishData.length : temp_FishData.length+1) * 
          (temp_FishData.width > 1 ? temp_FishData.width : temp_FishData.width+1);

        console.log("PTS > ",temp_FishData.points);

        console.log("Weight > (",weq," * (",temp_FishData.MAX_WEIGHT," - ",temp_FishData.MIN_WEIGHT,")) +",temp_FishData.MIN_WEIGHT," = ", temp_FishData.weight);
        console.log("Length > (",leq," * (",temp_FishData.MAX_LENGTH," - ",temp_FishData.MIN_LENGTH,")) +",temp_FishData.MIN_LENGTH," = ", temp_FishData.length);
        console.log("Width > (",wiq," * (",temp_FishData.MAX_WIDTH," - ",temp_FishData.MIN_WIDTH,")) +",temp_FishData.MIN_WIDTH," = ", temp_FishData.width);

        // conn.socket.send(JSON.stringify({hooked: false, caught:true, done: true, tempData: r}));//fishingUsers.find(_u => _u.UUID === user).data
        // fbCmds.fish()
        // .then(f => {
        //   conn.socket.send(JSON.stringify({state: 3, tempData: r, fish: fishData})); // 3 is Reeling; bring back to main area
        // });
        conn.socket.send(JSON.stringify({state: 3, tempData: r, fish: temp_FishData})); // 3 is Reeling; bring back to main area
        

      });
			resolve();
		};

		// If was cancelled before promise was launched, trigger cancel logic
		if (finished) {
			// (to avoid duplication, just calling `cancel`)
			cancel();
		}

	})
		// After any scenario, set `finished = true` so cancelling has no effect
		.then((resolvedValue) => {
			finished = true;
      console.log("Success");
			return resolvedValue;
		})
		.catch((err) => {
			finished = true;
      console.log(" Not Success", err);
			return err;
		});

	// ES6 Promises do not have a built-in mechanism for cancelling promises.
	// To support that feature, you need to provide the cancel callback
	// and consider the possible timings:
	// - cancelled before promise execution
	// - cancelled during promise execution
	// - cancelled after promise execution
	// - cancel requested multiple times
	return { promise, cancel };
}

fastify.route({
  method: 'GET',
  // url: '/fishbot/:cmd/:user',// /:user',
  url: '/fishbot/:cmd/:args',// /:user',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      cmd: { type: 'string' },
      args:{ type: 'string' },
      // args:{ type: 'string' },
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          msg: { type: 'string' },
          completed: {type: 'boolean'},
          response: { 
            type: 'object',
            properties: {
              msg: { type: 'string' },
            }
          },
        }
      }
    }
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
    //return jwtVerifier( request, reply );

    request.params.loadFish = fishObjects.sort(() => Math.random() - 0.5);
  },
  handler: async (request, reply) => {
    const COMMANDS = [
      {
          name: "help", 
          alias:["cmds"],
          description:"Displays all the commands",
          minArgs:0,
          args: [],
          onSelect: null,
      },
      {
          name: "start", 
          alias:null,
          description:"Registers your account to the fishing database",
          minArgs:0,
          args: [],
          onSelect: null,
      },
      {
          name: "fish", 
          alias:null,
          description:"The command to fish",
          minArgs:0,
          args: [],
          onSelect: fbCmds.fish,
      },
    ];
    const req = request.params.cmd;
    const user = request.params.user;
    let cmdFound = false; let findCmd = {};
    try {
      findCmd = COMMANDS.find(cmd => cmd.name === (req+"").split(" ")[0]) || COMMANDS.find(cmd => cmd.alias.find(alias => alias === (req+"").split(" ")[0]));// ?? ;
      cmdFound = true;
      console.log("fish `hook` > ",await fbCmds.fish());
    } catch (error) {
      console.log("error");
    }
    return { msg: `Cmd is ${findCmd?.name}`, completed: cmdFound, response: cmdFound ? await findCmd.onSelect() : {} };
  },
  wsHandler: async (conn, req) => {
    let data = {};
    // if `fish` is selected, load the data for first time use (until socket dies)
    conn.socket.on('connection', () => {
      console.log('Client conn');
    });
    
    // const { _req, user, args="" } = req.params;
    const args = req.params.args.split("&");
    console.log(args);
    const _req = req.params.cmd; const user = args.find(v => v.startsWith("user=")).substring(5);//!=="undefined" ? args.find(v => v.startsWith("user=")).substring(5) : `Guest${Math.ceil(Math.random()*99999999)}`; //const args= req.params.args??"";
    try {

      if(_req === "increase") {
        const category = args.find(v => v.startsWith("category=")).substring(9);
        const item = args.find(v => v.startsWith("item=")).substring(5);
        const amt = args.find(v => v.startsWith("amt=")).substring(4);
        userData.increase({data: fishUserData.find(_u => _u.UUID === user).data.user, category: category.toLowerCase(), item: item.toLowerCase(), amount: parseInt(amt)})
        .then(r=> {
          conn.socket.send(JSON.stringify({tempData: r})); 
        });
        return;
      }
      if(_req === "openTacklebox") {
        const category = args.find(v => v.startsWith("category=")).substring(9);
        const item = args.find(v => v.startsWith("item=")).substring(5);
        const amt = args.find(v => v.startsWith("amt=")).substring(4);
        tackleBoxCmds.generate({data: fishUserData.find(_u => _u.UUID === user).data, tacklebox: item.toLowerCase(), amount: parseInt(amt), conn:conn});
        return;
      }


      // if(_req==="grabUD") { 
      //   conn.socket.send(JSON.stringify(fishUserData.find(_u => _u.UUID === user))); 
      //   return; 
      // }

      findCmd = FISHBOT_COMMANDS.find(cmd => cmd.name === (_req+"").split(" ")[0]) || FISHBOT_COMMANDS.find(cmd => cmd.alias.find(alias => alias === (_req+"").split(" ")[0]));// ?? ;
      cmdFound = true;
      const resp = cmdFound ? await findCmd.onSelect({user: user}) : {};

      if(resp!== {}) {
        console.log("cmd select > ",{response: findCmd.name});

        if(findCmd.name==="fish") {
          // Check if the user has depleted their bait/hooks/ has no space left in boat
          console.log(fishUserData.find(_u => _u.UUID === user));
          const isFishing = args.find(v => v.startsWith("isFishing=")).substring("isFishing=".length);
          console.log("Args > ",args);
          let allClear = true;
          // if(fishUserData.find(_u => _u.UUID === user) && isFishing==="false") {
          if(fishUserData.find(_u => _u.UUID === user)) {
            const itc = ["bait", /*"hook",*/ ];
            const cu = fishUserData.find(_u => _u.UUID === user).data.user;
            itc.forEach(i => {
              if(cu[i][cu[i].selected].amount<=0) {//0
                console.log("Out of",i);
                allClear=false;
                // if(isFishing==="false") conn.socket.send(JSON.stringify({errorCode:"!ERROR_NOTENOUGH", msg: `You need to buy more <b>${i}s</b>`, state:0}));
                if(isFishing==="true") conn.socket.send(JSON.stringify({errorCode:"!ERROR_NOTENOUGH", msg: `You need to buy more <b>${i}</b>`, state:0}));
                
                /* return "require more bait," then close conn */
                // conn.socket.close();
                // return;
              } else {
                console.log("Still has",i);
              }
            });
          }
          if(allClear===false) { return; }
          
          const wait = (duration, ...args) => new Promise(resolve => { setTimeout(resolve, duration, ...args); });


          if(fishingUsers.find(_u => _u.UUID === user) === undefined) { 
            /** @note The array that would temp-hold the data */
            fishingUsers.push({UUID: user, process: undefined, data: await fbCmds.temp_newFisher({user:user})}); 
          }
          if(fishUserData.find(_u => _u.UUID === user) === undefined) { 
            /** @note The array that would perma-hold the user's data */
            fishUserData.push({UUID: user, data: await userData.newFisher({user:user})})
          }
          // if(isFishing==="false") {
          if(isFishing==="true") {
            conn.socket.send(JSON.stringify({state: 1})); // 1 is fishing
            fishingUsers.find(_u => _u.UUID === user).process = waitForBite(resp.timeout, conn, user, resp.timeForFishEscape, resp.data );
            // fishingUsers.find(_u => _u.UUID === user).process.promise.then(() => console.log('Promise resolved.'));
            // fishingUsers.find(_u => _u.UUID === user).process.promise.catch(() => console.error('Promise rejected!'));
            // Wait a bit, but not too long!
            await wait(resp.timeout+resp.timeForFishEscape);
            /** @note  have time match with epoch */
            if(fishingUsers.find(_u => _u.UUID === user)) {console.log("Cann'd");fishingUsers.find(_u => _u.UUID === user).process.cancel();}
            // conn.socket.send(JSON.stringify({ready:true}));
          } else {
            console.log("Cann'd in `else`");
            fishingUsers.find(_u => _u.UUID === user).process.cancel();
            fishingUsers = fishingUsers.filter(_u => _u.UUID !== user);
            console.log("deleted user, array length > ",fishingUsers.length);
          }
        }

      } else {
        conn.socket.send(JSON.stringify(resp));
      }
    } catch (error) {
      console.log("error > ",error);
    } finally {
      // conn.socket.send({finallyHit: true});
    }

    conn.socket.on('message', message => {
      // Do the same thing here
      conn.socket.send('Message Received');
    });
    
    conn.socket.on('close', () => {
      console.log('Client disconnected');
      try {
        if(fishingUsers.find(_u => _u.UUID === user)) {fishingUsers.find(_u => _u.UUID === user).process.cancel();}
      } catch (err) {
        console.log("OnClose Error > ",err)
      } finally {
        // delete fishingUsers[fishingUsers.findIndex(_u => _u.UUID === user)];
        fishingUsers = fishingUsers.filter(_u => _u.UUID !== user);
        console.log("OnClose Finally, arr length > ",fishingUsers.length);
      }
    });
    // return { msg: ``, completed: true, response: randomFish };
}
});

// fastify.addHook('onRequest', async (request, reply) => {
//   // Some code
//   await asyncMethod()
// });

// start the fastify server
fastify.listen(port, "127.0.0.1",(err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
