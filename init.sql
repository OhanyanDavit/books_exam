-- Active: 1752855942309@@127.0.0.1@5432@book_rental_api


CREATE DATABASE book_rental_api;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'user')) DEFAULT 'user'
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isAvailable BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE rentals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    rented_at TIMESTAMP NOT NULL DEFAULT NOW(),
    due_date DATE NOT NULL,
    returned_at TIMESTAMP
);

CREATE TABLE overdue_records (
    id SERIAL PRIMARY KEY,
    rental_id INTEGER NOT NULL UNIQUE REFERENCES rentals(id) ON DELETE CASCADE,
    marked_at TIMESTAMP NOT NULL DEFAULT NOW()
);
