const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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
  id: crypto.randomUUID(),
  type: item.type || "general",
  category: item.category || null,
  value: item.value || null,
  content: item.content || "",
  importance: item.importance || 5,
  count: item.count || 1,
  createdAt: new Date().toISOString(),
  lastSeen: item.lastSeen || new Date().toISOString(),
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