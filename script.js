// Структура хранения данных 
// { 
//  id: number - айди записи
//  title: string - название 
//  amount: number - сколько было потрачено
//  category: string - название категории траты (обощенное название)
// }
const tracker = {
  expenses: [],
  id: 0,

  add(title, amount, category) {
    if (!title || !amount || !category) {
      console.log("Ошибка: заполните все поля");
      return;
    }
    if (amount <= 0) {
      console.log("Ошибка: сумма должна быть больше 0");
      return;
    }
    
    this.expenses.push({
      id: ++this.id,
      title: title,
      amount: amount,
      category: category
    });
    console.log(`Добавлено: ${title} (${amount} руб.)`);
  },

  print() {
    if (this.expenses.length === 0) {
      console.log("Список пуст");
      return;
    }
    console.log("\nВсе расходы:");
    this.expenses.forEach(e => {
      console.log(`${e.id}. ${e.title} — ${e.amount} руб. [${e.category}]`);
    });
  },

  total() {
    let sum = 0;
    for (let e of this.expenses) {
      sum += e.amount;
    }
    console.log(`\nИтого: ${sum} руб.`);
    return sum;
  },

  byCategory(cat) {
    let found = this.expenses.filter(e => e.category === cat);
    let sum = 0;
    found.forEach(e => sum += e.amount);
    
    console.log(`\nКатегория "${cat}":`);
    found.forEach(e => console.log(`  ${e.title}: ${e.amount} руб.`));
    console.log(`Потрачено: ${sum} руб.`);
    return found;
  },

  find(str) {
    let e = this.expenses.find(e => e.title.includes(str));
    if (e) {
      console.log(`\nНайдено: ${e.title} — ${e.amount} руб.`);
      return e;
    }
    console.log("Не найдено");
    return null;
  },

  remove(id) {
    let i = this.expenses.findIndex(e => e.id === id);
    if (i === -1) {
      console.log("Ошибка: ID не найден");
      return;
    }
    let removed = this.expenses.splice(i, 1)[0];
    console.log(`Удалено: ${removed.title}`);
  },

  stats() {
    let obj = {};
    for (let e of this.expenses) {
      if (!obj[e.category]) obj[e.category] = 0;
      obj[e.category] += e.amount;
    }
    console.log("\nСтатистика:");
    for (let cat in obj) {
      console.log(`${cat}: ${obj[cat]} руб.`);
    }
    return obj;
  }
};

tracker.add("Кофе", 150, "Еда");
tracker.add("Такси", 300, "Транспорт");
tracker.add("Обед", 400, "Еда");
tracker.print();
tracker.total();
tracker.byCategory("Еда");
tracker.find("Кофе");
tracker.stats();
tracker.remove(2);
tracker.print();