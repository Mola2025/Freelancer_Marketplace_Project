# SkillSwap Angular Client

![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

Frontend application built with **Angular** that integrates with the
official **SkillSwap REST API**. This project was developed as part of
college project.

---

# Project Overview

SkillSwap is a freelance marketplace platform where:

- Users can **register and log in**
- Clients can **post jobs**
- Freelancers can **submit proposals**
- Clients can **accept proposals**
- Jobs move through the lifecycle:

open → in_progress → completed

- Both participants can **leave reviews**
- User **ratings are recalculated automatically**

The objective of this project is to build the **complete Angular
frontend** that communicates with the provided backend API.

---

# API Integration

Base API URL

https://stingray-app-wxhhn.ondigitalocean.app

The application communicates with the backend using **HTTP requests**
and handles all responses and errors properly.

All protected endpoints require **JWT authentication**.

---

# Authentication

## Register

POST /auth/register

Required fields:

- name
- username
- email
- password
- bio
- skills (array)

Handled errors:

- Missing required fields
- Invalid username
- Email already in use
- Username already in use (suggested username returned)

---

## Login

POST /auth/login

Returns:

- JWT token
- user object

After login:

- The **JWT token is stored**
- Requests automatically attach the token using an **HTTP
  interceptor**
- If a **401 error occurs**, the user is redirected to the login page

---

# Main Application Features

## Users

Users can:

- Register an account
- Log in securely
- View their profile
- View other public user profiles
- See ratings and completed jobs

---

## Jobs

Users can:

- Search jobs with filters
- Post new jobs
- Update jobs
- View job details
- Mark jobs as completed

Job lifecycle:

open → in_progress → completed

---

## Proposals

Freelancers can:

- Submit proposals to open jobs
- View their submitted proposals
- Withdraw proposals

Clients can:

- View proposals for their jobs
- Accept proposals

When a proposal is accepted:

- Other proposals are automatically rejected
- The job status changes to **in_progress**

---

## Reviews

After a job is completed:

Both participants can leave a review.

Rules enforced by the UI:

- Job must be **completed**
- Users **cannot review themselves**
- Only **one review per job**
- Rating must be **between 1 and 5**

The backend automatically recalculates user ratings.

---

# Mandatory Business Flow

1.  User A registers
2.  User A logs in
3.  User A posts a job
4.  User B registers
5.  User B submits a proposal
6.  User A accepts the proposal
7.  Job moves to **in_progress**
8.  One participant completes the job
9.  Both participants leave reviews
10. Ratings update correctly

---

# Error Handling

Example backend error:

{ "error": "Error message here" }

Handled HTTP codes:

- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict

---

# Angular Architecture

src/ ├── app/ │ ├── core/ │ │ ├── services │ │ ├── interceptors │ │ └──
guards │ ├── components/ │ │ ├── auth │ │ ├── users │ │ ├── jobs │ │ ├──
proposals │ │ └── reviews │ │ │ └── app-routing.module.ts

---

# Technologies Used

- Angular
- TypeScript
- RxJS
- Angular Router
- Angular Forms
- REST API
- JWT Authentication

---

# Installation

git clone https://github.com/your-username/skillswap-angular-client.git

cd skillswap-angular-client

npm install

ng serve

Open http://localhost:4200

---
