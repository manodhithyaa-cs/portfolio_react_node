CREATE DATABASE Portfolio;

USE Portfolio;

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  technologies JSON,
  liveUrl VARCHAR(255),
  githubUrl VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO skills (name) VALUES
("React"), ("TypeScript"), ("Node.js"), ("Python"), ("SQL"),
("Firebase"), ("Tailwind CSS"), ("Figma"), ("Bootstrap"), ("Flutter"), ("Git");
