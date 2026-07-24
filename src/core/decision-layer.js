class DecisionLayer {

  evaluate(context) {

const result = {
  action: "allow",
  tone: "soft",
  priority: 0,
  category: null,
  intervention: null,
  interventionLevel: 0,
  suggestions: []
};

    const text = context.text || "";
const memories = context.memories || [];

console.log("🧠 DECISION MEMORIES", memories);

const growths = memories.filter(
  m => m.type === "growth"
);

    const likesCoffee = memories.some(
      m => m.content && m.content.includes("咖啡")
    );

const hasSpendingRule = growths.some(m => {
  if (!m.content) {
    return false;
  }

  return (
    m.content.includes("不冲动") ||
    m.content.includes("再也不") ||
    m.content.includes("再不") ||
    m.content.includes("不会再") ||
  m.content.includes("不再") ||
    m.content.includes("戒掉") ||
    m.content.includes("戒买") ||
    m.content.includes("以后不买")
  );
});

    const lateNight = 
      text.includes("晚上") ||
      text.includes("熬夜") ||
      text.includes("写代码");

    const wantsCoffee =
      text.includes("咖啡") ||
      text.includes("喝");

 if (likesCoffee && wantsCoffee && lateNight) {
  result.action = "allow_with_notice";
  result.priority = 3;
  result.category = "health";

  result.suggestions.push(
    "可以喝，但提醒一下今晚睡眠可能受影响"
  );

  result.suggestions.push(
    "如果只是想要仪式感，可以考虑半杯或者低因"
  );
}

const spendingWords = [
 "买",
 "下单",
 "付款",
 "拍",
 "预售",
 "补款",
 "冲",
 "冲了",
 "入",
 "拿下",
 "蹲",
 "购入",
 "氪金"

];

const hobbyWords = [
  "吃谷",
  "开谷",
  "拆谷",
  "谷柜",
  "晒谷",
  "收谷",
  "找谷",
  "抽谷"
];

const wantsSpend = spendingWords.some(
  word => text.includes(word)
);

const hasConfirmedIntent =
  text.includes("考虑好了") ||
  text.includes("想好了") ||
  text.includes("确定要") ||
  text.includes("决定了");

const isHobbySharing = hobbyWords.some(
  word => text.includes(word)
);

if(isHobbySharing && !wantsSpend){

 result.action = "allow";
 result.priority = 1;
 result.category = "hobby";

 result.suggestions.push(
   "看起来是在分享喜欢的谷子，先陪用户聊兴趣"
 );

}
if(hasSpendingRule && wantsSpend){

  if(hasConfirmedIntent){

    result.priority = 3;
    result.intervention = "companion";

    result.suggestions.push(
      "你看起来已经想清楚了，我陪你确认一下细节就好"
    );

  }else{

    result.priority = 8;
    result.intervention = "companion";

    result.suggestions.push(
      "提醒一下，你之前给自己定过减少冲动买谷的计划"
    );

    result.suggestions.push(
      "可以确认一下这次是不是计划内购买"
    );

  }

  result.action = "allow_with_notice";
  result.category = "spending";
  result.interventionLevel = 1;

}


return result;

}
}

module.exports = {
  DecisionLayer
};
