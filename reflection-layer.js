class ReflectionLayer {

  evaluate(context) {

    const text = context.text || "";
    const decision = context.decision || {};

    if (
      decision.category === "spending"
      decision.action === "allow_with_notice"
    ) {

      return {
        type: "growth",
        content:
          "用户在购买喜欢的东西时，希望被温和提醒确认需求，而不是被强制阻止。"
      };

    }

    if (text.includes("以后") && text.includes("不再")) {

      return {
        type: "growth",
        content:
          "用户会主动总结自己的行为变化，并希望未来做得更好。"
      };

    }

    return null;

  }

}


module.exports = {
  ReflectionLayer
};