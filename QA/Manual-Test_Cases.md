# PasteApp — Manual Test Cases

**Project:** PasteApp V2  
**Environment:** Production  
**Tester:** Shagun Ojha  
**Browser:** Google Chrome  
**Execution Status:** Not Executed

---

## Module 1: User Registration

### TC-REG-01: Registration with valid details

**Priority:** High  
**Type:** Positive Testing

**Preconditions:**
- Registration page is accessible.
- Email address is not already registered.

**Test Data:**
- Name: QA Test User
- Email: qa.test.unique@example.com (use a fresh test email)
- Password: Valid password accepted by the application.

**Steps:**
1. Open the registration page.
2. Enter a valid name.
3. Enter a unique email address.
4. Enter a valid password.
5. Click Register.

**Expected Result:**
- User account should be created successfully.
- Appropriate success message should appear.
- User should be redirected according to application behavior.

**Actual Result:** Not executed  
**Status:** Not Run

---

### TC-REG-02: Registration with an existing email

**Priority:** High  
**Type:** Negative Testing

**Preconditions:**
- An account already exists with the test email.

**Steps:**
1. Open the registration page.
2. Enter valid registration details.
3. Use an already registered email.
4. Click Register.

**Expected Result:**
- Duplicate account should not be created.
- Appropriate error message should appear.

**Actual Result:** Not executed  
**Status:** Not Run

---

### TC-REG-03: Registration with empty fields

**Priority:** High  
**Type:** Negative Testing

**Steps:**
1. Open the registration page.
2. Leave all fields empty.
3. Click Register.

**Expected Result:**
- Registration should not proceed.
- Required-field validation should appear.

**Actual Result:** Not executed  
**Status:** Not Run

---

### TC-REG-04: Registration with invalid email

**Priority:** Medium  
**Type:** Negative Testing

**Test Data:** `invalid-email`

**Steps:**
1. Open the registration page.
2. Enter a valid name.
3. Enter an invalid email format.
4. Enter a valid password.
5. Click Register.

**Expected Result:**
- Invalid email should be rejected.
- Appropriate validation message should appear.

**Actual Result:** Not executed  
**Status:** Not Run

---

### TC-REG-05: Registration with weak password

**Priority:** Medium  
**Type:** Negative Testing

**Steps:**
1. Open the registration page.
2. Enter a valid name and unique email.
3. Enter a weak password.
4. Click Register.

**Expected Result:**
- Password should follow the application's defined password policy.
- If a password-strength policy exists, invalid passwords should be rejected.

**Actual Result:** Not executed  
**Status:** Not Run

---

### TC-REG-06: Welcome email verification

**Priority:** Medium  
**Type:** Functional Testing

**Preconditions:**
- Registration email functionality is configured.
- A test account can be created.

**Steps:**
1. Register using an email address permitted by the current email provider configuration.
2. Open the corresponding inbox.
3. Check for the PasteApp welcome email.
4. Verify the subject and email content.

**Expected Result:**
- Welcome email should be received by the permitted recipient.
- Email should contain the expected welcome message.

**Actual Result:** Not executed  
**Status:** Not Run

---

## Execution Summary

| Metric            | Count |

| Total test cases  | 6     |
| Passed            | 0     |
| Failed            | 0     |
| Blocked           | 0     |
| Not Run           | 6     |

**Note:** Test results must only be updated after actual execution.
