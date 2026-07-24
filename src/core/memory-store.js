const fs = require("fs");
const path = require("path");

class MemoryStore {
  constructor(root = "./workspace") {
    this.file = path.join(root, "memory.json");
    this.ensure();
  }

  ensure() {
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(
        this.file,
        JSON.stringify([], null, 2)
      );
    }
  }

  load() {
    return JSON.parse(
      fs.readFileSync(this.file, "utf8")
    );
  }

getAll() {
  return this.load();
}

  save(memory) {
    fs.writeFileSync(
      this.file,
      JSON.stringify(memory, null, 2)
    );
  }

add(item) {
  const memories = this.load();

  memories.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    type: item.type || "general",
    importance: item.importance || 5,
    ...item
  });

  this.save(memories);
}

search(keyword) {
  return this.load().filter(item =>
    String(item.content || "")
      .includes(keyword)
  );
}

getByType(type) {
  return this.load().filter(
    item => item.type === type
  );
}
}

module.exports = {
  MemoryStore
};