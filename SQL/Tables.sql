CREATE TABLE grocery_list (
	grocery_list_id SERIAL PRIMARY KEY,
	grocery_list_name TEXT NOT NULL
);

CREATE TABLE grocery_item (
	grocery_item_id SERIAL PRIMARY KEY,
	grocery_list_id INTEGER REFERENCES grocery_list(grocery_list_id) NOT NULL,
	grocery_item_name TEXT NOT NULL,
	grocery_item_type TEXT
);