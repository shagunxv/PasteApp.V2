# PasteApp — QA Test Plan

## 1. Project Overview

**Project:** PasteApp V2  
**Application Type:** Full-Stack Web Application  
**Testing Type:** Manual Testing, API Testing, End-to-End Automation  
**Environment:** Production  
**Frontend:** https://paste-app-v2-omega.vercel.app  
**Backend:** https://pasteapp-v2.onrender.com

## 2. Testing Objectives

- Verify core application functionality.
- Validate user registration and authentication.
- Test paste creation, editing, sharing and deletion.
- Verify API responses and status codes.
- Identify functional and usability defects.
- Automate critical user workflows.
- Document defects with reproducible steps.

## 3. Scope of Testing

### In Scope
- User registration
- User login and logout
- Authentication and authorization
- Create paste
- View and retrieve paste
- Edit paste
- Delete paste
- Share paste using unique URL
- Copy paste content
- Input validation
- API response validation
- Cross-browser checks

### Out of Scope
- Load and stress testing
- Security penetration testing
- Third-party infrastructure testing

## 4. Testing Approach

 Testing Type  => Tool --

- Manual Testing => Browser 
- API Testing => Postman 
- UI Automation => Playwright 
- Bug Tracking => GitHub Issues 
- Documentation => Markdown 

## 5. Test Environment

- OS: Windows
- Browser: Chrome
- Frontend: Vercel deployment
- Backend: Render deployment
- Database: MongoDB Atlas

## 6. Entry Criteria

- Application is deployed and accessible.
- Backend services are running.
- Test environment is available.
- Test scenarios are documented.

## 7. Exit Criteria

- All planned test cases are executed.
- Critical defects are documented.
- Failed tests have reproducible evidence.
- Test execution summary is prepared.

## 8. Deliverables

- Test Plan
- Test Scenarios
- Manual Test Cases
- Postman Collection
- Playwright Automation Scripts
- Bug Reports
- Screenshots and Evidence
- Final QA Summary

## 9. Risks and Limitations

- Free hosting may cause cold starts.
- Email delivery may be restricted by provider test-mode limitations.
- Production testing must avoid destructive actions on other users' data.

## 10. Project Status

**Status:** QA Setup in Progress  
**Tester:** Shagun Ojha
