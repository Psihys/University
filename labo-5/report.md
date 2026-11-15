# Лабораторна робота №5

Інтеграційне тестування компонентів та зовнішніх систем

**Виконав:** Bohdan Shevchenko  
**Група:** 6-1213-1  
**Дата:** 15.11.2026

---

## 1. Component Integration Testing

### Test Object

`CartService` ↔ `shop-utils` (`calculateDiscount`)

`CartService.getFinalTotal()` викликає `calculateDiscount()` із `shop-utils.js`, передаючи загальну суму кошика та відсоток знижки. Інтеграційний тест перевіряє, що обидва компоненти разом повертають правильний результат та коректно передають помилки валідації.

---

### Scenario 1 — Discount

**Test Data:**

| Параметр      | Значення |
| ------------- | -------- |
| item 1: price | 100      |
| item 2: price | 200      |
| discount      | 10%      |

**Expected Result:** `270`

**Actual Result:** `270`

**Result:** ✅ Pass

---

### Scenario 2 — Invalid Discount

**Test Data:**

| Параметр    | Значення |
| ----------- | -------- |
| item: price | 100      |
| discount    | 110%     |

**Expected Result:** `Error: Discount must be between 0 and 100`

**Actual Result:** `Error: Discount must be between 0 and 100`

**Result:** ✅ Pass

---

## 2. System Integration Testing

### Test Object

`ExternalEchoGateway` ↔ Postman Echo (`https://postman-echo.com`)

`ExternalEchoGateway.sendOrder()` надсилає HTTP GET-запит до зовнішнього сервісу Postman Echo з параметрами замовлення та повертає об'єкт із даними, які сервіс відлунює назад. Тест виконується проти реального зовнішнього API без моків.

---

### Test Data

| Параметр | Значення  |
| -------- | --------- |
| orderId  | `ORD-001` |
| total    | `270`     |

**Expected Result:**

```json
{
  "orderId": "ORD-001",
  "total": 270
}
```

**Actual Result:**

```json
{
  "orderId": "ORD-001",
  "total": 270
}
```

**Result:** ✅ Pass

---

## Результати тестування

| Тест                                      | Файл                                       | Result           |
| ----------------------------------------- | ------------------------------------------ | ---------------- |
| applies discount to calculated cart total | `cart_discount.integration.test.js`        | ✅ Pass          |
| propagates discount validation error      | `cart_discount.integration.test.js`        | ✅ Pass          |
| sends order data to external system       | `external-echo.system-integration.test.js` | ✅ Pass          |
| **Усього**                                |                                            | **3 / 3 passed** |

---

## Висновки

Під час виконання лабораторної роботи було проведено інтеграційне тестування двох рівнів: компонентне та системне.

Компонентне тестування перевірило взаємодію між `CartService` та функцією `calculateDiscount()` з модуля `shop-utils`. Тести підтвердили, що `getFinalTotal()` правильно обчислює суму кошика зі знижкою та коректно транслює помилку валідації при некоректному відсотку.

Системне тестування перевірило взаємодію `ExternalEchoGateway` із реальним зовнішнім сервісом Postman Echo. Тест підтвердив, що шлюз правильно формує HTTP-запит, обробляє відповідь і повертає структуровані дані у очікуваному форматі.

Усі 3 тести завершилися успішно. Інтеграційне тестування дозволило виявити правильність взаємодії між компонентами системи на рівнях, які не охоплюються модульними тестами.
