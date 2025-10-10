# 🏋️‍♂️ CoachApplication – MVP for Personal Fitness Trainers

**CoachApplication** is an MVP (Minimum Viable Product) web application designed for **personal fitness trainers** to easily:

- manage their **clients**,
- create and organize **training plans**,
- track **individual workouts** and progress.

---

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://reactjs.org/)  
- **Backend**: [Spring Boot](https://spring.io/projects/spring-boot)  
- **Database**: PostgreSQL  
- **Authorization**: JWT (JSON Web Token)

---

## 🚧 Project Status

This is an early-stage MVP and **still in development**.  
Features are being gradually added and polished.


## 🚀 How to Run Project Locally

### 🖥️ Backend – Spring Boot & PostgreSQL

1. Make sure you have **Java (JDK 17+)** and **PostgreSQL** installed.
2. Create a PostgreSQL database:
```sql
CREATE DATABASE CoachApplicationDatabase;
```
3. Configure your `application.properties` file:  
  - You can copy src/main/resources/application.properties.example, update the credentials, and rename it to application.properties in the same folder.

4. Run the Spring Boot application using your IDE:  
   Navigate to `main/java/com/palci/coachApplication` and run `CoachApplication.java`  
   **OR** use the terminal:
```bash
./mvnw spring-boot:run
```

---

### 💻 Frontend – React

1. Make sure you have **Node.js** and **npm** installed.
2. Navigate to the frontend folder and start the app:
```bash
cd frontend
npm install
npm run dev
```

---

### ✅ Port Check

- Backend runs on: [http://localhost:8080](http://localhost:8080)
- Frontend runs on: [http://localhost:5173](http://localhost:5173)

Make sure both ports are available and not blocked by another process.

🛠️ Docker deployment is currently in progress and will be added soon.

## 👤 About Me

Hi, I'm Pavol Kohár – a self-driven Java & React developer currently working on full-stack projects.  
I'm building this app to help fitness coaches better manage their clients and workouts.

- 💻 Currently learning: Docker, CI/CD, and deployment best practices  
- 🎯 Goal: Become a professional full-stack developer  
- 📬 Contact: [koharpavol98@gmail.com](mailto:koharpavol98@gmail.com)  
- 🌐 Portfolio: *coming soon*