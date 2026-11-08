# Лабораторна робота №4
## Тестування HTTP API за допомогою Postman

**Виконав:** Bohdan Shevchenko  
**Група:** 6-1213-1  
**Дата:** 08.11.2026

## 1. Мета роботи

Ознайомитися з інструментом Postman для тестування HTTP API, навчитися створювати HTTP-запити різних типів, використовувати змінні колекції та писати автоматизовані перевірки відповідей сервера за допомогою JavaScript і бібліотеки Chai.

## 2. Об'єкт тестування (Test Object)

**Postman Echo**

Base URL: https://postman-echo.com


## 3. Налаштування колекції (Collection)

Створено колекцію з назвою `Lab 4 - API Testing`.

Для зручності роботи додано змінну колекції:

- **Variable:** `baseUrl`
- **Value:** `https://postman-echo.com`

## 4. Виконання тестування

### 4.1. GET with Params

**Тип запиту:** GET

**Endpoint:**
`{{baseUrl}}/get?name=Bohdan&role=student`

Мета тесту — перевірити правильність передавання параметрів URL та отримання відповіді від сервера.

Було реалізовано такі автоматизовані перевірки:

1. `Status code is 200` — перевірка HTTP-статусу відповіді.
2. `Response is JSON` — перевірка формату відповіді JSON через заголовок Content-Type.
3. `Name is Bohdan` — перевірка правильності отриманого параметра name.
4. `Role is student` — перевірка правильності отриманого параметра role.

**Код тестів:**

```javascript
const json = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is JSON", function () {
    const contentType = pm.response.headers.get("Content-Type");
    pm.expect(contentType).to.include("application/json");
});

pm.test("Name is Bohdan", function () {
    pm.expect(json.args.name).to.eql("Bohdan");
});

pm.test("Role is student", function () {
    pm.expect(json.args.role).to.eql("student");
});
```

### 4.2. POST JSON

**Тип запиту:** POST

**Endpoint:**
`{{baseUrl}}/post`

Мета тесту — перевірити передавання JSON-даних на сервер та правильність отриманої відповіді.

У запиті передаються такі дані:

```json
{
    "product": "Backpack",
    "quantity": 2
}
```

Було реалізовано п'ять автоматизованих перевірок:

1. `Status code is 200` — перевірка успішного виконання запиту.
2. `Response contains product` — перевірка наявності властивості product у відповіді.
3. `Product is Backpack` — перевірка відповідності назви продукту значенню Backpack.
4. `Quantity is 2` — перевірка правильності кількості товару.
5. `Quantity is a number` — перевірка того, що quantity має числовий тип даних, а не є рядком.

**Код тестів:**

```javascript
const json = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains product", function () {
    pm.expect(json.data).to.have.property("product");
});

pm.test("Product is Backpack", function () {
    pm.expect(json.data.product).to.eql("Backpack");
});

pm.test("Quantity is 2", function () {
    pm.expect(json.data.quantity).to.eql(2);
});

pm.test("Quantity is a number", function () {
    pm.expect(json.data.quantity).to.be.a("number");
});
```

### 4.3. Negative - 404

**Тип запиту:** GET

**Endpoint:**
`{{baseUrl}}/status/404`

Мета тесту — перевірити обробку негативного сценарію, коли сервер повертає HTTP-статус 404 (Not Found).

Було реалізовано дві автоматизовані перевірки:

1. `Status code is 404` — перевірка HTTP-статусу відповіді.
2. `Response status is 404` — перевірка значення status у JSON-відповіді.

**Код тестів:**

```javascript
const json = pm.response.json();

pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Response status is 404", function () {
    pm.expect(json.status).to.eql(404);
});
```

## 5. Загальні результати тестування

У межах лабораторної роботи було створено три HTTP-запити та реалізовано загалом 11 автоматизованих перевірок.

| Request | Tests | Passed | Failed |
|:---|---:|---:|---:|
| GET with Params | 4 | — | — |
| POST JSON | 5 | — | — |
| Negative - 404 | 2 | — | — |
| **Усього** | **11** | **—** | **—** |

*Примітка: кількість успішних та невдалих тестів заповнюється відповідно до фактичних результатів виконання колекції в Postman.*

## 6. Висновок

Під час виконання лабораторної роботи №4 було ознайомленося з можливостями Postman для тестування HTTP API та створено колекцію запитів `Lab 4 - API Testing`.

Було реалізовано три сценарії тестування: GET-запит із параметрами URL, POST-запит із передаванням JSON-даних та негативний сценарій із відповіддю HTTP 404.

За допомогою JavaScript та бібліотеки Chai було створено автоматизовані перевірки HTTP-статусів, формату відповіді, значень властивостей JSON та типів даних.

Окрему увагу було приділено використанню методу `.to.eql()` для порівняння значень і методу `.to.be.a("number")` для перевірки типу даних.

У результаті роботи було отримано практичні навички створення, налаштування та автоматизованого тестування HTTP API за допомогою Postman.