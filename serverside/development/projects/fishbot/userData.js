
const userData = {
  newFisher: async (args) => {
    // if user isn't logged in, save to the session storage.
    const user = args?.user;
    let userData = {
      UUID: user,//!=="undefined" ? user : `Guest${Math.ceil(Math.random()*99999999)}`,
      bait: {
        selected: "basic",
        basic: {
          name: "Basic",
          amount: 10,
          selected: true,
        },
        gummy: {
          name: "Gummy",
          amount: 5,
          selected: false,
        },
        worm: {
          name: "Worm",
          amount: 500,//Infinity,
          selected: false,
        },
        smallLiveBait: {
          name: "Perch Minnow",
          type: "Live Bait",
          description: "Fish eat small fish. Fish happy.",
          amount: 10,//Infinity,
          selected: false,
        },
        largeLiveBait: {
          name: "Shiner Minnow",
          type: "Live Bait",
          description: "Used for catching larger fish.",
          amount: 10,//Infinity,
          selected: false,
        },
      }, 
      lure: {
        selected: "basic",
        basic: {
          // note: have chance that fish eat the lures or line break
          name: "Basic",
          amount: 10,
          selected: true,
        },
      }, 
      line: {
        selected: "basic",
        basic: {
          name: "Basic",
          maxWeight: 20/* lb */,// Note: have kg/ lb conversions.
          amount: 5,
          selected: true,
        },
      }, 
      rod: {
        selected: "basic",
        basic: {
          name: "Basic",
          userSetName: null, // Users can name their rod
          amount: 1,
          multiplier: 1,
          selected: true,
        },
      },
      backpack: {
        selected: "basic",
        basic: {
          name: "Basic",
          userSetName: null, // Users can name their bag
          colour: "brown", /* Use Hex or something to render the backpack (research sprite
                              colouring by having default colour red and applying colour correction)*/
          capacity: 20,
          selected: true,
        },
      },
      boat: {
        selected: "fishingBoats.rib",
        fishStorage:[], // temp: fish max capacity would be (boat length * 1.75)
        fishingBoats: {
          // https://www.saltwatersportsman.com/types-of-fishing-boats-guide/
          centerConsole: {
            boatID: "fb_centerconsole",
            name: "Center Console Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Often called “open fisherman,” for its open deck layout, center console leaves ample cockpit space fore and aft. It accommodates livewells, fish boxes, T-tops, outriggers and abundant storage",
            length: 14, //ft
            upgrades: {
              
            },
            selected: false,
          },
          walkaround: {
            boatID: "fb_walkaround",
            name: "Walkaround Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "",
            length: 20, //ft
            upgrades: {
              
            },
            selected: false,
          },
          cuddyCabin: {
            boatID: "fb_cuddycabin",
            name: "Cuddy Cabin",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Has a forward cabin replacing the open bow area",
            length: 22, //ft
            upgrades: {
              
            },
            selected: false,
          },
          powerCatamaran: {
            boatID: "fb_powercatamaran",
            name: "Power Catamaran",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Twin deep-V hull sponsons connected by a wide deck differentiate this design from a mono-hull. Desirable for its soft ride. Includes a cockpit and a console or cabin, often configured much like a center-console",
            length: 25, //ft
            upgrades: {
              
            },
            selected: false,
          },
          dualConsole: {
            boatID: "fb_dualconsole",
            name: "Dual-Console Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Dual side consoles with passage between them to the bow. Controls usually on starboard console, opposite console contains space for step-down head, galley, berths or storage",
            length: 16, //ft
            upgrades: {
              
            },
            selected: false,
          },
          express: {
            boatID: "fb_express",
            name: "Express Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Step-up or level helm area, open to the cockpit. Proximity of helm to cockpit reduces need for additional crew",
            length: 28, //ft
            upgrades: {
              
            },
            selected: false,
          },
          bay: {
            boatID: "fb_bay",
            name: "Bay Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Beamy center console with low freeboard, extensive storage, sizable livewells, fish boxes and fishing features, seating for 4 or more",
            length: 20, //ft
            upgrades: {
              
            },
            selected: false,
          },
          flatsSkiff: {
            boatID: "fb_flatsskiff",
            name: "Flats Skiff",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Center or side console, low freeboard, fore and aft casting decks, and usually has a platform over the engine to stand atop when propelling with a push pole, for stealth",
            length: 16, //ft
            upgrades: {
              
            },
            attributes: {
              /** @note attributes can have positive and negative effects */
              stealth: 30 /** @description Scares fish less often */
            },
            selected: false,
          },
          flatsScooter: {
            boatID: "fb_flatsscooter",
            name: "Flats Scooter",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Center console, low freeboard, lacks gunwales for wading anglers’ ease in getting on and off, often extensively customized with towers and fishing amenities",
            length: 16, //ft
            upgrades: {
              
            },
            selected: false,
          },
          convertible: {
            boatID: "fb_convertible",
            name: "Convertible Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Often referred to as “sportfisherman” or “sport-fisher,” the classic offshore fishing boat, with fly bridge controls, cabin with all live-aboard amenities (galley, berths, head), and often a tower",
            lore: "Not advised during mid-life crisis",
            length: 31, //ft
            upgrades: {
              
            },
            selected: false,
          },
          runabout: {
            boatID: "fb_runabout",
            name: "Runabout",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Most include an open bow, ample seating, a swim platform and various frills",
            length: 14, //ft
            upgrades: {
              
            },
            selected: false,
          },
          rib: {
            boatID: "fb_RIB",
            name: "Rigid Inflatable Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Modular design enables addition of seating, various console styles and even T-tops",
            length: 10, //ft
            upgrades: {
              
            },
            selected: false,
          },
          jon: {
            boatID: "fb_jon",
            name: "Jon Boat",
            userSetName: null, // Users can name their boat
            colour: "#ffffff", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Primarily aluminum. Flat-bottomed, square bow and stern, one or more bench seats",
            length: 8, //ft
            upgrades: {
              
            },
            selected: true,
          },
          kayak: {
            boatID: "fb_kayak",
            name: "Kayak",
            userSetName: null, // Users can name their boat
            colour: "#FFFF00", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Narrow and usually pointed at bow and stern. May be covered deck or sit-on-top design",
            length: 8, //ft
            upgrades: {
              
            },
            selected: false,
          },
          canoe: {
            boatID: "fb_canoe",
            name: "Canoe",
            userSetName: null, // Users can name their boat
            colour: "#ff0000", /* Use Hex or something to render the boat (research sprite
                                colouring by having default colour red and applying colour correction)*/
            description: "Lightweight, narrow and usually pointed at bow and stern. May have blunt stern to accommodate a small motor",
            length: 12, //ft
            upgrades: {
              
            },
            selected: false,
          },
        },
        sailShips: {
          //https://www.deepsailing.com/blog/types-of-sailing-ships
          schooner: {
            boatID: "ss_schooner",
            name: "Schooner",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            selected: false,
          },
          clipper: {
            boatID: "ss_clipper",
            name: "Clipper",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            selected: false,
          },
          barquentine: {
            boatID: "ss_barquentine",
            name: "Barquentine",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          frigate: {
            boatID: "ss_frigate",
            name: "Frigate (Fully-Rigged Ship)",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          brig: {
            boatID: "ss_brig",
            name: "Brig",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          brigantine: {
            boatID: "ss_brigantine",
            name: "Brigantine",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          barque: {
            boatID: "ss_barque",
            name: "Barque",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          xebec: {
            boatID: "ss_xebec",
            name: "Xebec",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          fluyt: {
            boatID: "ss_fluyt",
            name: "Fluyt",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: 8, // Only needs a skeleton crew to operate
            },
            selected: false,
          },
          cutter: {
            boatID: "ss_cutter",
            name: "Cutter",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          yawl: {
            boatID: "ss_yawl",
            name: "Yawl",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
          windjammer: {
            boatID: "ss_windjammer",
            name: "Windjammer",
            userSetName: null, // Users can name their boat
            colour: {
              hull: "#ffffff",
              canvas: "#ffffff", 
              flag: "#ffffff"
            },
            description: "",
            length: -1, //ft
            upgrades: {},
            restrictions: { // Have in red text
              waterOpen: "Open Area, like oceans (have waterOpen for `regions` )",
              requiredCrewSize: -1,
            },
            selected: false,
          },
        },
      },
      location: {
        region: {
          selected: "sunnyLake",
          sunnyLake: {
            regionID: "sunnyLake",
            name: "Sunny Lake",
            type: "lake",
            waterType: "saltwater",
            unlocked: true,
            selected: true,
            /** 
             * @note Have these in the server-side area
             * maxDepth: 10 //ft // Note: have feet/ meter conversion
             *   // also have math determining where the user is, for example have 
             *   // math where it would range/ vary the depth because of boat moving
             */
          },
        },
      },
      crew: {
        guide: { // Always need a guide. When a ship is too small to fit crew, have the guide on standby via "phone"
          // Have name generator for humans and skeletons and whatnot
          terrence: {
            name: "Terrence Waters",
            type: "Human",
            unlocked: true
          }
        }, 
        crew: {
          scott: {
            name: "Scott Birmingham",
            type: "Skeleton",
            unlocked: true
          }
        }
      },
    };
    // Note: backpack may be used to store multiple rods/lures/baits. May be removed entirely
    return {
      user: userData,
    };
  },

  change: async (args) => {
    let {data, itemToChange, item, ...other} = args;
    console.log("Args > ",args);
    console.log(data[itemToChange].selected, " -> ", item);

    data[itemToChange].selected = item;
    // switch (itemToChange) {
    //   case "rod":
    //     data.rod.selected = itemToChange;
    //     break;
    
    //   default:
    //     break;
    // }

    // Only send data that is visible to the client.
    return data;
  
  },

  increase: async (args) => {
    try {
      let {data, item, amount, ...other} = args;
      if(other?.from) {
        if(other.from==="lootbox") {
          const d = item.item.split(".");
          if(d[0].toLowerCase()==="currency") {
            switch (d[1]) {
              case "primary":
                console.log("points : ",data["points"], " -> ", data["points"] + amount);
                data["points"] += parseInt(amount);
                break;
              case "gem":
                // console.log(data[d[0]][d[1]][d[2]]," : ",data[d[0]][d[1]][d[2]].amount, " -> ", data[d[0]][d[1]][d[2]].amount + amount);
                data["gems"] += parseInt(amount);
                break;
              default:
                break;
            }
          } else {
            if(d.length === 1) {
              console.log("Generate a method to give the user 1x",item?.rarity, d[0]);
              // console.log(data[d[0]].name," : ",data[d[0]].amount, " -> ", data[d[0]].amount + amount);
              // data[d[0]].amount += parseInt(amount);
            }
            if(d.length === 2) {
              console.log(data[d[0]][d[1]].name," : ",data[d[0]][d[1]].amount, " -> ", data[d[0]][d[1]].amount + amount);
              data[d[0]][d[1]].amount += parseInt(amount);
            }
            if(d.length === 3) {
              console.log(data[d[0]][d[1]][d[2]].name," : ",data[d[0]][d[1]][d[2]].amount, " -> ", data[d[0]][d[1]][d[2]].amount + amount);
              data[d[0]][d[1]][d[2]].amount += parseInt(amount);
            }
          }
        }
        
        return data;
      }
      if(other?.category) {
        // data[other.category][item].amount = parseInt(data[other.category][item].amount);
        data[other.category][item].amount += parseInt(amount);

        return data;
      }

      /** @note The `decrease bait` code */
      /** @note this is VERY WRONG. Change this to update the item that is being increased, otherwise, create a seprate function just for putting the fishing items at lower number */
      console.log(data[item].selected," : ",data[item][data[item].selected].amount, " -> ", data[item][data[item].selected].amount + amount);
      data[item][data[item].selected].amount += amount;

      return data;
    } catch (e) {
      console.log("Error in UD > ",e);
    }
  
  },

  
};

module.exports = { userData };
