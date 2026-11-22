import { test, expect } from '@playwright/test'
test('TC-01: Успішна авторизація', async ({ page }) => {
  // Відкриваємо сторінку
  await page.goto('/')
  // Вводимо логін
  await page.getByTestId('username').fill('standard_user')
  // Вводимо пароль
  await page.getByTestId('password').fill('secret_sauce')
  // Натискаємо Login
  await page.getByTestId('login-button').click()
  // Перевіряємо результат
  await expect(page).toHaveURL(/inventory\.html/)
  await expect(page.getByText('Products', { exact: true })).toBeVisible()
})

test('TC-02: Hегативного сценарію авторизації', async ({ page }) => {
  // Відкриваємо сторінку
  await page.goto('/')
  // Вводимо логін
  await page.getByTestId('username').fill('standard_user')
  // Вводимо пароль
  await page.getByTestId('password').fill('wrong_password')
  // Натискаємо Login
  await page.getByTestId('login-button').click()
  // Перевіряємо результат
  // Перевіряємо видимість повідомлення
  const errorMessage = page.getByTestId('error')
  await expect(errorMessage).toBeVisible()

  // Перевіряємо текст повідомлення
  await expect(errorMessage).toContainText(
    'Username and password do not match any user in this service'
  )
})

test('TC-03: додавання товару до кошика', async ({ page }) => {
  // Відкриваємо сторінку
  await page.goto('/')
  // Вводимо логін
  await page.getByTestId('username').fill('standard_user')
  // Вводимо пароль
  await page.getByTestId('password').fill('secret_sauce')
  // Натискаємо Login
  await page.getByTestId('login-button').click()

  await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click()

  const quantity = page.getByTestId('shopping-cart-badge')
  //   const quantity =  page.locator('.shopping_cart_bage')
  await expect(quantity).toHaveText('1')
  // Відкриваємо кошик
  await page.getByTestId('shopping-cart-link').click()

  // Перевіряємо адресу сторінки кошика
  await expect(page).toHaveURL(/\/cart\.html$/)

  // Перевіряємо, що товар відображається в кошику
  await expect(
    page.getByText('Sauce Labs Bolt T-Shirt', { exact: true })
  ).toBeVisible()
})
