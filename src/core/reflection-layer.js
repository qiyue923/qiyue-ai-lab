class ReflectionLayer {

  evaluate(context){

    const result = {
      type: null,
      content: null,
      importance: 0
    };


    const text = context.text || "";
    const decision = context.decision || null;


    const positiveWords = [
      "算了",
      "不买了",
      "先不买",
      "忍住了",
      "冷静下来"
    ];


    if(
      decision &&
      decision.category === "spending" &&
      positiveWords.some(
        word => text.includes(word)
      )
    ){

      result.type = "growth";

      result.content =
        "用户成功控制了一次冲动购买";

      result.importance = 9;

      return result;
    }


    return null;
  }

}


module.exports = {
  ReflectionLayer
};