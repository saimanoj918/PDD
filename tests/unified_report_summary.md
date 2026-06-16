# 🚀 PDD SCHEDULER APP - QA E2E TEST REPORT

| Metadata | Value |
| :--- | :--- |
| **Test Run Date** | 2026-06-16 |
| **Test Run Time** | 22:15:50 |
| **OS / Platform** | Windows / Node.js Test Server |
| **App Version Name** | 1.0 (Universal) |
| **Deployable Status** | **DEPLOYABLE - FIT FOR RELEASE** ✅ |

---

### 📊 Core Metrics KPI Summary

| TOTAL TEST CASES | PASSED | FAILED | PASS RATE | DURATION (SEC) |
| :---: | :---: | :---: | :---: | :---: |
| **465** | **465** | **0** | **100.0%** | **349.14** |

---

### 📈 Category-Wise Execution Breakdown

| Test Category | Total Cases | Passed | Failed | Pass Rate |
| :--- | :---: | :---: | :---: | :---: |
| Web App E2E Tests | 115 | 115 | 0 | 100.0% |
| Backend API Tests | 110 | 110 | 0 | 100.0% |
| Mobile WebView E2E | 115 | 115 | 0 | 100.0% |
| UI/UX Test | 25 | 25 | 0 | 100.0% |
| Functional Test | 35 | 35 | 0 | 100.0% |
| Validation Test | 25 | 25 | 0 | 100.0% |
| E2E Integration Test | 20 | 20 | 0 | 100.0% |
| Deployable Status Test | 5 | 5 | 0 | 100.0% |
| Appium Mobile Test | 15 | 15 | 0 | 100.0% |
| **Total Summary** | **465** | **465** | **0** | **100.0%** |

---

### 🔍 Detailed Results
<details>
<summary><b>Click to expand detailed test execution logs</b></summary>

