function BuildTree(data, head = null, level = 0) {
    const ul = document.createElement('ul');
    ul.style.paddingLeft = `${level * 20}px`; // Применение отступа на основе уровня вложенности
  
    // Фильтрация и сортировка элементов по показателю sorthead перед выполнением операций над каждым элементом
    data.services
      .filter(service => service.head === head) // Фильтрация элементов по родительскому идентификатору
      .sort((a, b) => a.sorthead - b.sorthead) // Сортировка элементов по показателю sorthead в порядке возрастания
      .forEach(service => { // Выполнение операций над каждым отфильтрованным и отсортированным элементом
        const li = document.createElement('li');
        li.textContent = service.name;
        li.classList.add('tree-item'); // Добавление класса "tree-item" к каждому элементу
        if (service.node === 1) {
          li.appendChild(BuildTree(data, service.id, level + 1)); // Рекурсивный вызов функции для вложенных элементов
        } else {
          const span = document.createElement('span');
          span.textContent = ` - $${service.price}`;
          li.appendChild(span);
        }
        ul.appendChild(li);
      });
    return ul;
}
  
  // Данные из rest api
const data = {
    "services": 
    [
        {
        "id": 1,
        "head": null,
        "name": "Проф.осмотр",
        "node": 0,
        "price": 100.0,
        "sorthead": 20
        },
        {
            "id": 2,
            "head": null,
            "name": "Хирургия",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 3,
            "head": 2,
            "name": "Удаление зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 10
        },
        {
            "id": 4,
            "head": 3,
            "name": "Удаление зуба",
            "node": 0,
            "price": 800.0,
            "sorthead": 10
        },
        {
            "id": 5,
            "head": 3,
            "name": "Удаление 8ого зуба",
            "node": 0,
            "price": 1000.0,
            "sorthead": 30
        },
        {
            "id": 6,
            "head": 3,
            "name": "Удаление осколка зуба",
            "node": 0,
            "price": 2000.0,
            "sorthead": 20
        },
        {
            "id": 7,
            "head": 2,
            "name": "Хирургические вмешательство",
            "node": 0,
            "price": 200.0,
            "sorthead": 10
        },
        {
            "id": 8,
            "head": 2,
            "name": "Имплантация зубов",
            "node": 1,
            "price": 0.0,
            "sorthead": 20
        },
        {
            "id": 9,
            "head": 8,
            "name": "Коронка",
            "node": 0,
            "price": 3000.0,
            "sorthead": 10
        },
        {
            "id": 10,
            "head": 8,
            "name": "Слепок челюсти",
            "node": 0,
            "price": 500.0,
            "sorthead": 20
        }
    ]
};
  
  // Проверка загрузки DOM перед добавлением дерева
  document.addEventListener("DOMContentLoaded", function(event) {
    const container = document.getElementById('tree-container');
    container.appendChild(BuildTree(data));
  });