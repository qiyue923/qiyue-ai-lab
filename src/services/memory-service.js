const { MemoryStore } = require("../core/memory-store");

class MemoryService {
  constructor() {
    this.store = new MemoryStore();
  }
 
shouldRemember(text){

  if(!text){
    return false;
  }

  const ignoreKeywords = [
    "你记得",
    "你知道",
    "是什么",
    "什么",
    "是不是",
    "怎么"
  ];

  if (ignoreKeywords.some(k => text.includes(k))) {
    return false;
  }

  const keywords = [
    "喜欢",
    "习惯",
    "以后",
    "记住",
    "不要忘",
    "我的"
  ];

const questionWords = [
  "吗",
  "什么",
  "怎么",
  "为什么",
  "记得"
];

if (questionWords.some(k => text.includes(k))) {
  return false;
}

return keywords.some(keyword =>
  text.includes(keyword)
);
}

rememberGrowth(text){

  console.log("🐣 宴的成长系统启动", text);

  if(!text){
    return false;
  }

  console.log("🌱 ENTER GROWTH =", text);

  if(!text){
    return false;
  }

  const growthKeywords = [
    "以后",
    "决定",
    "不会再",
    "不再",
    "学到了",
    "意识到",
    "以后要"
  ];

  const matched = growthKeywords.some(
    k => text.includes(k)
  );

  console.log("🌱 GROWTH MATCH =", matched);

  if(!matched){
    return false;
  }


  console.log("🌱 SAVING GROWTH");

  this.store.add({
    type:"growth",
    content:text,
    importance:9,
    createdAt:new Date().toISOString()
  });


  return true;
}

remember(text) {
  if (!this.shouldRemember(text)) {
    return false;
  }

 const exists = this.store.getAll()
  .some(item => item.content === text);

  if (exists) {
    return false;
  }

const memory = this.extractMemory(text);
console.log("🔥 EXTRACT MEMORY =", memory);

if(memory){

   const old = this.store.getAll().find(
    item =>
        item.type === "preference" &&
        item.category === memory.category &&
        item.value === memory.value
);
console.log("🧠 OLD MEMORY FOUND", old);

if(old){

    old.value = memory.value;
    old.content = memory.content;

    old.importance = Math.min(
        (old.importance || 0) + 1,
        10
    );

    old.count = (old.count || 1) + 1;

    old.lastSeen = new Date().toISOString();

}else{

console.log("🆕 NEW MEMORY CREATE");

    memory.count = 1;
    memory.lastSeen = new Date().toISOString();

    this.store.add(memory);

}

 return true;
}
}

getAll(){
    return this.store.getAll();
}

recall(keyword){

    console.log("🔥🔥🔥 MEMORY SERVICE ACTIVE");

    if(typeof keyword !== "string"){
        keyword = "";
    }

    let searchCategory = null;


    if(keyword.includes("喜欢喝") || keyword.includes("喝什么")){
        searchCategory = "drink";
    }

    if(keyword.includes("喜欢吃") || keyword.includes("吃什么")){
        searchCategory = "food";
    }

    if(keyword.includes("喜欢玩") || keyword.includes("玩什么")){
        searchCategory = "game";
    }


    console.log("keyword=", keyword, "category=", searchCategory);

const memories = this.store.getAll()
.filter(item =>
  item.type === "preference" ||
  item.type === "growth"
);

if(!searchCategory){
    return memories
        .sort((a,b)=>
            (b.importance || 0) - (a.importance || 0)
        )
        .slice(0,3);
}

return memories
    .filter(item => item.category === searchCategory)
.sort((a,b) => 
    (b.importance || 0) - (a.importance || 0)
)
    .slice(0,3);
}

extractMemory(text){

  if(text.includes("喜欢喝")){
    return {
    type:"preference",
    category:"drink",
    value:text.replace(/.*喜欢喝/,"").trim(),
    content:text,
    importance:8
};
  }

  if(text.includes("喜欢吃")){
    return {
      type:"preference",
      category:"food",
      value:text.replace(/.*喜欢吃/,"").trim(),
      content:text,
        importance:8
    };
  }

  if(text.includes("喜欢玩")){
    return {
      type:"preference",
      category:"game",
      value:text.replace(/.*喜欢玩/,"").trim(),
      content:text,
      importance:8
    };
  }

  return null;
}

getAll() {
  return this.store.getAll();
}
   search(keyword) {
    return this.store.search(keyword);
  }
}

module.exports = {
  MemoryService
};