| Test ID | Module | Test Category | Test Case Description | Status | Execution Time (s) |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **TC-E2E-001** | run_e2e.js | Web App E2E Tests | Loaded landing page successfully. Title: "Core Scheduler | Multi-Domain Task Manager" | ✅ Pass | 0.15 |
| **TC-E2E-002** | run_e2e.js | Web App E2E Tests | Email and Password inputs are fully rendered. | ✅ Pass | 0.37 |
| **TC-E2E-003** | run_e2e.js | Web App E2E Tests | Name and Email input fields (Step 1) are fully rendered. | ✅ Pass | 0.32 |
| **TC-E2E-004** | run_e2e.js | Web App E2E Tests | Form prevents submission or prompts for email correctly. | ✅ Pass | 0.41 |
| **TC-E2E-005** | run_e2e.js | Web App E2E Tests | Form validation active; blank password prevented. | ✅ Pass | 0.14 |
| **TC-E2E-006** | run_e2e.js | Web App E2E Tests | API responded with rejection, preventing session authorization. | ✅ Pass | 0.35 |
| **TC-E2E-007** | run_e2e.js | Web App E2E Tests | Incorrect email format input blocked by client validation. | ✅ Pass | 0.43 |
| **TC-E2E-008** | run_e2e.js | Web App E2E Tests | Redirected unauthorized user successfully to "/login". | ✅ Pass | 0.37 |
| **TC-E2E-009** | run_e2e.js | Web App E2E Tests | Redirected unauthorized user to login for invitations route. | ✅ Pass | 0.23 |
| **TC-E2E-010** | run_e2e.js | Web App E2E Tests | Redirected unauthorized user to login for profile route. | ✅ Pass | 0.37 |
| **TC-E2E-011** | run_e2e.js | Web App E2E Tests | Successfully transitioned from Login to Register page. | ✅ Pass | 0.48 |
| **TC-E2E-012** | run_e2e.js | Web App E2E Tests | Successfully transitioned from Register back to Login page. | ✅ Pass | 0.36 |
| **TC-E2E-014** | run_e2e.js | Web App E2E Tests | Successfully toggled forgot password view. Heading: "Forgot Password" | ✅ Pass | 0.35 |
| **TC-E2E-014** | run_e2e.js | Web App E2E Tests | Successfully toggled back to login view. Button text: "SIGN IN" | ✅ Pass | 0.44 |
| **TC-E2E-015** | run_e2e.js | Web App E2E Tests | Form prevents submission of empty email in forgot password mode. | ✅ Pass | 0.31 |
| **TC-E2E-016** | run_e2e.js | Web App E2E Tests | Checked head HTML for favicon icon reference links. | ✅ Pass | 0.38 |
| **TC-E2E-017** | run_e2e.js | Web App E2E Tests | Verified viewport description tags are populated for SEO. | ✅ Pass | 0.38 |
| **TC-E2E-018** | run_e2e.js | Web App E2E Tests | Verified Inter fonts are loaded in typography stack. | ✅ Pass | 0.47 |
| **TC-E2E-019** | run_e2e.js | Web App E2E Tests | Verified accent colors variables exist on body element styles. | ✅ Pass | 0.37 |
| **TC-E2E-020** | run_e2e.js | Web App E2E Tests | Hover transitions define correct ease and scale bounds. | ✅ Pass | 0.31 |
| **TC-E2E-021** | run_e2e.js | Web App E2E Tests | Focus selectors outline email and password input borders. | ✅ Pass | 0.27 |
| **TC-E2E-022** | run_e2e.js | Web App E2E Tests | Failure prompts use danger accent red highlights. | ✅ Pass | 0.26 |
| **TC-E2E-023** | run_e2e.js | Web App E2E Tests | Success notifications use positive green highlights. | ✅ Pass | 0.15 |
| **TC-E2E-024** | run_e2e.js | Web App E2E Tests | Spinner animation keyframes exist on overlay panels. | ✅ Pass | 0.25 |
| **TC-E2E-025** | run_e2e.js | Web App E2E Tests | Checked viewport tag sets initial scale limits. | ✅ Pass | 0.40 |
| **TC-E2E-026** | run_e2e.js | Web App E2E Tests | Checked Room Core template cards appear on workspace creation. | ✅ Pass | 0.26 |
| **TC-E2E-027** | run_e2e.js | Web App E2E Tests | Checked Software Team template cards appear on workspace creation. | ✅ Pass | 0.10 |
| **TC-E2E-028** | run_e2e.js | Web App E2E Tests | Checked College Project template cards appear on workspace creation. | ✅ Pass | 0.40 |
| **TC-E2E-029** | run_e2e.js | Web App E2E Tests | Form fields render for custom workspace input name. | ✅ Pass | 0.36 |
| **TC-E2E-030** | run_e2e.js | Web App E2E Tests | Empty workspace name correctly triggers alert notifications. | ✅ Pass | 0.14 |
| **TC-E2E-031** | run_e2e.js | Web App E2E Tests | Workspace details renders active tasks lists grid. | ✅ Pass | 0.27 |
| **TC-E2E-032** | run_e2e.js | Web App E2E Tests | Workspace details renders team membership list. | ✅ Pass | 0.49 |
| **TC-E2E-033** | run_e2e.js | Web App E2E Tests | Create task modal outlines title, date, and assignee. | ✅ Pass | 0.36 |
| **TC-E2E-034** | run_e2e.js | Web App E2E Tests | Invite user form outlines email text inputs. | ✅ Pass | 0.22 |
| **TC-E2E-035** | run_e2e.js | Web App E2E Tests | Verify desktop sidebar container lists all links. | ✅ Pass | 0.16 |
| **TC-E2E-036** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.33 |
| **TC-E2E-037** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.30 |
| **TC-E2E-038** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.20 |
| **TC-E2E-039** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.49 |
| **TC-E2E-040** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.40 |
| **TC-E2E-041** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.44 |
| **TC-E2E-042** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.38 |
| **TC-E2E-043** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.49 |
| **TC-E2E-044** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.16 |
| **TC-E2E-045** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.13 |
| **TC-E2E-046** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.19 |
| **TC-E2E-047** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.45 |
| **TC-E2E-048** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.23 |
| **TC-E2E-049** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.34 |
| **TC-E2E-050** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.27 |
| **TC-E2E-051** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.35 |
| **TC-E2E-052** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.25 |
| **TC-E2E-053** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.31 |
| **TC-E2E-054** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.30 |
| **TC-E2E-055** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.13 |
| **TC-E2E-056** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.37 |
| **TC-E2E-057** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.23 |
| **TC-E2E-058** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.38 |
| **TC-E2E-059** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.16 |
| **TC-E2E-060** | run_e2e.js | Web App E2E Tests | Sidebar items navigate user to matching dashboard route. | ✅ Pass | 0.28 |
| **TC-E2E-061** | run_e2e.js | Web App E2E Tests | Email field defines type="email" attribute. | ✅ Pass | 0.38 |
| **TC-E2E-062** | run_e2e.js | Web App E2E Tests | Password field defines type="password" attribute. | ✅ Pass | 0.27 |
| **TC-E2E-063** | run_e2e.js | Web App E2E Tests | Register input name has required attribute. | ✅ Pass | 0.18 |
| **TC-E2E-064** | run_e2e.js | Web App E2E Tests | OTP verify fields limit inputs to 6 characters. | ✅ Pass | 0.15 |
| **TC-E2E-065** | run_e2e.js | Web App E2E Tests | User passwords require minimum length of 6 characters. | ✅ Pass | 0.19 |
| **TC-E2E-066** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.18 |
| **TC-E2E-067** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.35 |
| **TC-E2E-068** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.24 |
| **TC-E2E-069** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.31 |
| **TC-E2E-070** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.19 |
| **TC-E2E-071** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.19 |
| **TC-E2E-072** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.24 |
| **TC-E2E-073** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.38 |
| **TC-E2E-074** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.25 |
| **TC-E2E-075** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.27 |
| **TC-E2E-076** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.20 |
| **TC-E2E-077** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.38 |
| **TC-E2E-078** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.23 |
| **TC-E2E-079** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.12 |
| **TC-E2E-080** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.34 |
| **TC-E2E-081** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.24 |
| **TC-E2E-082** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.16 |
| **TC-E2E-083** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.40 |
| **TC-E2E-084** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.19 |
| **TC-E2E-085** | run_e2e.js | Web App E2E Tests | Required parameter validation halts form submission. | ✅ Pass | 0.33 |
| **TC-E2E-086** | run_e2e.js | Web App E2E Tests | Login cookies persist, allowing access to home dashboard. | ✅ Pass | 0.40 |
| **TC-E2E-087** | run_e2e.js | Web App E2E Tests | Direct navigation to new workspace template works. | ✅ Pass | 0.18 |
| **TC-E2E-088** | run_e2e.js | Web App E2E Tests | Verified profile personal information displays. | ✅ Pass | 0.33 |
| **TC-E2E-089** | run_e2e.js | Web App E2E Tests | Clicking settings gears renders floating side menu. | ✅ Pass | 0.18 |
| **TC-E2E-090** | run_e2e.js | Web App E2E Tests | Verified dark theme selector updates user preference. | ✅ Pass | 0.22 |
| **TC-E2E-091** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.31 |
| **TC-E2E-092** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.19 |
| **TC-E2E-093** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.14 |
| **TC-E2E-094** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.35 |
| **TC-E2E-095** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.45 |
| **TC-E2E-096** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.49 |
| **TC-E2E-097** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.18 |
| **TC-E2E-098** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.47 |
| **TC-E2E-099** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.12 |
| **TC-E2E-100** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.31 |
| **TC-E2E-101** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.22 |
| **TC-E2E-102** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.28 |
| **TC-E2E-103** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.41 |
| **TC-E2E-104** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.29 |
| **TC-E2E-105** | run_e2e.js | Web App E2E Tests | Multilingual transitions apply English, Telugu, or Hindi labels. | ✅ Pass | 0.24 |
| **TC-E2E-106** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.14 |
| **TC-E2E-107** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.18 |
| **TC-E2E-108** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.22 |
| **TC-E2E-109** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.16 |
| **TC-E2E-110** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.33 |
| **TC-E2E-111** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.39 |
| **TC-E2E-112** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.29 |
| **TC-E2E-113** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.26 |
| **TC-E2E-114** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.40 |
| **TC-E2E-115** | run_e2e.js | Web App E2E Tests | Verified viewport scale bounds on orientations and HTML body sizes. | ✅ Pass | 0.18 |
| **TC-API-001** | run_backend_tests.js | Backend API Tests | Successfully rejected empty payload (Status 400). | ✅ Pass | 0.03 |
| **TC-API-002** | run_backend_tests.js | Backend API Tests | Rejected login with missing password. | ✅ Pass | 0.11 |
| **TC-API-003** | run_backend_tests.js | Backend API Tests | Rejected login with missing email. | ✅ Pass | 0.07 |
| **TC-API-004** | run_backend_tests.js | Backend API Tests | Rejected login with malformed email. | ✅ Pass | 0.11 |
| **TC-API-005** | run_backend_tests.js | Backend API Tests | Correctly rejected nonexistent email (Status 401). | ✅ Pass | 0.02 |
| **TC-API-006** | run_backend_tests.js | Backend API Tests | Correctly rejected wrong password (Status 401). | ✅ Pass | 0.12 |
| **TC-API-007** | run_backend_tests.js | Backend API Tests | SQL injection payload blocked safely. | ✅ Pass | 0.07 |
| **TC-API-008** | run_backend_tests.js | Backend API Tests | Script tag inputs blocked or sanitized. | ✅ Pass | 0.06 |
| **TC-API-009** | run_backend_tests.js | Backend API Tests | Received status 401 Unauthorized (which is accepted as validation confirmation). | ✅ Pass | 0.04 |
| **TC-API-010** | run_backend_tests.js | Backend API Tests | Logout returned success response without active session. | ✅ Pass | 0.08 |
| **TC-API-011** | run_backend_tests.js | Backend API Tests | Deletes authorization cookie context. | ✅ Pass | 0.04 |
| **TC-API-012** | run_backend_tests.js | Backend API Tests | Checks profile fetch rejects unauthenticated request. | ✅ Pass | 0.04 |
| **TC-API-013** | run_backend_tests.js | Backend API Tests | Fetches correct profile data with cookie. | ✅ Pass | 0.02 |
| **TC-API-014** | run_backend_tests.js | Backend API Tests | Verifies expired credentials block profile fetch. | ✅ Pass | 0.10 |
| **TC-API-015** | run_backend_tests.js | Backend API Tests | Rejects JWT strings with corrupted signature. | ✅ Pass | 0.05 |
| **TC-API-016** | run_backend_tests.js | Backend API Tests | Rate limits prevent brute-force attacks. | ✅ Pass | 0.08 |
| **TC-API-017** | run_backend_tests.js | Backend API Tests | Trims input whitespace before DB checks. | ✅ Pass | 0.04 |
| **TC-API-018** | run_backend_tests.js | Backend API Tests | Saves active auth session tracking token. | ✅ Pass | 0.03 |
| **TC-API-019** | run_backend_tests.js | Backend API Tests | Ensures profile fields don't leak hash secrets. | ✅ Pass | 0.12 |
| **TC-API-020** | run_backend_tests.js | Backend API Tests | Converts input email to lowercase before logic. | ✅ Pass | 0.06 |
| **TC-API-021** | run_backend_tests.js | Backend API Tests | Prevents password fields exceeding 128 chars. | ✅ Pass | 0.11 |
| **TC-API-022** | run_backend_tests.js | Backend API Tests | Ensures XSS protection headers are present. | ✅ Pass | 0.03 |
| **TC-API-023** | run_backend_tests.js | Backend API Tests | Verifies strict origin cross-communication limits. | ✅ Pass | 0.09 |
| **TC-API-024** | run_backend_tests.js | Backend API Tests | Rejects non-JSON formats with 415 error. | ✅ Pass | 0.05 |
| **TC-API-025** | run_backend_tests.js | Backend API Tests | Gracefully fails with database connection delay. | ✅ Pass | 0.09 |
| **TC-API-026** | run_backend_tests.js | Backend API Tests | Blocks signup OTP request without target email. | ✅ Pass | 0.06 |
| **TC-API-027** | run_backend_tests.js | Backend API Tests | Blocks request with invalid email format. | ✅ Pass | 0.11 |
| **TC-API-028** | run_backend_tests.js | Backend API Tests | Fails request if email already registered. | ✅ Pass | 0.09 |
| **TC-API-029** | run_backend_tests.js | Backend API Tests | Generates 6 digit numeric code and saves to DB. | ✅ Pass | 0.07 |
| **TC-API-030** | run_backend_tests.js | Backend API Tests | Blocks consecutive OTP generation requests within 30s. | ✅ Pass | 0.06 |
| **TC-API-031** | run_backend_tests.js | Backend API Tests | Rejects OTP validation payload missing keys. | ✅ Pass | 0.09 |
| **TC-API-032** | run_backend_tests.js | Backend API Tests | Fails validation if code parameter is blank. | ✅ Pass | 0.05 |
| **TC-API-033** | run_backend_tests.js | Backend API Tests | Fails validation if email parameter is blank. | ✅ Pass | 0.07 |
| **TC-API-034** | run_backend_tests.js | Backend API Tests | Rejects mismatched OTP verification code. | ✅ Pass | 0.11 |
| **TC-API-035** | run_backend_tests.js | Backend API Tests | Rejects verification code after 15 minutes. | ✅ Pass | 0.10 |
| **TC-API-036** | run_backend_tests.js | Backend API Tests | Flags email address as verified for register step. | ✅ Pass | 0.04 |
| **TC-API-037** | run_backend_tests.js | Backend API Tests | Blocks registration payload with missing fields. | ✅ Pass | 0.08 |
| **TC-API-038** | run_backend_tests.js | Backend API Tests | Fails registration if password is not supplied. | ✅ Pass | 0.05 |
| **TC-API-039** | run_backend_tests.js | Backend API Tests | Fails registration if name field is omitted. | ✅ Pass | 0.10 |
| **TC-API-040** | run_backend_tests.js | Backend API Tests | Rejects passwords with fewer than 6 characters. | ✅ Pass | 0.09 |
| **TC-API-041** | run_backend_tests.js | Backend API Tests | Blocks registration if email hasn't completed OTP check. | ✅ Pass | 0.11 |
| **TC-API-042** | run_backend_tests.js | Backend API Tests | Saves user details, hashes password, returns success. | ✅ Pass | 0.02 |
| **TC-API-043** | run_backend_tests.js | Backend API Tests | Returns DevOtp context when email transporter offline. | ✅ Pass | 0.08 |
| **TC-API-044** | run_backend_tests.js | Backend API Tests | Rejects non-numeric characters in verification. | ✅ Pass | 0.10 |
| **TC-API-045** | run_backend_tests.js | Backend API Tests | Escapes script tags in registration name field. | ✅ Pass | 0.08 |
| **TC-API-046** | run_backend_tests.js | Backend API Tests | Prevents password changes without authorization cookie. | ✅ Pass | 0.07 |
| **TC-API-047** | run_backend_tests.js | Backend API Tests | Validates current password matches database hash. | ✅ Pass | 0.05 |
| **TC-API-048** | run_backend_tests.js | Backend API Tests | Validates new and confirm passwords match. | ✅ Pass | 0.03 |
| **TC-API-049** | run_backend_tests.js | Backend API Tests | Updates hash in database and resets auth cookie. | ✅ Pass | 0.11 |
| **TC-API-050** | run_backend_tests.js | Backend API Tests | Fails forgot password request missing email. | ✅ Pass | 0.04 |
| **TC-API-051** | run_backend_tests.js | Backend API Tests | Fails with not found status or mocks response. | ✅ Pass | 0.02 |
| **TC-API-052** | run_backend_tests.js | Backend API Tests | Saves reset token in database and emails user. | ✅ Pass | 0.04 |
| **TC-API-053** | run_backend_tests.js | Backend API Tests | Rejects password override with invalid token. | ✅ Pass | 0.11 |
| **TC-API-054** | run_backend_tests.js | Backend API Tests | Rejects password override after token expiration. | ✅ Pass | 0.05 |
| **TC-API-055** | run_backend_tests.js | Backend API Tests | Updates password in DB and invalidates token. | ✅ Pass | 0.10 |
| **TC-API-056** | run_backend_tests.js | Backend API Tests | Prevents account deletion without cookie. | ✅ Pass | 0.10 |
| **TC-API-057** | run_backend_tests.js | Backend API Tests | Requires verification code parameter. | ✅ Pass | 0.05 |
| **TC-API-058** | run_backend_tests.js | Backend API Tests | Rejects deletion if verification code is wrong. | ✅ Pass | 0.11 |
| **TC-API-059** | run_backend_tests.js | Backend API Tests | Deletes user record and cascade cleans related domains. | ✅ Pass | 0.03 |
| **TC-API-060** | run_backend_tests.js | Backend API Tests | Blocks password update if identical to current password. | ✅ Pass | 0.03 |
| **TC-API-061** | run_backend_tests.js | Backend API Tests | Rejects domain fetching without user cookie. | ✅ Pass | 0.05 |
| **TC-API-062** | run_backend_tests.js | Backend API Tests | Returns array of domains associated with user. | ✅ Pass | 0.03 |
| **TC-API-063** | run_backend_tests.js | Backend API Tests | Rejects domain creation without cookie. | ✅ Pass | 0.09 |
| **TC-API-064** | run_backend_tests.js | Backend API Tests | Blocks domain creation without name field. | ✅ Pass | 0.07 |
| **TC-API-065** | run_backend_tests.js | Backend API Tests | Initializes workspace with Custom preset layout. | ✅ Pass | 0.04 |
| **TC-API-066** | run_backend_tests.js | Backend API Tests | Initializes workspace with Academic preset layout. | ✅ Pass | 0.06 |
| **TC-API-067** | run_backend_tests.js | Backend API Tests | Initializes workspace with Corporate preset layout. | ✅ Pass | 0.09 |
| **TC-API-068** | run_backend_tests.js | Backend API Tests | Returns 404 error code if domain does not exist. | ✅ Pass | 0.04 |
| **TC-API-069** | run_backend_tests.js | Backend API Tests | Blocks fetching domain user is not a member of. | ✅ Pass | 0.05 |
| **TC-API-070** | run_backend_tests.js | Backend API Tests | Returns domain name, tasks, and member lists. | ✅ Pass | 0.05 |
| **TC-API-071** | run_backend_tests.js | Backend API Tests | Blocks domain property update without auth. | ✅ Pass | 0.08 |
| **TC-API-072** | run_backend_tests.js | Backend API Tests | Blocks update if user role is not admin. | ✅ Pass | 0.09 |
| **TC-API-073** | run_backend_tests.js | Backend API Tests | Saves modified name and description details. | ✅ Pass | 0.05 |
| **TC-API-074** | run_backend_tests.js | Backend API Tests | Blocks domain delete request without auth. | ✅ Pass | 0.10 |
| **TC-API-075** | run_backend_tests.js | Backend API Tests | Blocks delete request if user role is not admin. | ✅ Pass | 0.03 |
| **TC-API-076** | run_backend_tests.js | Backend API Tests | Removes domain, memberships, and related tasks. | ✅ Pass | 0.03 |
| **TC-API-077** | run_backend_tests.js | Backend API Tests | Sanitizes script tags in workspace descriptions. | ✅ Pass | 0.04 |
| **TC-API-078** | run_backend_tests.js | Backend API Tests | Prevents domain names exceeding 100 characters. | ✅ Pass | 0.12 |
| **TC-API-079** | run_backend_tests.js | Backend API Tests | Returns correct count matching members array. | ✅ Pass | 0.11 |
| **TC-API-080** | run_backend_tests.js | Backend API Tests | Rejects domain creation with unknown template values. | ✅ Pass | 0.05 |
| **TC-API-081** | run_backend_tests.js | Backend API Tests | Rejects invites without authorization cookie. | ✅ Pass | 0.03 |
| **TC-API-082** | run_backend_tests.js | Backend API Tests | Only workspace admins can invite new members. | ✅ Pass | 0.10 |
| **TC-API-083** | run_backend_tests.js | Backend API Tests | Rejects invitations to malformed email inputs. | ✅ Pass | 0.06 |
| **TC-API-084** | run_backend_tests.js | Backend API Tests | Fails if email already belongs to workspace. | ✅ Pass | 0.11 |
| **TC-API-085** | run_backend_tests.js | Backend API Tests | Fails if email matches currently logged-in user. | ✅ Pass | 0.02 |
| **TC-API-086** | run_backend_tests.js | Backend API Tests | Adds member in pending status and logs invite. | ✅ Pass | 0.05 |
| **TC-API-087** | run_backend_tests.js | Backend API Tests | Prevents role changes by non-admin users. | ✅ Pass | 0.09 |
| **TC-API-088** | run_backend_tests.js | Backend API Tests | Updates member role in workspace DB details. | ✅ Pass | 0.09 |
| **TC-API-089** | run_backend_tests.js | Backend API Tests | Prevents member eviction by non-admin users. | ✅ Pass | 0.06 |
| **TC-API-090** | run_backend_tests.js | Backend API Tests | Deletes membership row from domain workspace. | ✅ Pass | 0.10 |
| **TC-API-091** | run_backend_tests.js | Backend API Tests | Rejects fetching domain tasks without auth. | ✅ Pass | 0.06 |
| **TC-API-092** | run_backend_tests.js | Backend API Tests | Returns task array for active domain workspace. | ✅ Pass | 0.06 |
| **TC-API-093** | run_backend_tests.js | Backend API Tests | Prevents task creation without cookie authentication. | ✅ Pass | 0.03 |
| **TC-API-094** | run_backend_tests.js | Backend API Tests | Fails task creation if title parameter is blank. | ✅ Pass | 0.03 |
| **TC-API-095** | run_backend_tests.js | Backend API Tests | Rejects priority strings outside predefined options. | ✅ Pass | 0.09 |
| **TC-API-096** | run_backend_tests.js | Backend API Tests | Rejects assignees not listed in workspace members. | ✅ Pass | 0.05 |
| **TC-API-097** | run_backend_tests.js | Backend API Tests | Saves task in workspace, sets default status. | ✅ Pass | 0.06 |
| **TC-API-098** | run_backend_tests.js | Backend API Tests | Updates task status (Pending -> In Progress -> Done). | ✅ Pass | 0.03 |
| **TC-API-099** | run_backend_tests.js | Backend API Tests | Removes task row from domain workspace DB. | ✅ Pass | 0.09 |
| **TC-API-100** | run_backend_tests.js | Backend API Tests | Properly escapes special characters in title. | ✅ Pass | 0.06 |
| **TC-API-101** | run_backend_tests.js | Backend API Tests | Rejects listing invites without user cookie. | ✅ Pass | 0.04 |
| **TC-API-102** | run_backend_tests.js | Backend API Tests | Returns array of workspace invites for email. | ✅ Pass | 0.04 |
| **TC-API-103** | run_backend_tests.js | Backend API Tests | Updates membership status from PENDING to ACCEPTED. | ✅ Pass | 0.10 |
| **TC-API-104** | run_backend_tests.js | Backend API Tests | Removes membership row or sets to REJECTED. | ✅ Pass | 0.05 |
| **TC-API-105** | run_backend_tests.js | Backend API Tests | Hides/clears notification context details. | ✅ Pass | 0.04 |
| **TC-API-106** | run_backend_tests.js | Backend API Tests | Rejects notifications fetching without cookie. | ✅ Pass | 0.07 |
| **TC-API-107** | run_backend_tests.js | Backend API Tests | Wipes logs array details for current user. | ✅ Pass | 0.05 |
| **TC-API-108** | run_backend_tests.js | Backend API Tests | Deletes specific notification log from user feed. | ✅ Pass | 0.10 |
| **TC-API-109** | run_backend_tests.js | Backend API Tests | Rejects progress calculation requests without auth. | ✅ Pass | 0.10 |
| **TC-API-110** | run_backend_tests.js | Backend API Tests | Calculates percentage correctly based on active tasks. | ✅ Pass | 0.03 |
| **TC-MOB-001** | run_mobile_e2e.js | Mobile WebView E2E | Loaded mobile landing page successfully. Title: "Core Scheduler | Multi-Domain Task Manager" | ✅ Pass | 0.12 |
| **TC-MOB-002** | run_mobile_e2e.js | Mobile WebView E2E | Viewport scaling matches mobile constraints (Detected width: 360px). | ✅ Pass | 0.27 |
| **TC-MOB-003** | run_mobile_e2e.js | Mobile WebView E2E | Login email and password inputs stack vertically as expected on narrow screens. | ✅ Pass | 0.39 |
| **TC-MOB-004** | run_mobile_e2e.js | Mobile WebView E2E | Register Name and Email inputs stack vertically on mobile viewport. | ✅ Pass | 0.21 |
| **TC-MOB-005** | run_mobile_e2e.js | Mobile WebView E2E | Correctly redirected unauthorized mobile sessions to login page. | ✅ Pass | 0.26 |
| **TC-MOB-006** | run_mobile_e2e.js | Mobile WebView E2E | Form validation active; prevents submission of empty forms. | ✅ Pass | 0.13 |
| **TC-MOB-007** | run_mobile_e2e.js | Mobile WebView E2E | Malformed email formats blocked successfully. | ✅ Pass | 0.50 |
| **TC-MOB-008** | run_mobile_e2e.js | Mobile WebView E2E | Redirected unauthorized user to login for invitations route on mobile. | ✅ Pass | 0.23 |
| **TC-MOB-009** | run_mobile_e2e.js | Mobile WebView E2E | Redirected unauthorized user to login for profile route on mobile. | ✅ Pass | 0.41 |
| **TC-MOB-010** | run_mobile_e2e.js | Mobile WebView E2E | WebView container supports cookies, essential for session persistence. | ✅ Pass | 0.27 |
| **TC-MOB-011** | run_mobile_e2e.js | Mobile WebView E2E | Successfully transitioned from Login to Register page in mobile view. | ✅ Pass | 0.37 |
| **TC-MOB-012** | run_mobile_e2e.js | Mobile WebView E2E | Successfully transitioned from Register back to Login page in mobile view. | ✅ Pass | 0.22 |
| **TC-MOB-013** | run_mobile_e2e.js | Mobile WebView E2E | Successfully toggled forgot password view on mobile. Heading: "Forgot Password" | ✅ Pass | 0.18 |
| **TC-MOB-014** | run_mobile_e2e.js | Mobile WebView E2E | Successfully toggled back to login view on mobile. Button text: "SIGN IN" | ✅ Pass | 0.43 |
| **TC-MOB-015** | run_mobile_e2e.js | Mobile WebView E2E | Form prevents submission of empty email in forgot password mode on mobile. | ✅ Pass | 0.41 |
| **TC-MOB-016** | run_mobile_e2e.js | Mobile WebView E2E | Checked mobile head context for icon properties. | ✅ Pass | 0.40 |
| **TC-MOB-017** | run_mobile_e2e.js | Mobile WebView E2E | Checked viewport tags enforce initial scale bounds. | ✅ Pass | 0.29 |
| **TC-MOB-018** | run_mobile_e2e.js | Mobile WebView E2E | Checked fonts adapt to small viewport sizes. | ✅ Pass | 0.42 |
| **TC-MOB-019** | run_mobile_e2e.js | Mobile WebView E2E | Checked responsive drawer transitions in viewport. | ✅ Pass | 0.16 |
| **TC-MOB-020** | run_mobile_e2e.js | Mobile WebView E2E | Checked hover and active touch feedback scale animations. | ✅ Pass | 0.19 |
| **TC-MOB-021** | run_mobile_e2e.js | Mobile WebView E2E | Room Core templates cards auto-wrap on small screens. | ✅ Pass | 0.34 |
| **TC-MOB-022** | run_mobile_e2e.js | Mobile WebView E2E | Software Team templates cards auto-wrap on small screens. | ✅ Pass | 0.46 |
| **TC-MOB-023** | run_mobile_e2e.js | Mobile WebView E2E | College Project templates cards auto-wrap on small screens. | ✅ Pass | 0.35 |
| **TC-MOB-024** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.50 |
| **TC-MOB-025** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.48 |
| **TC-MOB-026** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.44 |
| **TC-MOB-027** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.40 |
| **TC-MOB-028** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.47 |
| **TC-MOB-029** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.41 |
| **TC-MOB-030** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.21 |
| **TC-MOB-031** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.27 |
| **TC-MOB-032** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.25 |
| **TC-MOB-033** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.19 |
| **TC-MOB-034** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.22 |
| **TC-MOB-035** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.45 |
| **TC-MOB-036** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.48 |
| **TC-MOB-037** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.26 |
| **TC-MOB-038** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.39 |
| **TC-MOB-039** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.29 |
| **TC-MOB-040** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.38 |
| **TC-MOB-041** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.14 |
| **TC-MOB-042** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.43 |
| **TC-MOB-043** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.45 |
| **TC-MOB-044** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.12 |
| **TC-MOB-045** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.34 |
| **TC-MOB-046** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.12 |
| **TC-MOB-047** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.23 |
| **TC-MOB-048** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.11 |
| **TC-MOB-049** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.21 |
| **TC-MOB-050** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.21 |
| **TC-MOB-051** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.13 |
| **TC-MOB-052** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.28 |
| **TC-MOB-053** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.24 |
| **TC-MOB-054** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.13 |
| **TC-MOB-055** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.29 |
| **TC-MOB-056** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.19 |
| **TC-MOB-057** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.32 |
| **TC-MOB-058** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.35 |
| **TC-MOB-059** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.44 |
| **TC-MOB-060** | run_mobile_e2e.js | Mobile WebView E2E | Sidebar items navigate user to dashboard paths. | ✅ Pass | 0.44 |
| **TC-MOB-061** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.14 |
| **TC-MOB-062** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.41 |
| **TC-MOB-063** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.38 |
| **TC-MOB-064** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.32 |
| **TC-MOB-065** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.26 |
| **TC-MOB-066** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.14 |
| **TC-MOB-067** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.44 |
| **TC-MOB-068** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.19 |
| **TC-MOB-069** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.42 |
| **TC-MOB-070** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.36 |
| **TC-MOB-071** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.28 |
| **TC-MOB-072** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.35 |
| **TC-MOB-073** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.38 |
| **TC-MOB-074** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.50 |
| **TC-MOB-075** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.12 |
| **TC-MOB-076** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.17 |
| **TC-MOB-077** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.48 |
| **TC-MOB-078** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.30 |
| **TC-MOB-079** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.37 |
| **TC-MOB-080** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.37 |
| **TC-MOB-081** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.23 |
| **TC-MOB-082** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.20 |
| **TC-MOB-083** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.38 |
| **TC-MOB-084** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.13 |
| **TC-MOB-085** | run_mobile_e2e.js | Mobile WebView E2E | Prevents invalid payload transmissions and checks text length constraints. | ✅ Pass | 0.34 |
| **TC-MOB-086** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.37 |
| **TC-MOB-087** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.15 |
| **TC-MOB-088** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.15 |
| **TC-MOB-089** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.42 |
| **TC-MOB-090** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.16 |
| **TC-MOB-091** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.36 |
| **TC-MOB-092** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.22 |
| **TC-MOB-093** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.47 |
| **TC-MOB-094** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.38 |
| **TC-MOB-095** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.33 |
| **TC-MOB-096** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.20 |
| **TC-MOB-097** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.14 |
| **TC-MOB-098** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.22 |
| **TC-MOB-099** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.45 |
| **TC-MOB-100** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.25 |
| **TC-MOB-101** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.14 |
| **TC-MOB-102** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.15 |
| **TC-MOB-103** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.40 |
| **TC-MOB-104** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.47 |
| **TC-MOB-105** | run_mobile_e2e.js | Mobile WebView E2E | Transitions execute successfully across login, dashboard, and settings views. | ✅ Pass | 0.13 |
| **TC-MOB-106** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.29 |
| **TC-MOB-107** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.45 |
| **TC-MOB-108** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.15 |
| **TC-MOB-109** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.25 |
| **TC-MOB-110** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.44 |
| **TC-MOB-111** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.22 |
| **TC-MOB-112** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.37 |
| **TC-MOB-113** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.28 |
| **TC-MOB-114** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.14 |
| **TC-MOB-115** | run_mobile_e2e.js | Mobile WebView E2E | Landscape layout scales correctly without horizontal overflow lines. | ✅ Pass | 0.47 |
| **TC001** | test_runner.js | UI/UX Test | Verify the homepage/onboarding page loads without errors | ✅ Pass | 4.13 |
| **TC002** | test_runner.js | UI/UX Test | Verify first onboarding slide shows Organize Your Life title | ✅ Pass | 4.96 |
| **TC003** | test_runner.js | UI/UX Test | Verify Next button exists on onboarding slides | ✅ Pass | 3.34 |
| **TC004** | test_runner.js | UI/UX Test | Verify all 3 onboarding slides content is defined | ✅ Pass | 2.72 |
| **TC005** | test_runner.js | UI/UX Test | Verify Skip button is present on non-final onboarding slides | ✅ Pass | 2.75 |
| **TC006** | test_runner.js | UI/UX Test | Verify Get Started button on the final onboarding slide | ✅ Pass | 3.56 |
| **TC007** | test_runner.js | UI/UX Test | Verify login page shows Welcome Back title, subtitle, fields, submit | ✅ Pass | 2.90 |
| **TC008** | test_runner.js | UI/UX Test | Verify register page shows Create Account title with fields | ✅ Pass | 3.91 |
| **TC009** | test_runner.js | UI/UX Test | Verify the app uses dark theme as default color scheme | ✅ Pass | 2.58 |
| **TC010** | test_runner.js | UI/UX Test | Verify glass-panel class with backdrop-filter blur on UI panels | ✅ Pass | 2.59 |
| **TC011** | test_runner.js | UI/UX Test | Verify AnimatedBackground component renders on auth pages | ✅ Pass | 2.05 |
| **TC012** | test_runner.js | UI/UX Test | Verify login form has both email and password input fields | ✅ Pass | 13.34 |
| **TC013** | test_runner.js | UI/UX Test | Verify Sign up link on login page pointing to /register | ✅ Pass | 1.97 |
| **TC014** | test_runner.js | UI/UX Test | Verify Sign in link on register page pointing to /login | ✅ Pass | 1.84 |
| **TC015** | test_runner.js | UI/UX Test | Verify browser tab title contains Core Scheduler | ✅ Pass | 0.01 |
| **TC016** | test_runner.js | UI/UX Test | Verify favicon/icon resource is referenced in HTML head | ✅ Pass | 0.01 |
| **TC017** | test_runner.js | UI/UX Test | Verify meta description tag exists with SEO content | ✅ Pass | 0.01 |
| **TC018** | test_runner.js | UI/UX Test | Verify Google Font Inter is loaded and applied to body | ✅ Pass | 0.01 |
| **TC019** | test_runner.js | UI/UX Test | Verify CSS custom properties like --accent-primary in :root | ✅ Pass | 0.01 |
| **TC020** | test_runner.js | UI/UX Test | Verify btn-primary with hover transform and box-shadow | ✅ Pass | 0.00 |
| **TC021** | test_runner.js | UI/UX Test | Verify input fields show accent border and shadow on focus | ✅ Pass | 3.37 |
| **TC022** | test_runner.js | UI/UX Test | Verify error messages use var(--danger) color for feedback | ✅ Pass | 0.00 |
| **TC023** | test_runner.js | UI/UX Test | Verify success messages use var(--success) color | ✅ Pass | 0.01 |
| **TC024** | test_runner.js | UI/UX Test | Verify CSS spin animation keyframes for loading states | ✅ Pass | 0.00 |
| **TC025** | test_runner.js | UI/UX Test | Verify meta viewport with width=device-width for mobile | ✅ Pass | 0.01 |
| **TC026** | test_runner.js | Functional Test | Verify successful login redirects to dashboard | ✅ Pass | 6.61 |
| **TC027** | test_runner.js | Functional Test | Verify failed login shows error message on screen | ✅ Pass | 6.76 |
| **TC028** | test_runner.js | Functional Test | Verify HTML5 validation prevents empty email submission | ✅ Pass | 4.23 |
| **TC029** | test_runner.js | Functional Test | Verify HTML5 validation prevents empty password submission | ✅ Pass | 4.00 |
| **TC030** | test_runner.js | Functional Test | Verify Forgot password link is visible and clickable | ✅ Pass | 2.66 |
| **TC031** | test_runner.js | Functional Test | Verify back navigation from forgot password mode returns to login | ✅ Pass | 2.35 |
| **TC032** | test_runner.js | Functional Test | Verify register step 1 shows name and email fields | ✅ Pass | 2.69 |
| **TC033** | test_runner.js | Functional Test | Verify Sign up link navigates to /register page | ✅ Pass | 2.35 |
| **TC034** | test_runner.js | Functional Test | Verify unauthenticated users are redirected to /login | ✅ Pass | 4.55 |
| **TC035** | test_runner.js | Functional Test | Verify authenticated users can access the dashboard | ✅ Pass | 8.22 |
| **TC036** | test_runner.js | Functional Test | Verify dashboard shows Your Workspaces or equivalent heading | ✅ Pass | 0.01 |
| **TC037** | test_runner.js | Functional Test | Verify Create Workspace / New Domain button is visible | ✅ Pass | 0.00 |
| **TC038** | test_runner.js | Functional Test | Verify template selection page renders with template cards | ✅ Pass | 3.76 |
| **TC039** | test_runner.js | Functional Test | Verify Room Core template is shown in template selection | ✅ Pass | 0.00 |
| **TC040** | test_runner.js | Functional Test | Verify Software Team template is shown in template selection | ✅ Pass | 0.00 |
| **TC041** | test_runner.js | Functional Test | Verify College Project template is shown in template selection | ✅ Pass | 0.00 |
| **TC042** | test_runner.js | Functional Test | Verify custom domain creation form renders correctly | ✅ Pass | 3.67 |
| **TC043** | test_runner.js | Functional Test | Verify domain creation with valid name creates the domain | ✅ Pass | 0.05 |
| **TC044** | test_runner.js | Functional Test | Verify domain creation without name shows validation error | ✅ Pass | 0.03 |
| **TC045** | test_runner.js | Functional Test | Verify domain detail page displays Active Tasks section | ✅ Pass | 0.03 |
| **TC046** | test_runner.js | Functional Test | Verify domain detail page displays Team Members section | ✅ Pass | 0.02 |
| **TC047** | test_runner.js | Functional Test | Verify Create Task form appears for admin users | ✅ Pass | 0.01 |
| **TC048** | test_runner.js | Functional Test | Verify Invite Member form appears for admin users | ✅ Pass | 0.01 |
| **TC049** | test_runner.js | Functional Test | Verify sidebar has Dashboard, New Domain, Invitations, Progress, Terms, Profile links | ✅ Pass | 0.00 |
| **TC050** | test_runner.js | Functional Test | Verify clicking Dashboard in sidebar navigates to /dashboard | ✅ Pass | 2.81 |
| **TC051** | test_runner.js | Functional Test | Verify New Domain sidebar link navigates correctly | ✅ Pass | 2.85 |
| **TC052** | test_runner.js | Functional Test | Verify Create Domain sidebar link navigates correctly | ✅ Pass | 2.90 |
| **TC053** | test_runner.js | Functional Test | Verify Invitations sidebar link navigates correctly | ✅ Pass | 3.25 |
| **TC054** | test_runner.js | Functional Test | Verify Progress sidebar link navigates correctly | ✅ Pass | 3.16 |
| **TC055** | test_runner.js | Functional Test | Verify Terms sidebar link navigates correctly | ✅ Pass | 3.17 |
| **TC056** | test_runner.js | Functional Test | Verify Profile sidebar link navigates correctly | ✅ Pass | 3.03 |
| **TC057** | test_runner.js | Functional Test | Verify logout button is visible in sidebar footer | ✅ Pass | 0.01 |
| **TC058** | test_runner.js | Functional Test | Verify clicking logout clears session and redirects to login | ✅ Pass | 0.03 |
| **TC059** | test_runner.js | Functional Test | Verify profile page shows user name and email | ✅ Pass | 3.33 |
| **TC060** | test_runner.js | Functional Test | Verify change password form is visible on profile page | ✅ Pass | 0.00 |
| **TC061** | test_runner.js | Validation Test | Verify email input has type=email for browser validation | ✅ Pass | 2.70 |
| **TC062** | test_runner.js | Validation Test | Verify password input masks characters with type=password | ✅ Pass | 0.01 |
| **TC063** | test_runner.js | Validation Test | Verify register email input has type=email validation | ✅ Pass | 2.63 |
| **TC064** | test_runner.js | Validation Test | Verify register name field has required attribute | ✅ Pass | 0.01 |
| **TC065** | test_runner.js | Validation Test | Verify OTP input maxLength=6 on register verification step | ✅ Pass | 0.01 |
| **TC066** | test_runner.js | Validation Test | Verify password minLength=6 is enforced on registration | ✅ Pass | 0.01 |
| **TC067** | test_runner.js | Validation Test | Verify required attributes prevent empty login form submission | ✅ Pass | 2.69 |
| **TC068** | test_runner.js | Validation Test | Verify required attributes prevent empty register submission | ✅ Pass | 2.75 |
| **TC069** | test_runner.js | Validation Test | Verify workspace creation requires non-empty name field | ✅ Pass | 0.01 |
| **TC070** | test_runner.js | Validation Test | Verify task creation form requires a title value | ✅ Pass | 0.01 |
| **TC071** | test_runner.js | Validation Test | Verify invite member form validates email format | ✅ Pass | 0.01 |
| **TC072** | test_runner.js | Validation Test | Verify current password field is required for change | ✅ Pass | 8.32 |
| **TC073** | test_runner.js | Validation Test | Verify new password field is required | ✅ Pass | 5.01 |
| **TC074** | test_runner.js | Validation Test | Verify confirm password field is required | ✅ Pass | 5.05 |
| **TC075** | test_runner.js | Validation Test | Verify mismatched passwords show error message | ✅ Pass | 0.01 |
| **TC076** | test_runner.js | Validation Test | Verify new password field enforces minLength=6 | ✅ Pass | 10.09 |
| **TC077** | test_runner.js | Validation Test | Verify OTP input on reset password has maxLength=6 | ✅ Pass | 0.01 |
| **TC078** | test_runner.js | Validation Test | Verify delete account OTP input has maxLength=6 | ✅ Pass | 0.01 |
| **TC079** | test_runner.js | Validation Test | Verify submit button disables during login request | ✅ Pass | 2.64 |
| **TC080** | test_runner.js | Validation Test | Verify submit button disables during register request | ✅ Pass | 2.43 |
| **TC081** | test_runner.js | Validation Test | Verify script tags are properly handled in input fields | ✅ Pass | 3.13 |
| **TC082** | test_runner.js | Validation Test | Verify SQL injection strings are handled safely | ✅ Pass | 0.34 |
| **TC083** | test_runner.js | Validation Test | Verify HTML entities are properly escaped in UI rendering | ✅ Pass | 2.48 |
| **TC084** | test_runner.js | Validation Test | Verify extremely long text input does not break the UI | ✅ Pass | 0.69 |
| **TC085** | test_runner.js | Validation Test | Verify international/special characters work in name field | ✅ Pass | 2.93 |
| **TC086** | test_runner.js | E2E Integration Test | Verify complete login -> dashboard navigation flow works end-to-end | ✅ Pass | 3.41 |
| **TC087** | test_runner.js | E2E Integration Test | Verify login -> navigate to create workspace page works | ✅ Pass | 3.39 |
| **TC088** | test_runner.js | E2E Integration Test | Verify login -> navigate to progress page shows domain progress | ✅ Pass | 3.38 |
| **TC089** | test_runner.js | E2E Integration Test | Verify login -> navigate to invitations page shows messages | ✅ Pass | 3.69 |
| **TC090** | test_runner.js | E2E Integration Test | Verify login -> navigate to profile page shows user info | ✅ Pass | 3.43 |
| **TC091** | test_runner.js | E2E Integration Test | Verify login -> navigate to terms page shows content | ✅ Pass | 3.49 |
| **TC092** | test_runner.js | E2E Integration Test | Verify settings panel opens/closes in sidebar | ✅ Pass | 2.90 |
| **TC093** | test_runner.js | E2E Integration Test | Verify switching to light mode saves to localStorage | ✅ Pass | 0.52 |
| **TC094** | test_runner.js | E2E Integration Test | Verify switching to dark mode saves to localStorage | ✅ Pass | 0.51 |
| **TC095** | test_runner.js | E2E Integration Test | Verify language options (English, Telugu, Hindi) in settings | ✅ Pass | 0.01 |
| **TC096** | test_runner.js | E2E Integration Test | Verify font size options (Small, Medium, Large) in settings | ✅ Pass | 0.01 |
| **TC097** | test_runner.js | E2E Integration Test | Verify settings gear icon toggles the settings panel | ✅ Pass | 0.01 |
| **TC098** | test_runner.js | E2E Integration Test | Verify scroll-to-top button appears after scrolling down | ✅ Pass | 0.52 |
| **TC099** | test_runner.js | E2E Integration Test | Verify hamburger menu appears on mobile-width viewport | ✅ Pass | 0.89 |
| **TC100** | test_runner.js | E2E Integration Test | Verify empty state UI shows when user has no domains | ✅ Pass | 0.02 |
| **TC101** | test_runner.js | E2E Integration Test | Verify terms page shows About, Workflow, Roles, ToS sections | ✅ Pass | 3.32 |
| **TC102** | test_runner.js | E2E Integration Test | Verify profile page includes change password form | ✅ Pass | 3.32 |
| **TC103** | test_runner.js | E2E Integration Test | Verify profile page includes Danger Zone with delete account | ✅ Pass | 0.00 |
| **TC104** | test_runner.js | E2E Integration Test | Verify progress page shows domain progress or empty state | ✅ Pass | 3.38 |
| **TC105** | test_runner.js | E2E Integration Test | Verify back/breadcrumb navigation functions properly | ✅ Pass | 2.90 |
| **TC106** | test_runner.js | Deployable Status Test | Verify the Next.js application responds on localhost:3000 | ✅ Pass | 0.92 |
| **TC107** | test_runner.js | Deployable Status Test | Verify /login, /register, /dashboard and other routes serve content | ✅ Pass | 1.64 |
| **TC108** | test_runner.js | Deployable Status Test | Verify API endpoints respond with proper status codes | ✅ Pass | 0.61 |
| **TC109** | test_runner.js | Deployable Status Test | Verify favicon and static assets return 200 status | ✅ Pass | 0.30 |
| **TC110** | test_runner.js | Deployable Status Test | Verify HTML has proper html, head, body and meta elements | ✅ Pass | 1.85 |
| **TC111** | test_runner.js | Appium Mobile Test | Verify homepage renders correctly on 375x812 mobile viewport | ✅ Pass | 3.77 |
| **TC112** | test_runner.js | Appium Mobile Test | Verify login page adapts to mobile viewport without overflow | ✅ Pass | 3.03 |
| **TC113** | test_runner.js | Appium Mobile Test | Verify register page adapts to mobile viewport correctly | ✅ Pass | 2.86 |
| **TC114** | test_runner.js | Appium Mobile Test | Verify email and password fields are visible and tappable on mobile | ✅ Pass | 2.69 |
| **TC115** | test_runner.js | Appium Mobile Test | Verify login form submits successfully on mobile viewport | ✅ Pass | 6.42 |
| **TC116** | test_runner.js | Appium Mobile Test | Verify hamburger/mobile menu icon is displayed on narrow viewport | ✅ Pass | 0.00 |
| **TC117** | test_runner.js | Appium Mobile Test | Verify dashboard page renders on mobile without horizontal scroll | ✅ Pass | 3.37 |
| **TC118** | test_runner.js | Appium Mobile Test | Verify template cards stack vertically on mobile viewport | ✅ Pass | 3.38 |
| **TC119** | test_runner.js | Appium Mobile Test | Verify profile page sections are accessible on mobile | ✅ Pass | 3.58 |
| **TC120** | test_runner.js | Appium Mobile Test | Verify progress bars and cards render on mobile viewport | ✅ Pass | 3.37 |
| **TC121** | test_runner.js | Appium Mobile Test | Verify invitation cards are accessible on mobile viewport | ✅ Pass | 3.40 |
| **TC122** | test_runner.js | Appium Mobile Test | Verify terms page content is scrollable on mobile viewport | ✅ Pass | 3.36 |
| **TC123** | test_runner.js | Appium Mobile Test | Verify touch event APIs are accessible in mobile context | ✅ Pass | 0.00 |
| **TC124** | test_runner.js | Appium Mobile Test | Verify viewport meta prevents unwanted pinch-zoom scaling | ✅ Pass | 0.00 |
| **TC125** | test_runner.js | Appium Mobile Test | Verify app renders correctly in landscape mobile orientation | ✅ Pass | 3.70 |

</details>
