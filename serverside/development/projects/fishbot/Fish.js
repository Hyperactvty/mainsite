const RARITY = {
  Common:"Common",
  Uncommon:"Uncommon",
  Rare:"Rare",
  Epic:"Epic",
  Legendary:"Legendary",
  Exotic:"Exotic",
  Event:"Event",
};

const WATERS = {
  FRESHWATER: "Freshwater",
  SALTWATER: "Saltwater"
}

//const CLASSIFICATIONS = {
const TYPES = {
  Fish: "Fish",
  Crustacean: "Crustacean"
}

const REGION = {
  Ocean: {
    Arctic: {
      All:"Arctic",
      North:"Northern Arctic",
      South:"Southern Arctic",
      East:"Eastern Arctic",
      West:"Western Arctic",
    },
    Atlantic: {
      All:"Atlantic",
      North:"Northern Atlantic",
      South:"Southern Atlantic",
      East:"Eastern Atlantic",
      West:"Western Atlantic",
    },
    Indian: {
      All:"Indian",
      North:"Northern Indian",
      South:"Southern Indian",
      East:"Eastern Indian",
      West:"Western Indian",
    },
    Pacific: {
      All:"Pacific",
      North:"Northern Pacific",
      South:"Southern Pacific",
      East:"Eastern Pacific",
      West:"Western Pacific",
    },
    Southern: {
      All:"Southern",
      North:"Northern Southern",
      South:"Southern Southern",
      East:"Eastern Southern",
      West:"Western Southern",
    }
  }
};

//https://stylesatlife.com/articles/types-of-fishes/
/** @note All will be in @METRIC */
const fishObject = [
  { name:"Sword Fish", alias: ["Broadbill"], water: WATERS.SALTWATER,
    scienceName: "Xiphias Gladius",
    type:TYPES.Fish,
    description:"",
    rarity:"",set:"",
    /** @note above 40 degrees North and South latitude */
    regions:[REGION.Ocean.Indian.All,REGION.Ocean.Pacific.All,REGION.Ocean.Atlantic.All],
    MIN_WEIGHT:0,MAX_WEIGHT:650,MIN_LENGTH:0,MAX_LENGTH:2.987,MIN_WIDTH:0,MAX_WIDTH:0
  },
  { name:"Carp (Common)", alias: [], water: WATERS.FRESHWATER,
    scienceName: "Cyprinus Carpio",
    //Mostly found in water bodies in Asia and Europe
    type:TYPES.Fish,
    description:"",
    rarity:"",set:"",
    regions:[],
    MIN_WEIGHT:2,MAX_WEIGHT:14,MIN_LENGTH:0,MAX_LENGTH:0,MIN_WIDTH:0,MAX_WIDTH:0
  },
  { name:"Goldfish", alias: [], water: WATERS.FRESHWATER,
    scienceName: "Carassius auratus",
    //Mostly found in water bodies in Asia
    type:TYPES.Fish,
    description:"Has a bit of a crunch to it",
    rarity:"",set:"",
    regions:[],
    MIN_WEIGHT:0,MAX_WEIGHT:0,MIN_LENGTH:0,MAX_LENGTH:0.48,MIN_WIDTH:0,MAX_WIDTH:0
  },
  { name:"Marble Cichlid", alias: ["Velvet Cichlid", "Oscar", "Tiger Oscar"], water: WATERS.FRESHWATER,
    scienceName: "Astronotusoscellatus",
    //Mostly found in South America, Australia, the United States and China
    type:TYPES.Fish,
    description:"",
    rarity:"",set:"",
    regions:[],
    MIN_WEIGHT:0,MAX_WEIGHT:1.4,MIN_LENGTH:0,MAX_LENGTH:0.36,MIN_WIDTH:0,MAX_WIDTH:0
  },
  { name:"Wels Catfish", alias: ["Sheatfish"], water: WATERS.FRESHWATER,
    scienceName: "Silurusglanis",
    type:TYPES.Fish,
    description:"Can hear it go \`huehuehue...\`", /**@note have the catfish with the top hat as the image (sometimes) */
    rarity:"",set:"",
    regions:[],
    MIN_WEIGHT:0,MAX_WEIGHT:400,MIN_LENGTH:0,MAX_LENGTH:4,MIN_WIDTH:0,MAX_WIDTH:0
  },
  { name:"Pike-Perch", alias: ["Zander"], water: WATERS.FRESHWATER,
    scienceName: "Sander lucioperca",
    type:TYPES.Fish,
    description:"Can hear it go <i>huehuehue...</i>", 
    rarity:"",set:"",
    regions:[],
    MIN_WEIGHT:0,MAX_WEIGHT:20,MIN_LENGTH:0,MAX_LENGTH:4,MIN_WIDTH:0,MAX_WIDTH:0
  },
//#region Joke Fish (Half filler, half keep)
  { name:"Brickfish", alias: [], water: WATERS.FRESHWATER,
    scienceName: "Brickus Fishus",
    type:TYPES.Fish,
    description:"", 
    rarity:"",set:"things that don\'t belong here",
    regions:[],
    MIN_WEIGHT:2.27,MAX_WEIGHT:2.27,MIN_LENGTH:8,MAX_LENGTH:8,MIN_WIDTH:4,MAX_WIDTH:4, //2.25in thickness
  },
  { name:"Brickfish", alias: [], water: WATERS.FRESHWATER,
    scienceName: "Brickus Fishus",
    type:TYPES.Fish,
    description:"", 
    rarity:"",set:"things that don\'t belong here",
    regions:[],
    MIN_WEIGHT:2.27,MAX_WEIGHT:2.27,MIN_LENGTH:8,MAX_LENGTH:8,MIN_WIDTH:4,MAX_WIDTH:4, //2.25in thickness
  },
//#endregion Joke Fish
];

// {name:"",type:"",description:"",rarity:"",set:"",regions:[],MIN_WEIGHT:0,MAX_WEIGHT:0,MIN_LENGTH:0,MAX_LENGTH:0,MIN_WIDTH:0,MAX_WIDTH:0},

let fish = [];
let _id = 0;
fishObject.forEach(f => {
  f.id = _id;
  if(!f?.TROPHY_BRONZE) {
    f.TROPHY_BRONZE=75;
    f.TROPHY_SILVER=82.5;
    f.TROPHY_GOLD=87.5;
    f.TROPHY_PLATINUM=92.5;
    f.TROPHY_RUBY=95;
  }
  fish.push(t)
  _id++;
});

module.exports = {fish};