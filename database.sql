create TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);

create TABLE basket(
    id SERIAL PRIMARY KEY,
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id)
);

create TABLE basket_drink(
    id SERIAL PRIMARY KEY,
    drink_id INTEGER,
    basket_id INTEGER,
    FOREIGN KEY (drink_id) REFERENCES drink (id),
    FOREIGN KEY (basket_id) REFERENCES basket (id)
);

create TABLE type(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

create TABLE subtype(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type_id INTEGER,
    FOREIGN KEY (type_id) REFERENCES type (id)
);

create TABLE drink(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INTEGER,
    img VARCHAR(255),
    subtype_id INTEGER,
    FOREIGN KEY (subtype_id) REFERENCES subtype (id)
);

create TABLE drink_info(
    id SERIAL PRIMARY KEY,
    drink_id INTEGER,
    title VARCHAR(255),
    description VARCHAR(255),
    FOREIGN KEY (drink_id) REFERENCES drink (id)
);