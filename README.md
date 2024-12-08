# JobLytics

**Explore** [JobLytics](https://joblytics.vercel.app/)

## Features :

1. **Job Application Tracking:**

- Easily track the status of your job applications, including details like company name, role, application date, and current status.

2. **Consolidated Records:**

- Maintain an organized and centralized record of all the companies you’ve applied to, along with relevant contact details for easy access.

3. **Follow-Up Reminders:**

- A unique link is generated for each SyncPAD, which can be shared with friends or team members to join the same room.

4. **Status Updates:**

- Update and monitor the progress of your applications, such as "Applied," "In Process," "Interview Scheduled," or "Rejected."

5. **Custom Notes:**

- Add personalized notes to each application for quick reference, such as interview feedback or specific instructions.

### **Installation**

To get started with this project, you'll need to have **Node.js** and **npm** (or **yarn**) installed.

1. **Clone the Repository**:
   Clone the repository and navigate to the project directory:

```bash
 git clone https://github.com/imranN74/joblytics.git
 cd client
```

## Backend

1. **Navigate to backend dir** :

```bash
cd backend
```

2. **Installing Dependencies**:
   Once you're inside the project directory, install the dependencies by running:

```bash
npm install
```

Or, if you're using **yarn**:

```bash
yarn install
```

2. **Database Setup** :

- Download prostgreSQL

```bash
psql -U postgres
CREATE DATABASE syncpad;
```

- Migrate Schema

```bash
npx prisma migrate dev
```

3. **Start the server** :

```bash
npm run dev
```

Or, if you prefer **yarn**:

```bash
yarn dev
```

## Frontend :

2. **Installing Dependencies**:
   Once you're inside the project directory, install the dependencies by running:

```bash
npm install
```

Or, if you're using **yarn**:

```bash
yarn install
```

3. **Start the app**:
   Run the app locally using the following command:

```bash
npm run dev
```

Or, if you're using **yarn**:

```bash
yarn dev
```

**Navigate to** http://localhost:5173
