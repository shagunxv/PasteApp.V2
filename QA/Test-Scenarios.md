# PasteApp — Test Scenarios

## 1. User Registration

| ID     | Test Scenario                             |

| REG-01 | Register with valid user details          |
| REG-02 | Register with an already registered email |
| REG-03 | Submit registration with empty fields     |
| REG-04 | Register with an invalid email format     |
| REG-05 | Register with a weak password             |
| REG-06 | Verify welcome email behavior             |

## 2. User Login

| ID     | Test Scenario                             |

| LOG-01 | Login with valid credentials              |
| LOG-02 | Login with incorrect password             |
| LOG-03 | Login with an unregistered email          |
| LOG-04 | Submit login with empty fields            |
| LOG-05 | Verify authentication after page refresh  |

## 3. Paste Management

| ID     | Test Scenario                              |

| PST-01 | Create a paste with valid content          |
| PST-02 | Create a paste with empty content          |
| PST-03 | View an existing paste                     |
| PST-04 | Edit an existing paste                     |
| PST-05 | Delete an existing paste                   |
| PST-06 | Verify deleted paste is inaccessible       |
| PST-07 | Create multiple pastes                     |

## 4. Paste Sharing

| ID     | Test Scenario                              |

| SHR-01 | Generate a unique shareable URL            |
| SHR-02 | Open a shared URL in a new browser tab     |
| SHR-03 | Open an invalid paste URL                  |
| SHR-04 | Verify shared content displayed correctly  |

## 5. Copy Functionality

| ID     | Test Scenario                                  |

| CPY-01 | Copy paste content                             |
| CPY-02 | Verify copied content matches original content |
| CPY-03 | Verify copy feedback message                   |

## 6. Authentication & Authorization

| ID      | Test Scenario |

| AUTH-01 | Access protected routes without login         |
| AUTH-02 | Access protected routes with valid login      |
| AUTH-03 | Verify logout functionality                   |
| AUTH-04 | Verify expired or invalid token behavior      |

## 7. UI & Usability

| ID | Test Scenario |

| UI-01 | Verify application loads successfully            |
| UI-02 | Verify navigation links                          |
| UI-03 | Verify form validation messages                  |
| UI-04 | Verify responsive layout                         |
| UI-05 | Verify error and success notifications           |

---

## Execution Status

**Total Scenarios:** 30

**Status:** Not Executed

**Tester:** Shagun Ojha

**Environment:** Production
