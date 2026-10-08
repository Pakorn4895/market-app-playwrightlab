import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {

  // TC01: ของเดิมที่คุณมี
  test('TC01 Login สำเร็จ', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByText('ยินดีต้อนรับ')).toBeVisible();
  });

  // TC02: ใส่เบอร์ผิด
  test('TC02 Login ใส่เบอร์โทรผิด', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0899999999'); // เบอร์ผิด
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    // แก้ไขข้อความด้านล่างให้ตรงกับระบบจริง
    await expect(page.getByText('ข้อมูลไม่ถูกต้อง')).toBeVisible(); 
  });

  // TC03: ใส่รหัสผ่านผิด
  test('TC03 Login ใส่รหัสผ่านผิด', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('WrongPassword123'); // รหัสผิด
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    // แก้ไขข้อความด้านล่างให้ตรงกับระบบจริง
    await expect(page.getByText('ข้อมูลไม่ถูกต้อง')).toBeVisible();
  });

  // TC04: ไม่กรอกเบอร์โทร
  test('TC04 Login โดยไม่กรอกเบอร์โทรศัพท์', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');
    // ไม่เติม fill ในช่องเบอร์โทร
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByText('กรุณากรอกหมายเลขโทรศัพท์')).toBeVisible();
  });

  // TC05: ไม่กรอกรหัสผ่าน
  test('TC05 Login โดยไม่กรอกรหัสผ่าน', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
    // ไม่เติม fill ในช่องรหัสผ่าน
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByText('กรุณากรอกรหัสผ่าน')).toBeVisible();
  });

  // TC06: เบอร์โทรไม่ครบ
  test('TC06 Login โดยกรอกเบอร์โทรไม่ครบ 10 หลัก', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/');
    await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0801234'); // ไม่ครบ 10 หลัก
    await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByText('รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง')).toBeVisible();
  });

});